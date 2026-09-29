# Online Quiz Maker 🎓 — AI-Powered Assessment & Learning Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.5_Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An enterprise-grade, full-stack educational assessment platform built with **React 18 (Vite)**, **Node.js**, **Express**, **MongoDB Atlas**, and **Google Gemini Generative AI**.

Designed not merely as a simple trivia app, but as a complete **Pedagogical Mastery Platform** featuring strict exam scheduling, automated deadline enforcement, academic integrity locks, teacher classroom gradebooks, and multimodal AI quiz generation.

---

## 🔄 The 5-Stage Pedagogical Mastery Loop

```
                             [ QuizMaker Ecosystem ]
                                        │
    ┌──────────────┬────────────────────┼────────────────────┬──────────────┐
    ▼              ▼                    ▼                    ▼              ▼
 [1. CREATE]  [2. PRACTICE]         [3. LEARN]          [4. ANALYZE]   [5. IMPROVE]
  • Author      • Untimed &         • "Why It's          • SVG Trajectory • Auto-detects
    manual or     self-paced          Correct" vs          chart with     weak subjects
    AI quizzes  • Instant             "Not quite"          Y-axis marks • 1-click
  • Assign        feedback          • Concept trails    • Score aggreg-   targeted
    students    • 1-click retry       and hierarchy       ations across   remediation
  • Schedule    • Unlocked post-      breakdowns          categories      launchpad
    windows       exam deadline
```

---

## 🌟 Standout Features & Architectural Highlights

### 1. 🤖 Multimodal AI Quiz Generator (Google Gemini 3.5 Flash)
- **3 Input Modalities:** Generate structured quizzes from:
  1. **Topic:** Any subject or academic field (e.g., *Quantum Computing*, *Docker Microservices*).
  2. **Text / Notes:** Paste study material, articles, or lecture notes for in-context grounded generation.
  3. **Vision / Images:** Upload diagrams, circuit diagrams, or textbook snapshots.
- **Fail-Safe Resilience:** Features an automated fallback synthesis engine that algorithmically creates curriculum-aligned questions even if network connectivity or API tokens fluctuate.

### 2. 🎯 Student Whitelisting & Private Assignments
- **Restricted Attendance:** Quiz authors can whitelist specific students by email (`assignedEmails`).
- **Privacy Enforcement:** Private quizzes are strictly visible **only** to the author and the designated students, hidden from public explore feeds.
- **Student Hub:** Assigned exams appear highlighted in a dedicated **"🎯 Exams Assigned to You"** section on the student's dashboard.

### 3. ⏳ Scheduled Exam Windows & Automated 0-Mark Submission
- **Strict Timeframes:** Instructors can configure an `examStartTime` and `examEndTime`.
- **Pre-Exam Guard:** Visiting an exam before `examStartTime` displays an **"Exam Not Started Yet"** countdown screen.
- **Automated Deadline Penalty:** If a student does not attend or complete the exam before `examEndTime`, the server automatically submits the attempt with **0 marks** (`isExpired: true`, `submissionReason: 'exam_window_expired'`).

### 4. 🔒 Academic Integrity Practice Mode Lock
- **Anti-Cheating Protection:** For scheduled exams, **Practice Mode is strictly locked** before and during the exam window to prevent students from previewing questions and answers.
- **Post-Exam Unlocking:** Practice Mode **automatically unlocks strictly after the exam deadline** has passed, enabling students to study the questions, review instant feedback, and learn without affecting their official grade.

### 5. 📊 Instructor Classroom Gradebook & CSV Export
- **Comprehensive Class Overview:** Accessible by quiz authors to view all enrolled submissions, percentages, pass/fail status, and time spent.
- **Expired Flags:** Clearly tags auto-submitted attempts with `⚠️ Window Expired` and `0% (Auto 0)`.
- **Question-by-Question Diagnostics:** View each student's exact choice vs. the correct answer.
- **1-Click CSV Export:** Export complete classroom grades directly into Excel/Google Sheets.

### 6. 📈 Zero-Dependency SVG Performance Curve & Weakness Detection
- **Native SVG Trajectory:** Hand-crafted cubic Bezier curve tracking historical scores over time with dynamic Y-axis tick marks—zero charting library bloat.
- **Automated Gap Analysis:** Aggregates attempt history to detect the user's lowest-scoring subject and presents an **"Analyze & Improve"** banner for targeted practice.

---

## 📸 Visual Tour & Application Screenshots

