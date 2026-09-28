import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import QuestionCard from '../../components/quiz/QuestionCard';
import QuestionNavigator from '../../components/quiz/QuestionNavigator';
import QuizProgress from '../../components/quiz/QuizProgress';
import QuizTimer from '../../components/quiz/QuizTimer';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { useQuiz } from '../../hooks/useQuiz';
import quizService from '../../services/quizService';
import {
  StackedBooks,
  QuizNotepad,
  GlowingBulb,
} from '../../assets/illustrations/Illustrations';
import { GraduationCap, Timer, BookOpen, ArrowLeftRight, Sparkles, Clock } from 'lucide-react';

export const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    currentQuiz,
    currentQuestionIndex,
    selectedAnswers,
    checkedFeedback,
    flaggedQuestions,
    toggleFlagQuestion,
    quizMode,
    setQuizMode,
    retryQuestion,
    elapsedTime,
    setElapsedTime,
    isTakingQuiz,
    startQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    submitting,
  } = useQuiz();

  const [loading, setLoading] = useState(true);
  const [sidebarPosition, setSidebarPosition] = useState(() => {
    return localStorage.getItem('qm_sidebar_pos') || 'left';
  });

  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const autoSubmitTriggeredRef = useRef(false);

  const examTimeLimitMinutes = currentQuiz?.timeLimitMinutes || 10;
  const examTotalSeconds = examTimeLimitMinutes * 60;
  const examRemainingSeconds = Math.max(0, examTotalSeconds - elapsedTime);

  const toggleSidebarPosition = () => {
    setSidebarPosition((prev) => {
      const next = prev === 'left' ? 'right' : 'left';
      try {
        localStorage.setItem('qm_sidebar_pos', next);
      } catch (e) {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleModeChange = (newMode) => {
    if (newMode === quizMode) return;
    setQuizMode(newMode);
    setSearchParams({ mode: newMode }, { replace: true });
    if (newMode === 'exam') {
      setElapsedTime(0);
      autoSubmitTriggeredRef.current = false;
      setAutoSubmitted(false);
    }
  };

  const handleSubmit = useCallback(
    async (isAuto = false) => {
      const isAutoFlag = typeof isAuto === 'boolean' ? isAuto : false;
      if (submitting) return;
      try {
        const result = await submitQuiz();
        if (result && result._id) {
          navigate(`/results/${result._id}`, {
            state: { autoSubmitted: isAutoFlag },
          });
        } else {
          navigate('/results/completed');
        }
      } catch (err) {
        console.error('Submission failed:', err);
        navigate('/results/completed');
      }
    },
    [submitting, submitQuiz, navigate]
  );

  const handleRequestSubmit = useCallback(() => {
    setShowSubmitModal(true);
  }, []);

  // Initialize and load quiz data
  useEffect(() => {
    let isMounted = true;
    quizService
      .getQuizById(id)
      .then((data) => {
        if (isMounted) {
          if (data) {
            const initialMode = searchParams.get('mode') === 'practice' ? 'practice' : 'exam';
            startQuiz(data, initialMode);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error starting quiz:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Sync mode if query param changes externally
  useEffect(() => {
    const paramMode = searchParams.get('mode');
    if (paramMode && (paramMode === 'exam' || paramMode === 'practice') && paramMode !== quizMode) {
      setQuizMode(paramMode);
      if (paramMode === 'exam') {
        setElapsedTime(0);
        autoSubmitTriggeredRef.current = false;
        setAutoSubmitted(false);
      }
    }
  }, [searchParams]);

  // Reset auto-submit guard when switching quizzes or modes
  useEffect(() => {
    autoSubmitTriggeredRef.current = false;
    setAutoSubmitted(false);
  }, [id, quizMode]);

  // Auto-submit in Exam mode when countdown reaches 0
  useEffect(() => {
    if (quizMode === 'exam' && isTakingQuiz && !submitting && !autoSubmitTriggeredRef.current) {
      if (examRemainingSeconds <= 0 && elapsedTime > 0) {
        autoSubmitTriggeredRef.current = true;
        setAutoSubmitted(true);
        handleSubmit(true);
      }
    }
  }, [quizMode, isTakingQuiz, examRemainingSeconds, elapsedTime, submitting, handleSubmit]);

  if (loading) return <Loader fullScreen message="Setting up your learning environment..." />;

  if (!currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) {
    return (
      <div className="qm-quiz-arena-wrap">
        <Navbar />
        <div className="qm-arena-container error-state">
          <h2>Quiz not found or contains no questions.</h2>
          <button className="qm-btn qm-btn-primary" onClick={() => navigate('/quizzes')}>
            Return to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = currentQuiz.questions.length;
  const currentQuestion = currentQuiz.questions[currentQuestionIndex] || currentQuiz.questions[0];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentSelectedAnswer = selectedAnswers[currentQuestionIndex] || '';
  const currentFeedback = checkedFeedback[currentQuestionIndex] || null;

  const answeredCount = Object.keys(selectedAnswers).filter(
    (k) => selectedAnswers[k] !== undefined && selectedAnswers[k] !== ''
  ).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  return (
    <div className="qm-quiz-arena-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Auto-Submit Notification Banner on Timeout */}
      {autoSubmitted && (
        <div className="qm-auto-submit-banner" role="alert">
          <Clock size={18} className="timer-spin" />
          <span>⏰ Time is up! Submitting your exam automatically...</span>
        </div>
      )}

      {/* Floating Ambient Educational Icons in background */}
      <div className="arena-bg-doodles" aria-hidden="true">
        <span className="doodle doodle-cap doodle-1">🎓</span>
        <span className="doodle doodle-book doodle-2">📖</span>
        <span className="doodle doodle-bulb doodle-3">💡</span>
        <span className="doodle doodle-star doodle-4">✨</span>
        <span className="doodle doodle-cap doodle-5">🎓</span>
      </div>

      {/* Top Sub-Header: Mode Switcher & Breadcrumb */}
      <div className="qm-arena-header-bar">
        <div className="arena-header-content">
          <div className="arena-quiz-info">
            <span className="arena-category-pill">{currentQuiz.category}</span>
            <h1 className="arena-quiz-title">{currentQuiz.title}</h1>
          </div>

          {/* Right Header Controls: Mode Switcher & Sidebar Layout Position */}
          <div className="arena-header-actions">
            <div className="arena-mode-switcher" role="tablist">
              <button
                type="button"
                className={`mode-btn ${quizMode === 'practice' ? 'mode-active' : ''}`}
                onClick={() => handleModeChange('practice')}
                title="Learn with instant answers & concept explanations (Untimed)"
              >
                <GraduationCap size={16} />
                <span>Practice & Learn Mode</span>
              </button>
              <button
                type="button"
                className={`mode-btn ${quizMode === 'exam' ? 'mode-active mode-exam-active' : ''}`}
                onClick={() => handleModeChange('exam')}
                title="Timed test with automatic submission on expiration"
              >
                <Timer size={16} />
                <span>Exam Mode</span>
              </button>
            </div>

            {/* Layout Position Toggle (Sidebar Left / Right) */}
            <button
              type="button"
              className="arena-sidebar-toggle-btn"
              onClick={toggleSidebarPosition}
              title={`Switch layout: Move sidebar to ${sidebarPosition === 'left' ? 'Right' : 'Left'}`}
            >
              <ArrowLeftRight size={14} />
              <span>Sidebar: <strong>{sidebarPosition === 'left' ? 'Left' : 'Right'}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Arena Stage: Interactive Question Navigator & Dominant Question Card */}
      <div className={`qm-arena-stage qm-arena-stage-learning ${sidebarPosition === 'right' ? 'sidebar-on-right' : 'sidebar-on-left'}`}>
        {/* Interactive Question Navigator & Learning Tip */}
        <aside className="arena-side-navigator">
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentIndex={currentQuestionIndex}
            onSelectQuestion={goToQuestion}
            selectedAnswers={selectedAnswers}
            checkedFeedback={checkedFeedback}
            flaggedQuestions={flaggedQuestions}
            quizMode={quizMode}
            onSubmitQuiz={handleSubmit}
          />

          <div className="arena-learn-tip-card">
            <div className="tip-card-header">
              <BookOpen size={16} className="tip-icon" />
              <span>Learning Tip</span>
            </div>
            <p className="tip-card-text">
              {quizMode === 'practice'
                ? 'Practice mode gives immediate concept explanations. Check the "Concept" trail to understand how topics connect!'
                : 'In Exam mode, keep track of time and answer all questions before submitting your test.'}
            </p>
          </div>
        </aside>

        {/* Right Side: Main Question Card (Dominant Large Width) */}
        <section className="qm-quiz-card-main qm-quiz-card-learning-dominant">
          {/* Top Progress & Live Timer */}
          <div className="qm-quiz-card-topbar">
            <div className="topbar-timer-wrap">
              {quizMode === 'exam' ? (
                <QuizTimer
                  seconds={elapsedTime}
                  isCountdown={true}
                  timeLimit={examTimeLimitMinutes}
                />
              ) : (
                <div
                  className="qm-quiz-timer-pill practice-mode-pill"
                  title="Practice & Learn mode: Take all the time you need with instant explanations"
                >
                  <Sparkles size={14} className="practice-pill-icon" />
                  <span>Self-Paced Practice</span>
                </div>
              )}
            </div>

            <QuizProgress
              current={currentQuestionIndex + 1}
              total={totalQuestions}
            />
          </div>

          {/* Active Question & Options with Live Learning Feedback & Flag */}
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            selectedAnswer={currentSelectedAnswer}
            feedback={currentFeedback}
            quizMode={quizMode}
            isFlagged={Boolean(flaggedQuestions[currentQuestionIndex])}
            onToggleFlag={toggleFlagQuestion}
            onSelectAnswer={(val) => selectAnswer(currentQuestionIndex, val)}
            onRetry={retryQuestion}
            onPrev={prevQuestion}
            onNext={nextQuestion}
            onSubmit={handleRequestSubmit}
            isLast={isLastQuestion}
            submitting={submitting}
          />
        </section>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <Modal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          title="Submit Quiz & View Results?"
          maxWidth="460px"
        >
          <div className="qm-confirm-modal-body">
            <p className="confirm-modal-desc">
              Are you ready to submit your answers and see your detailed score?
            </p>

            <div className="confirm-modal-stats-grid">
              <div className="confirm-stat-tile">
                <span className="confirm-stat-label">Total</span>
                <strong className="confirm-stat-val">{totalQuestions}</strong>
              </div>
              <div className="confirm-stat-tile tile-green">
                <span className="confirm-stat-label">Answered</span>
                <strong className="confirm-stat-val">{answeredCount}</strong>
              </div>
              <div className={`confirm-stat-tile ${unansweredCount > 0 ? 'tile-amber' : ''}`}>
                <span className="confirm-stat-label">Unanswered</span>
                <strong className="confirm-stat-val">{unansweredCount}</strong>
              </div>
              {flaggedCount > 0 && (
                <div className="confirm-stat-tile tile-purple">
                  <span className="confirm-stat-label">Marked</span>
                  <strong className="confirm-stat-val">{flaggedCount}</strong>
                </div>
              )}
            </div>

            {unansweredCount > 0 && (
              <div className="confirm-warning-alert">
                ⚠️ You have <strong>{unansweredCount}</strong> unanswered question{unansweredCount > 1 ? 's' : ''}. Unanswered questions will receive 0 marks.
              </div>
            )}

            <div className="confirm-modal-actions">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowSubmitModal(false)}
              >
                Keep Reviewing
              </Button>
              <Button
                variant="primary"
                size="md"
                loading={submitting}
                onClick={() => {
                  setShowSubmitModal(false);
                  handleSubmit(false);
                }}
              >
                Confirm & Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TakeQuiz;

