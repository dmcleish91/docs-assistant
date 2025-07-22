import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';
import { StepRenderer } from './StepRenderer';
import { type DynamicDocumentationFormData, type SectionsConfig, createDynamicSchema } from '@/lib/schemas';
import { usePlaceholders } from '@/hooks/usePlaceholders';
import { useDynamicSteps } from '@/hooks/useDynamicSteps';

interface MultiStepFormProps {
  onSubmit: (formData: DynamicDocumentationFormData) => Promise<void>;
  isLoading: boolean;
  initialSectionsConfig: SectionsConfig;
}

export const MultiStepForm = ({ onSubmit, isLoading, initialSectionsConfig }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sectionsConfig, setSectionsConfig] = useState<SectionsConfig>(initialSectionsConfig);
  const placeholders = usePlaceholders();

  const { steps: dynamicSteps, totalSteps, getStepFields } = useDynamicSteps(sectionsConfig);

  const enabledSections = Object.entries(sectionsConfig)
    .filter(([_, enabled]) => enabled)
    .map(([section]) => section);

  const dynamicSchema = createDynamicSchema(enabledSections);

  const form = useForm<DynamicDocumentationFormData>({
    resolver: zodResolver(dynamicSchema) as any,
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

  const handleSubmit = async (data: DynamicDocumentationFormData) => {
    const filteredData = { ...data } as any;
    if (!sectionsConfig.prerequisites) {
      delete filteredData.prerequisites;
      delete filteredData.environmentalSetup;
    }
    if (!sectionsConfig.localDevServer) {
      delete filteredData.localDevServer;
      delete filteredData.deploymentInfo;
    }

    // Include the sections configuration
    const requestData = {
      ...filteredData,
      config: {
        sections: sectionsConfig,
      },
    };

    await onSubmit(requestData);
  };

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      const isValid = await form.trigger();
      if (isValid) {
        const data = form.getValues();
        await handleSubmit(data);
      }
    } else {
      const currentStepFields = getStepFields(currentStep - 1);
      // Skip validation for configuration step
      if (currentStepFields.length === 0) {
        setCurrentStep(currentStep + 1);
      } else {
        const isValid = await form.trigger(currentStepFields as any);
        if (isValid) {
          setCurrentStep(currentStep + 1);
        }
      }
    }
  };

  const handleConfigChange = (newConfig: SectionsConfig) => {
    setSectionsConfig(newConfig);
    // Move to next step after configuration
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <FormProvider {...form}>
      <Card className='w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={dynamicSteps} />

            <StepRenderer
              currentStep={currentStep}
              placeholders={placeholders}
              sectionsConfig={sectionsConfig}
              onConfigChange={handleConfigChange}
            />

            <StepNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onPrev={handlePrev}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
