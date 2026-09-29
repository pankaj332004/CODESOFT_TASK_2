const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createNewQuiz,
  updateExistingQuiz,
  deleteExistingQuiz,
  verifyPasscode,
} = require('../controllers/quizController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.route('/')
  .get(optionalAuth, getQuizzes)
  .post(optionalAuth, createNewQuiz);

router.post('/:id/verify-passcode', verifyPasscode);

router.route('/:id')
  .get(optionalAuth, getQuiz)
  .put(optionalAuth, updateExistingQuiz)
  .delete(optionalAuth, deleteExistingQuiz);

module.exports = router;
