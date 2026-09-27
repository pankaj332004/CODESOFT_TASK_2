import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatTime';

export const QuizTimer = ({ seconds = 0, isCountdown = false, timeLimit = 0 }) => {
  const displaySeconds = isCountdown
    ? Math.max(0, timeLimit * 60 - seconds)
    : seconds;

  const isLowTime = isCountdown && displaySeconds <= 60;

  return (
    <div className={`qm-quiz-timer-pill ${isLowTime ? 'time-warning' : ''}`}>
      <Clock size={16} className="timer-icon" />
      <span className="timer-digits">{formatTime(displaySeconds, false)}</span>
    </div>
  );
};

export default QuizTimer;
