# Documentation Assistant

AI-powered tool to generate markdown documentation using LangChain.js, Hono, and React.

## Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

## Environmental Setup

1. Clone and install dependencies:

   ```bash
   git clone <your-repo>
   cd docs-assistant
   npm install
   ```

2. Set up environment variables:

   Create `apps/api/.env` file with:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Running the Development Server

```bash
npm run dev
```

This starts:

- Frontend: http://localhost:5173
- Backend: http://localhost:8787

## Deploying to Production

```bash
npm run build
```
