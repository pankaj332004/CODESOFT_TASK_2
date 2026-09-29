import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import quizService from '../../services/quizService';
import { Lock, Key, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ExamPasscodeModal = ({ isOpen, onClose, quiz, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);

  if (!isOpen || !quiz) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the exam passcode.');
      return;
    }

    setVerifying(true);
    setError(null);

    try {
      const res = await quizService.verifyPasscode(quiz._id, passcode.trim());
      if (res.valid) {
        sessionStorage.setItem(`quiz_unlocked_${quiz._id}`, 'true');
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      } else {
        setError(res.message || 'Incorrect passcode. Please check with your instructor.');
      }
    } catch (err) {
      console.error('Passcode verification error:', err);
      setError(err.message || 'Invalid exam passcode.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Private Exam Passcode"
      maxWidth="460px"
    >
      <div className="qm-passcode-modal-content">
        <div className="passcode-modal-icon-wrap">
          <Lock size={36} />
        </div>

        <h3 className="passcode-modal-title">Exam Access Required</h3>
        <p className="passcode-modal-desc">
          <strong>{quiz.title}</strong> is restricted by <strong>{quiz.creatorName || 'the instructor'}</strong>.
          Please enter your access passcode (PIN) to take this exam.
        </p>

        {error && (
          <div className="passcode-error-box">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="passcode-modal-form">
          <div className="passcode-input-group">
            <Key size={18} className="passcode-field-icon" />
            <input
              type="text"
              autoFocus
              className="passcode-modal-input"
              placeholder="e.g. EXAM-8291"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value.toUpperCase());
                if (error) setError(null);
              }}
              maxLength={20}
            />
          </div>

          <div className="passcode-modal-actions">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={verifying}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={verifying}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
              className="passcode-submit-btn"
            >
              Unlock & Begin
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ExamPasscodeModal;
