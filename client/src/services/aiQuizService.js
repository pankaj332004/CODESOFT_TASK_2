import apiClient from './api';
import quizService from './quizService';

export const aiQuizService = {
  /**
   * Generates a quiz from Topic, Text notes, or Image
   * @param {Object} params
   * @param {'topic'|'text'|'image'} params.sourceType
   * @param {string} [params.topic]
   * @param {string} [params.content]
   * @param {string} [params.image] base64 data URL
   * @param {number} [params.count] 5, 10, 15, 20
   * @param {'Easy'|'Medium'|'Hard'} [params.difficulty]
   * @param {string[]} [params.questionTypes] ['multiple_choice', 'true_false']
   * @param {boolean} [params.includeExplanations]
   */
  async generateQuiz(params) {
    const response = await apiClient('/ai-quizzes/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return response.data;
  },

  /**
   * Persists an AI-generated quiz to the backend database
   * @param {Object} quizData
   */
  async saveQuiz(quizData) {
    return await quizService.createQuiz(quizData);
  },
};

export default aiQuizService;
