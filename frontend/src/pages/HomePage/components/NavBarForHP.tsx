import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/Auth';
import PlanItTag from '../../../components/PlanItTag';
import Avatar from '../../../components/Avatar';

interface NavbarStyles {
  top: string;
  transition: string;
}

export default function NavBarForHP(): React.ReactElement {
  const { isAuth, logout, user } = useContext(AuthContext);
  const [top, setTop] = useState<number>(0);
  const prevScrollY = useRef<number>(0);
  const lastVisiblePosition = useRef<number>(0);
  const scrollThreshold = 100;

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current && currentScrollY > 50) {
        setTop(-88); // Hide navbar while scrolling down
        lastVisiblePosition.current = currentScrollY;
      } else if (lastVisiblePosition.current - currentScrollY > scrollThreshold) {
        setTop(0); // Show navbar only after scrolling up more than threshold
        lastVisiblePosition.current = currentScrollY;
      }

      prevScrollY.current = currentScrollY;

      // Always show navbar on top of the page
      if (currentScrollY === 0) setTop(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CSS styles for smooth animation
  const navbarStyles: NavbarStyles = {
    top: `${top}px`,
    transition: 'top 0.3s ease-in-out',
  };

  return (
    <>
      {isAuth ? (
        <div
          className='navbar fixed left-0 right-0 
            bg-gradient-to-b from-[rgba(15,15,15,0.05)] to-transparent 
            backdrop-blur-xs shadow-lg px-8 h-22 z-50'
          style={navbarStyles}
        >
          <div className='flex-1'>
            <Link to={'/'}>
              <PlanItTag />
            </Link>
          </div>

          <Avatar />

          <div className='ml-0.5 flex mt-3 text-accent'>
            <button onClick={logout} className='btn btn-ghost btn-circle w-8 px-1 mx-1 mt-1.5'>
              <svg
                fill='#000000'
                height='800px'
                width='800px'
                version='1.1'
                id='Capa_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                viewBox='0 0 471.2 471.2'
                xmlSpace='preserve'
              >
                <g>
                  <g>
                    <path
                      d='M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5
                  s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5
                  S235.019,444.2,227.619,444.2z'
                    />
                    <path
                      d='M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5
                  s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8
                  C455.319,239.9,455.319,231.3,450.019,226.1z'
                    />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div
          className='navbar fixed left-0 right-0 
            bg-gradient-to-b from-[rgba(15,15,15,0.5)] to-[rgba(15,15,15,0.001)] 
            backdrop-blur-xs shadow-lg px-8 h-22 z-50'
          style={navbarStyles}
        >
          <div className='flex-1'>
            <Link to='/'>
              <PlanItTag />
            </Link>
          </div>
          <div className='flex-none'>
            <Link to={'/login'} className='btn btn-neutral'>
              Войти
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
