import { useState } from 'react';
import { LoadingButton } from './LoadingButton';
import { FORM_VALIDATION, UI_CONSTANTS } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface DocumentationFormProps {
  onSubmit: (topic: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onErrorDismiss: () => void;
}

interface FormErrors {
  topic?: string;
}

export const DocumentationForm = ({ onSubmit, isLoading, error, onErrorDismiss }: DocumentationFormProps) => {
  const [input, setInput] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!input.trim()) {
      newErrors.topic = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.REQUIRED;
    } else if (input.trim().length < FORM_VALIDATION.MIN_TOPIC_LENGTH) {
      newErrors.topic = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.MIN_LENGTH;
    } else if (input.trim().length > FORM_VALIDATION.MAX_TOPIC_LENGTH) {
      newErrors.topic = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.MAX_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(input.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Clear error when user starts typing
    if (errors.topic && value.trim().length >= FORM_VALIDATION.MIN_TOPIC_LENGTH) {
      setErrors((prev) => ({ ...prev, topic: undefined }));
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
      <CardHeader>
        <CardTitle className='text-center'>Documentation Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6' noValidate>
          <div className='space-y-2'>
            <Label htmlFor='topic' className='text-base text-red-400 font-semibold'>
              What would you like documentation for?
              <span className='text-red-400 font-bold ml-1' aria-label='required'>
                *
              </span>
            </Label>
            <Textarea
              id='topic'
              name='topic'
              value={input}
              onChange={handleInputChange}
              placeholder='e.g., API for note-taking app, React component library, Database schema...'
              rows={3}
              required
              disabled={isLoading}
              aria-describedby={errors.topic ? 'topic-error' : 'topic-help'}
              aria-invalid={!!errors.topic}
              maxLength={FORM_VALIDATION.MAX_TOPIC_LENGTH}
              className={cn('min-h-[120px] transition-all duration-300', errors.topic && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.topic && (
              <div id='topic-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.topic}
              </div>
            )}
            <div id='topic-help' className='text-sm text-muted-foreground mt-2 leading-relaxed'>
              Describe what you need documentation for. Be specific for better results.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {input.length}/{FORM_VALIDATION.MAX_TOPIC_LENGTH} characters
            </div>
          </div>

          <LoadingButton
            loading={isLoading}
            disabled={!input.trim()}
            loadingText={UI_CONSTANTS.LOADING_TEXT}
            type='submit'
            className='w-full'>
            {UI_CONSTANTS.SUBMIT_TEXT}
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
};
