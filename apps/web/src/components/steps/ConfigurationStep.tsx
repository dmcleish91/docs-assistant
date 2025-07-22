import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import type { SectionsConfig } from '@/lib/schemas';

interface ConfigurationStepProps {
  sectionsConfig: SectionsConfig;
  onConfigChange: (config: SectionsConfig) => void;
  onContinue: () => void;
}

export const ConfigurationStep = ({ sectionsConfig, onConfigChange, onContinue }: ConfigurationStepProps) => {
  const handleSectionChange = (section: keyof SectionsConfig, enabled: boolean) => {
    const newConfig = { ...sectionsConfig, [section]: enabled };
    onConfigChange(newConfig);
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='projectName' checked={sectionsConfig.projectName} disabled />
            <Label htmlFor='projectName' className='text-sm'>
              Project Name & Description
            </Label>
            <span className='text-xs text-muted-foreground'>(Always required)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='prerequisites'
              checked={sectionsConfig.prerequisites}
              onCheckedChange={(checked: boolean) => handleSectionChange('prerequisites', checked)}
            />
            <Label htmlFor='prerequisites' className='text-sm'>
              Prerequisites & Environment Setup
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='localDevServer'
              checked={sectionsConfig.localDevServer}
              onCheckedChange={(checked: boolean) => handleSectionChange('localDevServer', checked)}
            />
            <Label htmlFor='localDevServer' className='text-sm'>
              Development & Deployment Instructions
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='testing'
              checked={sectionsConfig.testing}
              onCheckedChange={(checked: boolean) => handleSectionChange('testing', checked)}
            />
            <Label htmlFor='testing' className='text-sm'>
              Testing & Additional Information
            </Label>
          </div>
        </div>
        <div className='pt-4'>
          <Button onClick={onContinue} className='w-full'>
            Continue with Selected Sections
          </Button>
        </div>
      </div>
    </div>
  );
};
