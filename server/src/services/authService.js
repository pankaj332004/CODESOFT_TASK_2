const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { getDbStatus } = require('../config/db');

// Built-in initial users for turnkey operation
const memoryUsers = [
  {
    _id: 'usr_demo_1',
    name: 'Demo Student',
    email: 'demo@quizmaker.com',
    password: 'password123',
    avatar: '',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'usr_priya_2',
    name: 'Priya Sharma',
    email: 'priya@quizmaker.com',
    password: 'password123',
    avatar: '',
    createdAt: new Date().toISOString(),
  },
];

const registerUser = async ({ name, email, password }) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error('User with this email already exists');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({ name, email, password });
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  }

  // Fallback memory store
  const existing = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    const error = new Error('User with this email already exists');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    _id: `usr_${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    avatar: '',
    createdAt: new Date().toISOString(),
  };

  memoryUsers.push(newUser);

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  };
};

const loginUser = async ({ email, password }) => {
  const dbStatus = getDbStatus();

  if (dbStatus.isConnected) {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  }

  // Fallback store
  const user = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // Allow default plaintext password check for demo or bcrypt
  let isMatch = false;
  if (user.password === password) {
    isMatch = true;
  } else {
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch {
      isMatch = false;
    }
  }

  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

module.exports = {
  memoryUsers,
  registerUser,
  loginUser,
};
