import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatTime';

export const QuizTimer = ({
  seconds = 0,
  isCountdown = false,
  timeLimit = 10,
}) => {
  const displaySeconds = isCountdown
    ? Math.max(0, timeLimit * 60 - seconds)
    : seconds;

  const isLowTime = isCountdown && displaySeconds <= 60 && displaySeconds > 15;
  const isCritical = isCountdown && displaySeconds <= 15;

  return (
    <div
      className={`qm-quiz-timer-pill ${isLowTime ? 'time-warning' : ''} ${isCritical ? 'time-critical' : ''}`}
      role="timer"
      aria-live="polite"
      aria-label={isCountdown ? `Time remaining: ${formatTime(displaySeconds, false)}` : `Time elapsed: ${formatTime(seconds, false)}`}
    >
      <Clock size={16} className={`timer-icon ${isCritical ? 'timer-pulse-fast' : ''}`} />
      <span className="timer-digits">{formatTime(displaySeconds, false)}</span>
      {isCountdown && (
        <span className="timer-mode-tag">
          {isCritical ? 'Final Seconds!' : isLowTime ? 'Ending Soon' : 'Remaining'}
        </span>
      )}
    </div>
  );
};

export default QuizTimer;
