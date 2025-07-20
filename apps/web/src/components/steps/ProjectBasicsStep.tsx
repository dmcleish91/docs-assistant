import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { DocumentationFormData } from '@/lib/schemas';
import type { PlaceholderExample } from '@/constants/placeholders';

interface ProjectBasicsStepProps {
  placeholders: PlaceholderExample | null;
}

export const ProjectBasicsStep = ({ placeholders }: ProjectBasicsStepProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<DocumentationFormData>();

  const projectName = watch('projectName', '');
  const description = watch('description', '');

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='projectName' className='text-base font-semibold'>
          Project Name
          <span className='text-red-400 font-bold ml-1' aria-label='required'>
            *
          </span>
        </Label>
        <Input
          id='projectName'
          {...register('projectName')}
          placeholder={placeholders?.projectName}
          aria-describedby={errors.projectName ? 'projectName-error' : 'projectName-help'}
          aria-invalid={!!errors.projectName}
          className={cn('transition-all duration-300', errors.projectName && 'border-red-400 focus-visible:ring-red-400')}
        />
        {errors.projectName && (
          <div id='projectName-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
            {errors.projectName.message}
          </div>
        )}
        <div id='projectName-help' className='text-sm text-muted-foreground mt-2'>
          Enter a clear, descriptive name for your project.
        </div>
        <div className='text-xs text-muted-foreground text-right'>{projectName.length}/100 characters</div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description' className='text-base font-semibold'>
          Project Description
          <span className='text-red-400 font-bold ml-1' aria-label='required'>
            *
          </span>
        </Label>
        <Textarea
          id='description'
          {...register('description')}
          placeholder={placeholders?.description}
          rows={3}
          aria-describedby={errors.description ? 'description-error' : 'description-help'}
          aria-invalid={!!errors.description}
          className={cn('transition-all duration-300', errors.description && 'border-red-400 focus-visible:ring-red-400')}
        />
        {errors.description && (
          <div id='description-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
            {errors.description.message}
          </div>
        )}
        <div id='description-help' className='text-sm text-muted-foreground mt-2'>
          Provide a comprehensive overview of your project's functionality and goals.
        </div>
        <div className='text-xs text-muted-foreground text-right'>{description.length}/1000 characters</div>
      </div>
    </div>
  );
};
