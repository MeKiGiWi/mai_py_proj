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

          <Avatar panelHidden={top === -88} />
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
