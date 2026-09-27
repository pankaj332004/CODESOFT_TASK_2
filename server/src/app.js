const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const resultRoutes = require('./routes/resultRoutes');
const notFound = require('./middleware/notFoundMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend dev server and network access
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const { getDbStatus } = require('./config/db');
const mongoose = require('mongoose');

// Health check endpoint
app.get('/api/health', (req, res) => {
  const db = getDbStatus();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Online Quiz Maker API',
    database: {
      connected: db.isConnected,
      mode: db.isConnected ? 'MongoDB Atlas' : 'In-Memory Fallback',
      host: db.isConnected ? mongoose.connection.host : null,
    },
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
