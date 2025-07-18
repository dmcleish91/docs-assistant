// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8787',
  ENDPOINTS: {
    GENERATE: '/generate',
    FOLLOW_UP: '/generate/follow-up',
    DOWNLOAD_README: '/generate/download-readme',
  },
  TIMEOUT: 30000, // 30 seconds
} as const;

// Form Validation
export const FORM_VALIDATION = {
  MIN_TOPIC_LENGTH: 10,
  MAX_TOPIC_LENGTH: 500,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  LOADING_TEXT: 'Starting conversation...',
  SUBMIT_TEXT: 'Start Conversation',
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    VALIDATION: {
      REQUIRED: 'Please enter a topic for documentation',
      MIN_LENGTH: 'Topic must be at least 10 characters long',
      MAX_LENGTH: 'Topic must be less than 500 characters',
    },
  },
} as const;
