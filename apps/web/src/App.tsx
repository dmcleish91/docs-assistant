import './App.css';
import { useConversation } from './hooks/useConversation';
import { Header } from './components/Header';
import { DocumentationForm } from './components/DocumentationForm';
import { Conversation } from './components/Conversation';
import { ErrorMessage } from './components/ErrorMessage';

export default function App() {
  const { messages, currentTopic, isLoading, error, startConversation, sendResponse, downloadReadme, clearError, resetConversation } =
    useConversation();

  const handleSubmit = async (topic: string) => {
    await startConversation(topic);
  };

  const isInConversation = currentTopic && messages.length > 0;

  return (
    <div className='App'>
      <Header title='📚 Documentation Assistant' subtitle='Generate markdown documentation with AI' />

      <main className='App-main'>
        {error && <ErrorMessage error={error} onDismiss={clearError} />}

        {!isInConversation ? (
          <DocumentationForm onSubmit={handleSubmit} isLoading={isLoading} error={error} onErrorDismiss={clearError} />
        ) : (
          <Conversation
            messages={messages}
            currentTopic={currentTopic}
            isLoading={isLoading}
            onSendResponse={sendResponse}
            onDownloadReadme={downloadReadme}
            onReset={resetConversation}
          />
        )}
      </main>
    </div>
  );
}
