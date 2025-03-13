import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Outlet, Navigate } from 'react-router';

const RepeatLoginProtectedRoute = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Navigate to="/main" replace /> : <Outlet />;
};

export default RepeatLoginProtectedRoute;