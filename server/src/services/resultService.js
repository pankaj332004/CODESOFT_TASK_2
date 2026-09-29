const mongoose = require('mongoose');
const Result = require('../models/Result');
const { getDbStatus } = require('../config/db');
const { getQuizById } = require('./quizService');
const calculateScore = require('../utils/calculateScore');

const memoryResults = [];

const submitQuizResult = async ({
  quizId,
  answers,
  timeTakenSeconds = 0,
  user,
  mode = 'practice',
  isExpired = false,
  submissionReason = 'completed',
  zeroMarks = false,
}) => {
  const quiz = await getQuizById(quizId, user);
  if (!quiz) {
    const error = new Error('Quiz not found or access denied');
    error.statusCode = 404;
    throw error;
  }

  // Check if exam window expired or if forced zero marks
  const isExamMode = mode === 'exam';
  const shouldForceZeroMarks = isExamMode && (isExpired || zeroMarks || submissionReason === 'exam_window_expired');

  let score = 0;
  let totalQuestions = quiz.questions?.length || 0;
  let percentage = 0;
  let answersBreakdown = [];

  if (shouldForceZeroMarks) {
    score = 0;
    percentage = 0;
    answersBreakdown = (quiz.questions || []).map((q, idx) => ({
      questionId: q._id ? String(q._id) : String(idx),
      questionText: q.questionText,
      selectedAnswer: 'Not answered (Missed / Expired Exam Window)',
      correctAnswer: q.correctAnswer,
      isCorrect: false,
      explanation: q.explanation || 'Exam window expired without completion.',
      quickExplanation: 'Submitted with 0 marks due to expired exam window.',
      concept: q.concept || '',
    }));
  } else {
    const calc = calculateScore(quiz.questions, answers);
    score = calc.score;
    totalQuestions = calc.totalQuestions;
    percentage = calc.percentage;
    answersBreakdown = calc.answersBreakdown;
  }

  const resultData = {
    quiz: quiz._id,
    quizTitle: quiz.title,
    user: user ? user._id : null,
    userName: user ? user.name : 'Guest Learner',
    score,
    totalQuestions,
    percentage,
    timeTakenSeconds: Number(timeTakenSeconds) || 0,
    answers: answersBreakdown,
    mode: isExamMode ? 'exam' : 'practice',
    isExpired: Boolean(shouldForceZeroMarks || isExpired),
    submissionReason: shouldForceZeroMarks ? (submissionReason || 'exam_window_expired') : submissionReason,
    createdAt: new Date().toISOString(),
  };

  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    const createdResult = await Result.create(resultData);
    return createdResult;
  }

  const newResult = {
    _id: `res_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    ...resultData,
  };
  memoryResults.unshift(newResult);
  return newResult;
};

const getResultById = async (id) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected && mongoose.Types.ObjectId.isValid(id)) {
    return await Result.findById(id).populate('quiz', 'title category icon');
  }

  return memoryResults.find((r) => String(r._id) === String(id));
};

const sampleAttempts = [
  {
    _id: 'sample_res_1',
    quizTitle: 'JavaScript Basics',
    category: 'Computer Science',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    timeTakenSeconds: 320,
    mode: 'practice',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    _id: 'sample_res_2',
    quizTitle: 'DBMS Fundamentals',
    category: 'Computer Science',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    timeTakenSeconds: 410,
    mode: 'practice',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    _id: 'sample_res_3',
    quizTitle: 'Computer Networks',
    category: 'Computer Science',
    score: 7,
    totalQuestions: 10,
    percentage: 70,
    timeTakenSeconds: 380,
    mode: 'practice',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    _id: 'sample_res_4',
    quizTitle: 'English Grammar',
    category: 'English Grammar',
    score: 6,
    totalQuestions: 10,
    percentage: 60,
    timeTakenSeconds: 310,
    mode: 'practice',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

const getUserResults = async (userId) => {
  const dbStatus = getDbStatus();

  let userResults = [];
  if (dbStatus.isConnected && userId) {
    userResults = await Result.find({ user: userId }).sort({ createdAt: -1 });
  } else if (userId) {
    userResults = memoryResults.filter((r) => String(r.user) === String(userId));
  }

  // If no previous attempts found, return the sample curriculum results
  if (!userResults || userResults.length === 0) {
    return sampleAttempts;
  }

  return userResults;
};

const getQuizGradebook = async (quizId, user) => {
  const quiz = await getQuizById(quizId, user);
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    throw error;
  }

  // Permission verification: creator can view gradebook
  if (user && quiz.createdBy && String(quiz.createdBy) !== String(user._id) && quiz.creatorName !== user.name) {
    const err = new Error('You do not have authorization to view the gradebook for this quiz.');
    err.statusCode = 403;
    throw err;
  }

  const dbStatus = getDbStatus();
  let submissions = [];

  if (dbStatus.isConnected && mongoose.Types.ObjectId.isValid(quizId)) {
    submissions = await Result.find({ quiz: quizId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
  } else {
    submissions = memoryResults.filter((r) => String(r.quiz) === String(quizId));
  }

  // Map submissions to clean student grade records
  const studentRecords = submissions.map((sub) => ({
    _id: sub._id,
    studentName: sub.userName || sub.user?.name || 'Student Participant',
    studentEmail: sub.user?.email || 'N/A',
    score: sub.score,
    totalQuestions: sub.totalQuestions,
    percentage: sub.percentage,
    timeTakenSeconds: sub.timeTakenSeconds,
    submittedAt: sub.createdAt,
    answers: sub.answers,
    isExpired: Boolean(sub.isExpired),
    submissionReason: sub.submissionReason || 'completed',
  }));

  const totalStudents = studentRecords.length;
  let summary = {
    totalStudents: 0,
    avgScore: 0,
    avgPercentage: 0,
    highestScore: 0,
    lowestScore: 0,
    passRate: 0,
    avgTimeTakenSeconds: 0,
  };

  if (totalStudents > 0) {
    const totalScore = studentRecords.reduce((acc, curr) => acc + curr.score, 0);
    const totalPct = studentRecords.reduce((acc, curr) => acc + curr.percentage, 0);
    const totalTime = studentRecords.reduce((acc, curr) => acc + (curr.timeTakenSeconds || 0), 0);
    const passing = studentRecords.filter((s) => s.percentage >= 60).length;

    summary = {
      totalStudents,
      avgScore: Number((totalScore / totalStudents).toFixed(1)),
      avgPercentage: Math.round(totalPct / totalStudents),
      highestScore: Math.max(...studentRecords.map((s) => s.score)),
      lowestScore: Math.min(...studentRecords.map((s) => s.score)),
      passRate: Math.round((passing / totalStudents) * 100),
      avgTimeTakenSeconds: Math.round(totalTime / totalStudents),
    };
  }

  return {
    quiz: {
      _id: quiz._id,
      title: quiz.title,
      category: quiz.category,
      difficulty: quiz.difficulty,
      totalQuestions: quiz.questions?.length || 0,
      timeLimitMinutes: quiz.timeLimitMinutes || 10,
      accessCode: quiz.accessCode || '',
      isPublic: quiz.isPublic !== false,
      creatorName: quiz.creatorName,
      assignedEmails: quiz.assignedEmails || [],
      examStartTime: quiz.examStartTime || null,
      examEndTime: quiz.examEndTime || null,
    },
    summary,
    submissions: studentRecords,
  };
};

module.exports = {
  memoryResults,
  submitQuizResult,
  getResultById,
  getUserResults,
  getQuizGradebook,
};
