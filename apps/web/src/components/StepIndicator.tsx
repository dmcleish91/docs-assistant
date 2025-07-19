import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className='w-full space-y-4'>
      {/* Progress Bar */}
      <div className='space-y-2'>
        <div className='flex justify-between text-sm text-muted-foreground'>
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className='h-2' />
      </div>

      {/* Step Titles */}
      <div className='flex justify-between'>
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col items-center space-y-1 text-center',
              index < currentStep - 1 && 'text-primary',
              index === currentStep - 1 && 'text-primary font-medium',
              index > currentStep - 1 && 'text-muted-foreground'
            )}>
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2',
                index < currentStep - 1 && 'bg-primary text-primary-foreground border-primary',
                index === currentStep - 1 && 'bg-primary text-primary-foreground border-primary',
                index > currentStep - 1 && 'bg-background text-muted-foreground border-muted'
              )}>
              {index < currentStep - 1 ? '✓' : index + 1}
            </div>
            <div className='text-xs max-w-20'>
              <div className='font-medium'>{step.title}</div>
              <div className='text-muted-foreground hidden sm:block'>{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
