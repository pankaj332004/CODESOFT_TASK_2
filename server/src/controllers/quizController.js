const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require('../services/quizService');

// @desc Fetch all quizzes with optional search & category filter
// @route GET /api/quizzes
const getQuizzes = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const quizzes = await getAllQuizzes({ search, category });
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

// @desc Fetch single quiz by ID
// @route GET /api/quizzes/:id
const getQuiz = async (req, res, next) => {
  try {
    const quiz = await getQuizById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

// @desc Create a new quiz
// @route POST /api/quizzes
const createNewQuiz = async (req, res, next) => {
  try {
    const { title, description, category, icon, difficulty, timeLimitMinutes, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and at least one question are required' });
    }

    const quiz = await createQuiz(
      {
        title,
        description,
        category: category || 'General Knowledge',
        icon: icon || 'globe',
        difficulty: difficulty || 'Medium',
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
        questions,
      },
      req.user
    );

    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

// @desc Update existing quiz
// @route PUT /api/quizzes/:id
const updateExistingQuiz = async (req, res, next) => {
  try {
    const quiz = await updateQuiz(req.params.id, req.body, req.user);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

// @desc Delete quiz
// @route DELETE /api/quizzes/:id
const deleteExistingQuiz = async (req, res, next) => {
  try {
    const success = await deleteQuiz(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz removed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuizzes,
  getQuiz,
  createNewQuiz,
  updateExistingQuiz,
  deleteExistingQuiz,
};
