const aiQuizService = require('../services/aiQuizService');

/**
 * @desc   Generate a quiz using AI (from Topic, Text, or Image)
 * @route  POST /api/ai-quizzes/generate
 * @access Public / Protected
 */
exports.generateQuiz = async (req, res, next) => {
  try {
    const {
      sourceType = 'topic',
      topic = '',
      content = '',
      image = null,
      count = 5,
      difficulty = 'Medium',
      questionTypes = ['multiple_choice'],
      includeExplanations = true,
    } = req.body;

    // Validation
    if (sourceType === 'topic' && !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a topic for quiz generation',
      });
    }

    if (sourceType === 'text' && !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please paste your study material or text content',
      });
    }

    if (sourceType === 'image' && !image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload or provide an image for vision-based quiz generation',
      });
    }

    const quiz = await aiQuizService.generateQuiz({
      sourceType,
      topic,
      content,
      image,
      count,
      difficulty,
      questionTypes,
      includeExplanations,
    });

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    console.error('Error in aiQuizController.generateQuiz:', error);
    next(error);
  }
};
