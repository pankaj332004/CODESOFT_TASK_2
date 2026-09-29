const express = require('express');
const router = express.Router();
const aiQuizController = require('../controllers/aiQuizController');

// POST /api/ai-quizzes/generate
router.post('/generate', aiQuizController.generateQuiz);

module.exports = router;
