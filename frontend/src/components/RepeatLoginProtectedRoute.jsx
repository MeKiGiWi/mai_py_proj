import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Outlet, Navigate } from 'react-router';

const RepeatLoginProtectedRoute = () => {
  const { isAuth, checkAuth } = useContext(AuthContext);
  checkAuth();
  return isAuth ? <Navigate to="/main" replace /> : <Outlet />;
};

export default RepeatLoginProtectedRoute;