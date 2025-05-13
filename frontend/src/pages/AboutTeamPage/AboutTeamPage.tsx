import { useRef, useEffect } from 'react';
import AboutTeamTag from './components/AboutTeamTag';
import NavBar from '../../components/NavBar';


export default function AboutTeamPage() {
  {/* Scroll event */}
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      if (!container) return;
      
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container?.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <div className='hero bg-base-200 flex-grow'>
        <div className='hero-content flex-col lg:flex-row-reverse gap-12 w-3xl'>
          <img
            src='https://avatars.mds.yandex.net/get-altay/813485/2a00000184b6817694ace0a014ae52aa652b/orig'
            className='rounded-lg shadow-2xl'
          />
          <div className='max-w-2xl'>
            <h1 className='text-5xl font-bold mb-6'>Наша команда</h1>
            <p className='text-lg mb-8'>
              За всеми нашими крутыми инновациями стоят люди, каждый из которых — эксперт в своем
              деле, любящий то, что делает.
            </p>
          </div>
        </div>
      </div>

      {/* Cards describing the participants */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-1 px-4 py-10 scrollbar-hide"
        style={{ 
          overscrollBehaviorX: 'contain',
          scrollSnapType: 'x mandatory'
        }}
      >
        {[
          {
            name: 'Показеев Даниил',
            role: 'Fullstack Developer',
            image: 'https://i.ytimg.com/vi/7ChqGXdgwI4/maxresdefault.jpg'
          },
          {
            name: 'Шитов Артём',
            role: 'Fullstack Developer',
            image: 'https://images.steamusercontent.com/ugc/2029485208069425740/6C16D6755875498A43D24CE1355A4F1D027D0FC2/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
          },
          {
            name: 'Гуськов Алексей',
            role: 'Backend Developer',
            image: 'https://thumbs.dreamstime.com/b/%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%82%D0%B0-%D0%B7%D0%B2%D0%B5%D1%80%D1%8C-%D1%86%D0%B5%D0%BB%D1%83%D1%8F-%D0%BE%D0%B3%D1%80%D0%B5-%D1%84%D0%B0%D0%BD%D1%82%D0%B0%D0%B7%D0%B8%D1%8F-%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B0-%D1%80%D0%B5%D0%B1%D0%B5%D0%BD%D0%BE%D0%BA-%D0%B4%D0%B5%D0%B2%D0%BE%D1%87%D0%BA%D0%B8-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82-166694112.jpg'
          },
          {
            name: 'Иванов Иван',
            role: 'Backend Developer',
            image: 'https://i.pinimg.com/236x/02/41/9d/02419d55391653f3a5a186fcea6e6c8b.jpg'
          }
        ].map((member, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-96 mb-15 scroll-snap-align-start"
          >
            <div className="card bg-base-100 shadow-xl h-full mx-4">
              <figure className="px-10 pt-10">
                <img
                  className="mask mask-squircle w-48 h-48 object-cover"
                  src={member.image}
                  alt={member.name}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{member.name}</h2>
                <p>{member.role}</p>
                <div className="card-actions justify-center gap-2 mt-4">
                  <button className="btn btn-info btn-sm">Telegram</button>
                  <button className="btn btn-neutral btn-sm">GitHub</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className='footer footer-center p-10 bg-base-300 text-base-content'>
        <div>
          <p className='font-bold text-lg'>
            Проект разработан командой <AboutTeamTag />
          </p>
          <p>Московский авиационный институт, 2024</p>
        </div>
      </footer>
    </div>
  );
}
