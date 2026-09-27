import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import quizService from '../../services/quizService';
import { CATEGORIES } from '../../utils/constants';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

const createEmptyQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: '',
});

export const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General Knowledge');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    quizService
      .getQuizById(id)
      .then((data) => {
        if (data) {
          setTitle(data.title || '');
          setDescription(data.description || '');
          setCategory(data.category || 'General Knowledge');
          setTimeLimitMinutes(data.timeLimitMinutes || 10);
          setQuestions(data.questions || [createEmptyQuestion()]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching quiz to edit:', err);
        setLoading(false);
      });
  }, [id]);

  const handleQuestionTextChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    const oldVal = updated[qIndex].options[optIndex];
    updated[qIndex].options[optIndex] = value;
    if (updated[qIndex].correctAnswer === oldVal) {
      updated[qIndex].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (qIndex) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, idx) => idx !== qIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    setSubmitting(true);
    try {
      await quizService.updateQuiz(id, {
        title,
        description,
        category,
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
        questions,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Update quiz error:', err);
      setErrors({ form: err.message || 'Failed to update quiz' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen message="Loading quiz data..." />;

  return (
    <PageContainer maxWidth="960px" className="qm-edit-quiz-page">
      <div className="qm-back-nav">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
          icon={<ArrowLeft size={16} />}
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="qm-create-quiz-header">
        <h1 className="create-page-title">Edit Quiz</h1>
        <p className="create-page-subtitle">Update your quiz questions, timing, or details.</p>
      </div>

      <form onSubmit={handleSubmit} className="qm-edit-form">
        <div className="qm-form-card">
          <Input
            label="Quiz Title"
            id="edit-quiz-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            required
          />

          <Input
            label="Description"
            id="edit-quiz-desc"
            as="textarea"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-row-two">
            <Input
              label="Category"
              id="edit-quiz-cat"
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.filter((c) => c !== 'All Categories').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Input>

            <Input
              label="Time Limit (Minutes)"
              id="edit-quiz-time"
              type="number"
              min="1"
              max="120"
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(e.target.value)}
            />
          </div>
        </div>

        <div className="qm-form-questions-section">
          <h2 className="questions-section-title">Questions</h2>

          {questions.map((question, qIdx) => (
            <div key={qIdx} className="qm-question-builder-card">
              <div className="q-builder-header">
                <span className="q-number-label">Question {qIdx + 1}</span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    className="q-delete-btn"
                    onClick={() => removeQuestion(qIdx)}
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                )}
              </div>

              <Input
                placeholder="Enter your question..."
                value={question.questionText}
                onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                className="q-text-input"
              />

              <div className="q-options-builder-grid">
                {question.options.map((opt, oIdx) => (
                  <div key={oIdx} className="option-builder-item">
                    <span className="opt-letter-tag">{String.fromCharCode(65 + oIdx)}</span>
                    <input
                      type="text"
                      placeholder={`Option ${oIdx + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                      className="qm-input-field"
                    />
                  </div>
                ))}
              </div>

              <div className="q-correct-answer-picker">
                <label className="qm-label">Correct Answer</label>
                <select
                  className="qm-input-field qm-select"
                  value={question.correctAnswer}
                  onChange={(e) => handleCorrectAnswerChange(qIdx, e.target.value)}
                >
                  <option value="">Select correct answer</option>
                  {question.options.map((opt, oIdx) => (
                    <option key={oIdx} value={opt}>
                      Option {String.fromCharCode(65 + oIdx)}: {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <div className="add-question-action-wrap">
            <Button
              variant="outline"
              size="md"
              onClick={addQuestion}
              icon={<Plus size={18} />}
            >
              Add Another Question
            </Button>
          </div>

          <div className="create-submit-wrap">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submitting}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </PageContainer>
  );
};

export default EditQuiz;
