import { ProjectBasicsStep } from './steps/ProjectBasicsStep';
import { TechnicalDetailsStep } from './steps/TechnicalDetailsStep';
import { DevelopmentStep } from './steps/DevelopmentStep';
import { ReviewStep } from './steps/ReviewStep';

interface StepRendererProps {
  currentStep: number;
}

export const StepRenderer = ({ currentStep }: StepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>Project Basics</h3>
            <p className='text-sm text-muted-foreground'>Enter your project information</p>
          </div>
          <ProjectBasicsStep />
        </div>
      );
    case 2:
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>Technical Details</h3>
            <p className='text-sm text-muted-foreground'>Setup and prerequisites</p>
          </div>
          <TechnicalDetailsStep />
        </div>
      );
    case 3:
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>Development & Deployment</h3>
            <p className='text-sm text-muted-foreground'>Local dev and production setup</p>
          </div>
          <DevelopmentStep />
        </div>
      );
    case 4:
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>Review & Submit</h3>
            <p className='text-sm text-muted-foreground'>Final review before generation</p>
          </div>
          <ReviewStep />
        </div>
      );
    default:
      return null;
  }
};
