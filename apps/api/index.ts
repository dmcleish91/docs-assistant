import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

const app = new Hono();
app.use(cors());

const llm = new ChatOpenAI({
  model: 'gpt-4.1-mini',
  openAIApiKey: OPENAI_API_KEY,
});

// Section definitions for DRY approach
const SECTIONS = {
  projectName: {
    title: 'Project Name',
    description: 'The main title of your project',
    field: 'projectName',
    required: true,
  },
  description: {
    title: 'Description',
    description: 'A brief description of your project.',
    field: 'description',
    required: true,
  },
  prerequisites: {
    title: 'Prerequisites',
    description: 'A list of prerequisites for running your project.',
    field: 'prerequisites',
    required: false,
  },
  environmentalSetup: {
    title: 'Environmental Setup',
    description: 'A list of environmental setup instructions for running your project.',
    field: 'environmentalSetup',
    required: false,
  },
  localDevServer: {
    title: 'Running the Development Server',
    description: "A list of instructions for running your project's development server.",
    field: 'localDevServer',
    required: false,
  },
  deploymentInfo: {
    title: 'Deploying to Production',
    description: 'A list of instructions for deploying your project to production.',
    field: 'deploymentInfo',
    required: false,
  },
} as const;

function handleLLMResponse(content: any): string {
  return typeof content === 'string' ? content : JSON.stringify(content);
}

function handleError(error: any, c: any) {
  console.error('Error:', error);

  if (error instanceof z.ZodError) {
    return c.json({ error: 'Invalid request body', details: error.errors }, 400);
  }

  const errorMessage = error instanceof Error ? error.message : String(error);
  if (errorMessage.includes('OpenAI')) {
    return c.json({ error: 'OpenAI API error', details: errorMessage }, 500);
  }

  return c.json({ error: 'Internal server error', details: errorMessage }, 500);
}

// String builder for system prompt
function buildSystemPrompt(enabledSections: string[]): string {
  const basePrompt = [
    'You are a technical writer specializing in creating a comprehensive README.md file documentation.',
    'This readme is used so developers can understand the project and how to run it.',
    'Create a well-structured README.md file based on the provided information.',
    'Follow these guidelines:',
    '',
    'Use clear, concise language',
    'Use proper markdown formatting with headers, code blocks, and lists',
    'Make it easy to read and navigate',
    'Include practical examples where appropriate',
    'Use visual elements when relevant',
    'Do not wrap the output in ```markdown``` code blocks or any other formatting.',
    '',
    "Structure the README with the below sections (don't include any extra sections):",
    '',
  ].join('\n');

  const sectionLines = [
    'Project Name - The main title of your project',
    'Table of Contents - A list of sections in the README for easy navigation.',
    'Description - A brief description of your project.',
  ];

  // Add optional sections
  Object.entries(SECTIONS).forEach(([key, section]) => {
    if (key !== 'projectName' && key !== 'description' && enabledSections.includes(key)) {
      sectionLines.push(`${section.title} - ${section.description}`);
    }
  });

  const sectionsText = sectionLines.join('\n');

  return `${basePrompt}${sectionsText}

Generate only the markdown content, no additional text or explanations.`;
}

// String builder for user prompt
function buildUserPrompt(enabledSections: string[]): string {
  const fields: string[] = ['Project Name: {projectName}', 'Description: {description}'];

  // Add optional fields
  Object.entries(SECTIONS).forEach(([key, section]) => {
    if (key !== 'projectName' && key !== 'description' && enabledSections.includes(key)) {
      fields.push(`${section.title}: {${section.field}}`);
    }
  });

  return `${fields.join('\n')}
Generate a comprehensive README.md file.`;
}

// Dynamic schema builder
function createDynamicSchema(enabledSections: string[]) {
  const baseSchema = z.object({
    projectName: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
  });

  const optionalFields: Record<string, z.ZodString> = {};

  Object.entries(SECTIONS).forEach(([key, section]) => {
    if (!section.required && enabledSections.includes(key)) {
      optionalFields[section.field] = z.string().min(1, `${section.title} is required`);
    }
  });

  return baseSchema.extend(optionalFields);
}

// Schema for sections configuration
const sectionsConfigSchema = z.object(Object.fromEntries(Object.keys(SECTIONS).map((key) => [key, z.boolean()])));

// Updated request schema to include configuration
const generateDocumentationSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  prerequisites: z.string().optional(),
  environmentalSetup: z.string().optional(),
  localDevServer: z.string().optional(),
  deploymentInfo: z.string().optional(),
  config: z
    .object({
      sections: sectionsConfigSchema,
    })
    .optional(),
});

app.post('/generate-documentation', async (c) => {
  try {
    const body = await c.req.json();
    const formData = generateDocumentationSchema.parse(body);

    // Get enabled sections from configuration or default to all
    const sectionsConfig = formData.config?.sections || Object.fromEntries(Object.keys(SECTIONS).map((key) => [key, true]));

    const enabledSections = Object.entries(sectionsConfig)
      .filter(([_, enabled]) => enabled)
      .map(([section]) => section);

    // Build dynamic prompts
    const systemPrompt = buildSystemPrompt(enabledSections);
    const userPrompt = buildUserPrompt(enabledSections);

    // Create dynamic prompt template
    const documentationPrompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      ['user', userPrompt],
    ]);

    // Create dynamic validation schema
    const dynamicSchema = createDynamicSchema(enabledSections);
    const validatedData = dynamicSchema.parse(formData);

    const doc = await documentationPrompt.pipe(llm).invoke(validatedData);

    const content = handleLLMResponse(doc.content);

    console.log('Generated documentation for project:', formData.projectName);

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': 'attachment; filename="README.md"',
      },
    });
  } catch (error) {
    console.error('Error in /generate-documentation:', error);
    return handleError(error, c);
  }
});

app.get('/', (c) => c.text('Documentation Generator API is running!'));

const port = parseInt(process.env.PORT || '8787', 10);
console.log(`🚀 API server starting on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
