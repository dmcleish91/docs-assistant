import { z } from 'zod';

// Configuration interfaces for dynamic stepper
export interface SectionsConfig {
  projectName: boolean; // Always required
  description: boolean; // Always required
  prerequisites: boolean; // Optional
  environmentalSetup: boolean; // Optional
  localDevServer: boolean; // Optional
  deploymentInfo: boolean; // Optional
}

export interface DynamicStepConfig {
  id: string;
  title: string;
  description: string;
  section: keyof SectionsConfig;
  fields: (keyof DocumentationFormData)[];
  isRequired: boolean;
  order: number;
}

export const projectBasicsSchema = z.object({
  projectName: z
    .string()
    .min(3, 'Project name must be at least 3 characters long')
    .max(100, 'Project name must be less than 100 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters long')
    .max(1000, 'Description must be less than 1000 characters'),
});

export const technicalDetailsSchema = z.object({
  prerequisites: z
    .string()
    .min(10, 'Prerequisites must be at least 10 characters long')
    .max(1000, 'Prerequisites must be less than 1000 characters'),
  environmentalSetup: z
    .string()
    .min(10, 'Setup steps must be at least 10 characters long')
    .max(2000, 'Setup steps must be less than 2000 characters'),
});

export const developmentSchema = z.object({
  localDevServer: z
    .string()
    .min(10, 'Local development instructions must be at least 10 characters long')
    .max(1000, 'Local development instructions must be less than 1000 characters'),
  deploymentInfo: z
    .string()
    .min(10, 'Deployment instructions must be at least 10 characters long')
    .max(1000, 'Deployment instructions must be less than 1000 characters'),
});

export const documentationFormSchema = projectBasicsSchema.merge(technicalDetailsSchema).merge(developmentSchema);

// Dynamic schema generation based on enabled sections
export const createDynamicSchema = (enabledSections: string[]) => {
  const baseSchema = z.object({
    projectName: z
      .string()
      .min(3, 'Project name must be at least 3 characters long')
      .max(100, 'Project name must be less than 100 characters'),
    description: z
      .string()
      .min(20, 'Description must be at least 20 characters long')
      .max(1000, 'Description must be less than 1000 characters'),
  });

  const optionalFields: Record<string, z.ZodString> = {};

  if (enabledSections.includes('prerequisites')) {
    optionalFields.prerequisites = z
      .string()
      .min(10, 'Prerequisites must be at least 10 characters long')
      .max(1000, 'Prerequisites must be less than 1000 characters');
  }

  if (enabledSections.includes('environmentalSetup')) {
    optionalFields.environmentalSetup = z
      .string()
      .min(10, 'Setup steps must be at least 10 characters long')
      .max(2000, 'Setup steps must be less than 2000 characters');
  }

  if (enabledSections.includes('localDevServer')) {
    optionalFields.localDevServer = z
      .string()
      .min(10, 'Local development instructions must be at least 10 characters long')
      .max(1000, 'Local development instructions must be less than 1000 characters');
  }

  if (enabledSections.includes('deploymentInfo')) {
    optionalFields.deploymentInfo = z
      .string()
      .min(10, 'Deployment instructions must be at least 10 characters long')
      .max(1000, 'Deployment instructions must be less than 1000 characters');
  }

  return baseSchema.extend(optionalFields);
};

export type ProjectBasicsFormData = z.infer<typeof projectBasicsSchema>;
export type TechnicalDetailsFormData = z.infer<typeof technicalDetailsSchema>;
export type DevelopmentFormData = z.infer<typeof developmentSchema>;
export type DocumentationFormData = z.infer<typeof documentationFormSchema>;

// Flexible form data type for dynamic configuration
export type DynamicDocumentationFormData = {
  projectName: string;
  description: string;
  prerequisites?: string;
  environmentalSetup?: string;
  localDevServer?: string;
  deploymentInfo?: string;
};
