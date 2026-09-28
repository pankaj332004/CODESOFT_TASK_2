import React, { useState } from 'react';
import { Compass, Check, X, Flag, AlertCircle, LayoutGrid, ListFilter } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export const QuestionNavigator = ({
  totalQuestions = 1,
  currentIndex = 0,
  onSelectQuestion,
  selectedAnswers = {},
  checkedFeedback = {},
  flaggedQuestions = {},
  quizMode = 'practice',
  onSubmitQuiz = null,
}) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'flagged' | 'unanswered'

  // Calculations
  const answeredCount = Object.keys(selectedAnswers).filter((k) => selectedAnswers[k] !== undefined).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);
  const flaggedCount = Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[k]).length;

  return (
    <>
      <div className="qm-question-navigator-card">
        {/* Header */}
        <div className="qm-navigator-header">
          <div className="qm-navigator-title-row">
            <Compass size={18} className="qm-navigator-icon" />
            <h3 className="qm-navigator-title">Questions</h3>
            
            {/* View Mode Toggle */}
            <div className="nav-view-toggle">
              <button
                type="button"
                className={`toggle-icon-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
                aria-label="List View"
              >
                <ListFilter size={14} />
              </button>
              <button
                type="button"
                className={`toggle-icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>

          <span className="qm-navigator-indicator">
            Question <strong>{currentIndex + 1}</strong> of {totalQuestions}
          </span>
        </div>

        {/* LIST VIEW (Matching: 1 ✓, 2 ✓, 3 ⚑, 4 ✓, 5 ○, 6 ●) */}
        {viewMode === 'list' ? (
          <div className="qm-navigator-status-list" role="navigation" aria-label="Question list status">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const isCurrent = idx === currentIndex;
              const isFlagged = Boolean(flaggedQuestions[idx]);
              const isAnswered = selectedAnswers[idx] !== undefined && selectedAnswers[idx] !== '';

              let symbol = '○';
              let statusLabel = 'Unanswered';
              let rowClass = 'status-unanswered';

              if (isFlagged) {
                symbol = '⚑';
                statusLabel = isCurrent ? 'Marked for review (Current)' : 'Marked for review';
                rowClass = 'status-flagged';
              } else if (isAnswered) {
                symbol = '✓';
                statusLabel = isCurrent ? 'Answered (Current)' : 'Answered';
                rowClass = 'status-answered';
              } else if (isCurrent) {
                symbol = '●';
                statusLabel = 'Current';
                rowClass = 'status-current';
              }

              if (isCurrent) {
                rowClass += ' is-current-active';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={`qm-nav-list-row ${rowClass}`}
                  onClick={() => onSelectQuestion(idx)}
                  aria-label={`Question ${idx + 1}, ${statusLabel}`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <span className="row-num">{idx + 1}</span>
                  <span className="row-symbol">{symbol}</span>
                  <span className="row-label">{statusLabel}</span>
                </button>
              );
            })}
          </div>
        ) : (
          /* GRID VIEW: [1] [2] [3] ... */
          <div className="qm-navigator-grid" role="navigation" aria-label="Question grid">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const isCurrent = idx === currentIndex;
              const isFlagged = Boolean(flaggedQuestions[idx]);
              const isAnswered = selectedAnswers[idx] !== undefined && selectedAnswers[idx] !== '';
              const feedback = checkedFeedback[idx];

              let stateClass = 'nav-unanswered';
              let statusIcon = null;

              if (isFlagged) {
                stateClass = 'nav-flagged';
                statusIcon = <Flag size={10} fill="currentColor" />;
              } else if (quizMode === 'practice' && feedback) {
                if (feedback.isCorrect) {
                  stateClass = 'nav-correct';
                  statusIcon = <Check size={11} strokeWidth={3} />;
                } else {
                  stateClass = 'nav-incorrect';
                  statusIcon = <X size={11} strokeWidth={3} />;
                }
              } else if (isAnswered) {
                stateClass = 'nav-answered';
                statusIcon = <Check size={11} strokeWidth={3} />;
              } else if (isCurrent) {
                stateClass = 'nav-current';
              }

              if (isCurrent) {
                stateClass += ' nav-active-border';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={`qm-nav-grid-btn ${stateClass}`}
                  onClick={() => onSelectQuestion(idx)}
                  aria-label={`Go to question ${idx + 1}`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <span className="nav-btn-num">{idx + 1}</span>
                  {statusIcon && <span className="nav-btn-status">{statusIcon}</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Summary Messages Matching:
            You have 2 unanswered questions
            You have 1 question marked for review
            [ Review Before Submit ]
        */}
        <div className="qm-navigator-summary-card">
          <div className="summary-texts">
            {unansweredCount > 0 ? (
              <p className="summary-line line-unanswered">
                <AlertCircle size={14} className="sum-icon" />
                <span>You have <strong>{unansweredCount}</strong> unanswered question{unansweredCount > 1 ? 's' : ''}</span>
              </p>
            ) : (
              <p className="summary-line line-all-answered">
                <Check size={14} className="sum-icon icon-green" />
                <span>All questions answered!</span>
              </p>
            )}

            {flaggedCount > 0 && (
              <p className="summary-line line-flagged">
                <Flag size={14} className="sum-icon icon-yellow" fill="currentColor" />
                <span>You have <strong>{flaggedCount}</strong> question{flaggedCount > 1 ? 's' : ''} marked for review</span>
              </p>
            )}
          </div>

          <button
            type="button"
            className="qm-review-submit-btn"
            onClick={() => setShowReviewModal(true)}
          >
            Review Before Submit
          </button>
        </div>

        {/* Legend */}
        <div className="qm-navigator-legend">
          <div className="legend-item">
            <span className="legend-symbol">✓</span>
            <span>Answered</span>
          </div>
          <div className="legend-item">
            <span className="legend-symbol symbol-flag">⚑</span>
            <span>Flagged</span>
          </div>
          <div className="legend-item">
            <span className="legend-symbol">○</span>
            <span>Unanswered</span>
          </div>
          <div className="legend-item">
            <span className="legend-symbol symbol-current">●</span>
            <span>Current</span>
          </div>
        </div>
      </div>

      {/* Review Before Submit Modal */}
      {showReviewModal && (
        <Modal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          title="Review Your Quiz Progress"
          size="md"
        >
          <div className="qm-review-modal-body">
            <p className="review-modal-desc">
              Review your answers, jump to flagged items, and make any final changes before submitting.
            </p>

            {/* Filter Pills */}
            <div className="review-filter-tabs">
              <button
                type="button"
                className={`filter-tab ${filterMode === 'all' ? 'active' : ''}`}
                onClick={() => setFilterMode('all')}
              >
                All ({totalQuestions})
              </button>
              <button
                type="button"
                className={`filter-tab ${filterMode === 'flagged' ? 'active' : ''}`}
                onClick={() => setFilterMode('flagged')}
              >
                Marked for Review ({flaggedCount})
              </button>
              <button
                type="button"
                className={`filter-tab ${filterMode === 'unanswered' ? 'active' : ''}`}
                onClick={() => setFilterMode('unanswered')}
              >
                Unanswered ({unansweredCount})
              </button>
            </div>

            {/* Question Quick Jump List */}
            <div className="review-questions-scroll">
              {Array.from({ length: totalQuestions })
                .map((_, originalIdx) => originalIdx)
                .filter((realIndex) => {
                  const isFlagged = Boolean(flaggedQuestions[realIndex]);
                  const isAnswered = selectedAnswers[realIndex] !== undefined && selectedAnswers[realIndex] !== '';
                  if (filterMode === 'flagged') return isFlagged;
                  if (filterMode === 'unanswered') return !isAnswered;
                  return true;
                })
                .map((realIndex) => {
                  const isAnswered = selectedAnswers[realIndex] !== undefined && selectedAnswers[realIndex] !== '';
                  const isFlagged = Boolean(flaggedQuestions[realIndex]);

                  return (
                    <div
                      key={realIndex}
                      className="review-item-row"
                      onClick={() => {
                        onSelectQuestion(realIndex);
                        setShowReviewModal(false);
                      }}
                    >
                      <div className="review-item-left">
                        <span className="review-q-num">Q{realIndex + 1}</span>
                        <span className="review-q-status">
                          {isAnswered ? (
                            <span className="badge-answered">Answered: {selectedAnswers[realIndex]}</span>
                          ) : (
                            <span className="badge-unanswered">Not answered yet</span>
                          )}
                        </span>
                      </div>

                      <div className="review-item-right">
                        {isFlagged && <span className="flag-pill">⚑ Review</span>}
                        <span className="jump-link">Jump ➔</span>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Actions */}
            <div className="review-modal-actions">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowReviewModal(false)}
              >
                Continue Quiz
              </Button>
              {onSubmitQuiz && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setShowReviewModal(false);
                    onSubmitQuiz();
                  }}
                >
                  Submit Quiz Now
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default QuestionNavigator;
