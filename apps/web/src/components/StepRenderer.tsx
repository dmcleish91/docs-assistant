import { ProjectBasicsStep } from './steps/ProjectBasicsStep';
import { TechnicalDetailsStep } from './steps/TechnicalDetailsStep';
import { DevelopmentStep } from './steps/DevelopmentStep';
import { ReviewStep } from './steps/ReviewStep';
import { ConfigurationStep } from './steps/ConfigurationStep';
import { TestingAndAdditionalInfoStep } from './steps/TestingAndAdditionalInfoStep';
import type { PlaceholderExample } from '@/constants/placeholders';
import type { SectionsConfig } from '@/lib/schemas';
import { useDynamicSteps } from '@/hooks/useDynamicSteps';

interface StepRendererProps {
  currentStep: number;
  placeholders: PlaceholderExample | null;
  sectionsConfig: SectionsConfig;
  onConfigChange: (config: SectionsConfig) => void;
  onContinue: () => void;
}

export const StepRenderer = ({ currentStep, placeholders, sectionsConfig, onConfigChange, onContinue }: StepRendererProps) => {
  const { steps: dynamicSteps } = useDynamicSteps(sectionsConfig);

  const currentStepConfig = dynamicSteps[currentStep - 1];

  if (!currentStepConfig) {
    return null;
  }

  switch (currentStepConfig.id) {
    case 'configuration':
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>{currentStepConfig.title}</h3>
            <p className='text-sm text-muted-foreground'>{currentStepConfig.description}</p>
          </div>
          <ConfigurationStep sectionsConfig={sectionsConfig} onConfigChange={onConfigChange} onContinue={onContinue} />
        </div>
      );
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
    case 'testing-and-additional-info':
      return (
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold'>{currentStepConfig.title}</h3>
            <p className='text-sm text-muted-foreground'>{currentStepConfig.description}</p>
          </div>
          <TestingAndAdditionalInfoStep placeholders={placeholders} sectionsConfig={sectionsConfig} />
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
