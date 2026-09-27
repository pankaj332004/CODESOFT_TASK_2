import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import quizService from '../../services/quizService';
import { useAuth } from '../../hooks/useAuth';
import { CATEGORIES } from '../../utils/constants';
import {
  QuizNotepad,
  StackedBooks,
  PencilHolder,
} from '../../assets/illustrations/Illustrations';
import { Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const createEmptyQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: '',
});

export const CreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General Knowledge');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(10);
  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleQuestionTextChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    const oldOptionValue = updated[qIndex].options[optIndex];
    updated[qIndex].options[optIndex] = value;

    // If correct answer was previously set to this option, update it
    if (updated[qIndex].correctAnswer === oldOptionValue) {
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

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Quiz title is required';
    }

    questions.forEach((q, idx) => {
      if (!q.questionText.trim()) {
        newErrors[`q_${idx}_text`] = `Question ${idx + 1} text is required`;
      }

      q.options.forEach((opt, oIdx) => {
        if (!opt.trim()) {
          newErrors[`q_${idx}_opt_${oIdx}`] = `Option ${String.fromCharCode(65 + oIdx)} is required`;
        }
      });

      if (!q.correctAnswer.trim()) {
        newErrors[`q_${idx}_correct`] = `Please specify the correct answer for question ${idx + 1}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        title,
        description,
        category,
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
        questions: questions.map((q) => ({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
        creatorName: user ? user.name : 'Community Author',
      };

      const created = await quizService.createQuiz(payload);
      navigate(`/quizzes`);
    } catch (err) {
      console.error('Error creating quiz:', err);
      setErrors({ form: err.message || 'Failed to create quiz' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer maxWidth="1200px" className="qm-create-quiz-page">
      <div className="qm-create-quiz-header">
        <h1 className="create-page-title">Create a New Quiz</h1>
        <p className="create-page-subtitle">
          Add a title, description and questions to create your own quiz.
        </p>
      </div>

      <div className="qm-create-quiz-layout">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="qm-create-form-column">
          {errors.form && (
            <div className="qm-form-error-banner">
              <AlertCircle size={20} />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Meta Fields Card */}
          <div className="qm-form-card">
            <Input
              label="Quiz Title"
              id="quiz-title-input"
              placeholder="Enter quiz title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              required
            />

            <Input
              label="Description (Optional)"
              id="quiz-desc-input"
              as="textarea"
              rows={2}
              placeholder="Enter a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="form-row-two">
              <Input
                label="Category"
                id="quiz-category-input"
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
                id="quiz-time-input"
                type="number"
                min="1"
                max="120"
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(e.target.value)}
              />
            </div>
          </div>

          {/* Dynamic Questions Builder */}
          <div className="qm-form-questions-section">
            <h2 className="questions-section-title">Add Questions</h2>

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
                  error={errors[`q_${qIdx}_text`]}
                  className="q-text-input"
                />

                {/* 4 Options Grid */}
                <div className="q-options-builder-grid">
                  {question.options.map((opt, oIdx) => {
                    const letter = String.fromCharCode(65 + oIdx);
                    return (
                      <div key={oIdx} className="option-builder-item">
                        <span className="opt-letter-tag">{letter}</span>
                        <input
                          type="text"
                          placeholder={`Option ${oIdx + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(qIdx, oIdx, e.target.value)
                          }
                          className={`qm-input-field ${
                            errors[`q_${qIdx}_opt_${oIdx}`] ? 'field-error' : ''
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Correct Answer Selector */}
                <div className="q-correct-answer-picker">
                  <label className="qm-label">Correct Answer</label>
                  <select
                    className="qm-input-field qm-select"
                    value={question.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(qIdx, e.target.value)}
                  >
                    <option value="">Select correct answer</option>
                    {question.options.map((opt, oIdx) => (
                      <option key={oIdx} value={opt} disabled={!opt.trim()}>
                        Option {String.fromCharCode(65 + oIdx)}: {opt || `(Option ${oIdx + 1})`}
                      </option>
                    ))}
                  </select>
                  {errors[`q_${qIdx}_correct`] && (
                    <p className="qm-input-error">{errors[`q_${qIdx}_correct`]}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Add Another Question Button */}
            <div className="add-question-action-wrap">
              <Button
                variant="outline"
                size="md"
                onClick={addQuestion}
                icon={<Plus size={18} />}
                iconPosition="left"
                className="add-another-btn"
              >
                Add Another Question
              </Button>
            </div>

            {/* Submit Button */}
            <div className="create-submit-wrap">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submitting}
                className="submit-create-quiz-btn"
              >
                Create Quiz
              </Button>
            </div>
          </div>
        </form>

        {/* Right Side Illustration Backdrop */}
        <aside className="qm-create-side-backdrop" aria-hidden="true">
          <div className="side-sticky-art">
            <QuizNotepad width={220} height={250} />
            <div className="mt-books">
              <StackedBooks width={200} height={140} />
            </div>
            <div className="mt-pencil">
              <PencilHolder width={110} height={130} />
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
};

export default CreateQuiz;
