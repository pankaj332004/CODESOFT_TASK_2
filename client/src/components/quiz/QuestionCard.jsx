import React from 'react';
import AnswerOption from './AnswerOption';
import Button from '../common/Button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const QuestionCard = ({
  question,
  currentIndex = 0,
  totalQuestions = 1,
  selectedAnswer = '',
  onSelectAnswer,
  onPrev,
  onNext,
  onSubmit,
  isLast = false,
  submitting = false,
}) => {
  if (!question) return null;

  return (
    <div className="qm-question-card-inner">
      <h2 className="qm-question-headline">
        {question.questionText}
      </h2>

      <div className="qm-options-list">
        {question.options?.map((opt, idx) => (
          <AnswerOption
            key={idx}
            index={idx}
            optionText={opt}
            isSelected={selectedAnswer === opt}
            onSelect={onSelectAnswer}
          />
        ))}
      </div>

      <div className="qm-question-nav-bar">
        <Button
          variant="outline"
          size="md"
          onClick={onPrev}
          disabled={currentIndex === 0 || submitting}
          icon={<ArrowLeft size={18} />}
          iconPosition="left"
          className="qm-nav-prev-btn"
        >
          Previous
        </Button>

        {isLast ? (
          <Button
            variant="primary"
            size="md"
            onClick={onSubmit}
            loading={submitting}
            icon={<CheckCircle2 size={18} />}
            iconPosition="right"
            className="qm-nav-submit-btn"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onNext}
            disabled={submitting}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            className="qm-nav-next-btn"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
