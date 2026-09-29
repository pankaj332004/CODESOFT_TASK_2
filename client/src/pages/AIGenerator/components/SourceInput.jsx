import React from 'react';
import { Type, FileText, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  'Photosynthesis & Light Reactions',
  'JavaScript Async/Await & Promises',
  'Database Normalization & Keys',
  'Operating Systems Process Scheduling',
  'Computer Networks & TCP/IP Stack',
  'Object-Oriented Programming Principles',
];

export const SourceInput = ({
  sourceType,
  topic,
  setTopic,
  content,
  setContent,
}) => {
  if (sourceType === 'topic') {
    return (
      <div className="qm-ai-source-group">
        <label className="qm-ai-field-label">
          <span className="qm-ai-label-icon"><Type size={16} /></span>
          <span>What topic do you want to create a quiz about?</span>
        </label>
        
        <div className="qm-ai-input-wrapper">
          <input
            type="text"
            className="qm-ai-text-input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis, React Hooks, DBMS Normalization..."
            maxLength={120}
          />
        </div>

        <div className="qm-ai-suggestions">
          <span className="qm-ai-suggestions-title">
            <Sparkles size={13} /> Popular ideas:
          </span>
          <div className="qm-ai-tag-list">
            {SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                className="qm-ai-suggestion-tag"
                onClick={() => setTopic(sug)}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sourceType === 'text') {
    return (
      <div className="qm-ai-source-group">
        <div className="qm-ai-label-row">
          <label className="qm-ai-field-label">
            <span className="qm-ai-label-icon"><FileText size={16} /></span>
            <span>Paste your study material, lecture notes, or article:</span>
          </label>
          <span className="qm-ai-char-count">{content.length} characters</span>
        </div>

        <textarea
          className="qm-ai-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste paragraphs from your textbook, lecture summary, documentation, or study guide here. The AI will extract the core concepts and craft targeted questions..."
          rows={7}
        />
      </div>
    );
  }

  return null;
};

export default SourceInput;
