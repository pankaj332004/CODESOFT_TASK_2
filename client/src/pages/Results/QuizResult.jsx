import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import ScoreCard from '../../components/results/ScoreCard';
import QuestionSummary from '../../components/results/QuestionSummary';
import ResultActions from '../../components/results/ResultActions';
import Modal from '../../components/common/Modal';
import Loader from '../../components/common/Loader';
import { useQuiz } from '../../hooks/useQuiz';
import quizService from '../../services/quizService';
import confetti from 'canvas-confetti';
import {
  GoldenTrophy,
  GreenStackedBooks,
} from '../../assets/illustrations/Illustrations';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export const QuizResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lastResult } = useQuiz();

  const [result, setResult] = useState(lastResult || null);
  const [loading, setLoading] = useState(!lastResult);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    // Fire festive celebration confetti if score is solid!
    if (result && result.percentage >= 60) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#F59E0B', '#10B981', '#EC4899'],
        });
      } catch (e) {
        // Fallback gracefully if canvas-confetti is not loaded
      }
    }
  }, [result]);

  useEffect(() => {
    if (!result && id && id !== 'completed') {
      quizService
        .getResultById(id)
        .then((data) => {
          setResult(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load result:', err);
          setLoading(false);
        });
    } else if (lastResult) {
      setResult(lastResult);
      setLoading(false);
    }
  }, [id, lastResult]);

  if (loading) return <Loader fullScreen message="Calculating your final score..." />;

  if (!result) {
    return (
      <div className="qm-quiz-arena-screen">
        <Navbar />
        <div className="qm-result-container-card text-center">
          <h2>No quiz result found.</h2>
          <button className="qm-btn qm-btn-primary" onClick={() => navigate('/quizzes')}>
            Explore Quizzes
          </button>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, percentage, timeTakenSeconds, answers = [] } = result;

  const handleOpenReview = (index = 0) => {
    setActiveQuestionIndex(index);
    setIsReviewOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QuizMaker Result',
        text: `I just scored ${score}/${totalQuestions} (${percentage}%) on QuizMaker!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `I scored ${score}/${totalQuestions} (${percentage}%) on QuizMaker! Try it: ${window.location.origin}`
      );
      alert('Result copied to clipboard!');
    }
  };

  return (
    <div className="qm-quiz-arena-screen result-screen-bg">
      <Navbar />

      <div className="qm-result-center-wrap">
        <div className="qm-result-container-card">
          {/* Trophy Header */}
          <div className="qm-trophy-banner">
            <GoldenTrophy width={150} height={150} />
            <h1 className="qm-result-main-title">Quiz Completed!</h1>
            <p className="qm-result-sub-title">Here is your result</p>
          </div>

          {/* Score & Time Stats Cards */}
          <ScoreCard
            score={score}
            total={totalQuestions}
            percentage={percentage}
            timeTakenSeconds={timeTakenSeconds}
          />

          {/* Action Buttons: Review Answers & Take Another Quiz */}
          <ResultActions
            onReview={() => handleOpenReview(0)}
            onRetake={() => navigate('/quizzes')}
            onBackToHome={() => navigate('/')}
            onShare={handleShare}
          />

          {/* Question Summary: Green & Red numbered circles */}
          <QuestionSummary
            answers={answers}
            onSelectQuestion={(idx) => handleOpenReview(idx)}
          />

          {/* Stack of Green books decoration at bottom right */}
          <div className="result-corner-books" aria-hidden="true">
            <GreenStackedBooks width={160} height={110} />
          </div>
        </div>
      </div>

      {/* Review Answers Modal */}
      <Modal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title="Review Answers"
        maxWidth="750px"
      >
        <div className="qm-review-modal-content">
          <div className="review-question-pills-row">
            {answers.map((ans, idx) => (
              <button
                key={idx}
                className={`summary-num-circle ${
                  ans.isCorrect ? 'status-correct' : 'status-incorrect'
                } ${activeQuestionIndex === idx ? 'active-ring' : ''}`}
                onClick={() => setActiveQuestionIndex(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {answers[activeQuestionIndex] && (
            <div className="review-active-card">
              <div className="review-status-row">
                <span className="review-q-number">
                  Question {activeQuestionIndex + 1} of {answers.length}
                </span>
                {answers[activeQuestionIndex].isCorrect ? (
                  <span className="review-badge-pill correct">
                    <CheckCircle2 size={16} /> Correct (+1 point)
                  </span>
                ) : (
                  <span className="review-badge-pill incorrect">
                    <XCircle size={16} /> Incorrect
                  </span>
                )}
              </div>

              <h3 className="review-question-text">
                {answers[activeQuestionIndex].questionText}
              </h3>

              <div className="review-answer-comparison">
                <div className={`review-box ${answers[activeQuestionIndex].isCorrect ? 'match-correct' : 'match-wrong'}`}>
                  <span className="box-tag">Your Choice</span>
                  <p className="box-val">{answers[activeQuestionIndex].selectedAnswer}</p>
                </div>

                {!answers[activeQuestionIndex].isCorrect && (
                  <div className="review-box match-correct">
                    <span className="box-tag">Correct Answer</span>
                    <p className="box-val">{answers[activeQuestionIndex].correctAnswer}</p>
                  </div>
                )}
              </div>

              {answers[activeQuestionIndex].explanation && (
                <div className="review-explanation-box">
                  <div className="explanation-title">
                    <HelpCircle size={16} /> Explanation
                  </div>
                  <p className="explanation-text">{answers[activeQuestionIndex].explanation}</p>
                </div>
              )}

              <div className="review-modal-nav-row">
                <button
                  className="qm-btn qm-btn-outline qm-btn-sm"
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                >
                  Previous
                </button>
                <button
                  className="qm-btn qm-btn-primary qm-btn-sm"
                  disabled={activeQuestionIndex === answers.length - 1}
                  onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default QuizResult;
