import type { DynamicStepConfig, SectionsConfig } from '@/lib/schemas';

export interface StepConfig {
  id: string;
  title: string;
  description: string;
}

export const steps: StepConfig[] = [
  {
    id: 'basics',
    title: 'Basics',
    description: 'Project Info',
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Setup Details',
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Dev & Deploy',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Final Check',
  },
];

// Dynamic step configuration mapping
export const STEP_CONFIGURATION: DynamicStepConfig[] = [
  {
    id: 'basics',
    title: 'Project Basics',
    description: '',
    section: 'projectName', // Maps to both projectName and description
    fields: ['projectName', 'description'],
    isRequired: true,
    order: 1,
  },
  {
    id: 'technical',
    title: 'Technical Setup',
    description: '',
    section: 'prerequisites', // Maps to both prerequisites and environmentalSetup
    fields: ['prerequisites', 'environmentalSetup'],
    isRequired: false,
    order: 2,
  },
  {
    id: 'development',
    title: 'Development & Deployment',
    description: '',
    section: 'localDevServer', // Maps to both localDevServer and deploymentInfo
    fields: ['localDevServer', 'deploymentInfo'],
    isRequired: false,
    order: 3,
  },
];

// Default configuration - all sections enabled
export const DEFAULT_SECTIONS_CONFIG: SectionsConfig = {
  projectName: true,
  description: true,
  prerequisites: true,
  environmentalSetup: true,
  localDevServer: true,
  deploymentInfo: true,
};

// Preset configurations
export const PRESET_CONFIGURATIONS = {
  minimal: {
    name: 'Minimal',
    description: 'Only essential project information',
    config: {
      projectName: true,
      description: true,
      prerequisites: false,
      environmentalSetup: false,
      localDevServer: false,
      deploymentInfo: false,
    } as SectionsConfig,
  },
  standard: {
    name: 'Standard',
    description: 'Essential info plus technical setup',
    config: {
      projectName: true,
      description: true,
      prerequisites: true,
      environmentalSetup: true,
      localDevServer: false,
      deploymentInfo: false,
    } as SectionsConfig,
  },
  comprehensive: {
    name: 'Comprehensive',
    description: 'All sections included',
    config: DEFAULT_SECTIONS_CONFIG,
  },
};
