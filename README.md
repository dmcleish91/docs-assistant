# 🛠️ Readme Forge

> AI-powered tool that generates professional README.md files through natural language input

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-blue)](CONTRIBUTING.md)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Development](#development)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [Development Tools](#development-tools)
- [Production](#production)
- [Contributing](#contributing)
- [License](#license)

## Overview

Readme Forge transforms project descriptions into polished documentation using AI. Built with modern web technologies and a monorepo architecture for scalable development.

## Features

- **Natural Language Input** - Describe your project in plain English
- **AI-Generated Documentation** - High-quality markdown output powered by LangChain.js
- **Modern Stack** - React frontend with Hono API backend
- **Monorepo Structure** - Organized workspace using Turborepo

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- OpenAI API key

### Installation

```bash
git clone https://github.com/yourname/readme-forge.git
cd readme-forge
npm install
```

### Configuration

Create `.env` in `apps/api/`:

```env
OPENAI_API_KEY=your-api-key-here
```

Create `.env` in `apps/web/`:

```env
VITE_API_BASE_URL=http://localhost:8787 //replace for production deployment
VITE_API_TIMEOUT=30000
```

### Development

```bash
npm run dev
```

**Services:**

- Frontend: http://localhost:5173
- API: http://localhost:8787

## Architecture

```
readme-forge/
├── apps/
│   ├── api/          # Hono API with LangChain.js
│   └── web/          # React frontend
├── turbo.json        # Turborepo configuration
└── package.json      # Workspace scripts
```

## Technology

### Backend

- **Hono** - Fast web framework
- **LangChain.js** - AI orchestration and OpenAI integration
- **Zod** - Runtime type validation
- **dotenv** - Environment variable management

### Frontend

- **React + Vite** - Modern development experience
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form state management
- **Radix UI** - Accessible component primitives
- **Lucide React** - Consistent iconography

### Development Tools

- **Turborepo** - Monorepo build orchestration
- **ESLint** - Code quality and consistency

## Production

Build for production:

```bash
npm run build
```

This creates optimized builds for both frontend and backend applications.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License

_Built with ❤️ using modern web technologies_
