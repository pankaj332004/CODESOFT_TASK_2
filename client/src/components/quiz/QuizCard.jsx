import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryIcon } from '../../assets/icons/CategoryIcons';
import Button from '../common/Button';

export const QuizCard = ({ quiz, onTakeQuiz }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (onTakeQuiz) {
      onTakeQuiz(quiz);
    } else {
      navigate(`/take-quiz/${quiz._id}`);
    }
  };

  const questionCount = quiz.questions?.length || 0;

  return (
    <div className="qm-quiz-card">
      <div className="qm-quiz-card-header">
        <div className="qm-quiz-card-icon-wrap">
          {getCategoryIcon(quiz.category || quiz.title, 30)}
        </div>
      </div>

      <div className="qm-quiz-card-body">
        <h3 className="qm-quiz-card-title">{quiz.title}</h3>
        <p className="qm-quiz-card-meta">{questionCount} Questions</p>
        <p className="qm-quiz-card-author">By {quiz.creatorName || 'Instructor'}</p>
      </div>

      <div className="qm-quiz-card-footer">
        <Button
          variant="secondary"
          size="sm"
          className="qm-take-quiz-btn"
          onClick={handleStart}
        >
          Take Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
