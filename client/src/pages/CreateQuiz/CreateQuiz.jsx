import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, Lock, Globe, Key, Shuffle, Mail, Calendar, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

const createEmptyQuestion = () => ({
  questionText: '',
  options: ['', '', '', ''],
  correctAnswer: '',
});

export const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilled = location.state?.prefilledQuiz;
  const { user } = useAuth();

  const [title, setTitle] = useState(prefilled?.title || '');
  const [description, setDescription] = useState(prefilled?.description || '');
  const [category, setCategory] = useState(prefilled?.category || 'General Knowledge');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(prefilled?.timeLimitMinutes || 10);
  const [isPublic, setIsPublic] = useState(prefilled?.isPublic !== false);
  const [requirePasscode, setRequirePasscode] = useState(Boolean(prefilled?.accessCode));
  const [accessCode, setAccessCode] = useState(prefilled?.accessCode || '');
  const [assignedEmailsInput, setAssignedEmailsInput] = useState(
    prefilled?.assignedEmails ? prefilled.assignedEmails.join(', ') : ''
  );
  const [hasExamWindow, setHasExamWindow] = useState(
    Boolean(prefilled?.examStartTime || prefilled?.examEndTime)
  );
  const [examStartTime, setExamStartTime] = useState(
    prefilled?.examStartTime ? new Date(prefilled.examStartTime).toISOString().slice(0, 16) : ''
  );
  const [examEndTime, setExamEndTime] = useState(
    prefilled?.examEndTime ? new Date(prefilled.examEndTime).toISOString().slice(0, 16) : ''
  );
  const [questions, setQuestions] = useState(
    prefilled?.questions?.length ? prefilled.questions : [createEmptyQuestion()]
  );
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
      const cleanAssignedEmails = assignedEmailsInput
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      const isRestricted = cleanAssignedEmails.length > 0;

      const payload = {
        title,
        description,
        category,
        timeLimitMinutes: Number(timeLimitMinutes) || 10,
        isPublic: isRestricted ? false : isPublic,
        accessCode: requirePasscode ? accessCode.trim() : '',
        assignedEmails: cleanAssignedEmails,
        examStartTime: hasExamWindow && examStartTime ? new Date(examStartTime).toISOString() : null,
        examEndTime: hasExamWindow && examEndTime ? new Date(examEndTime).toISOString() : null,
        questions: questions.map((q) => ({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || '',
          quickExplanation: q.quickExplanation || '',
          concept: q.concept || '',
        })),
        creatorName: user ? user.name : 'Community Author',
      };

      const created = await quizService.createQuiz(payload);
      navigate(`/dashboard`);
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
        <div>
          <h1 className="create-page-title">Create a New Quiz</h1>
          <p className="create-page-subtitle">
            Add a title, description and questions manually or let AI generate one for you.
          </p>
        </div>
        <Button
          variant="accent"
          size="md"
          onClick={() => navigate('/ai-quiz-generator')}
          icon={<Sparkles size={16} />}
          className="create-with-ai-badge-btn"
        >
          ✨ Generate with AI
        </Button>
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

              {/* Access & Visibility Controls */}
              <div className="qm-access-visibility-card">
                <label className="qm-field-section-label">
                  <Lock size={16} /> Exam Privacy & Access Control
                </label>
                
                <div className="qm-visibility-toggle-group">
                  <label className={`qm-visibility-option ${isPublic ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="visibility"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                    />
                    <Globe size={18} />
                    <div>
                      <strong>🌍 Public Exam</strong>
                      <p>Visible to all learners in the public explore catalog</p>
                    </div>
                  </label>

                  <label className={`qm-visibility-option ${!isPublic ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="visibility"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                    />
                    <Lock size={18} />
                    <div>
                      <strong>🔒 Private / Classroom</strong>
                      <p>Only accessible by you and participants with access</p>
                    </div>
                  </label>
                </div>

                <div className="qm-passcode-toggle-row">
                  <label className="qm-checkbox-label">
                    <input
                      type="checkbox"
                      checked={requirePasscode}
                      onChange={(e) => {
                        setRequirePasscode(e.target.checked);
                        if (e.target.checked && !accessCode) {
                          setAccessCode(`EXAM-${Math.floor(1000 + Math.random() * 9000)}`);
                        }
                      }}
                    />
                    <span>Require Student Access Passcode (PIN)</span>
                  </label>
                </div>

                {requirePasscode && (
                  <div className="qm-passcode-input-wrap">
                    <div className="qm-passcode-field">
                      <Key size={16} className="passcode-icon" />
                      <input
                        type="text"
                        className="qm-passcode-input"
                        placeholder="e.g. EXAM-8291"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                        maxLength={15}
                      />
                      <button
                        type="button"
                        className="qm-generate-code-btn"
                        onClick={() => setAccessCode(`EXAM-${Math.floor(1000 + Math.random() * 9000)}`)}
                        title="Generate random access code"
                      >
                        <Shuffle size={14} /> Generate PIN
                      </button>
                    </div>
                    <span className="qm-passcode-hint">
                      Share this code only with students you want to permit into the exam.
                    </span>
                  </div>
                )}

                {/* Particular Person Assignment */}
                <div className="qm-assigned-emails-wrap" style={{ marginTop: '16px' }}>
                  <label className="qm-field-section-label" style={{ fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={15} /> Assign to Particular Students (Whitelisted Emails)
                  </label>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', margin: '4px 0 8px' }}>
                    Only these specified students and you will see this quiz in the quiz list. Other users cannot see or access it.
                  </p>
                  <div className="qm-passcode-field">
                    <Mail size={16} className="passcode-icon" />
                    <input
                      type="text"
                      className="qm-passcode-input"
                      placeholder="e.g. rahul@example.com, priya@college.edu (comma separated)"
                      value={assignedEmailsInput}
                      onChange={(e) => setAssignedEmailsInput(e.target.value)}
                    />
                  </div>
                  {assignedEmailsInput.trim() && (
                    <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981' }}>
                      <ShieldCheck size={14} />
                      <span>Private Whitelist Mode active: Only assigned students will see this quiz.</span>
                    </div>
                  )}
                </div>

                {/* Exam Mode Time Window */}
                <div className="qm-exam-window-wrap" style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid var(--border-color, #e5e7eb)' }}>
                  <div className="qm-passcode-toggle-row">
                    <label className="qm-checkbox-label">
                      <input
                        type="checkbox"
                        checked={hasExamWindow}
                        onChange={(e) => setHasExamWindow(e.target.checked)}
                      />
                      <span style={{ fontWeight: 600 }}>Enforce Exam Schedule Window (Exam Mode Only)</span>
                    </label>
                  </div>

                  {hasExamWindow && (
                    <div style={{ marginTop: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '14px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                            <Calendar size={13} /> Exam Starts At
                          </label>
                          <input
                            type="datetime-local"
                            className="qm-input"
                            value={examStartTime}
                            onChange={(e) => setExamStartTime(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color, #d1d5db)' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                            <Clock size={13} /> Exam Deadline / Closes At
                          </label>
                          <input
                            type="datetime-local"
                            className="qm-input"
                            value={examEndTime}
                            onChange={(e) => setExamEndTime(e.target.value)}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color, #d1d5db)' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#b91c1c' }}>
                        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>
                          <strong>Strict Exam Rule:</strong> In <strong>Exam Mode</strong>, the quiz can only be attended during this window. If a student does not attend or complete it before the deadline, it will <strong>automatically submit with 0 marks</strong>. (Practice Mode remains open anytime without penalty).
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
