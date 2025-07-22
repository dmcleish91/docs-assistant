# Implementation Plan: Add "Additional Information" Step

## Current Architecture Analysis

- **Frontend**: Uses a dynamic step system with `useDynamicSteps` hook
- **Steps**: Configuration → Project Basics → Technical Setup → Development & Deployment → Review
- **Backend**: Dynamic prompt generation based on enabled sections
- **Data Flow**: Form data → API → Dynamic schema validation → LLM prompt generation

## 1. Frontend Changes

### 1.1 Update Schemas (`apps/web/src/lib/schemas.ts`)

- [ ] Add `testing` and `additionalInformation` to `SectionsConfig` interface
- [ ] Add `testing` and `additionalInformation` to `DynamicDocumentationFormData` type
- [ ] Create `testingAndAdditionalInfoSchema` with validation rules for both fields
- [ ] Update `createDynamicSchema` function to include both new fields

### 1.2 Create Testing and Additional Information Step Component (`apps/web/src/components/steps/TestingAndAdditionalInfoStep.tsx`)

- [ ] Create new component with form fields for both testing and additional information
- [ ] Include separate textarea for testing procedures
- [ ] Include separate textarea for additional information
- [ ] Add proper validation and error handling for both fields
- [ ] Include placeholder text and examples for both fields
- [ ] Follow existing component patterns (see `TechnicalDetailsStep.tsx`)

### 1.3 Update Step Configuration (`apps/web/src/components/steps/step-config.ts`)

- [ ] Add new step configuration to `STEP_CONFIGURATION` array:
  ```typescript
  {
    id: 'testing-and-additional-info',
    title: 'Testing & Additional Info',
    description: '',
    section: 'testing',
    fields: ['testing', 'additionalInformation'],
    isRequired: false,
    order: 4, // Before review step
  }
  ```
- [ ] Update `DEFAULT_SECTIONS_CONFIG` to include `testing: true` and `additionalInformation: true`
- [ ] Update preset configurations to include both new sections

### 1.4 Update Step Renderer (`apps/web/src/components/StepRenderer.tsx`)

- [ ] Import the new `TestingAndAdditionalInfoStep` component
- [ ] Add case for `'testing-and-additional-info'` in the switch statement
- [ ] Pass required props (placeholders, sectionsConfig)

### 1.5 Update Dynamic Steps Hook (`apps/web/src/hooks/useDynamicSteps.ts`)

- [ ] Ensure the new step is properly filtered and ordered
- [ ] Verify the review step is still added after the new step

### 1.6 Update MultiStepForm (`apps/web/src/components/MultiStepForm.tsx`)

- [ ] Add `testing` and `additionalInformation` to form default values
- [ ] Update form submission logic to handle both new fields
- [ ] Ensure proper validation for the new step

## 2. Backend Changes

### 2.1 Update API Schema (`apps/api/index.ts`)

- [ ] Add `testing` and `additionalInformation` to `SECTIONS` object:
  ```typescript
  testing: {
    title: 'Testing',
    description: 'Testing procedures and instructions for the project.',
    field: 'testing',
    required: false,
  },
  additionalInformation: {
    title: 'Additional Information',
    description: 'Additional information, troubleshooting tips, contributing guidelines, etc.',
    field: 'additionalInformation',
    required: false,
  }
  ```
- [ ] Update `generateDocumentationSchema` to include both `testing` and `additionalInformation` fields
- [ ] Update `sectionsConfigSchema` to include both new sections

### 2.2 Update Prompt Generation

- [ ] Update `buildSystemPrompt` function to include the new section in the prompt structure
- [ ] Update `buildUserPrompt` function to include the new field in the user prompt
- [ ] Ensure the new section appears in the generated README structure

### 2.3 Update Dynamic Schema Builder

- [ ] Update `createDynamicSchema` function to handle both new fields
- [ ] Add proper validation for both testing and additional information fields

## 3. Prompt Structure Updates

### 3.1 System Prompt Enhancement

- [ ] Add separate "Testing" and "Additional Information" sections to the system prompt
- [ ] Include guidelines for what should go in each section:
  - **Testing section**: Testing procedures, test commands, test coverage, etc.
  - **Additional Information section**: Troubleshooting tips, contributing guidelines, license information, contact information, etc.

### 3.2 User Prompt Enhancement

- [ ] Include both `testing` and `additionalInformation` fields in the user prompt template
- [ ] Ensure proper formatting and structure for both sections

## 4. Testing Plan

### 4.1 Frontend Testing

- [ ] Test the new step appears in the correct order (before review)
- [ ] Test form validation for both testing and additional information fields
- [ ] Test step navigation (next/previous)
- [ ] Test configuration modal includes both new sections
- [ ] Test form submission includes both new fields
- [ ] Test with different section configurations (enabled/disabled)

### 4.2 Backend Testing

- [ ] Test API accepts both new fields
- [ ] Test validation works correctly for both fields
- [ ] Test prompt generation includes both new sections
- [ ] Test README generation includes both new sections
- [ ] Test backward compatibility (requests without the new fields)

### 4.3 Integration Testing

- [ ] Test complete flow from frontend to backend
- [ ] Test generated README includes both new sections
- [ ] Test with various combinations of enabled/disabled sections

## 5. Documentation Updates

### 5.1 Code Documentation

- [ ] Add JSDoc comments to new functions and components
- [ ] Update type definitions documentation
- [ ] Document the new step configuration

### 5.2 User Documentation

- [ ] Update README.md to reflect the new step
- [ ] Document the new "Testing & Additional Info" step with both sections
- [ ] Update any user guides or tutorials

## 6. Implementation Order

1. **Frontend Schemas** - Update data structures first
2. **Step Configuration** - Add the new step to the configuration
3. **Step Component** - Create the UI component
4. **Step Renderer** - Wire up the component
5. **Backend Schemas** - Update API data structures
6. **Backend Logic** - Update prompt generation and validation
7. **Testing** - Comprehensive testing of all changes
8. **Documentation** - Update all relevant documentation

## 7. Rollback Plan

- [ ] Ensure all changes are backward compatible
- [ ] Test that existing functionality still works
- [ ] Have a plan to disable the new step if issues arise
- [ ] Document any breaking changes (should be none)

## 8. Success Criteria

- [ ] New "Testing & Additional Info" step appears before the review step
- [ ] Step contains separate fields for testing and additional information
- [ ] Both sections are configurable (can be enabled/disabled independently)
- [ ] Form validation works correctly for both fields
- [ ] Data flows correctly from frontend to backend
- [ ] Generated README includes both new sections
- [ ] All existing functionality remains intact
- [ ] No breaking changes to existing API
