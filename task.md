# Dynamic Documentation Configuration Feature

## Overview

Implemented a dynamic configuration system that allows users to selectively enable/disable sections in the documentation generation process. The system uses a string builder approach to dynamically construct both system and user prompts based on the selected sections.

## Feature Description

- **Gear Icon Configuration**: Added a settings gear icon in the form header for easy access to section configuration
- **Dynamic Prompt Generation**: System and user prompts are built dynamically based on enabled sections
- **Conditional Form Fields**: Form fields are only rendered when their corresponding section is enabled
- **Dynamic Validation**: Form validation only applies to enabled sections
- **Backward Compatibility**: Maintains existing functionality when no configuration is provided

## Backend Changes

### File: `apps/api/index.ts`

- **Configuration Schema**: Added `sectionsConfigSchema` for validating section configuration
- **Dynamic Prompt Builders**:
  - `buildSystemPrompt()`: Constructs system prompt based on enabled sections
  - `buildUserPrompt()`: Constructs user prompt based on enabled sections
- **Dynamic Validation**: `createDynamicSchema()` generates validation schema based on enabled sections
- **Request Schema Update**: Extended `generateDocumentationSchema` to include optional configuration
- **API Logic**: Updated `/generate-documentation` endpoint to handle dynamic prompt generation

### Key Functions Added:

```typescript
- buildSystemPrompt(enabledSections: string[]): string
- buildUserPrompt(enabledSections: string[]): string
- createDynamicSchema(enabledSections: string[]): z.ZodObject
```

## Frontend Changes

### File: `apps/web/src/components/ConfigurationModal.tsx` (NEW)

- **Modal Component**: Configuration modal with checkboxes for each section
- **Section Labels**: User-friendly labels for each configuration option
- **State Management**: Handles configuration changes and modal state

### File: `apps/web/src/components/ui/checkbox.tsx` (NEW)

- **Checkbox Component**: Radix UI-based checkbox component for the configuration modal
- **Dependencies**: Requires `@radix-ui/react-checkbox`

### File: `apps/web/src/components/DocumentationForm.tsx`

- **Configuration State**: Added state management for sections configuration
- **Gear Icon**: Added settings icon in form header for configuration access
- **Conditional Rendering**: Form fields wrapped in conditional rendering based on configuration
- **Dynamic Submission**: Updated form submission to include configuration data
- **Modal Integration**: Integrated ConfigurationModal component

### File: `apps/web/src/hooks/useDocumentationForm.ts`

- **Configuration Interface**: Added `SectionsConfig` interface
- **Dynamic Validation**: Updated `validateForm()` to accept optional configuration parameter
- **Conditional Validation**: Only validates fields for enabled sections
- **Dynamic Form Validity**: Updated `isFormValid()` to work with configuration

### File: `apps/web/src/App.tsx`

- **Interface Update**: Extended `DocumentationFormData` interface to include optional configuration
- **Type Safety**: Added proper typing for configuration structure

## Configuration Structure

### Sections Configuration

```typescript
interface SectionsConfig {
  projectName: boolean; // Always required
  description: boolean; // Always required
  prerequisites: boolean; // Optional
  environmentalSetup: boolean; // Optional
  localDevServer: boolean; // Optional
  deploymentInfo: boolean; // Optional
}
```

### API Request Structure

```typescript
{
  projectName: string,
  description: string,
  prerequisites?: string,
  environmentalSetup?: string,
  localDevServer?: string,
  deploymentInfo?: string,
  config?: {
    sections: SectionsConfig
  }
}
```

## User Experience Flow

1. **Default State**: All sections are enabled by default (maintains existing behavior)
2. **Configuration Access**: User clicks gear icon in form header
3. **Section Selection**: Modal opens with checkboxes for each section
4. **Dynamic Form**: Form fields appear/disappear based on selections
5. **Validation**: Only enabled fields are validated
6. **Submission**: Configuration is sent with form data to API
7. **Dynamic Generation**: Backend generates prompts based on enabled sections

## Dependencies Added

### Backend

- No new dependencies required

### Frontend

- `@radix-ui/react-checkbox`: For checkbox component in configuration modal

## Testing Considerations

### Backend Testing

- Test dynamic prompt generation with different section combinations
- Verify validation works correctly for enabled/disabled sections
- Test backward compatibility with requests without configuration
- Verify API responses are correct for different configurations

### Frontend Testing

- Test configuration modal functionality
- Verify form fields show/hide based on configuration
- Test validation behavior with different section combinations
- Verify form submission includes correct configuration data
- Test gear icon accessibility and functionality

## Migration Notes

### Breaking Changes

- None - feature is fully backward compatible

### Default Behavior

- When no configuration is provided, all sections are enabled
- Existing API calls will continue to work without modification

### Configuration Persistence

- Configuration is currently session-based (not persisted)
- Future enhancement could add configuration saving/loading

## Future Enhancements

### Potential Improvements

- **Configuration Presets**: Save/load common configuration combinations
- **Section Ordering**: Allow users to reorder sections
- **Custom Sections**: Add ability to create custom sections
- **Configuration Export/Import**: Share configurations between users
- **Wizard Mode**: Convert to step-by-step wizard based on enabled sections

### Technical Debt

- Consider extracting configuration logic to a separate service
- Add comprehensive error handling for invalid configurations
- Implement configuration validation on the frontend
- Add unit tests for dynamic prompt generation logic
