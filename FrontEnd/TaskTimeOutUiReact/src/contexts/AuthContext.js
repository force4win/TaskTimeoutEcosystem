import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(authService.getToken());

  const handleLogin = async (username, password) => {
    try {
      await authService.login(username, password);
      const newToken = authService.getToken();
      setToken(newToken);
      navigate('/tasks');
    } catch (err) {
      console.error('Login failed', err);
      // Aquí se podría manejar el estado de error
      throw err;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setToken(null);
    navigate('/login');
  };

  const value = {
    token,
    isLoggedIn: !!token,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
