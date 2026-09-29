import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneratedQuestion from './components/GeneratedQuestion';
import Button from '../../components/common/Button';
import {
  RotateCcw,
  Edit3,
  Check,
  Save,
  ArrowLeft,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
  Award,
  Play,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export const AIQuizPreview = ({
  quizData,
  onRegenerate,
  onBackToGenerator,
  onSaveQuiz,
  saving,
  savedQuiz,
  onDeleteQuiz,
  deleting,
}) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(quizData.questions || []);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(quizData.title || 'AI Generated Quiz');
  const [description, setDescription] = useState(quizData.description || '');

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const updated = [...questions];
    updated[index] = updatedQuestion;
    setQuestions(updated);
  };

  const handleDeleteQuestion = (index) => {
    if (questions.length <= 1) {
      alert('A quiz must have at least one question.');
      return;
    }
    const updated = questions.filter((_, idx) => idx !== index);
    setQuestions(updated);
  };

  const handleSave = () => {
    const updatedQuiz = {
      ...quizData,
      title,
      description,
      questions,
    };
    onSaveQuiz(updatedQuiz);
  };

  const handleOpenInManualBuilder = () => {
    navigate('/create-quiz', {
      state: {
        prefilledQuiz: {
          title,
          description,
          category: quizData.category || 'General Knowledge',
          timeLimitMinutes: quizData.timeLimitMinutes || 10,
          questions: questions.map((q) => ({
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        },
      },
    });
  };

  return (
    <div className="qm-ai-preview-container">
      {/* Top Bar with Back Button */}
      <div className="qm-ai-preview-nav">
        <button
          type="button"
          className="qm-ai-back-btn"
          onClick={onBackToGenerator}
        >
          <ArrowLeft size={16} /> Back to Generator
        </button>

        <div className="qm-ai-preview-pill">
          {savedQuiz ? (
            <span className="saved-status-text">
              <CheckCircle2 size={15} /> Saved in Database
            </span>
          ) : (
            <span>
              <Sparkles size={14} className="sparkle-icon" /> AI Quiz Preview
            </span>
          )}
        </div>
      </div>

      {/* Saved Success Alert Banner */}
      {savedQuiz && (
        <div className="qm-ai-saved-alert-banner">
          <div className="saved-alert-left">
            <CheckCircle2 size={24} className="saved-check-icon" />
            <div>
              <h3 className="saved-alert-title">Quiz Successfully Saved to Database!</h3>
              <p className="saved-alert-desc">
                Your AI quiz is now live in your personal catalog. You can practice it, share it, or delete it anytime.
              </p>
            </div>
          </div>
          <div className="saved-alert-actions">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/take-quiz/${savedQuiz._id}`)}
              icon={<Play size={16} fill="currentColor" />}
            >
              Practice Now
            </Button>
          </div>
        </div>
      )}

      {/* Quiz Header Slate */}
      <div className="qm-ai-preview-header-card">
        <div className="qm-ai-preview-title-row">
          {isEditing ? (
            <input
              type="text"
              className="qm-ai-preview-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quiz Title"
            />
          ) : (
            <h1 className="qm-ai-preview-title">{title}</h1>
          )}

          <div className="qm-ai-preview-badges">
            <span className="qm-ai-meta-badge">
              <Layers size={14} /> {questions.length} Questions
            </span>
            <span className={`qm-ai-meta-badge diff-${(quizData.difficulty || 'medium').toLowerCase()}`}>
              <Award size={14} /> {quizData.difficulty || 'Medium'}
            </span>
            <span className="qm-ai-meta-badge">
              <Clock size={14} /> ~{quizData.timeLimitMinutes || 10} Mins
            </span>
            {quizData.category && (
              <span className="qm-ai-meta-badge category-badge">
                {quizData.category}
              </span>
            )}
          </div>
        </div>

        {isEditing ? (
          <textarea
            className="qm-ai-preview-desc-input"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description..."
          />
        ) : (
          <p className="qm-ai-preview-desc">{description}</p>
        )}
      </div>

      {/* Question Cards List */}
      <div className="qm-ai-preview-questions-list">
        {questions.map((q, idx) => (
          <GeneratedQuestion
            key={idx}
            question={q}
            index={idx}
            isEditing={isEditing}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </div>

      {/* Floating or Sticky Action Footer */}
      <div className="qm-ai-preview-actions-bar">
        {savedQuiz ? (
          /* Post-save action controls */
          <div className="qm-ai-saved-footer-row">
            <div className="qm-ai-actions-left">
              <Button
                variant="outline"
                size="md"
                onClick={onBackToGenerator}
                icon={<Sparkles size={16} />}
              >
                Generate Another Quiz
              </Button>

              <Button
                variant="ghost"
                size="md"
                onClick={() => navigate('/quizzes')}
              >
                View in Catalog
              </Button>
            </div>

            <div className="qm-ai-actions-right">
              <Button
                variant="danger"
                size="md"
                onClick={() => onDeleteQuiz(savedQuiz._id)}
                loading={deleting}
                icon={<Trash2 size={16} />}
              >
                Delete This Quiz
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(`/take-quiz/${savedQuiz._id}`)}
                icon={<Play size={18} fill="currentColor" />}
                className="qm-ai-save-btn"
              >
                Start Quiz Now
              </Button>
            </div>
          </div>
        ) : (
          /* Pre-save action controls */
          <>
            <div className="qm-ai-actions-left">
              <Button
                variant="outline"
                size="md"
                onClick={onRegenerate}
                disabled={saving}
                icon={<RotateCcw size={16} />}
              >
                Regenerate
              </Button>

              <Button
                variant={isEditing ? 'success' : 'secondary'}
                size="md"
                onClick={() => setIsEditing(!isEditing)}
                disabled={saving}
                icon={isEditing ? <Check size={16} /> : <Edit3 size={16} />}
              >
                {isEditing ? 'Done Editing' : 'Edit Quiz'}
              </Button>
            </div>

            <div className="qm-ai-actions-right">
              <button
                type="button"
                className="qm-ai-manual-builder-link"
                onClick={handleOpenInManualBuilder}
                title="Open in full manual quiz creator"
              >
                <span>Open in Manual Builder</span>
                <ExternalLink size={14} />
              </button>

              <Button
                variant="primary"
                size="lg"
                onClick={handleSave}
                loading={saving}
                icon={<Save size={18} />}
                className="qm-ai-save-btn"
              >
                Save to Database
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIQuizPreview;
