import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, GitBranch, Settings } from 'lucide-react';

interface StartPageProps {
  onStart: () => void;
  onConfigure?: () => void;
}

export function StartPage({ onStart, onConfigure }: StartPageProps) {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <Card className='border shadow-sm'>
          <CardHeader className='text-center space-y-6 pb-8'>
            <div className='flex justify-center'>
              <div className='bg-muted p-4 rounded-full'>
                <FileText className='h-12 w-12 text-green-600' />
              </div>
            </div>

            <div className='space-y-2'>
              <CardTitle className='text-4xl font-bold'>Readme Forge</CardTitle>
              <CardDescription className='text-lg'>Documentation standardization tool</CardDescription>
            </div>
          </CardHeader>

          <CardContent className='space-y-8 pb-8'>
            <div className='text-center space-y-4'>
              <p className='text-foreground text-lg leading-relaxed'>
                Ensure consistent documentation standards across all team projects. Generate structured READMEs that follow our established
                guidelines and maintain quality across repositories.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center space-y-2 p-4 rounded-lg bg-muted/50 border'>
                <Settings className='h-6 w-6 text-green-600 mx-auto' />
                <h3 className='font-semibold'>Standardized</h3>
                <p className='text-muted-foreground text-sm'>Consistent format & structure</p>
              </div>

              <div className='text-center space-y-2 p-4 rounded-lg bg-muted/50 border'>
                <GitBranch className='h-6 w-6 text-muted-foreground mx-auto' />
                <h3 className='font-semibold text-green-600'>Team-Ready</h3>
                <p className='text-muted-foreground text-sm'>Built for our workflow</p>
              </div>

              <div className='text-center space-y-2 p-4 rounded-lg bg-muted/50 border'>
                <FileText className='h-6 w-6 text-muted-foreground mx-auto' />
                <h3 className='font-semibold'>Template-Based</h3>
                <p className='text-green-600 text-sm'>Pre-configured sections</p>
              </div>
            </div>

            <div className='text-center pt-4'>
              <Button
                size='lg'
                onClick={onStart}
                className='font-semibold px-12 py-3 text-lg w-48 bg-green-600 hover:bg-green-700 text-white transition-colors duration-200'>
                Start
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
