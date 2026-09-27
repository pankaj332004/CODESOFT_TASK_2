import React from 'react';
import {
  Globe,
  Atom,
  Calculator,
  BookOpen,
  Laptop,
  Type,
  Trophy,
  Newspaper,
  GraduationCap,
} from 'lucide-react';

export const QuizLogo = ({ className = '', size = 32 }) => (
  <div className={`quiz-brand-logo ${className}`}>
    <div className="logo-icon-wrap">
      <GraduationCap size={size * 0.7} className="logo-cap-icon" />
    </div>
    <span className="logo-brand-text">
      Quiz<span className="logo-brand-accent">Maker</span>
    </span>
  </div>
);

export const getCategoryIcon = (category, size = 28) => {
  const cat = String(category || '').toLowerCase();
  
  if (cat.includes('science')) {
    return <Atom size={size} className="category-icon cat-science" />;
  }
  if (cat.includes('math')) {
    return <Calculator size={size} className="category-icon cat-math" />;
  }
  if (cat.includes('history')) {
    return <BookOpen size={size} className="category-icon cat-history" />;
  }
  if (cat.includes('computer') || cat.includes('tech')) {
    return <Laptop size={size} className="category-icon cat-cs" />;
  }
  if (cat.includes('grammar') || cat.includes('english')) {
    return <Type size={size} className="category-icon cat-grammar" />;
  }
  if (cat.includes('sport')) {
    return <Trophy size={size} className="category-icon cat-sports" />;
  }
  if (cat.includes('affair') || cat.includes('news')) {
    return <Newspaper size={size} className="category-icon cat-affairs" />;
  }

  // Default General Knowledge
  return <Globe size={size} className="category-icon cat-gk" />;
};
