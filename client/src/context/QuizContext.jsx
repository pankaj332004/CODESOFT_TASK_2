import React, { createContext, useState, useEffect, useRef } from 'react';
import quizService from '../services/quizService';

export const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const timerRef = useRef(null);

  // Timer ticker
  useEffect(() => {
    if (isTakingQuiz) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTakingQuiz]);

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setElapsedTime(0);
    setIsTakingQuiz(true);
    setLastResult(null);
  };

  const selectAnswer = (questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const nextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    if (currentQuiz && index >= 0 && index < currentQuiz.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const submitQuiz = async () => {
    if (!currentQuiz) return null;
    setIsTakingQuiz(false);
    setSubmitting(true);

    try {
      // Map user answers by question ID or index
      const answerPayload = {};
      currentQuiz.questions.forEach((q, idx) => {
        const chosen = selectedAnswers[idx];
        if (chosen) {
          const key = q._id ? String(q._id) : String(idx);
          answerPayload[key] = chosen;
          answerPayload[idx] = chosen;
        }
      });

      const result = await quizService.submitQuizResult({
        quizId: currentQuiz._id,
        answers: answerPayload,
        timeTakenSeconds: elapsedTime,
      });

      setLastResult(result);
      return result;
    } catch (error) {
      console.error('Quiz submission error, generating client evaluation:', error);
      // Fallback local score generation if offline
      let score = 0;
      const total = currentQuiz.questions.length;
      const breakdown = currentQuiz.questions.map((q, idx) => {
        const chosen = selectedAnswers[idx] || '';
        const isCorrect = chosen.trim() === q.correctAnswer.trim();
        if (isCorrect) score += 1;
        return {
          questionId: q._id || String(idx),
          questionText: q.questionText,
          selectedAnswer: chosen || 'No answer selected',
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation || '',
        };
      });

      const fallbackResult = {
        _id: `res_${Date.now()}`,
        quiz: currentQuiz._id,
        quizTitle: currentQuiz.title,
        score,
        totalQuestions: total,
        percentage: total > 0 ? Math.round((score / total) * 100) : 0,
        timeTakenSeconds: elapsedTime,
        answers: breakdown,
        createdAt: new Date().toISOString(),
      };
      setLastResult(fallbackResult);
      return fallbackResult;
    } finally {
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setElapsedTime(0);
    setIsTakingQuiz(false);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuiz,
        currentQuestionIndex,
        selectedAnswers,
        elapsedTime,
        isTakingQuiz,
        submitting,
        lastResult,
        setLastResult,
        startQuiz,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        submitQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
