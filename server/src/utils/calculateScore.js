/**
 * Evaluates quiz answers and computes the final score breakdown.
 * @param {Array} questions - The official questions with correct answers
 * @param {Object} userAnswers - Key-value map of { [questionId or questionIndex]: selectedOption }
 * @returns {Object} { score, totalQuestions, percentage, answersBreakdown }
 */
const calculateScore = (questions, userAnswers = {}) => {
  let score = 0;
  const totalQuestions = questions ? questions.length : 0;

  // Normalize userAnswers if provided as array
  let answerMap = {};
  if (Array.isArray(userAnswers)) {
    userAnswers.forEach((item, idx) => {
      if (item && typeof item === 'object') {
        const key = item.questionId || (item.questionIndex !== undefined ? String(item.questionIndex) : String(idx));
        answerMap[key] = item.selectedAnswer ?? item.answer ?? item.selected ?? '';
      } else {
        answerMap[String(idx)] = item;
      }
    });
  } else if (userAnswers && typeof userAnswers === 'object') {
    answerMap = userAnswers;
  }

  const answersBreakdown = (questions || []).map((q, idx) => {
    const qKey = q._id ? q._id.toString() : String(idx);
    const rawSelected = answerMap[qKey] ?? answerMap[idx] ?? answerMap[String(idx)] ?? '';
    const selected = (rawSelected !== undefined && rawSelected !== null) ? String(rawSelected).trim() : '';
    
    // Normalise comparison (trim and exact match)
    const isCorrect = Boolean(selected && selected === String(q.correctAnswer || '').trim());
    if (isCorrect) score += 1;

    return {
      questionId: qKey,
      questionText: q.questionText || '',
      selectedAnswer: selected || 'Unanswered',
      correctAnswer: q.correctAnswer || '',
      isCorrect,
      explanation: q.explanation || '',
      quickExplanation: q.quickExplanation || '',
      concept: q.concept || '',
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
