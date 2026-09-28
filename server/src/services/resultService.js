const mongoose = require('mongoose');
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

module.exports = {
  memoryResults,
  submitQuizResult,
  getResultById,
  getUserResults,
};
