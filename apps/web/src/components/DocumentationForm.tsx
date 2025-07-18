import { useState } from 'react';
import { LoadingButton } from './LoadingButton';
import { FORM_VALIDATION, UI_CONSTANTS } from '../constants';

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
    <form onSubmit={handleSubmit} className='doc-form' noValidate>
      <div className='form-group'>
        <label htmlFor='topic'>
          What would you like documentation for?
          <span className='required' aria-label='required'>
            {' '}
            *
          </span>
        </label>
        <textarea
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
        />
        {errors.topic && (
          <div id='topic-error' className='error-text' role='alert'>
            {errors.topic}
          </div>
        )}
        <div id='topic-help' className='help-text'>
          Describe what you need documentation for. Be specific for better results.
        </div>
        <div className='character-count'>
          {input.length}/{FORM_VALIDATION.MAX_TOPIC_LENGTH} characters
        </div>
      </div>

      <LoadingButton loading={isLoading} disabled={!input.trim()} loadingText={UI_CONSTANTS.LOADING_TEXT} type='submit'>
        {UI_CONSTANTS.SUBMIT_TEXT}
      </LoadingButton>
    </form>
  );
};
