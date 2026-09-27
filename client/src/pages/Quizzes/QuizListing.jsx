import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import QuizCard from '../../components/quiz/QuizCard';
import Input from '../../components/common/Input';
import EmptyState from '../../components/common/EmptyState';
import Loader from '../../components/common/Loader';
import quizService from '../../services/quizService';
import { useAuth } from '../../hooks/useAuth';
import LoginPromptModal from '../../components/common/LoginPromptModal';
import { CATEGORIES } from '../../utils/constants';
import { Search, Compass } from 'lucide-react';

export const QuizListing = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All Categories');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  // Sync state when URL search params change (e.g. from footer links)
  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All Categories';
    const urlSearch = searchParams.get('search') || '';
    setCategory(urlCat);
    setSearch(urlSearch);
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    quizService
      .getQuizzes({ search, category })
      .then((data) => {
        if (isMounted) {
          setQuizzes(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching quizzes:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search, category]);

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    const params = new URLSearchParams(searchParams);
    if (newCat && newCat !== 'All Categories') {
      params.set('category', newCat);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    const params = new URLSearchParams(searchParams);
    if (newSearch) {
      params.set('search', newSearch);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  return (
    <PageContainer maxWidth="1200px" className="qm-explore-page">
      {/* Header */}
      <div className="qm-explore-header">
        <h1 className="qm-explore-title">Explore Quizzes</h1>
        <p className="qm-explore-subtitle">
          Discover quizzes on various topics and test your knowledge.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="qm-explore-filters-row">
        <div className="search-filter-box">
          <Input
            id="quiz-search"
            placeholder="Search quizzes..."
            value={search}
            onChange={handleSearchChange}
            icon={<Search size={18} className="search-icon" />}
            className="search-input-field"
          />
        </div>

        <div className="category-filter-box">
          <Input
            as="select"
            id="quiz-category"
            value={category}
            onChange={handleCategoryChange}
            className="category-select-field"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Input>
        </div>
      </div>

      {/* Quiz Grid or States */}
      {loading ? (
        <Loader message="Loading exciting quizzes..." />
      ) : quizzes.length === 0 ? (
        <EmptyState
          icon={<Compass size={48} />}
          title="No quizzes match your query"
          description="Try adjusting your search terms or clearing the category filter."
          actionText="Clear Filters"
          onAction={() => {
            setSearch('');
            setCategory('All Categories');
            setSearchParams({});
          }}
        />
      ) : (
        <div className="qm-quizzes-grid explore-grid">
          {quizzes.map((quiz) => (
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
      )}

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        targetUrl={selectedQuizId ? `/take-quiz/${selectedQuizId}` : '/quizzes'}
      />
    </PageContainer>
  );
};

export default QuizListing;
