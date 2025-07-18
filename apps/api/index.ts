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

const conversationPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a technical writer who helps developers document their projects. 
    Ask intuitive questions about their project to gather information for comprehensive documentation. 
Focus on these key sections: onboarding, environment setup, development server, and deployment build process. 
Be concise and guide them through documenting each section effectively.
IMPORTANT: Only ask questions, do not generate any documentation or markdown files.
If this is a follow-up conversation, ask follow-up questions based on the user's previous response.`,
  ],
  ['user', `{topic}\n\n{conversationContext}`],
]);

const readmePrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a technical writer. Generate comprehensive markdown documentation based on the conversation history.
Create a well-structured README.md file with the following sections:
- Project Overview
- Prerequisites/Onboarding
- Environment Setup
- Development Server
- Building for Deployment
- Additional Notes

Use the information gathered from the conversation to create detailed, actionable documentation.`,
  ],
  ['user', '{topic}\n\nConversation History:\n{conversationHistory}\n\nGenerate a complete README.md file.'],
]);

const generateSchema = z.object({ topic: z.string() });

const followUpSchema = z.object({
  topic: z.string(),
  previousQuestions: z.string(),
  userResponse: z.string(),
});

const downloadReadmeSchema = z.object({
  topic: z.string(),
  conversationHistory: z.array(
    z.object({
      questions: z.string(),
      userResponse: z.string(),
    })
  ),
});

app.post('/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { topic } = generateSchema.parse(body);

    const doc = await conversationPrompt.pipe(llm).invoke({
      topic,
      conversationContext: 'Ask initial questions about this project to gather information for documentation.',
    });
    const content = handleLLMResponse(doc.content);

    console.log('LLM Response for /generate:', content.substring(0, 200) + '...');

    return c.json({
      questions: content,
      topic: topic,
    });
  } catch (error) {
    return handleError(error, c);
  }
});

app.post('/generate/follow-up', async (c) => {
  try {
    const body = await c.req.json();
    const { topic, previousQuestions, userResponse } = followUpSchema.parse(body);

    const conversationContext = `Previous questions: ${previousQuestions}\n\nUser's response: ${userResponse}\n\nAsk follow-up questions based on this response.`;

    const doc = await conversationPrompt.pipe(llm).invoke({
      topic,
      conversationContext,
    });

    const content = handleLLMResponse(doc.content);

    return c.json({
      questions: content,
      topic: topic,
    });
  } catch (error) {
    return handleError(error, c);
  }
});

app.post('/generate/download-readme', async (c) => {
  try {
    const body = await c.req.json();
    const { topic, conversationHistory } = downloadReadmeSchema.parse(body);

    const conversationHistoryText = conversationHistory.map((conv) => `Q: ${conv.questions}\nA: ${conv.userResponse}`).join('\n\n');

    const doc = await readmePrompt.pipe(llm).invoke({
      topic,
      conversationHistory: conversationHistoryText,
    });

    const content = handleLLMResponse(doc.content);

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
app.get('/', (c) => c.text('Documentation Assistant API is running!'));

const port = process.env.PORT || 8787;
console.log(`🚀 API server starting on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
