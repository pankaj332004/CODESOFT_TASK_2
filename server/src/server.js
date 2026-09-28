const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { connectDB } = require('./config/db');
const { seedQuizzes } = require('./services/quizService');

const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
const startServer = async () => {
  await connectDB();
  await seedQuizzes();

  app.listen(PORT, () => {
    console.log(`🚀 Quiz Maker API server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
