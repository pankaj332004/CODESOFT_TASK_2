import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { Lock, LogIn, UserPlus, X } from 'lucide-react';

export const LoginPromptModal = ({ isOpen, onClose, targetUrl = '/quizzes' }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login', { state: { from: { pathname: targetUrl }, message: 'Please login to attend the quiz' } });
  };

  const handleRegister = () => {
    onClose();
    navigate('/register', { state: { from: { pathname: targetUrl }, message: 'Create an account to attend the quiz' } });
  };

  return (
    <div className="qm-modal-overlay" onClick={onClose}>
      <div className="qm-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="qm-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="qm-modal-icon-badge">
          <Lock size={32} />
        </div>

        <h3 className="qm-modal-title">Login Required</h3>
        <p className="qm-modal-message">
          Please login to attend the quiz. Creating or signing into an account saves your score, tracks your learning progress, and unlocks the leaderboard!
        </p>

        <div className="qm-modal-actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleLogin}
            icon={<LogIn size={18} />}
            iconPosition="left"
            className="w-full"
          >
            Login to Attend
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleRegister}
            icon={<UserPlus size={18} />}
            iconPosition="left"
            className="w-full"
          >
            Create an Account
          </Button>
        </div>

        <button className="qm-modal-cancel-text" onClick={onClose}>
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default LoginPromptModal;
