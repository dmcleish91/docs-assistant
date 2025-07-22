import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import type { SectionsConfig } from '@/lib/schemas';

interface ConfigurationStepProps {
  sectionsConfig: SectionsConfig;
  onConfigChange: (config: SectionsConfig) => void;
}

export const ConfigurationStep = ({ sectionsConfig, onConfigChange }: ConfigurationStepProps) => {
  const [localConfig, setLocalConfig] = useState<SectionsConfig>(sectionsConfig);

  const handleSectionChange = (section: keyof SectionsConfig, enabled: boolean) => {
    const newConfig = { ...localConfig, [section]: enabled };
    setLocalConfig(newConfig);
  };

  const handleSave = () => {
    onConfigChange(localConfig);
  };

  return (
    <div className='space-y-6'>
      {/* Individual Section Toggles */}
      <div className='space-y-4'>
        <div className='space-y-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='projectName' checked={localConfig.projectName} disabled />
            <Label htmlFor='projectName' className='text-sm'>
              Project Name & Description
            </Label>
            <span className='text-xs text-muted-foreground'>(Always required)</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='prerequisites'
              checked={localConfig.prerequisites}
              onCheckedChange={(checked: boolean) => handleSectionChange('prerequisites', checked)}
            />
            <Label htmlFor='prerequisites' className='text-sm'>
              Prerequisites & Environment Setup
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='localDevServer'
              checked={localConfig.localDevServer}
              onCheckedChange={(checked: boolean) => handleSectionChange('localDevServer', checked)}
            />
            <Label htmlFor='localDevServer' className='text-sm'>
              Development & Deployment Instructions
            </Label>
          </div>
        </div>

        {/* Save Button */}
        <div className='pt-4'>
          <Button onClick={handleSave} className='w-full'>
            Continue with Selected Sections
          </Button>
        </div>
      </div>
    </div>
  );
};
