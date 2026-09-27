import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { QuizLogo } from '../../assets/icons/CategoryIcons';
import { StackedBooks, QuizNotepad } from '../../assets/illustrations/Illustrations';
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, guestLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/quizzes';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login('demo@quizmaker.com', 'password123');
      navigate(from, { replace: true });
    } catch (err) {
      setError('Demo login failed. Trying guest mode...');
      guestLogin();
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    guestLogin();
    navigate(from, { replace: true });
  };

  return (
    <PageContainer hideNavbar hideFooter maxWidth="1000px" className="qm-auth-page">
      <div className="qm-auth-card-wrapper">
        <div className="qm-auth-card">
          <div className="qm-auth-logo-header">
            <Link to="/">
              <QuizLogo size={36} />
            </Link>
            <h1 className="qm-auth-title">Welcome Back!</h1>
            <p className="qm-auth-subtitle">Log in to track your scores, create tests, and compete.</p>
          </div>

          {error && (
            <div className="qm-form-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="qm-auth-form">
            <Input
              label="Email Address"
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="auth-submit-btn"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          <div className="auth-divider">
            <span>or try with one click</span>
          </div>

          <div className="auth-quick-actions">
            <Button
              variant="secondary"
              size="md"
              onClick={handleDemoLogin}
              icon={<Sparkles size={16} />}
              className="quick-demo-btn"
            >
              One-Click Demo Account
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleGuestLogin}
              className="quick-guest-btn"
            >
              Continue as Guest Learner
            </Button>
          </div>

          <p className="auth-switch-text">
            Don't have an account?{' '}
            <Link to="/register" className="auth-switch-link">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Auth Art Column */}
        <div className="qm-auth-art-column" aria-hidden="true">
          <div className="auth-art-badge">
            <QuizNotepad width={200} height={220} />
          </div>
          <div className="auth-art-books">
            <StackedBooks width={220} height={150} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;
