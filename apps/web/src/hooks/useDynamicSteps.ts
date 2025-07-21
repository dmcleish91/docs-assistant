import { useMemo } from 'react';
import { STEP_CONFIGURATION } from '@/components/steps/step-config';
import type { SectionsConfig, DynamicStepConfig } from '@/lib/schemas';

export const useDynamicSteps = (sectionsConfig: SectionsConfig) => {
  const dynamicSteps = useMemo(() => {
    // Filter steps based on enabled sections
    const enabledSteps = STEP_CONFIGURATION.filter((step) => {
      if (step.isRequired) {
        return true; // Always include required steps
      }

      // For optional steps, check if their section is enabled
      return sectionsConfig[step.section];
    });

    // Sort by order
    const sortedSteps = enabledSteps.sort((a, b) => a.order - b.order);

    // Add review step if there are optional sections enabled
    const hasOptionalSections = Object.entries(sectionsConfig).some(([key, enabled]) => {
      if (key === 'projectName' || key === 'description') return false;
      return enabled;
    });

    if (hasOptionalSections) {
      sortedSteps.push({
        id: 'review',
        title: 'Review',
        description: 'Final Check',
        section: 'projectName', // Dummy section for review
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
