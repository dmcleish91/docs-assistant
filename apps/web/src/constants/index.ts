import { env } from '@/lib/env';

export const API_CONFIG = {
  BASE_URL: env.VITE_API_BASE_URL,
  ENDPOINTS: {
    GENERATE_DOCUMENTATION: '/generate-documentation',
  },
  TIMEOUT: env.VITE_API_TIMEOUT,
} as const;

export const UI_CONSTANTS = {
  LOADING_TEXT: 'Generating documentation...',
  SUBMIT_TEXT: 'Generate Documentation',
  SUCCESS_TEXT: 'Documentation Generated Successfully!',
} as const;
