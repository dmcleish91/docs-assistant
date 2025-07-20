import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Card, CardContent } from '@/components/ui/card';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview = ({ content, className }: MarkdownPreviewProps) => {
  return (
    <Card className={`w-full bg-white/5 backdrop-blur-md border-white/20 ${className}`}>
      <CardContent className='p-6'>
        <div className='markdown-preview prose prose-invert max-w-none'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => <h1 className='text-2xl font-bold text-white mb-4 border-b border-white/20 pb-2'>{children}</h1>,
              h2: ({ children }) => <h2 className='text-xl font-bold text-white mb-3 mt-6'>{children}</h2>,
              h3: ({ children }) => <h3 className='text-lg font-bold text-white mb-2 mt-4'>{children}</h3>,
              p: ({ children }) => <p className='text-muted-foreground mb-3 leading-relaxed'>{children}</p>,
              ul: ({ children }) => <ul className='list-disc list-inside text-muted-foreground mb-3 space-y-1'>{children}</ul>,
              ol: ({ children }) => <ol className='list-decimal list-inside text-muted-foreground mb-3 space-y-1'>{children}</ol>,
              li: ({ children }) => <li className='text-muted-foreground'>{children}</li>,
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className='bg-gray-800 text-green-400 px-1 py-0.5 rounded text-sm font-mono'>{children}</code>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className='bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto mb-4'>{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className='border-l-4 border-green-400 pl-4 italic text-muted-foreground mb-3'>{children}</blockquote>
              ),
              a: ({ children, href }) => (
                <a href={href} className='text-green-400 hover:text-green-300 underline' target='_blank' rel='noopener noreferrer'>
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className='overflow-x-auto mb-4'>
                  <table className='min-w-full border border-gray-700 rounded-lg'>{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className='border border-gray-700 px-4 py-2 text-left font-bold text-white bg-gray-800'>{children}</th>
              ),
              td: ({ children }) => <td className='border border-gray-700 px-4 py-2 text-muted-foreground'>{children}</td>,
            }}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
};
