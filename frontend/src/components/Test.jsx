import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Outlet, Navigate } from 'react-router';

const TestRoute = () => {
  const { isAuth } = useContext(AuthContext);
  return <Outlet/>;
};

export default TestRoute;