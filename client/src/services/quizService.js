import apiClient from './api';

export const quizService = {
  async getQuizzes(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All Categories') {
      query.append('category', params.category);
    }
    const queryString = query.toString();
    const endpoint = `/quizzes${queryString ? `?${queryString}` : ''}`;
    return await apiClient(endpoint);
  },

  async getQuizById(id) {
    return await apiClient(`/quizzes/${id}`);
  },

  async createQuiz(quizData) {
    return await apiClient('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  },

  async updateQuiz(id, quizData) {
    return await apiClient(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quizData),
    });
  },

  async deleteQuiz(id) {
    return await apiClient(`/quizzes/${id}`, {
      method: 'DELETE',
    });
  },

  async submitQuizResult(payload) {
    return await apiClient('/results', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getResultById(id) {
    return await apiClient(`/results/${id}`);
  },

  async getMyResults() {
    return await apiClient('/results/my-results');
  },

  async getQuizGradebook(quizId) {
    return await apiClient(`/results/quiz/${quizId}/gradebook`);
  },

  async verifyPasscode(quizId, passcode) {
    return await apiClient(`/quizzes/${quizId}/verify-passcode`, {
      method: 'POST',
      body: JSON.stringify({ passcode }),
    });
  },
};

export default quizService;
