import { useState } from 'react';
import { FORM_VALIDATION, UI_CONSTANTS } from '../constants';

interface DocumentationFormData {
  projectName: string;
  description: string;
  prerequisites: string;
  environmentalSetup: string;
  localDevServer: string;
  deploymentInfo: string;
}

interface FormErrors {
  projectName?: string;
  description?: string;
  prerequisites?: string;
  environmentalSetup?: string;
  localDevServer?: string;
  deploymentInfo?: string;
}

interface UseDocumentationFormReturn {
  formData: DocumentationFormData;
  errors: FormErrors;
  validateForm: () => boolean;
  handleInputChange: (field: keyof DocumentationFormData, value: string) => void;
  getCharacterCount: (field: keyof DocumentationFormData) => number;
  getMaxLength: (field: keyof DocumentationFormData) => number;
  isFormValid: boolean;
}

export const useDocumentationForm = (): UseDocumentationFormReturn => {
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

  const isFormValid = Object.values(formData).every((field) => field.trim()) && Object.keys(errors).length === 0;

  return {
    formData,
    errors,
    validateForm,
    handleInputChange,
    getCharacterCount,
    getMaxLength,
    isFormValid,
  };
};
