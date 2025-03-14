import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    setIsAuth: () => {},
    user: null,
    login: () => {},
    logout: () => {},
    checkAuth: () => {},
});

export default AuthContext;