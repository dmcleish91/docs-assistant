export interface PlaceholderExample {
  projectName: string;
  description: string;
  prerequisites: string;
  environmentalSetup: string;
  localDevServer: string;
  deploymentInfo: string;
  testing: string;
  additionalInformation: string;
}

export const PLACEHOLDER_EXAMPLES: PlaceholderExample[] = [
  {
    projectName: 'Documentation Assistant',
    description:
      'This is an AI-powered tool that generates comprehensive markdown documentation (specifically README.md files) using LangChain.js, Hono, and React. It provides a user-friendly web interface where developers can input project information and receive professionally formatted documentation.',
    prerequisites: 'The project requires Node.js 18+, npm or yarn package manager, and an OpenAI API key to function properly.',
    environmentalSetup:
      'The project uses a monorepo structure with Turbo and requires setting up environment variables, specifically creating an apps/api/.env file with the OpenAI API key. Dependencies are installed using npm install at the root level.',
    localDevServer:
      'The development environment runs on two ports - the frontend React application on http://localhost:5173 and the backend Hono API server on http://localhost:8787, both started simultaneously with npm run dev.',
    deploymentInfo:
      'The project uses Turbo for building both the frontend and backend applications, with the build process initiated by running npm run build at the root level.',
    testing:
      'Run the test suite with npm test. The project uses Vitest for unit testing the React components and API endpoints. Integration tests are run with npm run test:integration. Coverage reports are generated with npm run test:coverage. E2E tests use Playwright and can be run with npm run test:e2e. The test suite includes mocking of OpenAI API calls and validation of generated documentation formats.',
    additionalInformation:
      'This project is open source and contributions are welcome! Please read our contributing guidelines in CONTRIBUTING.md before submitting a pull request. For bug reports and feature requests, please use the GitHub issues page. The project is licensed under MIT License. For questions and support, join our Discord community or email us at support@docs-assistant.com. Performance tips: Use environment variables for API keys and consider rate limiting for production deployments.',
  },
  {
    projectName: 'Task Management API',
    description:
      'A RESTful API built with Express.js and MongoDB for managing tasks and projects. Features include user authentication, task creation and assignment, project organization, and real-time notifications.',
    prerequisites: 'Node.js 16+, MongoDB 5.0+, npm or yarn package manager, and a MongoDB Atlas account for cloud database hosting.',
    environmentalSetup:
      'Clone the repository and run npm install to install dependencies. Create a .env file with your MongoDB connection string, JWT secret, and other environment variables. Ensure MongoDB is running locally or configure connection to MongoDB Atlas.',
    localDevServer:
      'Start the development server with npm run dev. The API will be available at http://localhost:3000. Use npm run test to run the test suite. The server includes hot reloading for development.',
    deploymentInfo:
      'Deploy to production using npm run build to create optimized build. Set up environment variables on your hosting platform. The application can be deployed to platforms like Heroku, Railway, or AWS using the provided Docker configuration.',
    testing:
      'Run the complete test suite with npm test. Unit tests use Jest and cover all API endpoints, middleware, and utility functions. Integration tests use Supertest to test the full request-response cycle. Database tests use a separate test database with automatic cleanup. Coverage reports are generated with npm run test:coverage. API documentation tests ensure all endpoints are properly documented. Performance tests can be run with npm run test:performance.',
    additionalInformation:
      'For troubleshooting, check the application logs in the console. Common issues include MongoDB connection timeouts and JWT token expiration. The API documentation is available at /api-docs when running in development mode. Rate limiting is enabled by default (100 requests per minute per IP). For production deployments, ensure you have proper SSL certificates and database backups configured. Contact the development team at dev@taskmanager.com for enterprise support.',
  },
  {
    projectName: 'E-commerce Dashboard',
    description:
      'A modern React dashboard for e-commerce analytics and management. Built with TypeScript, Tailwind CSS, and Chart.js. Provides real-time sales data, inventory management, customer analytics, and order processing capabilities.',
    prerequisites:
      'Node.js 18+, npm or yarn package manager, and a modern web browser. Optional: PostgreSQL database for data persistence and Redis for caching.',
    environmentalSetup:
      'Install dependencies with npm install. Set up environment variables in .env.local file including API endpoints and database connections. Configure Tailwind CSS and ensure all required fonts are available.',
    localDevServer:
      'Run npm run dev to start the development server on http://localhost:5173. The application includes hot module replacement and TypeScript compilation. Use npm run build for production builds.',
    deploymentInfo:
      'Build the application with npm run build and deploy the dist folder to your hosting provider. Configure environment variables for production. The app can be deployed to Vercel, Netlify, or any static hosting service.',
    testing:
      'Run the test suite with npm test. Unit tests use Vitest and React Testing Library for component testing. Component tests cover all UI interactions, form validations, and state management. E2E tests use Playwright and simulate real user workflows including checkout processes and admin panel operations. Visual regression tests ensure UI consistency across different screen sizes. Performance tests measure bundle size and loading times. Test coverage must be above 80% for all new features.',
    additionalInformation:
      'The dashboard supports dark mode and is fully responsive across all devices. For custom themes, modify the Tailwind configuration in tailwind.config.js. Performance monitoring is available through the built-in analytics panel. The application uses React Query for efficient data fetching and caching. For enterprise customers, we offer custom integrations with popular e-commerce platforms like Shopify and WooCommerce. Contact our sales team at sales@ecommercedashboard.com for pricing and demo requests. The dashboard is optimized for accessibility and follows WCAG 2.1 guidelines.',
  },
];

export const getRandomPlaceholder = (): PlaceholderExample => {
  const randomIndex = Math.floor(Math.random() * PLACEHOLDER_EXAMPLES.length);
  return PLACEHOLDER_EXAMPLES[randomIndex];
};
