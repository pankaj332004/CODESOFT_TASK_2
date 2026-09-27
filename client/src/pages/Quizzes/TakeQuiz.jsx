import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import QuestionCard from '../../components/quiz/QuestionCard';
import QuizProgress from '../../components/quiz/QuizProgress';
import QuizTimer from '../../components/quiz/QuizTimer';
import Loader from '../../components/common/Loader';
import { useQuiz } from '../../hooks/useQuiz';
import quizService from '../../services/quizService';
import {
  StackedBooks,
  QuizNotepad,
  GlowingBulb,
  ExamSheet,
  PencilHolder,
} from '../../assets/illustrations/Illustrations';

export const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    currentQuiz,
    currentQuestionIndex,
    selectedAnswers,
    elapsedTime,
    startQuiz,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    submitting,
  } = useQuiz();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Load quiz data
    quizService
      .getQuizById(id)
      .then((data) => {
        if (isMounted) {
          if (data) {
            startQuiz(data);
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

  if (loading) return <Loader fullScreen message="Setting up your quiz..." />;

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
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentSelectedAnswer = selectedAnswers[currentQuestionIndex] || '';

  const handleSubmit = async () => {
    const result = await submitQuiz();
    if (result && result._id) {
      navigate(`/results/${result._id}`);
    } else {
      navigate('/results/completed');
    }
  };

  return (
    <div className="qm-quiz-arena-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Floating Ambient Educational Icons in background */}
      <div className="arena-bg-doodles" aria-hidden="true">
        <span className="doodle doodle-cap doodle-1">🎓</span>
        <span className="doodle doodle-book doodle-2">📖</span>
        <span className="doodle doodle-bulb doodle-3">💡</span>
        <span className="doodle doodle-star doodle-4">✨</span>
        <span className="doodle doodle-cap doodle-5">🎓</span>
      </div>

      {/* Arena Center Stage */}
      <div className="qm-arena-stage">
        {/* Left Side Ambient Illustrations */}
        <aside className="arena-side-art left-art" aria-hidden="true">
          <div className="art-item-box books-box">
            <StackedBooks width={170} height={130} />
          </div>
          <div className="art-item-box notepad-box">
            <QuizNotepad width={160} height={180} />
          </div>
        </aside>

        {/* Main Quiz Taking Box */}
        <section className="qm-quiz-card-main">
          {/* Top Progress & Live Timer */}
          <div className="qm-quiz-card-topbar">
            <div className="topbar-timer-wrap">
              <QuizTimer seconds={elapsedTime} />
            </div>

            <QuizProgress
              current={currentQuestionIndex + 1}
              total={totalQuestions}
            />
          </div>

          {/* Active Question & Options */}
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            selectedAnswer={currentSelectedAnswer}
            onSelectAnswer={(val) => selectAnswer(currentQuestionIndex, val)}
            onPrev={prevQuestion}
            onNext={nextQuestion}
            onSubmit={handleSubmit}
            isLast={isLastQuestion}
            submitting={submitting}
          />
        </section>

        {/* Right Side Ambient Illustrations */}
        <aside className="arena-side-art right-art" aria-hidden="true">
          <div className="art-item-box bulb-box">
            <GlowingBulb width={90} height={90} />
          </div>
          <div className="art-item-box exam-box">
            <ExamSheet width={110} height={140} />
          </div>
          <div className="art-item-box pencil-box">
            <PencilHolder width={90} height={110} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TakeQuiz;