### 1. Hero Landing & Multimodal AI Quiz Generator
| **Hero Landing Page** | **Multimodal AI Quiz Generator (Gemini 3.5 Flash)** |
|:---:|:---:|
| ![Home Page](./screenshots/01_home_page.png) | ![AI Quiz Generator](./screenshots/02_ai_quiz_generator.png) |
| *Modern educational landing page with feature highlights and one-click demo login.* | *Generate quizzes from Topics, pasted study notes, or uploaded textbook diagrams.* |

---

### 2. Catalog & Exam Scheduling Administration
| **Explore Quizzes & Badges** | **Exam Window & Student Whitelist Scheduler** |
|:---:|:---:|
| ![Explore Quizzes Catalog](./screenshots/03_explore_catalog.png) | ![Create Quiz Scheduler](./screenshots/04_create_quiz_scheduler.png) |
| *Real-time badges: 🎯 Assigned to You, 🟢 Active Window, ⏳ Starts Soon, ⚠️ Window Closed.* | *Instructor tools: email whitelist assignment and strict start/end schedule window.* |

---

### 3. Dual-Mode Arena & Academic Integrity Enforcement
| **Practice & Learn Mode Arena** | **Academic Integrity: Practice Mode Locked** |
|:---:|:---:|
| ![Practice Learning Arena](./screenshots/05_practice_learning_arena.png) | ![Practice Locked Guard](./screenshots/06_practice_locked_guard.png) |
| *Self-paced learning with instant distractor feedback and concept trails.* | *Practice mode is strictly locked during an active exam to prevent premature answer leaks.* |

---

### 4. Automated Deadline Enforcement & Results
| **Auto-0 Marks Expired Exam Guard** | **Instructor Classroom Gradebook & CSV** |
|:---:|:---:|
| ![Exam Window Expired Guard](./screenshots/07_exam_expired_guard.png) | ![Classroom Gradebook](./screenshots/09_classroom_gradebook.png) |
| *Strict deadline policy: non-attendance or overdue exams submit with 0 marks.* | *Full roster gradebook with submission status, question breakdown, and CSV export.* |

---

### 5. Continuous Learning Dashboard
<p align="center">
  <img src="./screenshots/08_student_dashboard.png" alt="Student Dashboard" width="90%" />
</p>
<p align="center">
  <em>Personal Learning Dashboard featuring "🎯 Exams Assigned to You", native Bezier SVG performance progression curve, recent attempt analysis, and 1-click targeted remediation.</em>
</p>

---

## 🏗️ System Architecture Diagram

```mermaid
graph TB
    subgraph ClientLayer ["Client Layer (React 18 + Vite)"]
        UI["Custom Design System (index.css)"]
        Router["AppRoutes (Protected & Public)"]
        AuthCtx["AuthContext (JWT & User state)"]
        QuizCtx["QuizContext (Quiz runner & state)"]
        
        subgraph UIPages ["Pages & Views"]
            P_Home["Home Page"]
            P_Catalog["Quiz Listing & Details"]
            P_Arena["TakeQuiz Arena (Exam & Practice)"]
            P_AI["AI Quiz Generator"]
            P_Dash["Student Dashboard"]
            P_Create["Create / Edit Quiz"]
            P_Grade["Classroom Gradebook Modal"]
        end
    end

    subgraph ServerLayer ["Backend API Layer (Node.js + Express)"]
        ExpressApp["Express App (Port 5000)"]
        AuthMid["JWT Auth Middleware (protect / optionalAuth)"]
        
        subgraph APIRoutes ["REST Endpoints"]
            R_Auth["/api/auth (Login, Register, Me)"]
            R_Quiz["/api/quizzes (CRUD, Whitelist Filter, Gradebook)"]
            R_Result["/api/results (Submit, Window Validation, Leaderboard)"]
            R_AI["/api/ai-quizzes (Multimodal Gemini Generation)"]
        end

        subgraph Services ["Service Domain Layer"]
            S_Quiz["quizService.js (Filter assigned, compute status)"]
            S_Result["resultService.js (Enforce 0 marks on expiration)"]
            S_AI["aiQuizService.js (Gemini SDK & Fallback)"]
            S_Auth["authService.js (Bcrypt & JWT signing)"]
        end
    end

    subgraph DataAndAI ["Storage & External AI Services"]
        Atlas[("MongoDB Atlas Cloud Database")]
        MemStore[("In-Memory Fallback Store")]
        GeminiAPI["Google Gemini 3.5 Flash LLM (Vision & Text)"]
        Heuristic["Algorithmic Heuristic Synthesis Engine"]
    end

    UI --> Router
    Router --> UIPages
    UIPages --> AuthCtx
    UIPages --> QuizCtx
    QuizCtx --> ExpressApp
    AuthCtx --> ExpressApp

    ExpressApp --> AuthMid
    AuthMid --> APIRoutes

    R_Auth --> S_Auth
    R_Quiz --> S_Quiz
    R_Result --> S_Result
    R_AI --> S_AI

    S_Quiz -->|Primary| Atlas
    S_Quiz -->|Offline Failover| MemStore
    S_Result -->|Primary| Atlas
    S_Result -->|Offline Failover| MemStore

    S_AI -->|With Key| GeminiAPI
    S_AI -->|Fallback| Heuristic
```

