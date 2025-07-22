import { useState } from 'react';
import { useDocumentationGenerator } from './hooks/useDocumentationGenerator';
import { Header } from './components/Header';
import { MultiStepForm } from './components/MultiStepForm';
import { DocumentationSuccess } from './components/DocumentationSuccess';
import { ErrorMessage } from './components/ErrorMessage';
import { StartPage } from './components/StartPage';
import { DEFAULT_SECTIONS_CONFIG } from './components/steps/step-config';
import type { DynamicDocumentationFormData, SectionsConfig } from '@/lib/schemas';

export default function App() {
  const [showStartPage, setShowStartPage] = useState(true);
  const [sectionsConfig, setSectionsConfig] = useState<SectionsConfig>(DEFAULT_SECTIONS_CONFIG);
  const { isLoading, error, downloadUrl, markdownContent, generateDocumentation, clearError, resetState } = useDocumentationGenerator();

  const handleSubmit = (formData: DynamicDocumentationFormData) => generateDocumentation(formData);

  const handleReset = () => {
    resetState();
    setShowStartPage(true);
  };

  const handleStart = () => {
    setShowStartPage(false);
  };

  if (showStartPage) {
    return <StartPage onStart={handleStart} />;
  }

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center bg-background text-foreground p-4'>
      <Header
        title={
          <>
            Readme <span className='text-green-600'>Forge</span>
          </>
        }
        subtitle={
          <>
            <span className='text-yellow-300'>Craft</span> documentation with AI Tools
          </>
        }
      />

      <main className='w-full max-w-4xl'>
        {error && <ErrorMessage error={error} onDismiss={clearError} />}

        {downloadUrl ? (
          <DocumentationSuccess downloadUrl={downloadUrl} markdownContent={markdownContent || ''} onReset={handleReset} />
        ) : (
          <MultiStepForm onSubmit={handleSubmit} isLoading={isLoading} initialSectionsConfig={sectionsConfig} />
        )}
      </main>
    </div>
  );
}
