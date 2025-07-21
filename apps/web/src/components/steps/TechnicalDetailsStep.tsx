import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { DocumentationFormData } from '@/lib/schemas';
import type { PlaceholderExample } from '@/constants/placeholders';
import type { SectionsConfig } from '@/lib/schemas';

interface TechnicalDetailsStepProps {
  placeholders: PlaceholderExample | null;
  sectionsConfig: SectionsConfig;
}

export const TechnicalDetailsStep = ({ placeholders, sectionsConfig }: TechnicalDetailsStepProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<DocumentationFormData>();

  const prerequisites = watch('prerequisites', '');
  const environmentalSetup = watch('environmentalSetup', '');

  return (
    <div className='space-y-6'>
      {sectionsConfig.prerequisites && (
        <div className='space-y-2'>
          <Label htmlFor='prerequisites' className='text-base font-semibold'>
            Prerequisites
            <span className='text-red-400 font-bold ml-1' aria-label='required'>
              *
            </span>
          </Label>
          <Textarea
            id='prerequisites'
            {...register('prerequisites')}
            placeholder={placeholders?.prerequisites}
            rows={3}
            aria-describedby={errors.prerequisites ? 'prerequisites-error' : 'prerequisites-help'}
            aria-invalid={!!errors.prerequisites}
            className={cn('transition-all duration-300', errors.prerequisites && 'border-red-400 focus-visible:ring-red-400')}
          />
          {errors.prerequisites && (
            <div id='prerequisites-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
              {errors.prerequisites.message}
            </div>
          )}
          <div id='prerequisites-help' className='text-sm text-muted-foreground mt-2'>
            List any prerequisites or dependencies your project requires to run.
          </div>
          <div className='text-xs text-muted-foreground text-right'>{prerequisites.length}/1000 characters</div>
        </div>
      )}

      {sectionsConfig.environmentalSetup && (
        <div className='space-y-2'>
          <Label htmlFor='environmentalSetup' className='text-base font-semibold'>
            Environment Setup Steps
            <span className='text-red-400 font-bold ml-1' aria-label='required'>
              *
            </span>
          </Label>
          <Textarea
            id='environmentalSetup'
            {...register('environmentalSetup')}
            placeholder={placeholders?.environmentalSetup}
            rows={4}
            aria-describedby={errors.environmentalSetup ? 'environmentalSetup-error' : 'environmentalSetup-help'}
            aria-invalid={!!errors.environmentalSetup}
            className={cn('transition-all duration-300', errors.environmentalSetup && 'border-red-400 focus-visible:ring-red-400')}
          />
          {errors.environmentalSetup && (
            <div id='environmentalSetup-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
              {errors.environmentalSetup.message}
            </div>
          )}
          <div id='environmentalSetup-help' className='text-sm text-muted-foreground mt-2'>
            Provide step-by-step instructions for setting up the development environment.
          </div>
          <div className='text-xs text-muted-foreground text-right'>{environmentalSetup.length}/2000 characters</div>
        </div>
      )}
    </div>
  );
};
