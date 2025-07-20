import { Component } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-white p-4'>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl text-center max-w-md'>
              <h2 className='text-xl md:text-2xl font-bold mb-4'>⚠️ Something went wrong</h2>
              <p className='text-white/90 mb-6 leading-relaxed text-sm md:text-base'>
                We encountered an unexpected error. Please refresh the page and try again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className='bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors duration-200 text-sm md:text-base'>
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
