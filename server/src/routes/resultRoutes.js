const express = require('express');
const router = express.Router();
const {
  submitResult,
  getResult,
  getMyResults,
} = require('../controllers/resultController');
const { optionalAuth, protect } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, submitResult);
router.get('/my-results', protect, getMyResults);
router.get('/:id', getResult);

module.exports = router;
