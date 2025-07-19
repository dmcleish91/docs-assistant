import { LoadingButton } from './LoadingButton';
import { UI_CONSTANTS } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useDocumentationForm } from '../hooks/useDocumentationForm';

interface DocumentationFormData {
  projectName: string;
  description: string;
  prerequisites: string;
  environmentalSetup: string;
  localDevServer: string;
  deploymentInfo: string;
}

interface DocumentationFormProps {
  onSubmit: (formData: DocumentationFormData) => Promise<void>;
  isLoading: boolean;
}

export const DocumentationForm = ({ onSubmit, isLoading }: DocumentationFormProps) => {
  const { formData, errors, validateForm, handleInputChange, getCharacterCount, getMaxLength, isFormValid } = useDocumentationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <Card className='w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6' noValidate>
          <div className='space-y-2'>
            <Label htmlFor='projectName' className='text-base font-semibold'>
              Project Name
              <span className='text-red-400 font-bold ml-1' aria-label='required'>
                *
              </span>
            </Label>
            <Input
              id='projectName'
              name='projectName'
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              required
              disabled={isLoading}
              aria-describedby={errors.projectName ? 'projectName-error' : 'projectName-help'}
              aria-invalid={!!errors.projectName}
              maxLength={getMaxLength('projectName')}
              className={cn('transition-all duration-300', errors.projectName && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.projectName && (
              <div id='projectName-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.projectName}
              </div>
            )}
            <div id='projectName-help' className='text-sm text-muted-foreground mt-2'>
              Enter a clear, descriptive name for your project.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {getCharacterCount('projectName')}/{getMaxLength('projectName')} characters
            </div>
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
              name='description'
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={2}
              required
              disabled={isLoading}
              aria-describedby={errors.description ? 'description-error' : 'description-help'}
              aria-invalid={!!errors.description}
              maxLength={getMaxLength('description')}
              className={cn('transition-all duration-300', errors.description && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.description && (
              <div id='description-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.description}
              </div>
            )}
            <div id='description-help' className='text-sm text-muted-foreground mt-2'>
              Provide a comprehensive overview of your project's functionality and goals.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {getCharacterCount('description')}/{getMaxLength('description')} characters
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='prerequisites' className='text-base font-semibold'>
              Prerequisites
              <span className='text-red-400 font-bold ml-1' aria-label='required'>
                *
              </span>
            </Label>
            <Textarea
              id='prerequisites'
              name='prerequisites'
              value={formData.prerequisites}
              onChange={(e) => handleInputChange('prerequisites', e.target.value)}
              rows={2}
              required
              disabled={isLoading}
              aria-describedby={errors.prerequisites ? 'prerequisites-error' : 'prerequisites-help'}
              aria-invalid={!!errors.prerequisites}
              maxLength={getMaxLength('prerequisites')}
              className={cn('transition-all duration-300', errors.prerequisites && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.prerequisites && (
              <div id='prerequisites-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.prerequisites}
              </div>
            )}
            <div id='prerequisites-help' className='text-sm text-muted-foreground mt-2'>
              List any prerequisites or dependencies your project requires to run.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {getCharacterCount('prerequisites')}/{getMaxLength('prerequisites')} characters
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='environmentalSetup' className='text-base font-semibold'>
              Environment Setup Steps
              <span className='text-red-400 font-bold ml-1' aria-label='required'>
                *
              </span>
            </Label>
            <Textarea
              id='environmentalSetup'
              name='environmentalSetup'
              value={formData.environmentalSetup}
              onChange={(e) => handleInputChange('environmentalSetup', e.target.value)}
              rows={2}
              required
              disabled={isLoading}
              aria-describedby={errors.environmentalSetup ? 'environmentalSetup-error' : 'environmentalSetup-help'}
              aria-invalid={!!errors.environmentalSetup}
              maxLength={getMaxLength('environmentalSetup')}
              className={cn('transition-all duration-300', errors.environmentalSetup && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.environmentalSetup && (
              <div id='environmentalSetup-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.environmentalSetup}
              </div>
            )}
            <div id='environmentalSetup-help' className='text-sm text-muted-foreground mt-2'>
              Provide step-by-step instructions for setting up the development environment.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {getCharacterCount('environmentalSetup')}/{getMaxLength('environmentalSetup')} characters
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='localDevServer' className='text-base font-semibold'>
              Local Development Server Instructions
              <span className='text-red-400 font-bold ml-1' aria-label='required'>
                *
              </span>
            </Label>
            <Textarea
              id='localDevServer'
              name='localDevServer'
              value={formData.localDevServer}
              onChange={(e) => handleInputChange('localDevServer', e.target.value)}
              rows={2}
              required
              disabled={isLoading}
              aria-describedby={errors.localDevServer ? 'localDevServer-error' : 'localDevServer-help'}
              aria-invalid={!!errors.localDevServer}
              maxLength={getMaxLength('localDevServer')}
              className={cn('transition-all duration-300', errors.localDevServer && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.localDevServer && (
              <div id='localDevServer-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.localDevServer}
              </div>
            )}
            <div id='localDevServer-help' className='text-sm text-muted-foreground mt-2'>
              Provide instructions for starting and running the development server locally.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {getCharacterCount('localDevServer')}/{getMaxLength('localDevServer')} characters
            </div>
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
              name='deploymentInfo'
              value={formData.deploymentInfo}
              onChange={(e) => handleInputChange('deploymentInfo', e.target.value)}
              rows={2}
              required
              disabled={isLoading}
              aria-describedby={errors.deploymentInfo ? 'deploymentInfo-error' : 'deploymentInfo-help'}
              aria-invalid={!!errors.deploymentInfo}
              maxLength={getMaxLength('deploymentInfo')}
              className={cn('transition-all duration-300', errors.deploymentInfo && 'border-red-400 focus-visible:ring-red-400')}
            />
            {errors.deploymentInfo && (
              <div id='deploymentInfo-error' className='text-red-400 text-sm mt-2 font-medium' role='alert'>
                {errors.deploymentInfo}
              </div>
            )}
            <div id='deploymentInfo-help' className='text-sm text-muted-foreground mt-2'>
              Provide step-by-step instructions for deploying the project to production.
            </div>
            <div className='text-xs text-muted-foreground text-right'>
              {getCharacterCount('deploymentInfo')}/{getMaxLength('deploymentInfo')} characters
            </div>
          </div>

          <LoadingButton
            loading={isLoading}
            disabled={!isFormValid}
            loadingText={UI_CONSTANTS.LOADING_TEXT}
            type='submit'
            className='w-full'>
            {UI_CONSTANTS.SUBMIT_TEXT}
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
};
