import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from './api';


const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    // user access token validation
    try {
      const response = await api.get('/auth/me/', {
          headers: {
      'Content-Type': 'application/json', 
      }
      });
      setIsAuth(true);
      setUser(response.data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuth(false);
    setUser(null);
    // window.location.reload();
  };

  // Check auth when load and when access token changed
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;