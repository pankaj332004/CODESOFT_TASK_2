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

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quizzes" element={<QuizListing />} />
      <Route path="/quizzes/:id" element={<QuizDetails />} />
      <Route path="/take-quiz/:id" element={<TakeQuiz />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/edit-quiz/:id" element={<EditQuiz />} />
      <Route path="/results/:id" element={<QuizResult />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
