import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
