import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const LoadingButton = ({
  loading,
  disabled = false,
  children,
  loadingText = 'Loading...',
  type = 'button',
  onClick,
  className,
  variant = 'default',
  size = 'default',
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      disabled={loading || disabled}
      className={cn('w-full', className)}
      onClick={onClick}
      variant={variant}
      size={size}
      aria-busy={loading}
      aria-live='polite'>
      {loading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
