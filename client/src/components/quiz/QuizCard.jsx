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
        {quiz.isAssignedToMe && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', marginBottom: '6px' }}>
            🎯 Assigned to You
          </span>
        )}
        {quiz.isUpcomingExam && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', marginBottom: '6px', marginLeft: quiz.isAssignedToMe ? '4px' : '0' }}>
            ⏳ Starts: {new Date(quiz.examStartTime).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
        {quiz.isActiveExamWindow && quiz.examEndTime && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', marginBottom: '6px' }}>
            🟢 Window Closes: {new Date(quiz.examEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
        {quiz.isExpiredExam && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', marginBottom: '6px' }}>
            ⚠️ Window Closed
          </span>
        )}
        <h3 className="qm-quiz-card-title">{quiz.title}</h3>
        <p className="qm-quiz-card-meta">{questionCount} Questions</p>
        <p className="qm-quiz-card-author">By {quiz.creatorName || 'Instructor'}</p>
      </div>

      <div className="qm-quiz-card-footer">
        <Button
          variant={quiz.isExpiredExam ? 'secondary' : 'primary'}
          size="md"
          className="qm-take-quiz-btn"
          onClick={handleStart}
          icon={<Play size={15} fill="currentColor" />}
          iconPosition="left"
        >
          {quiz.isUpcomingExam ? 'View Schedule' : quiz.isExpiredExam ? 'Review / Practice' : 'Attempt Quiz'}
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
