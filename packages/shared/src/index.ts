// Shared types and interfaces
export interface DocumentationRequest {
  topic: string;
}

export interface DocumentationResponse {
  content: string;
  filename: string;
}

// Shared constants
export const API_ENDPOINTS = {
  GENERATE: '/generate',
} as const;

export const DEFAULT_FILENAME = 'documentation.md';

// Shared utilities
export const formatFilename = (topic: string): string => {
  return `${topic.toLowerCase().replace(/\s+/g, '-')}-documentation.md`;
};
