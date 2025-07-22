import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DocumentationFormData, SectionsConfig } from '@/lib/schemas';

interface ReviewStepProps {
  sectionsConfig: SectionsConfig;
}

export const ReviewStep = ({ sectionsConfig }: ReviewStepProps) => {
  const { watch } = useFormContext<DocumentationFormData>();
  const formData = watch();

  const sections = [
    {
      title: 'Project Basics',
      fields: [
        { label: 'Project Name', value: formData.projectName },
        { label: 'Description', value: formData.description },
      ],
      enabled: true,
    },
    {
      title: 'Technical Details',
      fields: [
        { label: 'Prerequisites', value: formData.prerequisites },
        { label: 'Environment Setup', value: formData.environmentalSetup },
      ],
      enabled: sectionsConfig.prerequisites || sectionsConfig.environmentalSetup,
    },
    {
      title: 'Development & Deployment',
      fields: [
        { label: 'Local Development', value: formData.localDevServer },
        { label: 'Deployment', value: formData.deploymentInfo },
      ],
      enabled: sectionsConfig.localDevServer || sectionsConfig.deploymentInfo,
    },
  ].filter((section) => section.enabled);

  return (
    <div className='space-y-6'>
      <div className='text-center space-y-2'>
        <h3 className='text-lg font-semibold'>Review Your Documentation</h3>
        <p className='text-sm text-muted-foreground'>Please review all the information before generating your documentation.</p>
      </div>

      <div className='space-y-4'>
        {sections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardHeader>
              <CardTitle className='text-base flex items-center gap-2'>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className='space-y-2'>
                  <div className='text-sm font-medium text-muted-foreground'>{field.label}</div>
                  <div className='text-sm bg-muted/50 p-3 rounded-md max-h-32 overflow-y-auto'>
                    {field.value || <span className='text-muted-foreground italic'>Not provided</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
        <div className='flex items-start gap-3'>
          <div className='text-blue-600 dark:text-blue-400 mt-0.5'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='text-sm'>
            <div className='font-medium text-blue-900 dark:text-blue-100'>Ready to Generate</div>
            <div className='text-blue-700 dark:text-blue-300 mt-1'>
              Click "Generate Documentation" to create your README file with all the information provided.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
