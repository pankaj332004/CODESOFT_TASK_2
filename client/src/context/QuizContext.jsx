import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
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

  const [quizMode, setQuizMode] = useState('practice'); // 'practice' (Learn mode) or 'exam' (Timed test)
  const [checkedFeedback, setCheckedFeedback] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});

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

  const startQuiz = useCallback((quiz, mode = 'practice') => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCheckedFeedback({});
    setFlaggedQuestions({});
    setElapsedTime(0);
    setIsTakingQuiz(true);
    setLastResult(null);
    setQuizMode(mode);
  }, []);

  const toggleFlagQuestion = useCallback((index) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const selectAnswer = useCallback((questionIndex, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));

    // In practice/learn mode, immediately compute detailed feedback
    if (quizMode === 'practice' && currentQuiz && currentQuiz.questions && currentQuiz.questions[questionIndex]) {
      const q = currentQuiz.questions[questionIndex];
      const isCorrect = String(answer).trim() === String(q.correctAnswer).trim();
      const feedback = {
        isCorrect,
        selectedAnswer: answer,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || '',
        quickExplanation: q.quickExplanation || q.explanation || '',
        concept: q.concept || `${currentQuiz.category || 'General'} → ${currentQuiz.title || 'Core Concepts'}`,
      };
      setCheckedFeedback((prev) => ({
        ...prev,
        [questionIndex]: feedback,
      }));
    } else if (quizMode === 'exam') {
      setCheckedFeedback((prev) => {
        if (!prev[questionIndex]) return prev;
        const copy = { ...prev };
        delete copy[questionIndex];
        return copy;
      });
    }
  }, [quizMode, currentQuiz]);

  const retryQuestion = useCallback((questionIndex) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionIndex];
      return copy;
    });
    setCheckedFeedback((prev) => {
      const copy = { ...prev };
      delete copy[questionIndex];
      return copy;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuiz, currentQuestionIndex]);

  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback((index) => {
    if (currentQuiz && index >= 0 && index < currentQuiz.questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [currentQuiz]);

  const submitQuiz = useCallback(async (options = {}) => {
    if (!currentQuiz) return null;
    setIsTakingQuiz(false);
    setSubmitting(true);

    const isZeroMarks = Boolean(quizMode === 'exam' && (options.zeroMarks || options.isExpired));

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
        mode: quizMode,
        isExpired: Boolean(options.isExpired),
        submissionReason: options.submissionReason || (options.autoSubmitted ? 'time_limit_expired' : 'completed'),
        zeroMarks: isZeroMarks,
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
        const isCorrect = !isZeroMarks && chosen.trim() === q.correctAnswer.trim();
        if (isCorrect) score += 1;
        return {
          questionId: q._id || String(idx),
          questionText: q.questionText,
          selectedAnswer: isZeroMarks ? 'Not answered (Missed / Expired Exam Window)' : chosen || 'No answer selected',
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation || '',
        };
      });

      if (isZeroMarks) {
        score = 0;
      }

      const fallbackResult = {
        _id: `res_${Date.now()}`,
        quiz: currentQuiz._id,
        quizTitle: currentQuiz.title,
        score,
        totalQuestions: total,
        percentage: isZeroMarks ? 0 : total > 0 ? Math.round((score / total) * 100) : 0,
        timeTakenSeconds: elapsedTime,
        mode: quizMode,
        isExpired: Boolean(options.isExpired || isZeroMarks),
        submissionReason: options.submissionReason || 'completed',
        answers: breakdown,
        createdAt: new Date().toISOString(),
      };
      setLastResult(fallbackResult);
      return fallbackResult;
    } finally {
      setSubmitting(false);
    }
  }, [currentQuiz, selectedAnswers, elapsedTime]);

  const resetQuiz = useCallback(() => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCheckedFeedback({});
    setFlaggedQuestions({});
    setElapsedTime(0);
    setIsTakingQuiz(false);
  }, []);

  return (
    <QuizContext.Provider
      value={{
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
