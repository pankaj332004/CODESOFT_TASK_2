import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { QuizLogo } from '../../assets/icons/CategoryIcons';
import { StackedBooks, QuizNotepad } from '../../assets/illustrations/Illustrations';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/quizzes', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer hideNavbar hideFooter maxWidth="1000px" className="qm-auth-page">
      <div className="qm-auth-card-wrapper">
        <div className="qm-auth-card">
          <div className="qm-auth-logo-header">
            <Link to="/">
              <QuizLogo size={36} />
            </Link>
            <h1 className="qm-auth-title">Create an Account</h1>
            <p className="qm-auth-subtitle">Join thousands of students and creators today.</p>
          </div>

          {error && (
            <div className="qm-form-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="qm-auth-form">
            <Input
              label="Full Name"
              id="register-name"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={18} />}
              required
            />

            <Input
              label="Email Address"
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={18} />}
              required
            />

            <Input
              label="Password"
              id="register-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={18} />}
              required
            />

            <Input
              label="Confirm Password"
              id="register-confirm-password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Get Started
            </Button>
          </form>

          <p className="auth-switch-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">
              Sign in
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

export default Register;
