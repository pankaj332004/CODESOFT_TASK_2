# Online Quiz Maker 🎓

An interactive, responsive full-stack web application for creating, sharing, and taking online quizzes. Built with React (Vite), Node.js, Express, and modern Vanilla CSS styling with custom educational illustrations.

## 🚀 Features

- **Explore Quizzes**: Browse quizzes across multiple categories (General Knowledge, Science, Math, History, Computer Science, English Grammar, Sports, Current Affairs) with live search and category filters.
- **Interactive Quiz Taking**: Live question progression, option selection, timed mode, question navigator, and instant feedback.
- **Detailed Results & Analytics**: Final score calculation, accuracy percentages, elapsed time, answer review with detailed correct/incorrect breakdown.
- **Quiz Creator & Editor**: Build custom quizzes with title, category, description, dynamic multiple-choice questions, and correct answer selection.
- **User Dashboard**: Track created quizzes, attempt history, average scores, and manage your quizzes.
- **Authentication**: JWT-based login and registration with guest account support.

## 📁 Project Architecture

```
online-quiz-maker/
├── client/          # React (Vite) frontend with Vanilla CSS design system
└── server/          # Node.js + Express REST API with MongoDB / flexible data store
```

## 🛠️ Quick Start

### 1. Install dependencies:
```bash
npm run install:all
```

### 2. Run both Client & Server concurrently:
```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
