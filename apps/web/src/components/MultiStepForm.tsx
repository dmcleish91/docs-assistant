import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingButton } from './LoadingButton';
import { StepIndicator } from './StepIndicator';
import { ProjectBasicsStep } from './steps/ProjectBasicsStep';
import { TechnicalDetailsStep } from './steps/TechnicalDetailsStep';
import { DevelopmentStep } from './steps/DevelopmentStep';
import { ReviewStep } from './steps/ReviewStep';
import { UI_CONSTANTS } from '../constants';
import { documentationFormSchema, type DocumentationFormData } from '@/lib/schemas';

interface MultiStepFormProps {
  onSubmit: (formData: DocumentationFormData) => Promise<void>;
  isLoading: boolean;
}

const steps = [
  {
    id: 'basics',
    title: 'Basics',
    description: 'Project Info',
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Setup Details',
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Dev & Deploy',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Final Check',
  },
];

const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLoading,
}: {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}) => {
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

export const MultiStepForm = ({ onSubmit, isLoading }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<DocumentationFormData>({
    resolver: zodResolver(documentationFormSchema),
    defaultValues: {
      projectName: '',
      description: '',
      prerequisites: '',
      environmentalSetup: '',
      localDevServer: '',
      deploymentInfo: '',
    },
    mode: 'onBlur',
  });

  const handleSubmit = async (data: DocumentationFormData) => {
    await onSubmit(data);
  };

  const handleNext = async () => {
    if (currentStep === steps.length) {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        await handleSubmit(data);
      }
    } else {
      const currentStepFields = getStepFields(currentStep);
      const isValid = await form.trigger(currentStepFields);
      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepFields = (step: number): (keyof DocumentationFormData)[] => {
    switch (step) {
      case 1:
        return ['projectName', 'description'];
      case 2:
        return ['prerequisites', 'environmentalSetup'];
      case 3:
        return ['localDevServer', 'deploymentInfo'];
      default:
        return [];
    }
  };

  const renderStep = () => {
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

  return (
    <FormProvider {...form}>
      <Card className='w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />

            <div className='space-y-6'>
              {renderStep()}

              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={handleNext}
                onPrev={handlePrev}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
