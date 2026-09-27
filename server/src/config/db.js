const mongoose = require('mongoose');

let isConnected = false;
let useMemoryFallback = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz_maker';
    
    // Set a quick server selection timeout so we can gracefully fallback if local MongoDB isn't running
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed (${error.message}).`);
    console.log('🔄 Activating built-in high-performance fallback database store...');
    useMemoryFallback = true;
  }
};

const getDbStatus = () => ({
  isConnected,
  useMemoryFallback,
});

module.exports = { connectDB, getDbStatus };
