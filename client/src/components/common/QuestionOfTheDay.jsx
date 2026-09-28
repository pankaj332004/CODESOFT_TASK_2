import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Sparkles, CheckCircle, XCircle, RotateCcw, Flame } from 'lucide-react';
import Button from './Button';

const DAILY_QUESTIONS = [
  {
    id: 'qotd_1',
    questionText: 'Which HTTP method is commonly used to retrieve data from a server?',
    options: ['POST', 'GET', 'DELETE', 'PATCH'],
    correctAnswer: 'GET',
    explanation: 'GET requests data from a specified resource without altering or mutating server state. It is idempotent and safe.',
    quickExplanation: 'GET is for reading/retrieving data, POST creates resources, DELETE removes them, and PATCH updates partially.',
    concept: 'Web Architecture → HTTP Methods',
  },
  {
    id: 'qotd_2',
    questionText: 'What is the primary function of the DNS (Domain Name System)?',
    options: ['Translating domain names into IP addresses', 'Encrypting credit card transactions', 'Compiling JavaScript in browsers', 'Formatting CSS style rules'],
    correctAnswer: 'Translating domain names into IP addresses',
    explanation: 'DNS acts as the phonebook of the internet, mapping human-friendly hostnames (like google.com) to machine IP addresses.',
    quickExplanation: 'DNS resolves human names into machine-readable IP addresses.',
    concept: 'Networking → Domain Name System',
  },
  {
    id: 'qotd_3',
    questionText: 'Which data structure enforces First In, First Out (FIFO) order?',
    options: ['Stack', 'Queue', 'Binary Tree', 'Hash Map'],
    correctAnswer: 'Queue',
    explanation: 'A Queue processes elements in the order they arrive: first in, first out (like a physical queue or line).',
    quickExplanation: 'Stacks are LIFO (Last In First Out), while Queues are FIFO (First In First Out).',
    concept: 'Computer Science → Data Structures',
  },
];

export const QuestionOfTheDay = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('qm_daily_streak') || '3', 10);
  });

  const currentQ = DAILY_QUESTIONS[questionIndex];
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleAnswerSubmit = (e) => {
    e?.preventDefault();
    if (!selectedOption) return;

    setAnswered(true);

    if (isCorrect) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // Fallback silently if confetti library fails
      }

      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('qm_daily_streak', String(newStreak));
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setAnswered(false);
    setQuestionIndex((prev) => (prev + 1) % DAILY_QUESTIONS.length);
  };

  const handleReset = () => {
    setSelectedOption('');
    setAnswered(false);
  };

  return (
    <div className="qm-qotd-container">
      <div className="qm-qotd-card">
        {/* Card Header matching user's ASCII banner */}
        <div className="qm-qotd-top-banner">
          <div className="qotd-badge-row">
            <span className="qotd-badge-pill">
              <Calendar size={13} />
              <span>Daily Challenge</span>
            </span>
            <span className="qotd-streak-pill" title="Daily quiz solving streak">
              <Flame size={13} className="flame-icon" />
              <span>{streak} Day Streak</span>
            </span>
          </div>

          <h2 className="qotd-title-ascii">QUESTION OF THE DAY</h2>
        </div>

        {/* Question Text */}
        <div className="qm-qotd-body">
          <p className="qotd-question-text">{currentQ.questionText}</p>

          {/* Options with custom radio buttons (○ Option) */}
          <div className="qotd-options-list" role="radiogroup">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt;
              let optClass = '';

              if (answered) {
                if (opt === currentQ.correctAnswer) {
                  optClass = 'qotd-opt-correct';
                } else if (isSelected && !isCorrect) {
                  optClass = 'qotd-opt-wrong';
                }
              } else if (isSelected) {
                optClass = 'qotd-opt-selected';
              }

              return (
                <label
                  key={opt}
                  className={`qotd-option-label ${optClass}`}
                  onClick={() => !answered && setSelectedOption(opt)}
                >
                  <span className="qotd-radio-circle">
                    {isSelected ? '●' : '○'}
                  </span>
                  <span className="qotd-option-text">{opt}</span>
                </label>
              );
            })}
          </div>

          {/* Feedback after answering */}
          {answered && (
            <div className={`qotd-feedback-box ${isCorrect ? 'fb-pass' : 'fb-fail'}`}>
              <div className="qotd-feedback-head">
                {isCorrect ? (
                  <>
                    <CheckCircle size={18} className="fb-icon-pass" />
                    <strong>✓ Correct!</strong>
                  </>
                ) : (
                  <>
                    <XCircle size={18} className="fb-icon-fail" />
                    <strong>✕ Not quite! Correct answer is: {currentQ.correctAnswer}</strong>
                  </>
                )}
              </div>

              <p className="qotd-explanation">
                {isCorrect ? currentQ.explanation : currentQ.quickExplanation}
              </p>

              <div className="qotd-concept-trail">
                <span>Concept:</span>
                <strong>{currentQ.concept}</strong>
              </div>
            </div>
          )}

          {/* Action Button: [ Answer ] */}
          <div className="qotd-action-row">
            {!answered ? (
              <button
                type="button"
                className="qotd-submit-btn"
                disabled={!selectedOption}
                onClick={handleAnswerSubmit}
              >
                [ Answer ]
              </button>
            ) : (
              <div className="qotd-post-buttons">
                {!isCorrect && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    icon={<RotateCcw size={14} />}
                  >
                    Try Again
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNextQuestion}
                  icon={<Sparkles size={14} />}
                  iconPosition="right"
                >
                  Next Daily Question
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionOfTheDay;
