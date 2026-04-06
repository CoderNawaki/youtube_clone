import { Component } from 'react';
import ErrorState from './ErrorState';

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof console !== 'undefined') {
      console.error('Unhandled application error', {
        error,
        componentStack: errorInfo?.componentStack,
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorState
          title="Unexpected application error"
          message="The page failed to render. Try refreshing or returning to the homepage."
          onRetry={this.handleRetry}
        />
      );
    }

    return children;
  }
}

export default AppErrorBoundary;
