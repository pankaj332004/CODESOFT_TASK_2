const Result = require('../models/Result');
const { getDbStatus } = require('../config/db');
const { getQuizById } = require('./quizService');
const calculateScore = require('../utils/calculateScore');

const memoryResults = [];

const submitQuizResult = async ({ quizId, answers, timeTakenSeconds = 0, user }) => {
  const quiz = await getQuizById(quizId);
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    throw error;
  }

  const { score, totalQuestions, percentage, answersBreakdown } = calculateScore(
    quiz.questions,
    answers
  );

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

  if (dbStatus.isConnected) {
    return await Result.findById(id).populate('quiz', 'title category icon');
  }

  return memoryResults.find((r) => String(r._id) === String(id));
};

const getUserResults = async (userId) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    return await Result.find({ user: userId }).sort({ createdAt: -1 });
  }

  return memoryResults.filter((r) => String(r.user) === String(userId));
};

module.exports = {
  memoryResults,
  submitQuizResult,
  getResultById,
  getUserResults,
};
