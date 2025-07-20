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
