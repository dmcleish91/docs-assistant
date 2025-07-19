import { useState, useEffect } from 'react';
import { API_CONFIG, UI_CONSTANTS } from '../constants';

interface DocumentationFormData {
  projectName: string;
  description: string;
  environmentalSetup: string;
  localDevServer: string;
  deploymentInfo: string;
}

interface UseDocumentationGeneratorReturn {
  isLoading: boolean;
  error: string | null;
  downloadUrl: string | null;
  generateDocumentation: (formData: DocumentationFormData) => Promise<void>;
  clearError: () => void;
  resetState: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return UI_CONSTANTS.ERROR_MESSAGES.TIMEOUT_ERROR;
    }
    if (error.message.includes('Failed to fetch')) {
      return UI_CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
    }
    return error.message;
  }

  return UI_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;
};

export const useDocumentationGenerator = (): UseDocumentationGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const clearError = () => setError(null);

  const resetState = () => {
    setError(null);
    setDownloadUrl(null);
  };

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const generateDocumentation = async (formData: DocumentationFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      console.log('Sending form data to API:', JSON.stringify(formData, null, 2));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE_DOCUMENTATION}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API error response:', errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `Server error (${res.status})` };
        }

        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      console.error('Error generating documentation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    downloadUrl,
    generateDocumentation,
    clearError,
    resetState,
  };
};
