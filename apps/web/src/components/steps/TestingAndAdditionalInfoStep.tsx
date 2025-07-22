import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { DocumentationFormData } from '@/lib/schemas';
import type { PlaceholderExample } from '@/constants/placeholders';
import type { SectionsConfig } from '@/lib/schemas';

interface TestingAndAdditionalInfoStepProps {
  placeholders: PlaceholderExample | null;
  sectionsConfig: SectionsConfig;
}

export const TestingAndAdditionalInfoStep = ({ placeholders, sectionsConfig }: TestingAndAdditionalInfoStepProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<DocumentationFormData>();

  const testing = watch('testing', '');
  const additionalInformation = watch('additionalInformation', '');

  return (
    <div className='space-y-6'>
      {sectionsConfig.testing && (
        <div className='space-y-2'>
          <Label htmlFor='testing' className='text-base font-semibold'>
            Testing Procedures
            <span className='text-red-400 font-bold ml-1' aria-label='required'>
              *
            </span>
          </Label>
          <Textarea
            id='testing'
            {...register('testing')}
            placeholder={placeholders?.testing || 'Describe how to run tests for your project...'}
            rows={4}
            aria-describedby={errors.testing ? 'testing-error' : 'testing-help'}
            aria-invalid={!!errors.testing}
            className={cn('transition-all duration-300', errors.testing && 'border-red-400 focus-visible:ring-red-400')}
          />
          {errors.testing && (
            <div id='testing-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
              {errors.testing.message}
            </div>
          )}
          <div id='testing-help' className='text-sm text-muted-foreground mt-2'>
            Provide instructions for running tests, including test commands, coverage reports, and testing frameworks used.
          </div>
          <div className='text-xs text-muted-foreground text-right'>{testing.length}/1000 characters</div>
        </div>
      )}

      {sectionsConfig.additionalInformation && (
        <div className='space-y-2'>
          <Label htmlFor='additionalInformation' className='text-base font-semibold'>
            Additional Information
            <span className='text-red-400 font-bold ml-1' aria-label='required'>
              *
            </span>
          </Label>
          <Textarea
            id='additionalInformation'
            {...register('additionalInformation')}
            placeholder={
              placeholders?.additionalInformation ||
              'Add any additional information, troubleshooting tips, contributing guidelines, license info, etc...'
            }
            rows={4}
            aria-describedby={errors.additionalInformation ? 'additionalInformation-error' : 'additionalInformation-help'}
            aria-invalid={!!errors.additionalInformation}
            className={cn('transition-all duration-300', errors.additionalInformation && 'border-red-400 focus-visible:ring-red-400')}
          />
          {errors.additionalInformation && (
            <div id='additionalInformation-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
              {errors.additionalInformation.message}
            </div>
          )}
          <div id='additionalInformation-help' className='text-sm text-muted-foreground mt-2'>
            Include troubleshooting tips, contributing guidelines, license information, contact details, or any other relevant information.
          </div>
          <div className='text-xs text-muted-foreground text-right'>{additionalInformation.length}/1000 characters</div>
        </div>
      )}
    </div>
  );
};
