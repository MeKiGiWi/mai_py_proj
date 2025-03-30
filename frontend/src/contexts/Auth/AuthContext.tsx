import { createContext } from 'react';

interface User {
  username: string;
  // добавьте другие необходимые поля пользователя
}

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
  user: null,
  login: async () => {},
  logout: () => {},
  checkAuth: async () => {},
});

export default AuthContext;
