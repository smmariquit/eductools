import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="card bg-base-200 shadow-xl border border-error/30 max-w-lg w-full">
            <div className="card-body items-center">
              <h2 className="card-title text-error text-2xl mb-2">Something went wrong</h2>
              <p className="text-base-content/70 mb-4">
                This module didn't load properly. Try again, or head back home and reopen it.
              </p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => this.setState({ hasError: false, error: null })}
                >
                  Try Again
                </button>
                <Link to="/" className="btn btn-outline">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
