import { Link } from 'react-router';
import { AuthContext } from '../contexts/Auth';
import { useContext } from 'react';
import PlanItTag from './PlanItTag';
import Avatar from './Avatar';

export default function NavBar() {
  const { isAuth, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-lg px-8 h-22">
      <div className="flex-1">
        <Link to="/">
          <PlanItTag />
        </Link>
      </div>
      {isAuth ? (
        <>
          <Avatar />
        </>
      ) : (
        <div className="flex-none">
          <Link to={'/login'} className="btn btn-neutral">
            Войти
          </Link>
        </div>
      )}
    </div>
  );
}