---

## ⏱️ Exam Scheduling & Practice Locking Sequence Flow

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as TakeQuiz Arena
    participant API as Backend Service
    participant DB as MongoDB Atlas

    Note over Student, DB: Phase 1: Before Exam Start (now < examStartTime)
    Student->>UI: Opens Quiz in Exam Mode
    UI->>API: GET /api/quizzes/:id
    API-->>UI: Quiz (isUpcomingExam = true)
    UI-->>Student: Renders "Exam Not Started Yet" countdown screen

    Student->>UI: Attempts to switch to Practice Mode
    UI-->>Student: Displays "Practice Mode Locked" (Locked until exam conclusion)

    Note over Student, DB: Phase 2: Active Exam Window (examStartTime <= now <= examEndTime)
    Student->>UI: Takes official Timed Exam
    UI-->>Student: Countdown timer & question navigation active

    Note over Student, DB: Phase 3: Deadline Expiration (now > examEndTime)
    alt Student Did Not Attend or Time Runs Out
        UI->>API: POST /api/results (autoSubmitted: true, isExpired: true)
        API->>DB: Saves Result (score: 0, percentage: 0, reason: 'exam_window_expired')
        API-->>UI: 0 Marks Confirmation
        UI-->>Student: Displays "Exam Window Has Closed (0 Marks)"
    end

    Note over Student, DB: Phase 4: Post-Exam Review & Study
    Student->>UI: Clicks "Open in Practice & Learn Mode"
    UI-->>Student: UNLOCKED! Self-paced study with instant answers & concept trails
```

---

## 🤖 Multimodal AI Generation Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Instructor
    participant UI as AIQuizGenerator.jsx
    participant API as /api/ai-quizzes/generate
    participant AISvc as aiQuizService.js
    participant Gemini as Google Gemini 3.5 Flash

    Instructor->>UI: Selects Mode (Topic / Text Notes / Upload Image)
    Instructor->>UI: Configures question count, difficulty, and explanations
    Instructor->>UI: Clicks "Generate Quiz"
    UI->>API: POST /api/ai-quizzes/generate (payload + base64 image)
    API->>AISvc: generateQuiz(options)

    alt GEMINI_API_KEY Configured
        AISvc->>Gemini: Prompt with strict JSON schema + inline visual data
        Gemini-->>AISvc: Returns structured quiz with pedagogical explanations
    else No API Key / Network Error
        AISvc->>AISvc: Executes generateHeuristicQuiz() synthesis
    end

    AISvc-->>API: Normalized Quiz JSON
    API-->>UI: 200 OK + Ready-to-edit Quiz
    Instructor->>UI: Reviews / Customizes questions & publishes to classroom
```

---

## 📁 Repository Directory Structure

