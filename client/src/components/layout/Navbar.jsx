import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { QuizLogo } from '../../assets/icons/CategoryIcons';
import Button from '../common/Button';
import ThemeToggle from '../common/ThemeToggle';
import { LogOut, User as UserIcon, PlusCircle } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="qm-navbar-header">
      <div className="qm-navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="qm-brand-link">
          <QuizLogo size={32} />
        </NavLink>

        {/* Center Navigation Links */}
        <nav className="qm-nav-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `qm-nav-link ${isActive ? 'active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              `qm-nav-link ${isActive ? 'active' : ''}`
            }
          >
            Quizzes
          </NavLink>
          <NavLink
            to="/create-quiz"
            className={({ isActive }) =>
              `qm-nav-link ${isActive ? 'active' : ''}`
            }
          >
            Create Quiz
          </NavLink>
        </nav>

        {/* Actions: Theme Toggle & Auth Buttons */}
        <div className="qm-nav-actions">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="qm-user-menu">
              <NavLink to="/dashboard" className="qm-user-profile-badge">
                <div className="user-avatar-circle">
                  <UserIcon size={16} />
                </div>
                <span className="user-badge-name">{user?.name || 'My Dashboard'}</span>
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="qm-logout-btn"
                title="Logout"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="qm-auth-btns">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className="nav-login-btn"
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
                className="nav-signup-btn"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
