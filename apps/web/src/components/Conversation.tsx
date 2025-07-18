import { useState } from 'react';
import { LoadingButton } from './LoadingButton';
import { UI_CONSTANTS } from '../constants';

interface ConversationMessage {
  id: string;
  questions: string;
  userResponse?: string;
  timestamp: Date;
}

interface ConversationProps {
  messages: ConversationMessage[];
  currentTopic: string;
  isLoading: boolean;
  onSendResponse: (response: string) => Promise<void>;
  onDownloadReadme: () => Promise<void>;
  onReset: () => void;
}

export const Conversation = ({ messages, currentTopic, isLoading, onSendResponse, onDownloadReadme, onReset }: ConversationProps) => {
  const [currentResponse, setCurrentResponse] = useState('');

  const handleSendResponse = async () => {
    if (!currentResponse.trim() || isLoading) return;
    const response = currentResponse.trim();
    setCurrentResponse('');
    await onSendResponse(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendResponse();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='conversation'>
      <div className='conversation-header'>
        <h3>Documentation Assistant</h3>
        <p className='topic'>Topic: {currentTopic}</p>
        <button onClick={onReset} className='reset-button' disabled={isLoading}>
          Start Over
        </button>
      </div>

      <div className='messages-container'>
        {messages.map((message, index) => (
          <div key={message.id} className='message-group'>
            {/* AI Questions */}
            <div className='message ai-message'>
              <div className='message-header'>
                <span className='sender'>🤖 Assistant</span>
                <span className='time'>{formatTime(message.timestamp)}</span>
              </div>
              <div className='message-content'>
                {message.questions.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* User Response (if exists) */}
            {message.userResponse && (
              <div className='message user-message'>
                <div className='message-header'>
                  <span className='sender'>👤 You</span>
                  <span className='time'>{formatTime(message.timestamp)}</span>
                </div>
                <div className='message-content'>
                  {message.userResponse.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className='message ai-message'>
            <div className='message-header'>
              <span className='sender'>🤖 Assistant</span>
            </div>
            <div className='message-content'>
              <div className='typing-indicator'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Response Input */}
      {messages.length > 0 && !isLoading && (
        <div className='response-input'>
          <textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type your response here...'
            rows={3}
            disabled={isLoading}
          />
          <div className='input-actions'>
            <LoadingButton
              loading={isLoading}
              disabled={!currentResponse.trim() || isLoading}
              loadingText='Sending...'
              onClick={handleSendResponse}>
              Send Message
            </LoadingButton>
            <LoadingButton
              loading={isLoading}
              disabled={isLoading}
              loadingText='Generating...'
              onClick={onDownloadReadme}
              className='secondary-btn'>
              Generate Documentation
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
};
