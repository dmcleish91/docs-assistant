export type ErrorType = 'NETWORK_ERROR' | 'TIMEOUT_ERROR' | 'VALIDATION_ERROR' | 'API_ERROR' | 'UNKNOWN_ERROR';

export interface ErrorResponse {
  type: ErrorType;
  message: string;
  userMessage: string;
  statusCode?: number;
  details?: unknown;
  timestamp: Date;
}

export interface ApiError {
  error: string;
  details?: unknown;
  statusCode?: number;
}

const ERROR_MESSAGES: Record<ErrorType, string> = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  API_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

/**
 * Classifies an error based on its type and message
 */
export function classifyError(error: unknown): ErrorType {
  if (error instanceof Error) {
    if (error.name === 'AbortError') return 'TIMEOUT_ERROR';
    if (error.message.includes('Failed to fetch')) return 'NETWORK_ERROR';
    if (error.message.toLowerCase().includes('validation')) return 'VALIDATION_ERROR';
    if (error.message.includes('Server error')) return 'API_ERROR';
  }
  return 'UNKNOWN_ERROR';
}

function getUserFriendlyMessage(type: ErrorType): string {
  return ERROR_MESSAGES[type];
}

/**
 * Main error handler that processes any error and returns a structured response
 */
export function handleError(error: unknown, context?: string): ErrorResponse {
  const errorType = classifyError(error);
  const timestamp = new Date();

  let message = 'Unknown error occurred';
  const details: unknown = error;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  const userMessage = getUserFriendlyMessage(errorType);

  if (context) {
    logError(
      {
        type: errorType,
        message,
        userMessage,
        details,
        timestamp,
      },
      context
    );
  }

  return {
    type: errorType,
    message,
    userMessage,
    details,
    timestamp,
  };
}

/**
 * Parses API error responses and converts them to structured error responses
 */
export async function parseApiError(response: Response): Promise<ErrorResponse> {
  const errorText = await response.text();
  let errorData: ApiError;

  try {
    errorData = JSON.parse(errorText);
  } catch {
    errorData = {
      error: errorText || `Server error (${response.status})`,
      statusCode: response.status,
    };
  }

  const errorResponse = handleError(new Error(errorData.error), 'API');
  errorResponse.statusCode = errorData.statusCode || response.status;

  return errorResponse;
}

/**
 * Logs errors with context for debugging and monitoring
 */
export function logError(errorResponse: ErrorResponse, context?: string) {
  console.error(`[${context || 'App'}] Error:`, {
    type: errorResponse.type,
    message: errorResponse.message,
    userMessage: errorResponse.userMessage,
    statusCode: errorResponse.statusCode,
    timestamp: errorResponse.timestamp,
    details: errorResponse.details,
  });
}
