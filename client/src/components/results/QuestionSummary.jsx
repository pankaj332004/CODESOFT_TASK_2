import React from 'react';

export const QuestionSummary = ({
  answers = [],
  onSelectQuestion,
  activeIndex = null,
}) => {
  return (
    <div className="qm-question-summary-wrap">
      <h3 className="qm-summary-heading">Question Summary</h3>
      
      <div className="qm-summary-dots-row">
        {answers.map((ans, idx) => {
          const isCorrect = ans.isCorrect;
          const statusClass = isCorrect ? 'status-correct' : 'status-incorrect';
          const isSelected = activeIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              className={`summary-num-circle ${statusClass} ${isSelected ? 'active-ring' : ''}`}
              onClick={() => onSelectQuestion && onSelectQuestion(idx)}
              title={`Question ${idx + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`}
              aria-label={`Question ${idx + 1}: ${isCorrect ? 'Correct' : 'Incorrect'}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionSummary;
