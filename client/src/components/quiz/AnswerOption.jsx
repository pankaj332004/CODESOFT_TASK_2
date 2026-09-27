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
}) => {
  const letter = OPTION_LETTERS[index] || String.fromCharCode(65 + index);

  let stateClass = '';
  if (isReview) {
    if (isCorrect) {
      stateClass = 'option-review-correct';
    } else if (isUserChoice && !isCorrect) {
      stateClass = 'option-review-wrong';
    }
  } else if (isSelected) {
    stateClass = 'option-selected';
  }

  return (
    <button
      type="button"
      className={`qm-answer-option ${stateClass}`}
      onClick={() => !disabled && onSelect(optionText)}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      <span className="option-letter-badge">{letter}</span>
      <span className="option-text-label">{optionText}</span>
    </button>
  );
};

export default AnswerOption;
