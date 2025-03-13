import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    // user access token validation
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/me/', {
          headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
      });
      setIsAuth(true);
      setUser(response.data);
    } catch (err) {
      console.error(err);
      refreshToken();
    }
  };

  const refreshToken = async () => {
    // trying to refresh token
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        "refresh": `${localStorage.refresh_token}`,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setIsAuth(true);
    }
    catch (err) {
      console.error(err);
      logout();
    }
  }

  const login = async (token) => {
    localStorage.setItem('access_token', token);
    await checkAuth(); // update isAuth after login
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    setIsAuth(false);
    setUser(null);
  };

  // Check auth when load and when access token changed
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;