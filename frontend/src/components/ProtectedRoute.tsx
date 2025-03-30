import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Outlet, Navigate } from 'react-router';

const ProtectedRoute: React.FC = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
