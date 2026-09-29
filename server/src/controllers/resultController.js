const {
  submitQuizResult,
  getResultById,
  getUserResults,
  getQuizGradebook,
} = require('../services/resultService');

// @desc Submit quiz answers and compute score
// @route POST /api/results
const submitResult = async (req, res, next) => {
  try {
    const {
      quizId,
      answers,
      timeTakenSeconds,
      mode,
      isExpired,
      submissionReason,
      zeroMarks,
    } = req.body;

    if (!quizId) {
      return res.status(400).json({ message: 'Quiz ID is required' });
    }

    const result = await submitQuizResult({
      quizId,
      answers: answers || {},
      timeTakenSeconds: timeTakenSeconds || 0,
      user: req.user,
      mode: mode || 'practice',
      isExpired: Boolean(isExpired),
      submissionReason: submissionReason || 'completed',
      zeroMarks: Boolean(zeroMarks),
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc Get result by ID
// @route GET /api/results/:id
const getResult = async (req, res, next) => {
  try {
    const result = await getResultById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc Get results for current user
// @route GET /api/results/my-results
const getMyResults = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    if (!userId) {
      return res.json([]);
    }
    const results = await getUserResults(userId);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// @desc Get student gradebook and submissions for a quiz (Creator Only)
// @route GET /api/results/quiz/:quizId/gradebook
const getGradebook = async (req, res, next) => {
  try {
    const gradebook = await getQuizGradebook(req.params.quizId, req.user);
    res.json(gradebook);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitResult,
  getResult,
  getMyResults,
  getGradebook,
};
