import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

// Check for required environment variables
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

// Helper function to handle LLM responses
const handleLLMResponse = (content: any): string => {
  return typeof content === 'string' ? content : JSON.stringify(content);
};

// Helper function to handle errors
const handleError = (error: any, c: any) => {
  console.error('API error:', error);

  if (error instanceof z.ZodError) {
    return c.json({ error: 'Invalid request body', details: error.errors }, 400);
  }

  const errorMessage = error instanceof Error ? error.message : String(error);
  if (errorMessage.includes('OpenAI')) {
    return c.json({ error: 'OpenAI API error', details: errorMessage }, 500);
  }

  return c.json({ error: 'Internal server error', details: errorMessage }, 500);
};

const documentationPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a technical writer specializing in creating comprehensive README.md files for software projects.
    
    Create a well-structured, professional README.md file based on the provided project information.
    Follow these guidelines:
    
    1. Use clear, concise language
    2. Include all relevant sections based on the provided information
    3. Use proper markdown formatting with headers, code blocks, and lists
    4. Make it easy to read and navigate
    5. Include practical examples where appropriate
    6. Use badges and visual elements when relevant
    
    Structure the README with these sections (include only relevant ones):
    - Project Title and Badges
    - Description/Overview
    - Features
    - Technology Stack
    - Prerequisites
    - Installation & Setup
    - Usage
    - API Documentation (if provided)
    - Deployment (if provided)
    - Contributing
    - License
    - Additional Notes (if provided)
    
    Generate only the markdown content, no additional text or explanations.`,
  ],
  [
    'user',
    `Project Name: {projectName}
    
Description: {description}

Technology Stack: {techStack}

Setup Steps: {setupSteps}

API Endpoints: {apiEndpoints}

Deployment Information: {deploymentInfo}

Additional Notes: {additionalNotes}

Generate a comprehensive README.md file for this project.`,
  ],
]);

const generateDocumentationSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.string().min(1, 'Tech stack is required'),
  setupSteps: z.string().min(1, 'Setup steps are required'),
  apiEndpoints: z.string().optional(),
  deploymentInfo: z.string().optional(),
  additionalNotes: z.string().optional(),
});

app.post('/generate-documentation', async (c) => {
  try {
    const body = await c.req.json();
    const formData = generateDocumentationSchema.parse(body);

    const doc = await documentationPrompt.pipe(llm).invoke({
      projectName: formData.projectName,
      description: formData.description,
      techStack: formData.techStack,
      setupSteps: formData.setupSteps,
      apiEndpoints: formData.apiEndpoints || 'Not specified',
      deploymentInfo: formData.deploymentInfo || 'Not specified',
      additionalNotes: formData.additionalNotes || 'None',
    });

    const content = handleLLMResponse(doc.content);

    console.log('Generated documentation for project:', formData.projectName);

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': 'attachment; filename="README.md"',
      },
    });
  } catch (error) {
    return handleError(error, c);
  }
});

// Health check endpoint
app.get('/', (c) => c.text('Documentation Generator API is running!'));

const port = process.env.PORT || 8787;
console.log(`🚀 API server starting on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
