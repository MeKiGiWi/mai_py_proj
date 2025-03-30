import React, { useState, useEffect, ReactNode } from 'react';
import AuthContext from './AuthContext';
import api from '../../interceptors/api';

interface User {
  username: string;
  // добавьте другие необходимые поля пользователя
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setIsAuth(true);
      await checkAuth();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const checkAuth = async (): Promise<void> => {
    // user access token validation
    try {
      const response = await api.get('/auth/me/', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsAuth(true);
      setUser(response.data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const logout = (): void => {
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
    <AuthContext.Provider value={{ isAuth, setIsAuth, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
