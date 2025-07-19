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

const handleLLMResponse = (content: any): string => {
  return typeof content === 'string' ? content : JSON.stringify(content);
};

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
    `You are a technical writer specializing in creating a comprehensive README.md file documentation.
     This readme is used so developers can understand the project and how to run it.
     Create a well-structured README.md file based on the provided information.
     Follow these guidelines:

     Use clear, concise language
     Use proper markdown formatting with headers, code blocks, and lists
     Make it easy to read and navigate
     Include practical examples where appropriate
     Use visual elements when relevant
     Do not wrap the output in \`\`\`markdown\`\`\` code blocks or any other formatting. 
     
     Structure the README with the below sections (don't include any extra sections):
     
     Project Name - The main title of your project
     Table of Contents - A list of sections in the README for easy navigation.
     Description - A brief description of your project.
     Prerequisites - A list of prerequisites for running your project.
     Environmental Setup - A list of environmental setup instructions for running your project.
     Running the Development Server - A list of instructions for running your project's development server.
     Deploying to Production - A list of instructions for deploying your project to production.
     
     Generate only the markdown content, no additional text or explanations.`,
  ],
  [
    'user',
    `Project Name: {projectName}
     Description: {description}
     Prerequisites: {prerequisites}
     Environmental Setup: {environmentalSetup}
     Running the Development Server: {localDevServer}
     Deploying to Production: {deploymentInfo}
     Generate a comprehensive README.md file.`,
  ],
]);

const generateDocumentationSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  prerequisites: z.string().min(1, 'Prerequisites are required'),
  environmentalSetup: z.string().min(1, 'Environmental setup is required'),
  localDevServer: z.string().min(1, 'Local development server instructions are required'),
  deploymentInfo: z.string().min(1, 'Deployment information is required'),
});

app.post('/generate-documentation', async (c) => {
  try {
    const body = await c.req.json();

    const formData = generateDocumentationSchema.parse(body);

    const doc = await documentationPrompt.pipe(llm).invoke({
      projectName: formData.projectName,
      description: formData.description,
      prerequisites: formData.prerequisites,
      environmentalSetup: formData.environmentalSetup,
      localDevServer: formData.localDevServer,
      deploymentInfo: formData.deploymentInfo,
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
