import { useState } from 'react';
import { API_CONFIG, UI_CONSTANTS } from '../constants';

interface GenerateDocumentationParams {
  topic: string;
}

interface UseDocumentationGeneratorReturn {
  generateDocumentation: (params: GenerateDocumentationParams) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useDocumentationGenerator = (): UseDocumentationGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const generateDocumentation = async ({ topic }: GenerateDocumentationParams) => {
    setError(null);
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.text().catch(() => 'Unknown error');
        throw new Error(`Server error (${res.status}): ${errorData}`);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'documentation.md';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      let errorMessage: string = UI_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.TIMEOUT_ERROR;
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
        } else if (error.message.includes('Server error')) {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      console.error('Error generating documentation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateDocumentation,
    isLoading,
    error,
    clearError,
  };
};
