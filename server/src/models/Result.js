const mongoose = require('mongoose');

const answerRecordSchema = new mongoose.Schema({
  questionId: {
    type: String,
  },
  questionText: {
    type: String,
    required: true,
  },
  selectedAnswer: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
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

const resultSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ['practice', 'exam'],
      default: 'practice',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userName: {
      type: String,
      default: 'Guest Learner',
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    quizTitle: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    timeTakenSeconds: {
      type: Number,
      default: 0,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    submissionReason: {
      type: String,
      default: 'completed', // 'completed' | 'time_limit_expired' | 'exam_window_expired'
    },
    answers: [answerRecordSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Result', resultSchema);
