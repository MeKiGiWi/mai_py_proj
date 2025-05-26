import { Link } from 'react-router';
import AboutTeamTag from './components/AboutTeamTag';
import NavBar from '../../components/NavBar';

// get initials of teammates
const getInitials = (name: string) => {
  const names = name.split(' ');
  return names
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// get random gradient
const getNameGradient = (name: string) => {
  const gradients = [
    'bg-gradient-to-r from-blue-600 to-cyan-400',
    'bg-gradient-to-r from-indigo-600 to-cyan-400',
    'bg-gradient-to-r from-blue-700 to-blue-500',
    'bg-gradient-to-r from-cyan-500 to-blue-400',
    'bg-gradient-to-r from-blue-800 to-cyan-500',
  ];
  const hash = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
};

export default function AboutTeamPage() {
  const members = [
    {
      name: 'Показеев Даниил',
      role: 'Fullstack Developer',
      github: 'https://github.com/MeKiGiWi',
      telegram: 'https://t.me/mekigiwi_god',
    },
    {
      name: 'Шитов Артём',
      role: 'Fullstack Developer',
      github: 'https://github.com/lookingforexit',
      telegram: 'https://t.me/p7r0k1n3s',
    },
    {
      name: 'Гуськов Алексей',
      role: 'Frontend Developer',
      github: 'https://github.com/thebestprincess',
      telegram: 'https://t.me/the_best_pr1ncess',
    },
    {
      name: 'Иванов Иван',
      role: 'Backend Developer',
      github: 'https://github.com/WhySoBor1ng',
      telegram: 'https://t.me/whysobor1ng',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <div className="hero bg-base-200 flex-grow min-h-[60vh]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12 w-full max-w-7xl py-20 px-4">
          <img
            src="https://i.vuzopedia.ru/storage/app/uploads/public/665/9aa/c77/6659aac7732da894564640.png"
            className="w-full max-w-4xl h-96 rounded-[1.2rem] shadow-2xl object-cover"
            alt="Наша команда"
          />
          <div className="max-w-2xl lg:max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Наша команда</h1>
            <p className="text-lg mb-8">
              За всеми нашими крутыми инновациями стоят люди, каждый из которых
              — эксперт в своем деле, любящий то, что делает.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-3 pt-15 pb-15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="card bg-base-100 shadow-xl w-full h-full transform transition-transform duration-300 hover:scale-105 border-2 border-base-content/2">
                <figure className="px-4 pt-4">
                  <div
                    className={`mask mask-squircle w-32 h-32 md:w-48 md:h-48 flex items-center justify-center 
                    ${getNameGradient(member.name)} text-white text-4xl font-bold shadow-lg`}
                  >
                    <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      {getInitials(member.name)}
                    </span>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-lg md:text-xl lg:text-2xl">
                    {member.name}
                  </h2>
                  <p className="text-sm md:text-base">{member.role}</p>
                  <div className="card-actions justify-center gap-2 mt-4">
                    <Link to={member.telegram}>
                      <button className="btn btn-info btn-xs md:btn-sm">
                        Telegram
                      </button>
                    </Link>
                    <Link to={member.github}>
                      <button className="btn btn-neutral btn-xs md:btn-sm">
                        GitHub
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer footer-center p-7 bg-base-300 text-base-content mt-auto">
        <div>
          <p className="font-bold text-lg">
            Проект разработан командой <AboutTeamTag />
          </p>
          <p>Московский авиационный институт, 2024</p>
        </div>
      </footer>
    </div>
  );
}
