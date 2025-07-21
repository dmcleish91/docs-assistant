import { useState, useEffect } from 'react';
import { API_CONFIG } from '../constants';
import type { DynamicDocumentationFormData } from '@/lib/schemas';
import { handleError, parseApiError, logError } from '@/lib/errorHandling';

interface UseDocumentationGeneratorReturn {
  isLoading: boolean;
  error: string | null;
  downloadUrl: string | null;
  markdownContent: string | null;
  generateDocumentation: (formData: DynamicDocumentationFormData) => Promise<void>;
  clearError: () => void;
  resetState: () => void;
}

export const useDocumentationGenerator = (): UseDocumentationGeneratorReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  const clearError = () => setError(null);

  const cleanupPreviousUrl = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  const resetState = () => {
    setError(null);
    cleanupPreviousUrl();
    setDownloadUrl(null);
    setMarkdownContent(null);
  };

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const generateDocumentation = async (formData: DynamicDocumentationFormData) => {
    setError(null);
    setIsLoading(true);

    try {
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
        const errorResponse = await parseApiError(res);
        throw new Error(errorResponse.message);
      }

      const blob = await res.blob();

      cleanupPreviousUrl();

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);

      const text = await blob.text();
      setMarkdownContent(text);
    } catch (error) {
      const errorResponse = handleError(error, 'documentation-generation');
      setError(errorResponse.userMessage);
      logError(errorResponse, 'DocumentationGenerator');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    downloadUrl,
    markdownContent,
    generateDocumentation,
    clearError,
    resetState,
  };
};
