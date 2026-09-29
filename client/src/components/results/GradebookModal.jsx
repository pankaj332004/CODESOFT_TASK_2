import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loader from '../common/Loader';
import quizService from '../../services/quizService';
import { formatTime } from '../../utils/formatTime';
import {
  Trophy,
  Users,
  CheckCircle,
  Clock,
  Download,
  Key,
  Lock,
  Globe,
  HelpCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
} from 'lucide-react';

export const GradebookModal = ({ isOpen, onClose, quizId, quizTitle }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (isOpen && quizId) {
      setLoading(true);
      setError(null);
      setExpandedStudentId(null);

      quizService
        .getQuizGradebook(quizId)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load gradebook:', err);
          setError(err.message || 'Failed to fetch student marks.');
          setLoading(false);
        });
    }
  }, [isOpen, quizId]);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (!data || !data.submissions || data.submissions.length === 0) return;

    const headers = ['Student Name', 'Email', 'Marks Obtained', 'Total Questions', 'Percentage', 'Time Taken (s)', 'Submitted Date'];
    const rows = data.submissions.map((s) => [
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.studentEmail.replace(/"/g, '""')}"`,
      s.score,
      s.totalQuestions,
      `${s.percentage}%`,
      s.timeTakenSeconds,
      `"${new Date(s.submittedAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const cleanTitle = (data.quiz?.title || 'Exam').replace(/[^a-zA-Z0-9]/g, '_');
    link.setAttribute('download', `${cleanTitle}_Gradebook_Marks.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyInvite = () => {
    const origin = window.location.origin;
    const examUrl = `${origin}/take-quiz/${quizId}`;
    let inviteText = `Join my exam "${data?.quiz?.title || quizTitle}":\nLink: ${examUrl}`;
    if (data?.quiz?.accessCode) {
      inviteText += `\nPasscode (PIN): ${data.quiz.accessCode}`;
    }

    navigator.clipboard.writeText(inviteText).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Classroom Gradebook: ${data?.quiz?.title || quizTitle}`}
      maxWidth="900px"
    >
      <div className="qm-gradebook-wrap">
        {loading ? (
          <div className="qm-gradebook-loading">
            <Loader message="Fetching student marks & exam records..." />
          </div>
        ) : error ? (
          <div className="qm-gradebook-error">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            {/* Top Exam Info & Invite Bar */}
            <div className="qm-gradebook-meta-strip">
              <div className="meta-left">
                <span className={`meta-badge ${data.quiz.accessCode ? 'is-private' : 'is-public'}`}>
                  {data.quiz.accessCode ? (
                    <>
                      <Lock size={13} /> Private (Passcode: <strong>{data.quiz.accessCode}</strong>)
                    </>
                  ) : (
                    <>
                      <Globe size={13} /> Public Exam
                    </>
                  )}
                </span>
                {data.quiz.assignedEmails && data.quiz.assignedEmails.length > 0 && (
                  <span className="meta-badge" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    🎯 Whitelisted to: <strong>{data.quiz.assignedEmails.join(', ')}</strong>
                  </span>
                )}
                {data.quiz.examStartTime && data.quiz.examEndTime && (
                  <span className="meta-badge" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#2563eb', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    ⏰ Window: {new Date(data.quiz.examStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(data.quiz.examEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <span className="meta-info-text">
                  {data.quiz.totalQuestions} Questions • {data.quiz.timeLimitMinutes} Mins
                </span>
              </div>

              <div className="meta-right">
                <button
                  type="button"
                  className="qm-copy-invite-btn"
                  onClick={handleCopyInvite}
                  title="Copy student link and passcode to clipboard"
                >
                  {copiedLink ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                  <span>{copiedLink ? 'Copied Invite!' : 'Copy Exam Invite'}</span>
                </button>

                {data.submissions.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    icon={<Download size={14} />}
                    className="export-csv-btn"
                  >
                    Export CSV
                  </Button>
                )}
              </div>
            </div>

            {/* Performance Overview Tiles */}
            <div className="qm-gradebook-stats-grid">
              <div className="gradebook-stat-tile">
                <div className="stat-icon-wrap icon-blue">
                  <Users size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Students Attempted</span>
                  <span className="stat-value">{data.summary.totalStudents}</span>
                </div>
              </div>

              <div className="gradebook-stat-tile">
                <div className="stat-icon-wrap icon-green">
                  <Trophy size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Class Average</span>
                  <span className="stat-value">
                    {data.summary.avgPercentage}%{' '}
                    <small>({data.summary.avgScore}/{data.quiz.totalQuestions})</small>
                  </span>
                </div>
              </div>

              <div className="gradebook-stat-tile">
                <div className="stat-icon-wrap icon-purple">
                  <CheckCircle size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Pass Rate (&ge;60%)</span>
                  <span className="stat-value">{data.summary.passRate}%</span>
                </div>
              </div>

              <div className="gradebook-stat-tile">
                <div className="stat-icon-wrap icon-orange">
                  <Clock size={20} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Avg. Time Taken</span>
                  <span className="stat-value">{formatTime(data.summary.avgTimeTakenSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Students Table or Empty State */}
            {data.submissions.length === 0 ? (
              <div className="qm-gradebook-empty">
                <div className="empty-icon-circle">
                  <Users size={32} />
                </div>
                <h3>No Students Have Taken This Exam Yet</h3>
                <p>
                  Share your exam link and access passcode with your members or classroom. When they submit their answers, their exact marks, time, and answers will immediately appear here.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  icon={copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                  onClick={handleCopyInvite}
                >
                  {copiedLink ? 'Invite Copied to Clipboard!' : 'Copy Exam Link & Passcode'}
                </Button>
              </div>
            ) : (
              <div className="qm-gradebook-table-container">
                <table className="qm-gradebook-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Marks (Score)</th>
                      <th>Percentage</th>
                      <th>Time Taken</th>
                      <th>Submitted Date</th>
                      <th className="text-right">Breakdown</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.submissions.map((student) => {
                      const isExpanded = expandedStudentId === student._id;
                      const isPassing = student.percentage >= 60;

                      return (
                        <React.Fragment key={student._id}>
                          <tr className={`gradebook-row ${isExpanded ? 'is-expanded' : ''}`}>
                            <td className="student-name-cell">
                              <div className="student-avatar-letter">
                                {student.studentName.charAt(0).toUpperCase()}
                              </div>
                              <div className="student-text-wrap">
                                <span className="student-name">{student.studentName}</span>
                                {student.studentEmail !== 'N/A' && (
                                  <span className="student-email">{student.studentEmail}</span>
                                )}
                              </div>
                            </td>

                            <td className="marks-cell">
                              <strong>{student.score}</strong> / {student.totalQuestions}
                              {student.isExpired && (
                                <span style={{ display: 'block', fontSize: '10px', color: '#dc2626', fontWeight: 600 }}>
                                  ⚠️ Window Expired
                                </span>
                              )}
                            </td>

                            <td>
                              <span className={`pct-badge ${student.isExpired ? 'pct-fail' : isPassing ? 'pct-pass' : 'pct-fail'}`}>
                                {student.percentage}% {student.isExpired ? '(Auto 0)' : ''}
                              </span>
                            </td>

                            <td className="time-cell">{formatTime(student.timeTakenSeconds)}</td>

                            <td className="date-cell">
                              {new Date(student.submittedAt).toLocaleDateString([], {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>

                            <td className="text-right">
                              <button
                                type="button"
                                className="inspect-btn"
                                onClick={() =>
                                  setExpandedStudentId(isExpanded ? null : student._id)
                                }
                                title="Inspect student question answers"
                              >
                                <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </td>
                          </tr>

                          {/* Student Answers Inspection Drawer */}
                          {isExpanded && (
                            <tr className="inspection-drawer-row">
                              <td colSpan="6">
                                <div className="inspection-answers-box">
                                  <h4 className="inspection-header">
                                    Question Breakdown for {student.studentName}:
                                  </h4>
                                  {student.answers && student.answers.length > 0 ? (
                                    <div className="inspection-answers-grid">
                                      {student.answers.map((ans, aIdx) => (
                                        <div
                                          key={aIdx}
                                          className={`inspection-answer-card ${
                                            ans.isCorrect ? 'is-correct' : 'is-wrong'
                                          }`}
                                        >
                                          <div className="ans-card-header">
                                            <span className="ans-q-num">Q{aIdx + 1}</span>
                                            {ans.isCorrect ? (
                                              <span className="ans-status correct">
                                                <CheckCircle size={14} /> Correct (+1)
                                              </span>
                                            ) : (
                                              <span className="ans-status wrong">
                                                <XCircle size={14} /> Incorrect (0)
                                              </span>
                                            )}
                                          </div>
                                          <p className="ans-q-text">{ans.questionText}</p>
                                          <div className="ans-comparison">
                                            <p className="user-choice">
                                              <span>Selected:</span> {ans.selectedAnswer}
                                            </p>
                                            {!ans.isCorrect && (
                                              <p className="correct-choice">
                                                <span>Correct:</span> {ans.correctAnswer}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="no-breakdown-text">
                                      Answer breakdown not recorded for this attempt.
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default GradebookModal;
