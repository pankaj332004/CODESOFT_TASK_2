const express = require('express');
const router = express.Router();
const {
  submitResult,
  getResult,
  getMyResults,
  getGradebook,
} = require('../controllers/resultController');
const { optionalAuth, protect } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, submitResult);
router.get('/my-results', protect, getMyResults);
router.get('/quiz/:quizId/gradebook', protect, getGradebook);
router.get('/:id', getResult);

module.exports = router;
