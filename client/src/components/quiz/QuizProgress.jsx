import React from 'react';

export const QuizProgress = ({ current = 1, total = 10 }) => {
  const safeTotal = Math.max(1, total);
  const percentage = Math.min(100, Math.round((current / safeTotal) * 100));

  return (
    <div className="qm-quiz-progress-wrap">
      <div className="qm-progress-track">
        <div
          className="qm-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="qm-question-counter-title">
        Question {current}/{total}
      </div>
    </div>
  );
};

export default QuizProgress;
