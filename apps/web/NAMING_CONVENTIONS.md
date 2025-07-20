# Naming Conventions

This document establishes consistent naming conventions for the docs-assistant project.

## General Principles

- Use descriptive, meaningful names
- Be consistent across the entire codebase
- Follow TypeScript/JavaScript community standards
- Prioritize readability and maintainability

## Component Naming

### React Components

- **File names**: PascalCase (e.g., `MultiStepForm.tsx`, `StepNavigation.tsx`)
- **Component names**: PascalCase (e.g., `MultiStepForm`, `StepNavigation`)
- **Props interfaces**: PascalCase with "Props" suffix (e.g., `MultiStepFormProps`, `StepNavigationProps`)

### Component Files Structure

```
components/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Tests
└── ComponentName.stories.tsx  # Storybook stories
```

## Function Naming

### React Hooks

- **Custom hooks**: camelCase with "use" prefix (e.g., `useDocumentationGenerator`)
- **Hook return interfaces**: PascalCase with "Return" suffix (e.g., `UseDocumentationGeneratorReturn`)

### Regular Functions

- **Function names**: camelCase (e.g., `handleSubmit`, `generateDocumentation`)
- **Utility functions**: camelCase (e.g., `parseApiError`, `handleError`)
- **Event handlers**: camelCase with "handle" prefix (e.g., `handleClick`, `handleSubmit`)

### Function Declaration Style

- **React components**: Arrow functions with explicit return type
- **Hooks**: Arrow functions
- **Utility functions**: Function declarations for better hoisting
- **Event handlers**: Arrow functions

## Variable Naming

### Constants

- **Global constants**: UPPER_SNAKE_CASE (e.g., `API_CONFIG`, `UI_CONSTANTS`)
- **Local constants**: camelCase (e.g., `currentStep`, `isLoading`)

### Variables

- **All variables**: camelCase (e.g., `formData`, `downloadUrl`, `errorMessage`)
- **Boolean variables**: camelCase with descriptive names (e.g., `isLoading`, `isValid`, `hasError`)

## Type and Interface Naming

### Interfaces

- **Component props**: PascalCase with "Props" suffix (e.g., `MultiStepFormProps`)
- **Hook returns**: PascalCase with "Return" suffix (e.g., `UseDocumentationGeneratorReturn`)
- **API responses**: PascalCase (e.g., `ErrorResponse`, `ApiError`)
- **Configuration**: PascalCase (e.g., `StepConfig`)

### Types

- **Union types**: PascalCase (e.g., `ErrorType`)
- **Inferred types**: PascalCase (e.g., `DocumentationFormData`)
- **Generic types**: PascalCase (e.g., `ClassValue`)

## File and Directory Naming

### Directories

- **Component directories**: kebab-case (e.g., `multi-step-form/`)
- **Feature directories**: kebab-case (e.g., `documentation-generator/`)
- **Utility directories**: camelCase (e.g., `lib/`, `hooks/`)

### Files

- **Component files**: PascalCase (e.g., `MultiStepForm.tsx`)
- **Utility files**: camelCase (e.g., `errorHandling.ts`, `utils.ts`)
- **Configuration files**: kebab-case (e.g., `step-config.ts`)
- **Type definition files**: camelCase with `.d.ts` extension

## Import/Export Naming

### Named Exports

- **Components**: PascalCase (e.g., `export const MultiStepForm`)
- **Hooks**: camelCase (e.g., `export const useDocumentationGenerator`)
- **Utilities**: camelCase (e.g., `export function handleError`)
- **Types/Interfaces**: PascalCase (e.g., `export interface ErrorResponse`)

### Default Exports

- **Main components**: PascalCase (e.g., `export default function App`)
- **Page components**: PascalCase
- **Avoid default exports for utilities and hooks**

## CSS Class Naming

### Tailwind Classes

- Use Tailwind's utility classes directly
- Group related classes logically
- Use consistent spacing and ordering

### Custom CSS Classes

- Use kebab-case for custom CSS classes
- Use BEM methodology when appropriate

## Environment Variables

### Naming

- **All environment variables**: UPPER_SNAKE_CASE (e.g., `VITE_API_BASE_URL`)
- **Vite environment variables**: Prefixed with `VITE_`

### Validation

- Use Zod schemas for environment variable validation
- Provide clear error messages for missing variables

## Error Handling

### Error Types

- **Error types**: UPPER_SNAKE_CASE (e.g., `NETWORK_ERROR`, `VALIDATION_ERROR`)
- **Error messages**: Sentence case with clear, actionable text

### Error Functions

- **Error handlers**: camelCase (e.g., `handleError`, `parseApiError`)
- **Error logging**: camelCase (e.g., `logError`)

## API and Data

### API Endpoints

- **Endpoint constants**: UPPER_SNAKE_CASE (e.g., `GENERATE_DOCUMENTATION`)
- **API configuration**: PascalCase (e.g., `API_CONFIG`)

### Data Models

- **Form data types**: PascalCase with "FormData" suffix (e.g., `DocumentationFormData`)
- **Schema names**: camelCase with "Schema" suffix (e.g., `documentationFormSchema`)

## Examples

### Good Examples

```typescript
// Component
export const MultiStepForm = ({ onSubmit, isLoading }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const handleSubmit = async (formData: DocumentationFormData) => {
    // implementation
  };
};

// Hook
export const useDocumentationGenerator = (): UseDocumentationGeneratorReturn => {
  // implementation
};

// Utility
export function handleError(error: unknown, context?: string): ErrorResponse {
  // implementation
}

// Constants
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL,
  TIMEOUT: 30000,
} as const;
```

### Bad Examples

```typescript
// Inconsistent naming
export const multistepform = ({ onSubmit, isLoading }: multistepformprops) => {
  const [current_step, setCurrentStep] = useState(1);
  const handle_submit = async (form_data: documentationformdata) => {
    // implementation
  };
};
```

## Enforcement

- Use ESLint rules to enforce naming conventions
- Configure TypeScript strict mode
- Use Prettier for consistent formatting
- Review code changes for naming consistency
- Update this document when conventions evolve
