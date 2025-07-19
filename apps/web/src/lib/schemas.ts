import { z } from 'zod';

// Step 1: Project Basics
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

// Step 2: Technical Details
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

// Step 3: Development & Deployment
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

// Complete form schema
export const documentationFormSchema = projectBasicsSchema.merge(technicalDetailsSchema).merge(developmentSchema);

// TypeScript types
export type ProjectBasicsFormData = z.infer<typeof projectBasicsSchema>;
export type TechnicalDetailsFormData = z.infer<typeof technicalDetailsSchema>;
export type DevelopmentFormData = z.infer<typeof developmentSchema>;
export type DocumentationFormData = z.infer<typeof documentationFormSchema>;
