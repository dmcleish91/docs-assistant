// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8787',
  ENDPOINTS: {
    GENERATE_DOCUMENTATION: '/generate-documentation',
  },
  TIMEOUT: 30000, // 30 seconds
} as const;

// Form Validation
export const FORM_VALIDATION = {
  MIN_PROJECT_NAME_LENGTH: 3,
  MAX_PROJECT_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_SETUP_STEPS_LENGTH: 10,
  MAX_SETUP_STEPS_LENGTH: 2000,
  MIN_LOCAL_DEV_LENGTH: 10,
  MAX_LOCAL_DEV_LENGTH: 1000,
  MIN_DEPLOYMENT_LENGTH: 10,
  MAX_DEPLOYMENT_LENGTH: 1000,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  LOADING_TEXT: 'Generating documentation...',
  SUBMIT_TEXT: 'Generate Documentation',
  SUCCESS_TEXT: 'Documentation Generated Successfully!',
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    VALIDATION: {
      PROJECT_NAME_REQUIRED: 'Project name is required',
      PROJECT_NAME_MIN_LENGTH: 'Project name must be at least 3 characters long',
      PROJECT_NAME_MAX_LENGTH: 'Project name must be less than 100 characters',
      DESCRIPTION_REQUIRED: 'Project description is required',
      DESCRIPTION_MIN_LENGTH: 'Description must be at least 20 characters long',
      DESCRIPTION_MAX_LENGTH: 'Description must be less than 1000 characters',
      SETUP_STEPS_REQUIRED: 'Setup steps are required',
      SETUP_STEPS_MIN_LENGTH: 'Setup steps must be at least 10 characters long',
      SETUP_STEPS_MAX_LENGTH: 'Setup steps must be less than 2000 characters',
      LOCAL_DEV_REQUIRED: 'Local development server instructions are required',
      LOCAL_DEV_MIN_LENGTH: 'Local development instructions must be at least 10 characters long',
      LOCAL_DEV_MAX_LENGTH: 'Local development instructions must be less than 1000 characters',
      DEPLOYMENT_REQUIRED: 'Deployment instructions are required',
      DEPLOYMENT_MIN_LENGTH: 'Deployment instructions must be at least 10 characters long',
      DEPLOYMENT_MAX_LENGTH: 'Deployment instructions must be less than 1000 characters',
    },
  },
} as const;
