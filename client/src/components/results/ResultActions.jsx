import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { ArrowLeft, RotateCcw, Eye, Share2 } from 'lucide-react';

export const ResultActions = ({
  onReview,
  onRetake,
  onBackToHome,
  onShare,
  showReviewButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="qm-result-actions-container">
      <div className="qm-primary-actions-row">
        {showReviewButton && (
          <Button
            variant="primary"
            size="md"
            onClick={onReview}
            icon={<Eye size={18} />}
            iconPosition="left"
            className="review-answers-btn"
          >
            Review Answers
          </Button>
        )}

        <Button
          variant="outline"
          size="md"
          onClick={onRetake || (() => navigate('/quizzes'))}
          icon={<RotateCcw size={18} />}
          iconPosition="left"
          className="take-another-btn"
        >
          Take Another Quiz
        </Button>
      </div>

      <div className="qm-secondary-actions-row">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToHome || (() => navigate('/'))}
          icon={<ArrowLeft size={16} />}
          iconPosition="left"
          className="back-to-home-btn"
        >
          Back to Home
        </Button>

        {onShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            icon={<Share2 size={16} />}
            iconPosition="left"
            className="share-score-btn"
          >
            Share Result
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultActions;
