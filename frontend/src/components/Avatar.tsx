import { Link } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../contexts/Auth/AuthContext';

export default function Avatar() {
  const { user } = useContext(AuthContext);

  return (
    <Link to={'/schedule'}>
      <div className='avatar avatar-placeholder from-base-100/20 to-base-100 bg-gradient-to-br rounded-full shadow-lg'>
        <div className='from-primary to-primary/60 bg-gradient-to-br text-primary-content w-16 rounded-full'>
          <span className='text-3xl'>{user?.username[0].toUpperCase()}</span>
        </div>
      </div>
    </Link>
  );
}
