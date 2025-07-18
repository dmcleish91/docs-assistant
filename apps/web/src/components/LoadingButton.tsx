interface LoadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

export const LoadingButton = ({
  loading,
  disabled = false,
  children,
  loadingText = 'Loading...',
  type = 'button',
  onClick,
  className = 'submit-btn',
}: LoadingButtonProps) => (
  <button type={type} disabled={loading || disabled} className={className} onClick={onClick} aria-busy={loading} aria-live='polite'>
    {loading ? loadingText : children}
  </button>
);
