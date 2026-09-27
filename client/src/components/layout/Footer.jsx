import React from 'react';
import { Link } from 'react-router-dom';
import { QuizLogo } from '../../assets/icons/CategoryIcons';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="qm-footer">
      <div className="qm-footer-container">
        <div className="qm-footer-brand">
          <QuizLogo size={28} />
          <p className="qm-footer-tagline">
            Empowering students and educators to create, share, and master knowledge through interactive quizzes.
          </p>
        </div>

        <div className="qm-footer-links">
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/quizzes">Explore Quizzes</Link>
            <Link to="/create-quiz">Create Quiz</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Categories</h4>
            <Link to="/quizzes?category=General+Knowledge">General Knowledge</Link>
            <Link to="/quizzes?category=Science+Basics">Science Basics</Link>
            <Link to="/quizzes?category=Mathematics">Mathematics</Link>
            <Link to="/quizzes?category=Computer+Science">Computer Science</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Legal & Community</h4>
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            <a href="#support" onClick={(e) => e.preventDefault()}>Support & FAQ</a>
          </div>
        </div>
      </div>

      <div className="qm-footer-bottom">
        <p>© {new Date().getFullYear()} QuizMaker. All rights reserved. Crafted with care for learners everywhere.</p>
      </div>
    </footer>
  );
};

export default Footer;
