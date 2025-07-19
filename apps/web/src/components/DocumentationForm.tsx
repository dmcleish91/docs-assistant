import { useState } from 'react';
import { LoadingButton } from './LoadingButton';
import { FORM_VALIDATION, UI_CONSTANTS } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
  error: string | null;
  onErrorDismiss: () => void;
}

interface FormErrors {
  projectName?: string;
  description?: string;
  prerequisites?: string;
  environmentalSetup?: string;
  localDevServer?: string;
  deploymentInfo?: string;
}

export const DocumentationForm = ({ onSubmit, isLoading, error, onErrorDismiss }: DocumentationFormProps) => {
  const [formData, setFormData] = useState<DocumentationFormData>({
    projectName: '',
    description: '',
    prerequisites: '',
    environmentalSetup: '',
    localDevServer: '',
    deploymentInfo: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Project Name validation
    if (!formData.projectName.trim()) {
      newErrors.projectName = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PROJECT_NAME_REQUIRED;
    } else if (formData.projectName.trim().length < FORM_VALIDATION.MIN_PROJECT_NAME_LENGTH) {
      newErrors.projectName = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PROJECT_NAME_MIN_LENGTH;
    } else if (formData.projectName.trim().length > FORM_VALIDATION.MAX_PROJECT_NAME_LENGTH) {
      newErrors.projectName = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PROJECT_NAME_MAX_LENGTH;
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DESCRIPTION_REQUIRED;
    } else if (formData.description.trim().length < FORM_VALIDATION.MIN_DESCRIPTION_LENGTH) {
      newErrors.description = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DESCRIPTION_MIN_LENGTH;
    } else if (formData.description.trim().length > FORM_VALIDATION.MAX_DESCRIPTION_LENGTH) {
      newErrors.description = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DESCRIPTION_MAX_LENGTH;
    }

    // Prerequisites validation
    if (!formData.prerequisites.trim()) {
      newErrors.prerequisites = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PREREQUISITES_REQUIRED;
    } else if (formData.prerequisites.trim().length < FORM_VALIDATION.MIN_PREREQUISITES_LENGTH) {
      newErrors.prerequisites = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PREREQUISITES_MIN_LENGTH;
    } else if (formData.prerequisites.trim().length > FORM_VALIDATION.MAX_PREREQUISITES_LENGTH) {
      newErrors.prerequisites = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PREREQUISITES_MAX_LENGTH;
    }

    // Environmental Setup validation
    if (!formData.environmentalSetup.trim()) {
      newErrors.environmentalSetup = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.SETUP_STEPS_REQUIRED;
    } else if (formData.environmentalSetup.trim().length < FORM_VALIDATION.MIN_SETUP_STEPS_LENGTH) {
      newErrors.environmentalSetup = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.SETUP_STEPS_MIN_LENGTH;
    } else if (formData.environmentalSetup.trim().length > FORM_VALIDATION.MAX_SETUP_STEPS_LENGTH) {
      newErrors.environmentalSetup = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.SETUP_STEPS_MAX_LENGTH;
    }

    // Local Development Server validation
    if (!formData.localDevServer.trim()) {
      newErrors.localDevServer = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.LOCAL_DEV_REQUIRED;
    } else if (formData.localDevServer.trim().length < FORM_VALIDATION.MIN_LOCAL_DEV_LENGTH) {
      newErrors.localDevServer = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.LOCAL_DEV_MIN_LENGTH;
    } else if (formData.localDevServer.trim().length > FORM_VALIDATION.MAX_LOCAL_DEV_LENGTH) {
      newErrors.localDevServer = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.LOCAL_DEV_MAX_LENGTH;
    }

    // Deployment Info validation
    if (!formData.deploymentInfo.trim()) {
      newErrors.deploymentInfo = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DEPLOYMENT_REQUIRED;
    } else if (formData.deploymentInfo.trim().length < FORM_VALIDATION.MIN_DEPLOYMENT_LENGTH) {
      newErrors.deploymentInfo = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DEPLOYMENT_MIN_LENGTH;
    } else if (formData.deploymentInfo.trim().length > FORM_VALIDATION.MAX_DEPLOYMENT_LENGTH) {
      newErrors.deploymentInfo = UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DEPLOYMENT_MAX_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleInputChange = (field: keyof DocumentationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getCharacterCount = (field: keyof DocumentationFormData): number => {
    return formData[field].length;
  };

  const getMaxLength = (field: keyof DocumentationFormData): number => {
    const maxLengths = {
      projectName: FORM_VALIDATION.MAX_PROJECT_NAME_LENGTH,
      description: FORM_VALIDATION.MAX_DESCRIPTION_LENGTH,
      prerequisites: FORM_VALIDATION.MAX_PREREQUISITES_LENGTH,
      environmentalSetup: FORM_VALIDATION.MAX_SETUP_STEPS_LENGTH,
      localDevServer: FORM_VALIDATION.MAX_LOCAL_DEV_LENGTH,
      deploymentInfo: FORM_VALIDATION.MAX_DEPLOYMENT_LENGTH,
    };
    return maxLengths[field];
  };

  return (
    <Card className='w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>Documentation Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6' noValidate>
          {/* Project Name */}
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
              maxLength={FORM_VALIDATION.MAX_PROJECT_NAME_LENGTH}
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

          {/* Project Description */}
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
              rows={3}
              required
              disabled={isLoading}
              aria-describedby={errors.description ? 'description-error' : 'description-help'}
              aria-invalid={!!errors.description}
              maxLength={FORM_VALIDATION.MAX_DESCRIPTION_LENGTH}
              className={cn('min-h-[120px] transition-all duration-300', errors.description && 'border-red-400 focus-visible:ring-red-400')}
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

          {/* Prerequisites */}
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
              rows={3}
              required
              disabled={isLoading}
              aria-describedby={errors.prerequisites ? 'prerequisites-error' : 'prerequisites-help'}
              aria-invalid={!!errors.prerequisites}
              maxLength={FORM_VALIDATION.MAX_PREREQUISITES_LENGTH}
              className={cn(
                'min-h-[120px] transition-all duration-300',
                errors.prerequisites && 'border-red-400 focus-visible:ring-red-400'
              )}
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

          {/* Environmental Setup */}
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
              rows={4}
              required
              disabled={isLoading}
              aria-describedby={errors.environmentalSetup ? 'environmentalSetup-error' : 'environmentalSetup-help'}
              aria-invalid={!!errors.environmentalSetup}
              maxLength={FORM_VALIDATION.MAX_SETUP_STEPS_LENGTH}
              className={cn(
                'min-h-[160px] transition-all duration-300',
                errors.environmentalSetup && 'border-red-400 focus-visible:ring-red-400'
              )}
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

          {/* Local Development Server */}
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
              rows={3}
              required
              disabled={isLoading}
              aria-describedby={errors.localDevServer ? 'localDevServer-error' : 'localDevServer-help'}
              aria-invalid={!!errors.localDevServer}
              maxLength={FORM_VALIDATION.MAX_LOCAL_DEV_LENGTH}
              className={cn(
                'min-h-[120px] transition-all duration-300',
                errors.localDevServer && 'border-red-400 focus-visible:ring-red-400'
              )}
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

          {/* Deployment */}
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
              rows={3}
              required
              disabled={isLoading}
              aria-describedby={errors.deploymentInfo ? 'deploymentInfo-error' : 'deploymentInfo-help'}
              aria-invalid={!!errors.deploymentInfo}
              maxLength={FORM_VALIDATION.MAX_DEPLOYMENT_LENGTH}
              className={cn(
                'min-h-[120px] transition-all duration-300',
                errors.deploymentInfo && 'border-red-400 focus-visible:ring-red-400'
              )}
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
            disabled={
              !formData.projectName.trim() ||
              !formData.description.trim() ||
              !formData.prerequisites.trim() ||
              !formData.environmentalSetup.trim() ||
              !formData.localDevServer.trim() ||
              !formData.deploymentInfo.trim()
            }
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
