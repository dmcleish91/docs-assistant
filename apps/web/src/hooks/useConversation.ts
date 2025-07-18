import { useState } from 'react';
import { API_CONFIG, UI_CONSTANTS } from '../constants';

interface ConversationMessage {
  id: string;
  questions: string;
  userResponse?: string;
  timestamp: Date;
}

interface UseConversationReturn {
  messages: ConversationMessage[];
  currentTopic: string | null;
  isLoading: boolean;
  error: string | null;
  startConversation: (topic: string) => Promise<void>;
  sendResponse: (response: string) => Promise<void>;
  downloadReadme: () => Promise<void>;
  clearError: () => void;
  resetConversation: () => void;
}

export const useConversation = (): UseConversationReturn => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const resetConversation = () => {
    setMessages([]);
    setCurrentTopic(null);
    setError(null);
  };

  const startConversation = async (topic: string) => {
    setError(null);
    setIsLoading(true);
    setCurrentTopic(topic);

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
        const errorText = await res.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `Server error (${res.status})` };
        }
        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', responseText);
        throw new Error('Invalid response format from server');
      }

      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        questions: data.questions,
        timestamp: new Date(),
      };

      setMessages([newMessage]);
    } catch (error) {
      let errorMessage: string = UI_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.TIMEOUT_ERROR;
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      console.error('Error starting conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendResponse = async (response: string) => {
    if (!currentTopic || messages.length === 0) return;

    setError(null);
    setIsLoading(true);

    try {
      const lastMessage = messages[messages.length - 1];
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FOLLOW_UP}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentTopic,
          previousQuestions: lastMessage.questions,
          userResponse: response,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || `Server error (${res.status})` };
        }
        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', responseText);
        throw new Error('Invalid response format from server');
      }

      // Update the last message with user's response
      const updatedMessages = messages.map((msg, index) => (index === messages.length - 1 ? { ...msg, userResponse: response } : msg));

      // Add new message with follow-up questions
      const newMessage: ConversationMessage = {
        id: Date.now().toString(),
        questions: data.questions,
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, newMessage]);
    } catch (error) {
      let errorMessage: string = UI_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.TIMEOUT_ERROR;
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      console.error('Error sending response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReadme = async () => {
    if (!currentTopic || messages.length === 0) return;

    setError(null);
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter((msg) => msg.userResponse) // Only include messages with responses
        .map((msg) => ({
          questions: msg.questions,
          userResponse: msg.userResponse!,
        }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOWNLOAD_README}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentTopic,
          conversationHistory,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error (${res.status})`);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      let errorMessage: string = UI_CONSTANTS.ERROR_MESSAGES.UNKNOWN_ERROR;

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.TIMEOUT_ERROR;
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = UI_CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      console.error('Error downloading README:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    currentTopic,
    isLoading,
    error,
    startConversation,
    sendResponse,
    downloadReadme,
    clearError,
    resetConversation,
  };
};
