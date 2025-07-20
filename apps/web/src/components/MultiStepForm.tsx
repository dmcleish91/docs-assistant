import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';
import { StepRenderer } from './StepRenderer';
import { steps } from './steps/step-config';
import { documentationFormSchema, type DocumentationFormData } from '@/lib/schemas';

interface MultiStepFormProps {
  onSubmit: (formData: DocumentationFormData) => Promise<void>;
  isLoading: boolean;
}

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

  return (
    <FormProvider {...form}>
      <Card className='w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />

            <div className='space-y-6'>
              <StepRenderer currentStep={currentStep} />

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
