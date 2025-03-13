import { createContext } from "react";

const AuthContext = createContext({
    isAuth: false,
    user: null,
    login: () => {},
    logout: () => {},
    checkAuth: () => {},
});

export default AuthContext;