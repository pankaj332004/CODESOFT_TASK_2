const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildQuizPrompt, generateHeuristicQuiz } = require('../utils/quizPrompt');

class AIQuizService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || null;
    this.genAI = this.apiKey ? new GoogleGenerativeAI(this.apiKey) : null;
  }

  /**
   * Generates a full quiz using Gemini API or intelligent heuristic fallback
   */
  async generateQuiz({
    sourceType = 'topic',
    topic = '',
    content = '',
    image = null, // base64 string or data url
    count = 5,
    difficulty = 'Medium',
    questionTypes = ['multiple_choice'],
    includeExplanations = true,
  }) {
    const questionCount = Math.min(Math.max(parseInt(count, 10) || 5, 1), 25);
    const validDifficulty = ['Easy', 'Medium', 'Hard'].includes(difficulty) ? difficulty : 'Medium';

    // If Gemini API Key is configured, attempt real LLM generation
    if (process.env.GEMINI_API_KEY) {
      const candidateModels = [
        process.env.GEMINI_MODEL,
        'gemini-3.5-flash',
        'gemini-flash-latest',
        'gemini-3.7-flash',
        'gemini-3.8-flash',
        'gemini-2.5-pro',
      ].filter(Boolean);

      const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const promptText = buildQuizPrompt({
        sourceType,
        topic,
        content,
        count: questionCount,
        difficulty: validDifficulty,
        questionTypes,
        includeExplanations,
      });

      const parts = [promptText];

      // Handle Image input if provided
      if (sourceType === 'image' && image) {
        const base64Data = image.includes('base64,')
          ? image.split('base64,')[1]
          : image;
        
        let mimeType = 'image/jpeg';
        if (image.startsWith('data:image/png')) mimeType = 'image/png';
        else if (image.startsWith('data:image/webp')) mimeType = 'image/webp';
        else if (image.startsWith('data:image/svg')) mimeType = 'image/svg+xml';

        parts.push({
          inlineData: {
            data: base64Data,
            mimeType,
          },
        });
      }

      for (const modelName of candidateModels) {
        try {
          console.log(`🤖 Invoking Gemini AI (${modelName}) for ${sourceType.toUpperCase()} quiz generation...`);
          const model = client.getGenerativeModel({
            model: modelName,
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json',
            },
          });

          const result = await model.generateContent(parts);
          const responseText = result.response.text();

          // Clean any possible markdown wrappers
          let cleanJson = responseText.trim();
          if (cleanJson.startsWith('```json')) {
            cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
          } else if (cleanJson.startsWith('```')) {
            cleanJson = cleanJson.replace(/^```\s*/i, '').replace(/```$/i, '').trim();
          }

          const parsedQuiz = JSON.parse(cleanJson);
          return this.normalizeQuiz(parsedQuiz, {
            sourceType,
            topic: topic || parsedQuiz.title,
            difficulty: validDifficulty,
            count: questionCount,
            includeExplanations,
          });
        } catch (modelErr) {
          console.warn(`⚠️ Model ${modelName} encountered error: ${modelErr.message}. Trying next candidate...`);
        }
      }
      console.warn('⚠️ All Gemini LLM candidate models failed. Falling back to intelligent heuristic synthesis.');
    } else {
      console.log('ℹ️  No GEMINI_API_KEY set in server/.env. Using built-in intelligent quiz synthesis engine.');
    }

    // Heuristic intelligent fallback
    const fallbackQuiz = generateHeuristicQuiz({
      sourceType,
      topic,
      content,
      count: questionCount,
      difficulty: validDifficulty,
      questionTypes,
      includeExplanations,
    });

    return fallbackQuiz;
  }

  /**
   * Sanitizes, normalizes, and validates quiz data
   */
  normalizeQuiz(rawQuiz, fallbackMeta) {
    const title = rawQuiz.title || `${fallbackMeta.topic || 'Mastery'} Quiz`;
    const description = rawQuiz.description || `Test your knowledge with this ${fallbackMeta.difficulty} quiz.`;
    const category = rawQuiz.category || 'General Knowledge';
    const difficulty = rawQuiz.difficulty || fallbackMeta.difficulty;
    const timeLimitMinutes = rawQuiz.timeLimitMinutes || Math.max(5, Math.ceil((rawQuiz.questions?.length || 5) * 1.5));

    const rawQuestions = Array.isArray(rawQuiz.questions) ? rawQuiz.questions : [];
    const questions = rawQuestions.map((q, idx) => {
      const questionText = q.questionText || `Question ${idx + 1}`;
      const options = Array.isArray(q.options) && q.options.length >= 2
        ? q.options.map(opt => String(opt).trim())
        : ['Option A', 'Option B', 'Option C', 'Option D'];

      // Ensure correctAnswer matches an option
      let correctAnswer = String(q.correctAnswer || '').trim();
      if (!options.includes(correctAnswer)) {
        if (typeof q.correctOptionIndex === 'number' && options[q.correctOptionIndex]) {
          correctAnswer = options[q.correctOptionIndex];
        } else {
          correctAnswer = options[0];
        }
      }

      return {
        questionText,
        options,
        correctAnswer,
        explanation: q.explanation || 'Verified answer based on foundational concept analysis.',
        quickExplanation: q.quickExplanation || 'Core concept takeaway.',
        concept: q.concept || `${category} → Core Concept`,
      };
    });

    return {
      title,
      description,
      category,
      difficulty,
      timeLimitMinutes,
      questions,
      sourceType: fallbackMeta.sourceType,
    };
  }
}

module.exports = new AIQuizService();
