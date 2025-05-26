import { Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/Auth/AuthContext';

type AvatarProps = {
  panelHidden?: boolean;
};
export default function Avatar({ panelHidden }: AvatarProps) {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="avatar avatar-placeholder from-base-100/20 to-base-100 bg-gradient-to-br rounded-full shadow-lg">
          <div className="from-primary to-primary/60 bg-gradient-to-br text-primary-content w-16 rounded-full">
            <span className="text-3xl">{user?.username[0].toUpperCase()}</span>
          </div>
        </div>
      </div>

      {isMenuOpen && !panelHidden && (
        <div className="absolute right-0 w-fit bg-base-100 rounded-box shadow-lg z-50">
          <ul className="menu">
            <li>
              <Link to="/schedule" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Расписание
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Домой
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                О нас
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-error hover:bg-error/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Выход
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
