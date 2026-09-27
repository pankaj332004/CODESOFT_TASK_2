import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import QuizListing from '../pages/Quizzes/QuizListing';
import QuizDetails from '../pages/Quizzes/QuizDetails';
import TakeQuiz from '../pages/Quizzes/TakeQuiz';
import CreateQuiz from '../pages/CreateQuiz/CreateQuiz';
import EditQuiz from '../pages/CreateQuiz/EditQuiz';
import QuizResult from '../pages/Results/QuizResult';
import Dashboard from '../pages/Dashboard/Dashboard';
import SupportFAQ from '../pages/Static/SupportFAQ';
import LegalPages from '../pages/Static/LegalPages';

import ProtectedRoute from '../components/common/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes" element={<QuizListing />} />
      <Route path="/quizzes/:id" element={<QuizDetails />} />
      <Route
        path="/take-quiz/:id"
        element={
          <ProtectedRoute>
            <TakeQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-quiz"
        element={
          <ProtectedRoute>
            <CreateQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-quiz/:id"
        element={
          <ProtectedRoute>
            <EditQuiz />
          </ProtectedRoute>
        }
      />
      <Route path="/results/:id" element={<QuizResult />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/privacy" element={<LegalPages type="privacy" />} />
      <Route path="/terms" element={<LegalPages type="terms" />} />
      <Route path="/support" element={<SupportFAQ />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

