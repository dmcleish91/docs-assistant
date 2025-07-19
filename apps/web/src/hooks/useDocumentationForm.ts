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

const validateField = (
  value: string,
  minLength: number,
  maxLength: number,
  requiredMessage: string,
  minMessage: string,
  maxMessage: string
): string | undefined => {
  if (!value.trim()) return requiredMessage;
  if (value.trim().length < minLength) return minMessage;
  if (value.trim().length > maxLength) return maxMessage;
  return undefined;
};

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

    newErrors.projectName = validateField(
      formData.projectName,
      FORM_VALIDATION.MIN_PROJECT_NAME_LENGTH,
      FORM_VALIDATION.MAX_PROJECT_NAME_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PROJECT_NAME_REQUIRED,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PROJECT_NAME_MIN_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PROJECT_NAME_MAX_LENGTH
    );

    newErrors.description = validateField(
      formData.description,
      FORM_VALIDATION.MIN_DESCRIPTION_LENGTH,
      FORM_VALIDATION.MAX_DESCRIPTION_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DESCRIPTION_REQUIRED,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DESCRIPTION_MIN_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DESCRIPTION_MAX_LENGTH
    );

    newErrors.prerequisites = validateField(
      formData.prerequisites,
      FORM_VALIDATION.MIN_PREREQUISITES_LENGTH,
      FORM_VALIDATION.MAX_PREREQUISITES_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PREREQUISITES_REQUIRED,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PREREQUISITES_MIN_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.PREREQUISITES_MAX_LENGTH
    );

    newErrors.environmentalSetup = validateField(
      formData.environmentalSetup,
      FORM_VALIDATION.MIN_SETUP_STEPS_LENGTH,
      FORM_VALIDATION.MAX_SETUP_STEPS_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.SETUP_STEPS_REQUIRED,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.SETUP_STEPS_MIN_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.SETUP_STEPS_MAX_LENGTH
    );

    newErrors.localDevServer = validateField(
      formData.localDevServer,
      FORM_VALIDATION.MIN_LOCAL_DEV_LENGTH,
      FORM_VALIDATION.MAX_LOCAL_DEV_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.LOCAL_DEV_REQUIRED,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.LOCAL_DEV_MIN_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.LOCAL_DEV_MAX_LENGTH
    );

    newErrors.deploymentInfo = validateField(
      formData.deploymentInfo,
      FORM_VALIDATION.MIN_DEPLOYMENT_LENGTH,
      FORM_VALIDATION.MAX_DEPLOYMENT_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DEPLOYMENT_REQUIRED,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DEPLOYMENT_MIN_LENGTH,
      UI_CONSTANTS.ERROR_MESSAGES.VALIDATION.DEPLOYMENT_MAX_LENGTH
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof DocumentationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

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
