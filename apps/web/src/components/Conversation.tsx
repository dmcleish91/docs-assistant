import { useState } from 'react';
import { LoadingButton } from './LoadingButton';
import { UI_CONSTANTS } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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
    <Card className='max-h-[70vh] flex flex-col bg-white/10 backdrop-blur-md border-white/20'>
      <CardHeader className='pb-4 border-b border-white/20'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0'>
          <CardTitle className='text-xl md:text-2xl'>Documentation Assistant</CardTitle>
          <div className='flex items-center gap-4'>
            <Badge variant='secondary' className='text-sm md:text-base'>
              Topic: {currentTopic}
            </Badge>
            <Button onClick={onReset} variant='outline' size='sm' disabled={isLoading}>
              Start Over
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 overflow-y-auto space-y-4 p-6'>
        {messages.map((message, index) => (
          <div key={message.id} className='space-y-3'>
            {/* AI Questions */}
            <Card className='bg-muted/50'>
              <CardContent className='p-4'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-medium text-sm'>🤖 Assistant</span>
                  <span className='text-xs text-muted-foreground'>{formatTime(message.timestamp)}</span>
                </div>
                <div className='space-y-1'>
                  {message.questions.split('\n').map((line, i) => (
                    <p key={i} className='m-0 text-sm'>
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Response (if exists) */}
            {message.userResponse && (
              <Card className='bg-primary/20'>
                <CardContent className='p-4'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-sm'>👤 You</span>
                    <span className='text-xs text-muted-foreground'>{formatTime(message.timestamp)}</span>
                  </div>
                  <div className='space-y-1'>
                    {message.userResponse.split('\n').map((line, i) => (
                      <p key={i} className='m-0 text-sm'>
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        {isLoading && (
          <Card className='bg-muted/50'>
            <CardContent className='p-4'>
              <div className='flex justify-between items-center mb-2'>
                <span className='font-medium text-sm'>🤖 Assistant</span>
              </div>
              <div className='flex space-x-1'>
                <span className='w-2 h-2 bg-muted-foreground rounded-full animate-[typing_1.4s_ease-in-out_infinite]'></span>
                <span className='w-2 h-2 bg-muted-foreground rounded-full animate-[typing_1.4s_ease-in-out_infinite_0.2s]'></span>
                <span className='w-2 h-2 bg-muted-foreground rounded-full animate-[typing_1.4s_ease-in-out_infinite_0.4s]'></span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>

      {/* Response Input */}
      {messages.length > 0 && !isLoading && (
        <CardContent className='border-t border-border/50 p-6'>
          <div className='space-y-4'>
            <Textarea
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Type your response here...'
              rows={3}
              disabled={isLoading}
              className='min-h-[120px]'
            />
            <div className='flex flex-col md:flex-row gap-3 md:gap-4'>
              <LoadingButton
                loading={isLoading}
                disabled={!currentResponse.trim() || isLoading}
                loadingText='Sending...'
                onClick={handleSendResponse}
                className='flex-1'>
                Send Message
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                disabled={isLoading}
                loadingText='Generating...'
                onClick={onDownloadReadme}
                variant='outline'
                className='flex-1'>
                Generate Documentation
              </LoadingButton>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
