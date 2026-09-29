import React from 'react';
import {
  Minus,
  Plus,
  HelpCircle,
  CheckSquare,
  Square,
  Layers,
  Gauge,
  BookOpen,
  Lock,
  Globe,
  Key,
  Shuffle,
} from 'lucide-react';

const PRESET_COUNTS = [5, 10, 15, 20];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const QuestionSettings = ({
  count,
  setCount,
  difficulty,
  setDifficulty,
  questionTypes,
  setQuestionTypes,
  includeExplanations,
  setIncludeExplanations,
  isPublic,
  setIsPublic,
  requirePasscode,
  setRequirePasscode,
  accessCode,
  setAccessCode,
}) => {
  const handleDecrement = () => {
    setCount((prev) => Math.max(prev - 1, 1));
  };

  const handleIncrement = () => {
    setCount((prev) => Math.min(prev + 1, 25));
  };

  const toggleType = (typeKey) => {
    if (questionTypes.includes(typeKey)) {
      // Don't allow unchecking both
      if (questionTypes.length > 1) {
        setQuestionTypes(questionTypes.filter((t) => t !== typeKey));
      }
    } else {
      setQuestionTypes([...questionTypes, typeKey]);
    }
  };

  return (
    <div className="qm-ai-settings-grid">
      {/* 1. Number of Questions */}
      <div className="qm-ai-setting-card">
        <label className="qm-ai-setting-label">
          <Layers size={16} />
          <span>Number of Questions</span>
        </label>

        <div className="qm-ai-count-controls">
          <div className="qm-ai-stepper">
            <button
              type="button"
              className="qm-ai-stepper-btn"
              onClick={handleDecrement}
              disabled={count <= 1}
              aria-label="Decrease questions"
            >
              <Minus size={16} />
            </button>
            <span className="qm-ai-stepper-value">{count}</span>
            <button
              type="button"
              className="qm-ai-stepper-btn"
              onClick={handleIncrement}
              disabled={count >= 25}
              aria-label="Increase questions"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="qm-ai-count-presets">
            {PRESET_COUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`qm-ai-preset-pill ${count === preset ? 'active' : ''}`}
                onClick={() => setCount(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Difficulty */}
      <div className="qm-ai-setting-card">
        <label className="qm-ai-setting-label">
          <Gauge size={16} />
          <span>Difficulty</span>
        </label>

        <div className="qm-ai-difficulty-options">
          {DIFFICULTIES.map((diff) => (
            <label
              key={diff}
              className={`qm-ai-radio-card ${difficulty === diff ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="difficulty"
                value={diff}
                checked={difficulty === diff}
                onChange={() => setDifficulty(diff)}
              />
              <span className="qm-ai-radio-indicator"></span>
              <span className="qm-ai-radio-text">{diff}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Question Types */}
      <div className="qm-ai-setting-card">
        <label className="qm-ai-setting-label">
          <HelpCircle size={16} />
          <span>Question Types</span>
        </label>

        <div className="qm-ai-types-options">
          <button
            type="button"
            className={`qm-ai-check-btn ${questionTypes.includes('multiple_choice') ? 'checked' : ''}`}
            onClick={() => toggleType('multiple_choice')}
          >
            {questionTypes.includes('multiple_choice') ? (
              <CheckSquare size={18} className="icon-checked" />
            ) : (
              <Square size={18} className="icon-unchecked" />
            )}
            <span>Multiple Choice</span>
          </button>

          <button
            type="button"
            className={`qm-ai-check-btn ${questionTypes.includes('true_false') ? 'checked' : ''}`}
            onClick={() => toggleType('true_false')}
          >
            {questionTypes.includes('true_false') ? (
              <CheckSquare size={18} className="icon-checked" />
            ) : (
              <Square size={18} className="icon-unchecked" />
            )}
            <span>True / False</span>
          </button>
        </div>
      </div>

      {/* 4. Include Explanations */}
      <div className="qm-ai-setting-card">
        <label className="qm-ai-setting-label">
          <BookOpen size={16} />
          <span>Include Explanations</span>
        </label>

        <div className="qm-ai-difficulty-options">
          <label className={`qm-ai-radio-card ${includeExplanations ? 'selected' : ''}`}>
            <input
              type="radio"
              name="explanations"
              checked={includeExplanations === true}
              onChange={() => setIncludeExplanations(true)}
            />
            <span className="qm-ai-radio-indicator"></span>
            <span className="qm-ai-radio-text">Yes (Detailed)</span>
          </label>

          <label className={`qm-ai-radio-card ${!includeExplanations ? 'selected' : ''}`}>
            <input
              type="radio"
              name="explanations"
              checked={includeExplanations === false}
              onChange={() => setIncludeExplanations(false)}
            />
            <span className="qm-ai-radio-indicator"></span>
            <span className="qm-ai-radio-text">No</span>
          </label>
        </div>
      </div>

      {/* 5. Exam Privacy & Access Code */}
      {setIsPublic && (
        <div className="qm-ai-setting-card qm-ai-setting-card-wide">
          <label className="qm-ai-setting-label">
            <Lock size={16} />
            <span>Audience & Exam Passcode</span>
          </label>

          <div className="qm-ai-privacy-row">
            <div className="qm-ai-privacy-pill-group">
              <button
                type="button"
                className={`qm-ai-privacy-pill ${isPublic ? 'active' : ''}`}
                onClick={() => setIsPublic(true)}
              >
                <Globe size={14} /> Public
              </button>
              <button
                type="button"
                className={`qm-ai-privacy-pill ${!isPublic ? 'active' : ''}`}
                onClick={() => setIsPublic(false)}
              >
                <Lock size={14} /> Private (Classroom)
              </button>
            </div>

            <label className="qm-ai-passcode-toggle-lbl">
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
              <span>Require Passcode PIN</span>
            </label>
          </div>

          {requirePasscode && (
            <div className="qm-ai-passcode-input-box">
              <Key size={14} className="passcode-icon" />
              <input
                type="text"
                className="qm-ai-passcode-inp"
                placeholder="e.g. EXAM-8291"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                maxLength={15}
              />
              <button
                type="button"
                className="qm-ai-generate-code-btn"
                onClick={() => setAccessCode(`EXAM-${Math.floor(1000 + Math.random() * 9000)}`)}
                title="Generate random PIN"
              >
                <Shuffle size={12} /> Generate
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionSettings;
