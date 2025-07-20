import { Button } from '@/components/ui/button';
import { LoadingButton } from './LoadingButton';
import { UI_CONSTANTS } from '../constants';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export const StepNavigation = ({ currentStep, totalSteps, onNext, onPrev, isLoading }: StepNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className='flex gap-2 pt-6'>
      <Button type='button' variant='outline' onClick={onPrev} disabled={isFirstStep || isLoading} className='flex-1'>
        Previous
      </Button>
      <LoadingButton type='button' loading={isLoading} disabled={isLoading} onClick={onNext} className='flex-1'>
        {isLastStep ? UI_CONSTANTS.SUBMIT_TEXT : 'Next'}
      </LoadingButton>
    </div>
  );
};
