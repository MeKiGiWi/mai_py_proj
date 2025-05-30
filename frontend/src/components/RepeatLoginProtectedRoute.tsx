import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Outlet, Navigate } from 'react-router';

const RepeatLoginProtectedRoute: React.FC = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Navigate to="/schedule" replace /> : <Outlet />;
};

export default RepeatLoginProtectedRoute;
