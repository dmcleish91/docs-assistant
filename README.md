# 📚 Documentation Assistant

A fullstack tool to generate markdown documentation using LangChain.js, Hono, and React with a monorepo powered by Turborepo.

## 🚀 Features

- **AI-Powered Documentation**: Generate markdown documentation using OpenAI's GPT-4
- **Modern Stack**: Built with Hono (API), React (Frontend), and LangChain.js
- **Monorepo Architecture**: Organized with Turborepo for efficient development
- **TypeScript**: Full type safety across the entire stack
- **File Download**: Direct markdown file download from the browser
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🏗️ Architecture

```
docs-assistant/
├── apps/
│   ├── api/          # Hono + LangChain.js backend
│   └── web/          # Vite + React frontend
├── packages/
│   └── shared/       # Shared types and utilities
└── turbo.json        # Turborepo configuration
```

## 📦 Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

## 🛠️ Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <your-repo>
   cd docs-assistant
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   # Create .env file in apps/api/
   echo "OPENAI_API_KEY=your_openai_api_key_here" > apps/api/.env
   ```

3. **Start development servers:**

   ```bash
   npm run dev
   ```

   This will start:

   - Frontend: http://localhost:5173
   - Backend: http://localhost:8787

## 🎯 Usage

1. Open http://localhost:5173 in your browser
2. Enter a topic for documentation (e.g., "API for note-taking app")
3. Click "Generate & Download"
4. Your markdown file will be downloaded automatically

## 📁 Project Structure

### Apps

#### `apps/api/` - Backend API

- **Framework**: Hono with Node.js server
- **AI**: LangChain.js + OpenAI
- **Validation**: Zod with manual validation
- **Server**: `server.ts` with `@hono/node-server`
- **Port**: 8787
- **Endpoints**:
  - `GET /` - Health check
  - `POST /generate` - Generate documentation

#### `apps/web/` - Frontend

- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Port**: 5173
- **Features**: Loading states, error handling, form validation

### Packages

#### `packages/shared/` - Shared Utilities

- Common types and interfaces (`DocumentationRequest`, `DocumentationResponse`)
- API endpoints constants
- Utility functions for filename formatting

## 🚀 Available Scripts

### Root Level

- `npm run dev` - Start all development servers
- `npm run build` - Build all packages and apps
- `npm run test` - Run tests across all packages

### Individual Apps

- `cd apps/api && npm run dev` - Start API server only (runs `tsx server.ts`)
- `cd apps/web && npm run dev` - Start frontend only

## 🔧 Configuration

### API Configuration

The API uses environment variables for configuration:

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 8787)

### Frontend Configuration

The frontend is configured to connect to the API at `http://localhost:8787`.

## 🧪 Development

### API Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: Returns 400 with Zod validation details
- **Internal Errors**: Returns 500 with generic error message
- **Request Parsing**: Handles malformed JSON gracefully

### Adding New Features

1. Add shared types in `packages/shared/src/`
2. Update API endpoints in `apps/api/index.ts`
3. Update server configuration in `apps/api/server.ts`
4. Update frontend components in `apps/web/src/`

### Building for Production

```bash
npm run build
```

## 📝 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
