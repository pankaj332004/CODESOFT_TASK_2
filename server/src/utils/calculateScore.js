/**
 * Evaluates quiz answers and computes the final score breakdown.
 * @param {Array} questions - The official questions with correct answers
 * @param {Object} userAnswers - Key-value map of { [questionId or questionIndex]: selectedOption }
 * @returns {Object} { score, totalQuestions, percentage, answersBreakdown }
 */
const calculateScore = (questions, userAnswers = {}) => {
  let score = 0;
  const totalQuestions = questions.length;

  const answersBreakdown = questions.map((q, idx) => {
    const qKey = q._id ? q._id.toString() : String(idx);
    const selected = userAnswers[qKey] ?? userAnswers[idx] ?? '';
    
    // Normalise comparison (trim and exact match)
    const isCorrect = String(selected).trim() === String(q.correctAnswer).trim();
    if (isCorrect) score += 1;

    return {
      questionId: qKey,
      questionText: q.questionText,
      selectedAnswer: selected || 'No answer chosen',
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation || '',
    };
  });

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return {
    score,
    totalQuestions,
    percentage,
    answersBreakdown,
  };
};

module.exports = calculateScore;
