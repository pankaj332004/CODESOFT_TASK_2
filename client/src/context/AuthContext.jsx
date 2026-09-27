import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getStoredUser());
  const [token, setToken] = useState(() => authService.getStoredToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally refresh profile if token is present
    if (token && !user) {
      authService
        .getMe()
        .then((userData) => setUser(userData))
        .catch(() => {
          authService.logout();
          setUser(null);
          setToken(null);
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      setUser({ _id: data._id, name: data.name, email: data.email });
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authService.register({ name, email, password });
      setUser({ _id: data._id, name: data.name, email: data.email });
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const guestLogin = () => {
    const guestUser = {
      _id: `guest_${Date.now()}`,
      name: 'Guest Explorer',
      email: 'guest@quizmaker.com',
      isGuest: true,
    };
    setUser(guestUser);
    return guestUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        guestLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
