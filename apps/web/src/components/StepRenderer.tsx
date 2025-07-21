import { ProjectBasicsStep } from './steps/ProjectBasicsStep';
import { TechnicalDetailsStep } from './steps/TechnicalDetailsStep';
import { DevelopmentStep } from './steps/DevelopmentStep';
import { ReviewStep } from './steps/ReviewStep';
import type { PlaceholderExample } from '@/constants/placeholders';
import type { SectionsConfig } from '@/lib/schemas';
import { useDynamicSteps } from '@/hooks/useDynamicSteps';

interface StepRendererProps {
  currentStep: number;
  placeholders: PlaceholderExample | null;
  sectionsConfig: SectionsConfig;
}

export const StepRenderer = ({ currentStep, placeholders, sectionsConfig }: StepRendererProps) => {
  const { steps: dynamicSteps } = useDynamicSteps(sectionsConfig);

  // Get the current step configuration
  const currentStepConfig = dynamicSteps[currentStep - 1];

  if (!currentStepConfig) {
    return null;
  }

  // Render step based on dynamic configuration
  switch (currentStepConfig.id) {
    case 'basics':
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>{currentStepConfig.title}</h3>
            <p className='text-sm text-muted-foreground'>{currentStepConfig.description}</p>
          </div>
          <ProjectBasicsStep placeholders={placeholders} />
        </div>
      );
    case 'technical':
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>{currentStepConfig.title}</h3>
            <p className='text-sm text-muted-foreground'>{currentStepConfig.description}</p>
          </div>
          <TechnicalDetailsStep placeholders={placeholders} sectionsConfig={sectionsConfig} />
        </div>
      );
    case 'development':
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>{currentStepConfig.title}</h3>
            <p className='text-sm text-muted-foreground'>{currentStepConfig.description}</p>
          </div>
          <DevelopmentStep placeholders={placeholders} sectionsConfig={sectionsConfig} />
        </div>
      );
    case 'review':
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>{currentStepConfig.title}</h3>
            <p className='text-sm text-muted-foreground'>{currentStepConfig.description}</p>
          </div>
          <ReviewStep sectionsConfig={sectionsConfig} />
        </div>
      );
    default:
      return null;
  }
};
