import { useMemo } from 'react';
import { STEP_CONFIGURATION } from '@/components/steps/step-config';
import type { SectionsConfig } from '@/lib/schemas';

export const useDynamicSteps = (sectionsConfig: SectionsConfig) => {
  const dynamicSteps = useMemo(() => {
    const enabledSteps = STEP_CONFIGURATION.filter((step) => {
      // Configuration step is always included
      if (step.id === 'configuration') {
        return true;
      }
      // Required steps are always included
      if (step.isRequired) {
        return true;
      }
      // Optional steps are included based on configuration
      return sectionsConfig[step.section];
    });

    const sortedSteps = enabledSteps.sort((a, b) => a.order - b.order);

    const hasOptionalSections = Object.entries(sectionsConfig).some(([key, enabled]) => {
      if (key === 'projectName' || key === 'description') return false;
      return enabled;
    });

    if (hasOptionalSections) {
      sortedSteps.push({
        id: 'review',
        title: 'Review',
        description: 'Final Check',
        section: 'projectName',
        fields: [],
        isRequired: false,
        order: sortedSteps.length + 1,
      });
    }

    return sortedSteps;
  }, [sectionsConfig]);

  const getStepFields = (stepIndex: number): string[] => {
    if (stepIndex < 0 || stepIndex >= dynamicSteps.length) {
      return [];
    }

    const step = dynamicSteps[stepIndex];
    return step.fields;
  };

  const isStepEnabled = (stepId: string): boolean => {
    return dynamicSteps.some((step) => step.id === stepId);
  };

  const getStepIndex = (stepId: string): number => {
    return dynamicSteps.findIndex((step) => step.id === stepId);
  };

  return {
    steps: dynamicSteps,
    totalSteps: dynamicSteps.length,
    getStepFields,
    isStepEnabled,
    getStepIndex,
  };
};