```
online-quiz-maker/
├── client/                                 # React Frontend (Vite)
│   ├── public/                             # Public static assets & favicon
│   ├── src/
│   │   ├── assets/
│   │   │   ├── icons/CategoryIcons.jsx     # Dynamic category iconography
│   │   │   └── illustrations/              # Custom SVG vectors & artwork
│   │   ├── components/
│   │   │   ├── common/                     # Button, Modal, Loader, ErrorBoundary
│   │   │   ├── layout/Navbar.jsx           # Main navigation & user menu
│   │   │   ├── quiz/                       # QuestionCard, QuestionNavigator, QuizTimer
│   │   │   └── results/GradebookModal.jsx  # Instructor classroom gradebook & CSV
│   │   ├── context/
│   │   │   ├── AuthContext.jsx             # Authentication & user state
│   │   │   └── QuizContext.jsx             # Active quiz runner & submission state
│   │   ├── hooks/useQuiz.js                # Quiz state management hook
│   │   ├── pages/
│   │   │   ├── AIGenerator/AIQuizGenerator.jsx # Gemini multimodal quiz creation
│   │   │   ├── Auth/                       # Login & Register pages
│   │   │   ├── CreateQuiz/                 # Manual quiz authoring & edit
│   │   │   ├── Dashboard/Dashboard.jsx     # Learning stats & assigned exams
│   │   │   ├── Home/Home.jsx               # Hero landing page & features
│   │   │   ├── Quizzes/TakeQuiz.jsx        # Dual-mode interactive arena
│   │   │   └── Results/QuizResult.jsx      # Score card & concept review
│   │   ├── services/                       # API client services
│   │   ├── App.jsx                         # Main React application shell
│   │   └── index.css                       # Comprehensive modern CSS design system
│   ├── package.json
│   └── vite.config.js
│
├── server/                                 # Node.js + Express Backend API
│   ├── src/
│   │   ├── config/db.js                    # MongoDB Atlas & in-memory fallback
│   │   ├── controllers/
│   │   │   ├── aiQuizController.js         # Gemini AI quiz generation controller
│   │   │   ├── authController.js           # JWT authentication controller
│   │   │   ├── quizController.js           # Quiz CRUD, whitelist & scheduling
│   │   │   └── resultController.js         # Quiz submission & gradebook controller
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js           # JWT protect & optionalAuth
│   │   │   └── errorMiddleware.js          # Centralized error handler
│   │   ├── models/
│   │   │   ├── Quiz.js                     # Quiz schema (schedule, assignedEmails)
│   │   │   ├── Result.js                   # Result schema (isExpired, scores)
│   │   │   └── User.js                     # User account schema
│   │   ├── routes/                         # Express API routes
│   │   ├── services/
│   │   │   ├── aiQuizService.js            # Gemini API & candidate model loop
│   │   │   ├── quizService.js              # Business logic & access filtering
│   │   │   └── resultService.js            # Score & expired submission logic
│   │   ├── utils/quizPrompt.js             # Pedagogical prompts & heuristic engine
│   │   ├── app.js                          # Express app configuration
│   │   └── server.js                       # Server entry point
│   ├── .env.example                        # Template for environment configuration
│   └── package.json
│
├── .gitignore                              # Git exclusion rules (safeguards secrets)
├── package.json                            # Root concurrent workspace scripts
└── README.md                               # Project documentation
```

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate & receive JWT token | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Private |
| `GET` | `/api/quizzes` | List accessible quizzes (filters assigned quizzes) | Public / Optional |
| `GET` | `/api/quizzes/:id` | Fetch quiz details & schedule metadata | Public / Optional |
| `POST` | `/api/quizzes` | Create quiz with schedule window & whitelist | Private |
| `PUT` | `/api/quizzes/:id` | Update an authored quiz | Private (Author) |
| `DELETE` | `/api/quizzes/:id` | Delete an authored quiz | Private (Author) |
| `GET` | `/api/quizzes/:id/gradebook` | Fetch student grades roster & question breakdown | Private (Author) |
| `POST` | `/api/results` | Submit quiz attempt (enforces 0 on expired window) | Private |
| `GET` | `/api/results/my-results` | Retrieve personal attempt history | Private |
| `GET` | `/api/results/:id` | Fetch specific result breakdown | Private |
| `POST` | `/api/ai-quizzes/generate` | Generate quiz via Gemini 3.5 Flash (topic/text/image) | Public / Private |

---

## 🛠️ Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or free MongoDB Atlas URI)
- *(Optional)* [Google AI Studio Gemini API Key](https://aistudio.google.com/) for live AI quiz generation.

### 1. Clone the repository
```bash
git clone https://github.com/pankaj332004/CODESOFT_TASK_2.git
cd CODESOFT_TASK_2
```

### 2. Install all dependencies
```bash
npm run install:all
```
*(This automatically installs dependencies for both the `client` and `server` folders).*

### 3. Configure Environment Variables

Create a `.env` file in the `server/` directory:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/quiz_maker?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Optional: Real Google Gemini LLM Integration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
```

### 4. Run the Application

Start both the backend server and frontend client concurrently with a single command:
```bash
npm run dev
```

- **Frontend Application:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
