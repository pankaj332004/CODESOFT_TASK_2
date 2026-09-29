const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
  },
  options: {
    type: [String],
    validate: [val => val.length >= 2, 'At least 2 options are required'],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
  },
  explanation: {
    type: String,
    default: '',
  },
  quickExplanation: {
    type: String,
    default: '',
  },
  concept: {
    type: String,
    default: '',
  },
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: 'General Knowledge',
      trim: true,
    },
    icon: {
      type: String,
      default: 'globe',
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    timeLimitMinutes: {
      type: Number,
      default: 10,
    },
    questions: {
      type: [questionSchema],
      validate: [val => val.length > 0, 'Quiz must have at least one question'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    creatorName: {
      type: String,
      default: 'QuizMaster',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    accessCode: {
      type: String,
      default: '',
      trim: true,
    },
    assignedEmails: {
      type: [String],
      default: [],
    },
    examStartTime: {
      type: Date,
      default: null,
    },
    examEndTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
