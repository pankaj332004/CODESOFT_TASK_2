import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('qm_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qm_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="qm-theme-toggle"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className={`theme-toggle-track ${isDark ? 'dark-active' : ''}`}>
        <span className="theme-toggle-thumb">
          {isDark ? (
            <Moon size={13} className="theme-icon moon-icon" />
          ) : (
            <Sun size={13} className="theme-icon sun-icon" />
          )}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
