# Online Quiz Maker 🎓

An interactive, responsive full-stack web application for creating, sharing, and taking online quizzes. Built with React (Vite), Node.js, Express, and modern Vanilla CSS styling with custom educational illustrations.

## 🔄 The Complete Learning Lifecycle

```
QuizMaker
    ↓
 Create   → Author custom questions with detailed explanations & concept breadcrumbs
    ↓
Practice  → Test your knowledge with immediate validation & retry capability
    ↓
  Learn   → Read in-depth "Why it's correct" or "Not quite" breakdown with Concept trails
    ↓
 Analyze  → Track score trends via the "Your Performance" progression chart
    ↓
 Improve  → Target weak topics (e.g. DBMS, Computer Networks) with tailored practice sessions
```

## 🚀 Key Features

- **Practice & Learn Mode**: Real-time feedback after selecting an option:
  - ✓ **Correct**: Congratulatory badge, detailed explanation, and concept mapping (`Concept: Web Development → JavaScript`).
  - ✕ **Not quite**: Direct comparison (`You selected: Database`, `Correct answer: Programming language`), quick explanation, concept trail, and a 1-click **Try Again** option.
- **Question Navigator**: Interactive `[1] [2] ... [13]` question grid with live status indicators (Correct, Needs Review, Current, Unanswered).
- **Personal Learning Dashboard**:
  - `Welcome back, {User} 👋` header with the visual 5-stage loop pipeline.
  - Key metrics: **Quizzes Taken**, **Avg Score**, **Quizzes Created**.
  - **Recent Attempts**: Instant breakdown (e.g., `JavaScript Basics 90% ✓`, `DBMS Fundamentals 80% ✓`, `Computer Networks 70% ✓`).
  - **Your Performance Chart**: Smooth graphical progression chart with Y-axis markers (`100% ┤`, `80% ┤`, `60% ┤`, `40% ┤`) and day tick labels.
  - **Analyze & Improve Action Banner**: Detects low-scoring topics and launches direct practice.
- **Quiz Creator & Editor**: Build custom quizzes with dynamic questions, options, and explanations.
- **Dual Storage Resilience**: Seamless connection to MongoDB Atlas with automated built-in in-memory fallback.

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
