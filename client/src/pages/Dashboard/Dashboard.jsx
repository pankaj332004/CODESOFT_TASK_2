import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import quizService from '../../services/quizService';
import { formatTime } from '../../utils/formatTime';
import {
  Trophy,
  CheckCircle,
  HelpCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Play,
  ArrowRight,
} from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [myResults, setMyResults] = useState([]);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      quizService.getMyResults().catch(() => []),
      quizService.getQuizzes().catch(() => []),
    ]).then(([results, allQuizzes]) => {
      if (isMounted) {
        setMyResults(results || []);
        // Filter quizzes created by this user or demo quizzes
        const userQuizzes = (allQuizzes || []).filter(
          (q) => (user && q.createdBy === user._id) || q.creatorName === user?.name
        );
        setMyQuizzes(userQuizzes);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizService.deleteQuiz(quizId);
        setMyQuizzes((prev) => prev.filter((q) => q._id !== quizId));
      } catch (err) {
        alert('Failed to delete quiz: ' + err.message);
      }
    }
  };

  if (loading) return <Loader fullScreen message="Loading your dashboard..." />;

  // Calculate stats
  const totalAttempts = myResults.length;
  const avgScore =
    totalAttempts > 0
      ? Math.round(
          myResults.reduce((sum, r) => sum + (r.percentage || 0), 0) / totalAttempts
        )
      : 0;

  return (
    <PageContainer maxWidth="1200px" className="qm-dashboard-page">
      {/* Welcome Banner */}
      <div className="qm-dash-banner">
        <div className="dash-greeting">
          <h1 className="dash-title">Welcome back, {user?.name || 'Learner'}! 👋</h1>
          <p className="dash-subtitle">
            Here's a summary of your learning progress, completed quizzes, and created content.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/create-quiz')}
          icon={<Plus size={18} />}
          iconPosition="left"
          className="dash-create-btn"
        >
          Create New Quiz
        </Button>
      </div>

      {/* Stats Cards Row */}
      <div className="qm-dash-stats-grid">
        <div className="dash-stat-card">
          <div className="stat-card-icon icon-trophy">
            <Trophy size={24} />
          </div>
          <div className="stat-card-data">
            <span className="stat-card-value">{totalAttempts}</span>
            <span className="stat-card-label">Quizzes Attempted</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-icon icon-accuracy">
            <CheckCircle size={24} />
          </div>
          <div className="stat-card-data">
            <span className="stat-card-value">{avgScore}%</span>
            <span className="stat-card-label">Average Score</span>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="stat-card-icon icon-created">
            <HelpCircle size={24} />
          </div>
          <div className="stat-card-data">
            <span className="stat-card-value">{myQuizzes.length}</span>
            <span className="stat-card-label">Quizzes Created</span>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="qm-dash-sections-grid">
        {/* Recent Attempts */}
        <section className="dash-section-box">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Recent Quiz Attempts</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/quizzes')}
              icon={<ArrowRight size={14} />}
              iconPosition="right"
            >
              Explore More
            </Button>
          </div>

          {myResults.length === 0 ? (
            <EmptyState
              title="No attempts yet"
              description="Start taking quizzes to see your scores and progress statistics here."
              actionText="Take a Quiz"
              onAction={() => navigate('/quizzes')}
            />
          ) : (
            <div className="dash-table-container">
              <table className="dash-attempts-table">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myResults.map((res) => (
                    <tr key={res._id}>
                      <td className="quiz-title-cell">{res.quizTitle || 'Quiz'}</td>
                      <td>
                        <span className="bold-score">
                          {res.score} / {res.totalQuestions}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`dash-perc-tag ${
                            res.percentage >= 70
                              ? 'tag-green'
                              : res.percentage >= 50
                              ? 'tag-yellow'
                              : 'tag-red'
                          }`}
                        >
                          {res.percentage}%
                        </span>
                      </td>
                      <td>{formatTime(res.timeTakenSeconds, true)}</td>
                      <td>{new Date(res.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="dash-table-btn"
                          onClick={() => navigate(`/results/${res._id}`)}
                        >
                          View Result
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* My Created Quizzes */}
        <section className="dash-section-box">
          <div className="dash-section-header">
            <h2 className="dash-section-title">My Created Quizzes</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/create-quiz')}
              icon={<Plus size={14} />}
              iconPosition="left"
            >
              New Quiz
            </Button>
          </div>

          {myQuizzes.length === 0 ? (
            <EmptyState
              title="No quizzes created yet"
              description="Share your knowledge with the world by authoring your first quiz!"
              actionText="Create Quiz"
              onAction={() => navigate('/create-quiz')}
            />
          ) : (
            <div className="dash-created-list">
              {myQuizzes.map((quiz) => (
                <div key={quiz._id} className="dash-created-item">
                  <div className="created-item-info">
                    <h3 className="created-quiz-title">{quiz.title}</h3>
                    <p className="created-quiz-meta">
                      {quiz.questions?.length || 0} questions • {quiz.category}
                    </p>
                  </div>

                  <div className="created-item-actions">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/take-quiz/${quiz._id}`)}
                      icon={<Play size={14} fill="currentColor" />}
                    >
                      Try
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/edit-quiz/${quiz._id}`)}
                      icon={<Edit size={14} />}
                    >
                      Edit
                    </Button>
                    <button
                      className="trash-icon-btn"
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      title="Delete Quiz"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
