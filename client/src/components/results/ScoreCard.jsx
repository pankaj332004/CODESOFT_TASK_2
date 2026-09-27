import React from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/formatTime';

export const ScoreCard = ({
  score = 0,
  total = 0,
  percentage = 0,
  timeTakenSeconds = 0,
}) => {
  const isHighScorer = percentage >= 70;
  const isPassing = percentage >= 50;

  const badgeColorClass = isHighScorer
    ? 'badge-success'
    : isPassing
    ? 'badge-warning'
    : 'badge-danger';

  return (
    <div className="qm-score-card-grid">
      {/* Score Box */}
      <div className="qm-result-stat-box">
        <span className="stat-label">Your Score</span>
        <div className="stat-value-row">
          <span className="score-big-text">
            {score} <span className="score-slash">/ {total}</span>
          </span>
        </div>
        <div className={`score-percent-pill ${badgeColorClass}`}>
          {percentage}%
        </div>
      </div>

      {/* Time Taken Box */}
      <div className="qm-result-stat-box">
        <span className="stat-label">Time Taken</span>
        <div className="stat-value-row time-row">
          <Clock size={20} className="result-clock-icon" />
          <span className="time-big-text">{formatTime(timeTakenSeconds, true)}</span>
        </div>
        <div className="stat-sub-info">
          Average {total > 0 ? Math.round(timeTakenSeconds / total) : 0}s per question
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
