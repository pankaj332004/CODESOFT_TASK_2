import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import quizService from '../../services/quizService';
import { useAuth } from '../../hooks/useAuth';
import LoginPromptModal from '../../components/common/LoginPromptModal';
import { getCategoryIcon } from '../../assets/icons/CategoryIcons';
import { StackedBooks, QuizNotepad } from '../../assets/illustrations/Illustrations';
import { Clock, HelpCircle, User, ArrowLeft, Play, ShieldAlert } from 'lucide-react';

export const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    quizService
      .getQuizById(id)
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load quiz details', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader fullScreen message="Loading quiz details..." />;

  if (!quiz) {
    return (
      <PageContainer>
        <div className="qm-not-found-card">
          <h2>Quiz not found</h2>
          <Button onClick={() => navigate('/quizzes')}>Back to Quizzes</Button>
        </div>
      </PageContainer>
    );
  }

  const questionCount = quiz.questions?.length || 0;

  return (
    <PageContainer maxWidth="960px" className="qm-details-page">
      <div className="qm-back-nav">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/quizzes')}
          icon={<ArrowLeft size={16} />}
        >
          Back to Explore
        </Button>
      </div>

      <div className="qm-details-card">
        <div className="details-header-banner">
          <div className="details-cat-icon">
            {getCategoryIcon(quiz.category, 42)}
          </div>
          <div className="details-title-wrap">
            <span className="details-category-pill">{quiz.category}</span>
            <h1 className="details-quiz-title">{quiz.title}</h1>
            <p className="details-quiz-desc">{quiz.description}</p>
          </div>
        </div>

        <div className="details-metrics-row">
          <div className="metric-pill">
            <HelpCircle size={18} />
            <span>{questionCount} Questions</span>
          </div>

          <div className="metric-pill">
            <Clock size={18} />
            <span>{quiz.timeLimitMinutes || 10} Minutes</span>
          </div>

          <div className="metric-pill">
            <User size={18} />
            <span>By {quiz.creatorName || 'Instructor'}</span>
          </div>
        </div>

        <div className="details-instructions-box">
          <h3 className="instructions-title">
            <ShieldAlert size={20} /> Quiz Guidelines
          </h3>
          <ul className="instructions-list">
            <li>Read each question carefully before choosing an option.</li>
            <li>You can navigate back and forth between questions anytime using <strong>Previous</strong> and <strong>Next</strong>.</li>
            <li>Your score and question review will be presented upon submission.</li>
          </ul>
        </div>

        <div className="details-action-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              if (!isAuthenticated) {
                setShowLoginModal(true);
              } else {
                navigate(`/take-quiz/${quiz._id}`);
              }
            }}
            icon={<Play size={20} fill="currentColor" />}
            className="details-start-btn"
          >
            Start Quiz Now
          </Button>
        </div>
      </div>

      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        targetUrl={`/take-quiz/${quiz._id}`}
      />
    </PageContainer>
  );
};

export default QuizDetails;
