import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

interface PreviewToggleProps {
  activeTab: 'preview' | 'download';
  onTabChange: (tab: 'preview' | 'download') => void;
}

export const PreviewToggle = ({ activeTab, onTabChange }: PreviewToggleProps) => {
  return (
    <div className='flex bg-white/5 rounded-lg p-1 border border-white/20'>
      <Button
        variant={activeTab === 'preview' ? 'default' : 'ghost'}
        size='sm'
        onClick={() => onTabChange('preview')}
        className={`flex items-center gap-2 transition-all duration-200 ${
          activeTab === 'preview'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'text-muted-foreground hover:text-white hover:bg-white/10'
        }`}>
        <Eye className='w-4 h-4' />
        Preview
      </Button>

      <Button
        variant={activeTab === 'download' ? 'default' : 'ghost'}
        size='sm'
        onClick={() => onTabChange('download')}
        className={`flex items-center gap-2 transition-all duration-200 ${
          activeTab === 'download'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'text-muted-foreground hover:text-white hover:bg-white/10'
        }`}>
        <Download className='w-4 h-4' />
        Download
      </Button>
    </div>
  );
};
