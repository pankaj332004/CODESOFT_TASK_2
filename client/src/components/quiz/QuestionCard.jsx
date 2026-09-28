import React from 'react';
import AnswerOption from './AnswerOption';
import Button from '../common/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Sparkles, Flag } from 'lucide-react';

export const QuestionCard = ({
  question,
  currentIndex = 0,
  totalQuestions = 1,
  selectedAnswer = '',
  onSelectAnswer,
  onPrev,
  onNext,
  onSubmit,
  isLast = false,
  submitting = false,
  quizMode = 'practice',
  feedback = null,
  onRetry = null,
  isFlagged = false,
  onToggleFlag = null,
}) => {
  if (!question) return null;

  const hasAnswered = Boolean(selectedAnswer);
  const isPracticeMode = quizMode === 'practice';
  const showFeedback = isPracticeMode && hasAnswered && feedback;

  return (
    <div className="qm-question-card-inner">
      {/* Top Question Meta & Concept Tag */}
      <div className="qm-question-header-meta">
        <span className="qm-question-number-pill">
          Question {currentIndex + 1} / {totalQuestions}
        </span>
        {question.concept && (
          <span className="qm-question-concept-pill">
            <Sparkles size={13} className="concept-pill-icon" />
            {question.concept}
          </span>
        )}
      </div>

      <h2 className="qm-question-headline">
        {question.questionText}
      </h2>

      {/* Answer Options List */}
      <div className="qm-options-list">
        {question.options?.map((opt, idx) => {
          let feedbackState = null;
          if (showFeedback && feedback) {
            if (String(opt).trim() === String(feedback.correctAnswer).trim()) {
              feedbackState = 'correct';
            } else if (String(opt).trim() === String(feedback.selectedAnswer).trim() && !feedback.isCorrect) {
              feedbackState = 'incorrect';
            }
          }

          const isSelected = Boolean(selectedAnswer) && String(selectedAnswer).trim() === String(opt).trim();

          return (
            <AnswerOption
              key={idx}
              index={idx}
              optionText={opt}
              isSelected={isSelected}
              feedbackState={feedbackState}
              onSelect={onSelectAnswer}
              disabled={submitting}
            />
          );
        })}
      </div>

      {/* Mark For Review (Flag) Action */}
      {onToggleFlag && (
        <div className="qm-flag-action-row">
          <button
            type="button"
            className={`qm-flag-toggle-btn ${isFlagged ? 'is-flagged' : ''}`}
            onClick={() => onToggleFlag(currentIndex)}
            aria-pressed={isFlagged}
          >
            <Flag size={15} className="flag-icon" fill={isFlagged ? 'currentColor' : 'none'} />
            <span>{isFlagged ? '⚑ Marked for review' : '⚑ Mark for review'}</span>
          </button>
        </div>
      )}

      {/* Live Learning Mode Feedback Banner */}
      {showFeedback && (
        <div className={`qm-learning-feedback-card ${feedback.isCorrect ? 'fb-correct' : 'fb-incorrect'}`}>
          {feedback.isCorrect ? (
            <>
              <div className="qm-fb-title-row">
                <span className="qm-fb-badge badge-green">✓ Correct!</span>
              </div>
              <p className="qm-fb-explanation-body">
                {feedback.explanation || question.explanation || 'Great job! You selected the right answer.'}
              </p>
              <div className="qm-fb-concept-tag">
                <span className="concept-lead-text">Concept:</span>
                <span className="concept-trail-text">
                  {feedback.concept || question.concept || 'General Knowledge'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="qm-fb-title-row">
                <span className="qm-fb-badge badge-red">✕ Not quite</span>
              </div>

              <div className="qm-fb-comparison-grid">
                <div className="comparison-row">
                  <span className="comparison-label">You selected:</span>
                  <span className="comparison-value value-wrong">{feedback.selectedAnswer}</span>
                </div>
                <div className="comparison-row">
                  <span className="comparison-label">Correct answer:</span>
                  <span className="comparison-value value-right">{feedback.correctAnswer}</span>
                </div>
              </div>

              <div className="qm-fb-quick-explanation">
                <h4 className="quick-exp-title">Quick explanation:</h4>
                <p className="qm-fb-explanation-body">
                  {feedback.quickExplanation || feedback.explanation || question.quickExplanation || question.explanation}
                </p>
              </div>

              <div className="qm-fb-concept-tag">
                <span className="concept-lead-text">Concept:</span>
                <span className="concept-trail-text">
                  {feedback.concept || question.concept || 'General Knowledge'}
                </span>
              </div>

              {onRetry && (
                <div className="qm-fb-retry-row">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRetry(currentIndex)}
                    icon={<RotateCcw size={14} />}
                    iconPosition="left"
                    className="qm-retry-btn"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="qm-question-nav-bar">
        <Button
          variant="outline"
          size="md"
          onClick={onPrev}
          disabled={currentIndex === 0 || submitting}
          icon={<ArrowLeft size={18} />}
          iconPosition="left"
          className="qm-nav-prev-btn"
        >
          Previous
        </Button>

        {isLast ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => onSubmit && onSubmit(false)}
            loading={submitting}
            icon={<CheckCircle2 size={18} />}
            iconPosition="right"
            className="qm-nav-submit-btn"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            disabled={submitting}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            className="qm-nav-next-btn"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
