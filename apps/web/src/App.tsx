import { useDocumentationGenerator } from './hooks/useDocumentationGenerator';
import { Header } from './components/Header';
import { DocumentationForm } from './components/DocumentationForm';
import { DocumentationSuccess } from './components/DocumentationSuccess';
import { ErrorMessage } from './components/ErrorMessage';

export default function App() {
  const { isLoading, error, downloadUrl, generateDocumentation, clearError, resetState } = useDocumentationGenerator();

  const handleSubmit = async (formData: any) => {
    await generateDocumentation(formData);
  };

  const handleReset = () => {
    resetState();
  };

  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-center bg-background text-foreground p-4'>
      <Header title='📚 Documentation Generator' subtitle='Generate comprehensive README files with AI' />

      <main className='w-full max-w-4xl'>
        {error && <ErrorMessage error={error} onDismiss={clearError} />}

        {downloadUrl ? (
          <DocumentationSuccess downloadUrl={downloadUrl} onReset={handleReset} />
        ) : (
          <DocumentationForm onSubmit={handleSubmit} isLoading={isLoading} error={error} onErrorDismiss={clearError} />
        )}
      </main>
    </div>
  );
}
