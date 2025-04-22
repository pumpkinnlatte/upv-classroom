import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const role = getUserRole();
      setIsAuthenticated(true);
      setIsTeacher(role === 'profesor');
    }
    setIsLoading(false);
  }, []);

  const login = async (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    const role = getUserRole();
    setIsAuthenticated(true);
    setIsTeacher(role === 'profesor');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setIsTeacher(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isTeacher, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getUserRole = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.tipoUsuario;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserId = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};