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
    id: 'testing-and-additional-info',
    title: 'Testing & Additional Info',
    description: 'Testing & Additional Info',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Final Check',
  },
];

export const STEP_CONFIGURATION: DynamicStepConfig[] = [
  {
    id: 'configuration',
    title: 'Configuration',
    description: '',
    section: 'projectName',
    fields: [],
    isRequired: true,
    order: 1,
  },
  {
    id: 'basics',
    title: 'Project Basics',
    description: '',
    section: 'projectName',
    fields: ['projectName', 'description'],
    isRequired: true,
    order: 2,
  },
  {
    id: 'technical',
    title: 'Technical Setup',
    description: '',
    section: 'prerequisites',
    fields: ['prerequisites', 'environmentalSetup'],
    isRequired: false,
    order: 3,
  },
  {
    id: 'development',
    title: 'Development & Deployment',
    description: '',
    section: 'localDevServer',
    fields: ['localDevServer', 'deploymentInfo'],
    isRequired: false,
    order: 4,
  },
  {
    id: 'testing-and-additional-info',
    title: 'Testing & Additional Info',
    description: '',
    section: 'testing',
    fields: ['testing', 'additionalInformation'],
    isRequired: false,
    order: 5,
  },
];

export const DEFAULT_SECTIONS_CONFIG: SectionsConfig = {
  projectName: true,
  description: true,
  prerequisites: true,
  environmentalSetup: true,
  localDevServer: true,
  deploymentInfo: true,
  testing: true,
  additionalInformation: true,
};

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
      testing: false,
      additionalInformation: false,
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
      testing: true,
      additionalInformation: true,
    } as SectionsConfig,
  },
  comprehensive: {
    name: 'Comprehensive',
    description: 'All sections included',
    config: DEFAULT_SECTIONS_CONFIG,
  },
};
