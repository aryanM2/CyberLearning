import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, getMeApi, logoutApi } from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user profile if token exists
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const response = await getMeApi();
          if (response.success && response.data?.user) {
            setUser(response.data.user);
          } else {
            // Token invalid or expired
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.warn('[AuthContext] Initial token verification failed:', err.message);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await loginApi(email, password);
      if (res.success && res.data) {
        const { token: newToken, user: userData } = res.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        return { success: true, user: userData };
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password, role = 'user') => {
    setError(null);
    try {
      const res = await registerApi(name, email, password, role);
      if (res.success && res.data) {
        const { token: newToken, user: userData } = res.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
        return { success: true, user: userData };
      }
      throw new Error(res.message || 'Registration failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn('Logout API warning:', err.message);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
