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
    const quizzes = await getAllQuizzes({ search, category, user: req.user });
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

// @desc Fetch single quiz by ID
// @route GET /api/quizzes/:id
const getQuiz = async (req, res, next) => {
  try {
    const quiz = await getQuizById(req.params.id, req.user);
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
    const {
      title,
      description,
      category,
      icon,
      difficulty,
      timeLimitMinutes,
      questions,
      isPublic,
      accessCode,
      assignedEmails,
      examStartTime,
      examEndTime,
    } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and at least one question are required' });
    }

    // Normalize difficulty enum (Easy, Medium, Hard)
    const normalizedDifficulty = difficulty
      ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
      : 'Medium';

    // Normalize questions to support both questionText and question property
    const formattedQuestions = questions.map((q) => ({
      questionText: q.questionText || q.question || '',
      options: q.options || [],
      correctAnswer: q.correctAnswer || (q.options ? q.options[q.correctAnswerIndex || 0] : ''),
      explanation: q.explanation || '',
      quickExplanation: q.quickExplanation || '',
      concept: q.concept || '',
    }));

    // Process assigned emails
    const cleanAssignedEmails = Array.isArray(assignedEmails)
      ? assignedEmails.map((e) => String(e).trim().toLowerCase()).filter(Boolean)
      : typeof assignedEmails === 'string'
      ? assignedEmails.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
      : [];

    const isAssignedPrivate = cleanAssignedEmails.length > 0;

    const quiz = await createQuiz(
      {
        title,
        description,
        category: category || 'General Knowledge',
        icon: icon || 'globe',
        difficulty: ['Easy', 'Medium', 'Hard'].includes(normalizedDifficulty) ? normalizedDifficulty : 'Medium',
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
        questions: formattedQuestions,
        isPublic: isAssignedPrivate ? false : isPublic !== false,
        accessCode: String(accessCode || '').trim(),
        assignedEmails: cleanAssignedEmails,
        examStartTime: examStartTime ? new Date(examStartTime) : null,
        examEndTime: examEndTime ? new Date(examEndTime) : null,
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
    const success = await deleteQuiz(req.params.id, req.user);
    if (!success) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc Verify access passcode for restricted quiz
// @route POST /api/quizzes/:id/verify-passcode
const verifyPasscode = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    const quiz = await getQuizById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (!quiz.accessCode || quiz.accessCode.trim() === '') {
      return res.json({ required: false, valid: true, message: 'Open quiz, no passcode required.' });
    }

    const isMatch = String(passcode || '').trim().toLowerCase() === quiz.accessCode.trim().toLowerCase();
    if (!isMatch) {
      return res.status(401).json({ required: true, valid: false, message: 'Invalid exam passcode.' });
    }

    res.json({ required: true, valid: true, message: 'Access granted.' });
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
  verifyPasscode,
};
