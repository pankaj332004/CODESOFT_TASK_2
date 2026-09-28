import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/quizzes';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--qm-bg, #0d1117)',
          color: 'var(--qm-text-primary, #f0f6fc)'
        }}>
          <div style={{
            maxWidth: '520px',
            background: 'var(--qm-card-bg, #161b22)',
            border: '1px solid var(--qm-border, #30363d)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.36)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Something went wrong
            </h2>
            <p style={{ color: 'var(--qm-text-secondary, #8b949e)', fontSize: '0.95rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              An unexpected error occurred while loading this view. You can return to the quizzes list or reload.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'var(--qm-primary, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Go to Quizzes
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'inherit',
                  border: '1px solid var(--qm-border, #30363d)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
