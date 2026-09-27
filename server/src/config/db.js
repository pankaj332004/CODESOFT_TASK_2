const mongoose = require('mongoose');

const dns = require('dns');

let isConnected = false;
let useMemoryFallback = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz_maker';
    
    // For Windows environments where local ISP DNS fails on SRV records
    if (mongoUri.startsWith('mongodb+srv')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
      } catch (dnsErr) {
        // Fallback silently if unable to override DNS servers
      }
    }

    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
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
