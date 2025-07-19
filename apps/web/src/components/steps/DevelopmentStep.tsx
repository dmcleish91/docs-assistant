import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { DocumentationFormData } from '@/lib/schemas';

export const DevelopmentStep = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<DocumentationFormData>();

  const localDevServer = watch('localDevServer', '');
  const deploymentInfo = watch('deploymentInfo', '');

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='localDevServer' className='text-base font-semibold'>
          Local Development Server Instructions
          <span className='text-red-400 font-bold ml-1' aria-label='required'>
            *
          </span>
        </Label>
        <Textarea
          id='localDevServer'
          {...register('localDevServer')}
          rows={3}
          aria-describedby={errors.localDevServer ? 'localDevServer-error' : 'localDevServer-help'}
          aria-invalid={!!errors.localDevServer}
          className={cn('transition-all duration-300', errors.localDevServer && 'border-red-400 focus-visible:ring-red-400')}
        />
        {errors.localDevServer && (
          <div id='localDevServer-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
            {errors.localDevServer.message}
          </div>
        )}
        <div id='localDevServer-help' className='text-sm text-muted-foreground mt-2'>
          Provide instructions for starting and running the development server locally.
        </div>
        <div className='text-xs text-muted-foreground text-right'>{localDevServer.length}/1000 characters</div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='deploymentInfo' className='text-base font-semibold'>
          Production Deployment Instructions
          <span className='text-red-400 font-bold ml-1' aria-label='required'>
            *
          </span>
        </Label>
        <Textarea
          id='deploymentInfo'
          {...register('deploymentInfo')}
          rows={4}
          aria-describedby={errors.deploymentInfo ? 'deploymentInfo-error' : 'deploymentInfo-help'}
          aria-invalid={!!errors.deploymentInfo}
          className={cn('transition-all duration-300', errors.deploymentInfo && 'border-red-400 focus-visible:ring-red-400')}
        />
        {errors.deploymentInfo && (
          <div id='deploymentInfo-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
            {errors.deploymentInfo.message}
          </div>
        )}
        <div id='deploymentInfo-help' className='text-sm text-muted-foreground mt-2'>
          Provide step-by-step instructions for deploying the project to production.
        </div>
        <div className='text-xs text-muted-foreground text-right'>{deploymentInfo.length}/1000 characters</div>
      </div>
    </div>
  );
};
