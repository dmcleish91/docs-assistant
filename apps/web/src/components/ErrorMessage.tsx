interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

export const ErrorMessage = ({ error, onDismiss }: ErrorMessageProps) => (
  <div className='error-message' role='alert' aria-live='polite'>
    <div className='error-content'>
      <span className='error-icon'>⚠️</span>
      <span className='error-text'>{error}</span>
      <button onClick={onDismiss} className='error-dismiss' aria-label='Dismiss error'>
        ×
      </button>
    </div>
  </div>
);
