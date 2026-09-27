import React, { useState } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle2 } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'How do I create a new quiz?',
    a: 'Sign up or log into your account, then click "Create Quiz" in the top navigation bar. You can add a title, description, time limit, category, and as many multiple-choice questions as you wish!',
  },
  {
    q: 'Do I have to pay to use QuizMaker?',
    a: 'No! QuizMaker is 100% free to use for students, teachers, and learners worldwide.',
  },
  {
    q: 'Can I track my test history and scores?',
    a: 'Yes! Once you log in, visit your Dashboard from the top right user menu to see all quizzes you have attempted, your average percentage, and detailed past answers.',
  },
  {
    q: 'How does timed mode work?',
    a: 'Each quiz creator sets a time limit (e.g. 5, 10, or 15 minutes). When you start a quiz, the countdown clock starts automatically. If time runs out, your answers are submitted automatically.',
  },
  {
    q: 'Can I edit or delete a quiz I created?',
    a: 'Yes, in your Dashboard under the "My Created Quizzes" section, you can edit or delete any quiz you have authored.',
  },
];

export const SupportFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <PageContainer maxWidth="960px" className="qm-faq-page">
      <div className="qm-faq-header">
        <h1 className="qm-faq-title">Help & Support Center</h1>
        <p className="qm-faq-subtitle">
          Find answers to frequently asked questions or get in touch with our team.
        </p>
      </div>

      {/* Accordion FAQ */}
      <div className="qm-faq-section">
        <h2 className="qm-section-title">Frequently Asked Questions</h2>
        <div className="qm-faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className={`qm-faq-item ${openIndex === idx ? 'open' : ''}`}>
              <button className="qm-faq-question-btn" onClick={() => toggleAccordion(idx)}>
                <span className="qm-faq-q-text">
                  <HelpCircle size={18} className="qm-faq-icon" />
                  {item.q}
                </span>
                {openIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openIndex === idx && (
                <div className="qm-faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Form */}
      <div className="qm-support-form-card">
        <h2 className="qm-section-title">Still have questions? Contact Us</h2>
        <p className="qm-support-sub">Send us a message and our support team will get back to you.</p>

        {submitted ? (
          <div className="qm-contact-success">
            <CheckCircle2 size={36} className="text-green-500" />
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We will respond to your email as soon as possible.</p>
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="qm-contact-form">
            <div className="qm-form-row">
              <div className="qm-form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="qm-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="qm-form-group">
              <label>Your Message or Feedback</label>
              <textarea
                required
                rows={4}
                placeholder="How can we help you today?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send size={16} />}
              iconPosition="right"
            >
              Submit Support Request
            </Button>
          </form>
        )}
      </div>
    </PageContainer>
  );
};

export default SupportFAQ;
