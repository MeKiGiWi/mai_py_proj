import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Outlet, Navigate } from 'react-router';

const ProtectedRoute = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;