const express = require('express');
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createNewQuiz,
  updateExistingQuiz,
  deleteExistingQuiz,
} = require('../controllers/quizController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.route('/')
  .get(getQuizzes)
  .post(optionalAuth, createNewQuiz);

router.route('/:id')
  .get(getQuiz)
  .put(optionalAuth, updateExistingQuiz)
  .delete(optionalAuth, deleteExistingQuiz);

module.exports = router;
