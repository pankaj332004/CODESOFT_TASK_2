/**
 * Frontend calculation helper if evaluating locally or previewing
 */
export const calculateScore = (questions = [], userAnswers = {}) => {
  let score = 0;
  const totalQuestions = questions.length;

  const answersBreakdown = questions.map((q, idx) => {
    const qKey = q._id ? String(q._id) : String(idx);
    const selected = userAnswers[qKey] ?? userAnswers[idx] ?? '';
    const isCorrect = String(selected).trim() === String(q.correctAnswer).trim();
    if (isCorrect) score += 1;

    return {
      questionId: qKey,
      questionText: q.questionText,
      selectedAnswer: selected || 'No answer selected',
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

export default calculateScore;
