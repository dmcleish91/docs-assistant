import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

export const ErrorMessage = ({ error, onDismiss }: ErrorMessageProps) => (
  <div
    className={cn(
      'bg-destructive/90 backdrop-blur-md border border-destructive/30 rounded-lg p-4 mb-6 shadow-lg',
      'animate-[slideIn_0.3s_ease-out]'
    )}
    role='alert'
    aria-live='polite'>
    <div className='flex items-center gap-3'>
      <AlertTriangle className='h-5 w-5 flex-shrink-0 text-destructive-foreground' />
      <span className='flex-1 text-sm leading-relaxed text-destructive-foreground'>{error}</span>
      <Button
        onClick={onDismiss}
        variant='ghost'
        size='sm'
        className='h-auto p-1 text-destructive-foreground hover:bg-destructive/20'
        aria-label='Dismiss error'>
        <X className='h-4 w-4' />
      </Button>
    </div>
  </div>
);
