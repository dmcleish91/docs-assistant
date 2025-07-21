import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';
import { StepRenderer } from './StepRenderer';
import { ConfigurationModal } from './ConfigurationModal';
import { steps } from './steps/step-config';
import { documentationFormSchema, type DynamicDocumentationFormData, type SectionsConfig, createDynamicSchema } from '@/lib/schemas';
import { usePlaceholders } from '@/hooks/usePlaceholders';
import { useDynamicSteps } from '@/hooks/useDynamicSteps';
import { DEFAULT_SECTIONS_CONFIG } from './steps/step-config';

interface MultiStepFormProps {
  onSubmit: (formData: DynamicDocumentationFormData) => Promise<void>;
  isLoading: boolean;
}

export const MultiStepForm = ({ onSubmit, isLoading }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [sectionsConfig, setSectionsConfig] = useState<SectionsConfig>(DEFAULT_SECTIONS_CONFIG);
  const placeholders = usePlaceholders();

  // Generate dynamic steps based on configuration
  const { steps: dynamicSteps, totalSteps, getStepFields } = useDynamicSteps(sectionsConfig);

  // Create dynamic validation schema
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
    // Filter out disabled fields before submission
    const filteredData = { ...data } as any;
    if (!sectionsConfig.prerequisites) {
      delete filteredData.prerequisites;
      delete filteredData.environmentalSetup;
    }
    if (!sectionsConfig.localDevServer) {
      delete filteredData.localDevServer;
      delete filteredData.deploymentInfo;
    }

    await onSubmit(filteredData);
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
      const isValid = await form.trigger(currentStepFields as any);
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

  const handleConfigChange = (newConfig: SectionsConfig) => {
    setSectionsConfig(newConfig);
    // Reset to first step when configuration changes
    setCurrentStep(1);
    // Reset form to clear any data from disabled sections
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <Card className='w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            {/* Header with Configuration Button */}
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-white'>Documentation Generator</h2>
              <Button variant='outline' size='sm' onClick={() => setIsConfigModalOpen(true)} className='p-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </Button>
            </div>

            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={dynamicSteps} />

            <div className='space-y-6'>
              <StepRenderer currentStep={currentStep} placeholders={placeholders} sectionsConfig={sectionsConfig} />

              <StepNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={handleNext}
                onPrev={handlePrev}
                isLoading={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        sectionsConfig={sectionsConfig}
        onConfigChange={handleConfigChange}
      />
    </FormProvider>
  );
};
