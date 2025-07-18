import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UI_CONSTANTS } from '../constants';

interface DocumentationSuccessProps {
  downloadUrl: string;
  onReset: () => void;
}

export const DocumentationSuccess = ({ downloadUrl, onReset }: DocumentationSuccessProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'README.md';
    link.click();
  };

  return (
    <Card className='w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold text-green-400'>✅ {UI_CONSTANTS.SUCCESS_TEXT}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='text-center space-y-4'>
          <p className='text-lg text-muted-foreground'>
            Your documentation has been generated successfully! You can now download the README.md file.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={handleDownload}
              className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
              📥 Download README.md
            </Button>

            <Button
              onClick={onReset}
              variant='outline'
              className='border-white/20 text-white hover:bg-white/10 font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
              🔄 Generate Another
            </Button>
          </div>
        </div>

        <div className='bg-white/5 rounded-lg p-4 border border-white/10'>
          <h3 className='font-semibold text-white mb-2'>What's included in your README:</h3>
          <ul className='text-sm text-muted-foreground space-y-1'>
            <li>• Project overview and description</li>
            <li>• Technology stack details</li>
            <li>• Setup and installation instructions</li>
            <li>• API documentation (if provided)</li>
            <li>• Deployment information (if provided)</li>
            <li>• Additional notes and guidelines</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
