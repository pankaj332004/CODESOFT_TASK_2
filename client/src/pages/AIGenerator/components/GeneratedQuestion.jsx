import React, { useState } from 'react';
import { CheckCircle2, Edit2, Trash2, Check, BookOpen, Tag } from 'lucide-react';

export const GeneratedQuestion = ({
  question,
  index,
  isEditing,
  onUpdateQuestion,
  onDeleteQuestion,
}) => {
  const [localQuestion, setLocalQuestion] = useState({ ...question });

  const handleFieldChange = (field, value) => {
    const updated = { ...localQuestion, [field]: value };
    setLocalQuestion(updated);
    if (onUpdateQuestion) {
      onUpdateQuestion(index, updated);
    }
  };

  const handleOptionChange = (optIdx, value) => {
    const newOptions = [...localQuestion.options];
    const oldVal = newOptions[optIdx];
    newOptions[optIdx] = value;

    let newCorrect = localQuestion.correctAnswer;
    if (newCorrect === oldVal) {
      newCorrect = value;
    }

    const updated = {
      ...localQuestion,
      options: newOptions,
      correctAnswer: newCorrect,
    };
    setLocalQuestion(updated);
    if (onUpdateQuestion) {
      onUpdateQuestion(index, updated);
    }
  };

  const setAsCorrect = (optValue) => {
    const updated = { ...localQuestion, correctAnswer: optValue };
    setLocalQuestion(updated);
    if (onUpdateQuestion) {
      onUpdateQuestion(index, updated);
    }
  };

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className={`qm-ai-preview-qcard ${isEditing ? 'editing' : ''}`}>
      <div className="qm-ai-qcard-header">
        <div className="qm-ai-qcard-number">
          <span className="qcard-badge">Q{index + 1}</span>
          {question.concept && (
            <span className="qm-ai-concept-tag">
              <Tag size={12} /> {question.concept}
            </span>
          )}
        </div>

        {isEditing && (
          <button
            type="button"
            className="qm-ai-delete-q-btn"
            onClick={() => onDeleteQuestion(index)}
            title="Delete this question"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Question Text */}
      {isEditing ? (
        <div className="qm-ai-edit-field">
          <label className="qm-ai-edit-label">Question Text:</label>
          <input
            type="text"
            className="qm-ai-text-input"
            value={localQuestion.questionText}
            onChange={(e) => handleFieldChange('questionText', e.target.value)}
          />
        </div>
      ) : (
        <h3 className="qm-ai-qcard-title">{question.questionText}</h3>
      )}

      {/* Options List */}
      <div className="qm-ai-options-list">
        {localQuestion.options.map((opt, optIdx) => {
          const isCorrect = opt === localQuestion.correctAnswer;
          const letter = alphabet[optIdx] || optIdx + 1;

          if (isEditing) {
            return (
              <div key={optIdx} className="qm-ai-edit-option-row">
                <button
                  type="button"
                  className={`qm-ai-correct-pick-btn ${isCorrect ? 'active' : ''}`}
                  onClick={() => setAsCorrect(opt)}
                  title={isCorrect ? 'Correct Answer' : 'Click to set as correct answer'}
                >
                  {letter}
                </button>
                <input
                  type="text"
                  className="qm-ai-text-input opt-input"
                  value={opt}
                  onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                />
              </div>
            );
          }

          return (
            <div
              key={optIdx}
              className={`qm-ai-option-item ${isCorrect ? 'is-correct-preview' : ''}`}
            >
              <span className="qm-ai-option-letter">{letter}</span>
              <span className="qm-ai-option-text">{opt}</span>
              {isCorrect && (
                <span className="qm-ai-correct-tag">
                  <Check size={14} /> Correct
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Correct Answer Summary Badge */}
      {!isEditing && (
        <div className="qm-ai-answer-summary-box">
          <span className="qm-ai-summary-label">
            <CheckCircle2 size={15} /> Correct Answer:
          </span>
          <span className="qm-ai-summary-value">{question.correctAnswer}</span>
        </div>
      )}

      {/* Explanation Block */}
      {question.explanation && (
        <div className="qm-ai-explanation-box">
          <div className="qm-ai-explanation-header">
            <BookOpen size={14} />
            <span>Explanation:</span>
          </div>
          {isEditing ? (
            <textarea
              className="qm-ai-textarea"
              rows={2}
              value={localQuestion.explanation}
              onChange={(e) => handleFieldChange('explanation', e.target.value)}
            />
          ) : (
            <p className="qm-ai-explanation-text">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneratedQuestion;
