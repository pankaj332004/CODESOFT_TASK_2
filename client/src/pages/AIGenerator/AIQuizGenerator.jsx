import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import SourceInput from './components/SourceInput';
import ImageUploader from './components/ImageUploader';
import QuestionSettings from './components/QuestionSettings';
import AIQuizPreview from './AIQuizPreview';
import Button from '../../components/common/Button';
import aiQuizService from '../../services/aiQuizService';
import quizService from '../../services/quizService';
import { useAuth } from '../../hooks/useAuth';
import {
  Sparkles,
  Type,
  FileText,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

export const AIQuizGenerator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Generator State
  const [sourceType, setSourceType] = useState('topic'); // 'topic' | 'text' | 'image'
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  // Question Config State
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionTypes, setQuestionTypes] = useState(['multiple_choice']);
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [requirePasscode, setRequirePasscode] = useState(false);
  const [accessCode, setAccessCode] = useState('');

  // Workflow State
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [error, setError] = useState(null);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [savedQuiz, setSavedQuiz] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setSavedQuiz(null);

    // Validation
    if (sourceType === 'topic' && !topic.trim()) {
      setError('Please enter a topic to create your quiz.');
      return;
    }
    if (sourceType === 'text' && !content.trim()) {
      setError('Please paste study notes or text content.');
      return;
    }
    if (sourceType === 'image' && !image) {
      setError('Please upload or drag an image of your study material.');
      return;
    }

    setGenerating(true);
    setGenerationStep('Analyzing source material & extracting key concepts...');

    try {
      setTimeout(() => {
        setGenerationStep('Formulating questions & plausible distractors...');
      }, 900);

      setTimeout(() => {
        setGenerationStep('Synthesizing pedagogical explanations & concept trails...');
      }, 1800);

      const result = await aiQuizService.generateQuiz({
        sourceType,
        topic: topic.trim(),
        content: content.trim(),
        image,
        count,
        difficulty,
        questionTypes,
        includeExplanations,
      });

      setGeneratedQuiz(result);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
      setError(err.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setGenerating(false);
      setGenerationStep('');
    }
  };

  const handleSaveQuiz = async (quizToSave) => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: quizToSave.title,
        description: quizToSave.description,
        category: quizToSave.category || 'General Knowledge',
        difficulty: quizToSave.difficulty || difficulty,
        timeLimitMinutes: quizToSave.timeLimitMinutes || Math.max(5, Math.ceil(quizToSave.questions.length * 1.5)),
        questions: quizToSave.questions.map((q) => ({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          quickExplanation: q.quickExplanation,
          concept: q.concept,
        })),
        creatorName: user ? user.name : 'AI QuizMaster',
        createdBy: user ? user._id : null,
        isPublic,
        accessCode: requirePasscode ? accessCode.trim() : '',
      };

      const saved = await aiQuizService.saveQuiz(payload);
      setSavedQuiz(saved);
      setSaveSuccess(true);
    } catch (err) {
      console.error('Failed to save quiz:', err);
      setError(err.message || 'Failed to save quiz to your database catalog.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSavedQuiz = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this AI quiz from your database?')) {
      return;
    }

    setDeleting(true);
    try {
      await quizService.deleteQuiz(quizId);
      setSavedQuiz(null);
      setGeneratedQuiz(null);
      alert('Quiz successfully deleted from database.');
    } catch (err) {
      console.error('Failed to delete saved quiz:', err);
      alert(err.message || 'Failed to delete quiz.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageContainer maxWidth="1080px" className="qm-ai-page-wrap">
      {saveSuccess && (
        <div className="qm-ai-toast-success">
          <CheckCircle2 size={20} />
          <span>Quiz successfully saved to your database catalog!</span>
        </div>
      )}

      {/* If a quiz has been generated, render the interactive Preview screen */}
      {generatedQuiz ? (
        <AIQuizPreview
          quizData={generatedQuiz}
          onRegenerate={handleGenerate}
          onBackToGenerator={() => {
            setGeneratedQuiz(null);
            setSavedQuiz(null);
          }}
          onSaveQuiz={handleSaveQuiz}
          saving={saving}
          savedQuiz={savedQuiz}
          onDeleteQuiz={handleDeleteSavedQuiz}
          deleting={deleting}
        />
      ) : (
        /* Otherwise, show the AI Quiz Generator Config Panel */
        <div className="qm-ai-generator-card">
          {/* Header Banner */}
          <div className="qm-ai-header-banner">
            <div className="qm-ai-sparkle-pill">
              <Sparkles size={16} /> Powered by AI
            </div>
            <h1 className="qm-ai-main-title">AI Quiz Generator</h1>
            <p className="qm-ai-subtitle">
              Create an interactive, high-quality quiz from any topic, study notes, or image in seconds.
            </p>
          </div>

          {error && (
            <div className="qm-ai-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="qm-ai-form">
            {/* Source Ingestion Card */}
            <div className="qm-ai-source-card">
              <div className="qm-ai-source-selector">
                <span className="qm-ai-selector-label">Source Material:</span>
                <div className="qm-ai-source-tabs">
                  <button
                    type="button"
                    className={`qm-ai-tab-btn ${sourceType === 'topic' ? 'active' : ''}`}
                    onClick={() => setSourceType('topic')}
                  >
                    <Type size={16} />
                    <span>Topic</span>
                  </button>

                  <button
                    type="button"
                    className={`qm-ai-tab-btn ${sourceType === 'text' ? 'active' : ''}`}
                    onClick={() => setSourceType('text')}
                  >
                    <FileText size={16} />
                    <span>Text / Notes</span>
                  </button>

                  <button
                    type="button"
                    className={`qm-ai-tab-btn ${sourceType === 'image' ? 'active' : ''}`}
                    onClick={() => setSourceType('image')}
                  >
                    <ImageIcon size={16} />
                    <span>Image / Notes</span>
                  </button>
                </div>
              </div>

              {/* Source Input Body */}
              <div className="qm-ai-source-body">
                {sourceType === 'image' ? (
                  <ImageUploader image={image} setImage={setImage} />
                ) : (
                  <SourceInput
                    sourceType={sourceType}
                    topic={topic}
                    setTopic={setTopic}
                    content={content}
                    setContent={setContent}
                  />
                )}
              </div>
            </div>

            {/* Question Settings Grid */}
            <div className="qm-ai-section-divider">
              <span>Quiz Parameters</span>
            </div>

            <QuestionSettings
              count={count}
              setCount={setCount}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              questionTypes={questionTypes}
              setQuestionTypes={setQuestionTypes}
              includeExplanations={includeExplanations}
              setIncludeExplanations={setIncludeExplanations}
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              requirePasscode={requirePasscode}
              setRequirePasscode={setRequirePasscode}
              accessCode={accessCode}
              setAccessCode={setAccessCode}
            />

            {/* Submit Action */}
            <div className="qm-ai-submit-zone">
              {generating ? (
                <div className="qm-ai-generating-loader">
                  <div className="qm-ai-loader-spinner">
                    <Loader2 size={32} className="spin-animate" />
                  </div>
                  <div className="qm-ai-loader-text">
                    <strong>Generating Your Quiz with AI...</strong>
                    <p>{generationStep}</p>
                  </div>
                </div>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<Sparkles size={20} />}
                  className="qm-ai-generate-main-btn"
                >
                  Generate Quiz ✨
                </Button>
              )}
            </div>
          </form>
        </div>
      )}
    </PageContainer>
  );
};

export default AIQuizGenerator;
