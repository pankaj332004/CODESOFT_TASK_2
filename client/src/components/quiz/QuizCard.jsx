import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '../../assets/icons/CategoryIcons';
import { Timer, Play } from 'lucide-react';
import Button from '../common/Button';

export const QuizCard = ({ quiz, onTakeQuiz }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (onTakeQuiz) {
      onTakeQuiz(quiz, 'exam');
    } else {
      navigate(`/take-quiz/${quiz._id}?mode=exam`);
    }
  };

  const questionCount = quiz.questions?.length || 0;
  const timeLimit = quiz.timeLimitMinutes || 10;

  return (
    <div className="qm-quiz-card">
      <div className="qm-quiz-card-header">
        <div className="qm-quiz-card-icon-wrap">
          {getCategoryIcon(quiz.category || quiz.title, 30)}
        </div>
        <span className="qm-quiz-card-time-badge" title={`Time limit: ${timeLimit} minutes`}>
          <Timer size={12} /> {timeLimit}m
        </span>
      </div>

      <div className="qm-quiz-card-body">
        <h3 className="qm-quiz-card-title">{quiz.title}</h3>
        <p className="qm-quiz-card-meta">{questionCount} Questions</p>
        <p className="qm-quiz-card-author">By {quiz.creatorName || 'Instructor'}</p>
      </div>

      <div className="qm-quiz-card-footer">
        <Button
          variant="primary"
          size="md"
          className="qm-take-quiz-btn"
          onClick={handleStart}
          icon={<Play size={15} fill="currentColor" />}
          iconPosition="left"
        >
          Attempt Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
