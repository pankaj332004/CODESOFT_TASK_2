import React from 'react';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const AnswerOption = ({
  optionText,
  index = 0,
  isSelected = false,
  onSelect,
  disabled = false,
  isReview = false,
  isCorrect = false,
  isUserChoice = false,
  feedbackState = null, // 'correct' | 'incorrect' | null
}) => {
  const letter = OPTION_LETTERS[index] || String.fromCharCode(65 + index);

  let stateClasses = [];
  let statusIcon = null;

  if (feedbackState === 'correct') {
    stateClasses.push('option-practice-correct');
    statusIcon = <span className="option-status-tag tag-correct">✓ Correct</span>;
  } else if (feedbackState === 'incorrect') {
    stateClasses.push('option-practice-wrong');
    statusIcon = <span className="option-status-tag tag-wrong">✕ Your choice</span>;
  } else if (isReview) {
    if (isCorrect) {
      stateClasses.push('option-review-correct');
    } else if (isUserChoice && !isCorrect) {
      stateClasses.push('option-review-wrong');
    }
  }

  if (isSelected) {
    stateClasses.push('option-selected');
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled && onSelect) {
      onSelect(optionText);
    }
  };

  return (
    <button
      type="button"
      className={`qm-answer-option ${stateClasses.join(' ')}`}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      <span className="option-letter-badge">{letter}</span>
      <span className="option-text-label">{optionText}</span>
      {statusIcon}
    </button>
  );
};

export default AnswerOption;
