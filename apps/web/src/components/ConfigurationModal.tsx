import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DEFAULT_SECTIONS_CONFIG } from './steps/step-config';
import type { SectionsConfig } from '@/lib/schemas';

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionsConfig: SectionsConfig;
  onConfigChange: (config: SectionsConfig) => void;
}

export const ConfigurationModal = ({ isOpen, onClose, sectionsConfig, onConfigChange }: ConfigurationModalProps) => {
  const [localConfig, setLocalConfig] = useState<SectionsConfig>(sectionsConfig);

  const handleSectionChange = (section: keyof SectionsConfig, enabled: boolean) => {
    const newConfig = { ...localConfig, [section]: enabled };
    setLocalConfig(newConfig);
  };

  const handleSave = () => {
    onConfigChange(localConfig);
    onClose();
  };

  const handleCancel = () => {
    setLocalConfig(sectionsConfig);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
            Documentation Sections
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Section Configuration */}
          <div className='space-y-4'>
            <div className='space-y-2'>
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
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-2 pt-4'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
