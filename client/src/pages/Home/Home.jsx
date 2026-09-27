import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import QuizCard from '../../components/quiz/QuizCard';
import quizService from '../../services/quizService';
import { useAuth } from '../../hooks/useAuth';
import LoginPromptModal from '../../components/common/LoginPromptModal';
import { HeroDeskIllustration } from '../../assets/illustrations/Illustrations';
import {
  ArrowRight,
  Play,
  Pencil,
  CheckSquare,
  Sparkles,
  BookOpen,
  Users,
  Award,
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    quizService
      .getQuizzes()
      .then((data) => {
        if (isMounted) {
          setFeaturedQuizzes(data.slice(0, 4));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load featured quizzes', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageContainer maxWidth="1280px" className="qm-home-page">
      {/* Hero Section */}
      <section className="qm-hero-section">
        <div className="qm-hero-content">
          <div className="qm-hero-tag">
            <span>LEARN • CREATE • SHARE</span>
          </div>

          <h1 className="qm-hero-title">
            Create & Take <br />
            <span className="qm-title-accent">Online Quizzes</span>
          </h1>

          <p className="qm-hero-subtitle">
            Build your own quizzes, share them with others and test your knowledge.
            A simple and fun way to learn anything, anytime, anywhere.
          </p>

          <div className="qm-hero-cta-group">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/create-quiz')}
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              className="qm-hero-create-btn"
            >
              Create a Quiz
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/quizzes')}
              icon={<Play size={18} fill="currentColor" />}
              iconPosition="left"
              className="qm-hero-take-btn"
            >
              Take a Quiz
            </Button>
          </div>
        </div>

        <div className="qm-hero-graphic">
          <HeroDeskIllustration width="100%" height="auto" />
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="qm-features-bar">
        <div className="qm-feature-card">
          <div className="feature-icon-box box-green">
            <Pencil size={24} />
          </div>
          <div className="feature-info">
            <h3 className="feature-title">Create</h3>
            <p className="feature-desc">Build quizzes in minutes</p>
          </div>
        </div>

        <div className="qm-feature-card">
          <div className="feature-icon-box box-purple">
            <CheckSquare size={24} />
          </div>
          <div className="feature-info">
            <h3 className="feature-title">Take</h3>
            <p className="feature-desc">Attempt quizzes and get instant results</p>
          </div>
        </div>

        <div className="qm-feature-card">
          <div className="feature-icon-box box-orange">
            <Sparkles size={24} />
          </div>
          <div className="feature-info">
            <h3 className="feature-title">Learn</h3>
            <p className="feature-desc">Improve your knowledge with fun quizzes</p>
          </div>
        </div>
      </section>

      {/* Featured Quizzes Preview */}
      <section className="qm-home-quizzes-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Popular Quizzes</h2>
            <p className="section-desc">Try some of the community’s favorite trivia and learning tests</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/quizzes')}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Explore All
          </Button>
        </div>

        <div className="qm-quizzes-grid">
          {featuredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              quiz={quiz}
              onTakeQuiz={() => {
                if (!isAuthenticated) {
                  setSelectedQuizId(quiz._id);
                  setShowLoginModal(true);
                } else {
                  navigate(`/take-quiz/${quiz._id}`);
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        targetUrl={selectedQuizId ? `/take-quiz/${selectedQuizId}` : '/quizzes'}
      />

      {/* Community Stats Banner */}
      <section className="qm-stats-banner">
        <div className="stat-item">
          <BookOpen className="stat-icon" size={28} />
          <span className="stat-number">500+</span>
          <span className="stat-text">Active Quizzes</span>
        </div>
        <div className="stat-item">
          <Users className="stat-icon" size={28} />
          <span className="stat-number">25,000+</span>
          <span className="stat-text">Happy Learners</span>
        </div>
        <div className="stat-item">
          <Award className="stat-icon" size={28} />
          <span className="stat-number">98%</span>
          <span className="stat-text">Completion Rate</span>
        </div>
      </section>
    </PageContainer>
  );
};

export default Home;
