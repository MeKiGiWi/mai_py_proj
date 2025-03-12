import { Link } from "react-router";
import PlanItTag from "../components/PlanItTag";
import AboutTeamTag from "../components/AboutTeamTag";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg px-8">
        <div className="flex-1">
          <Link>
            <PlanItTag/>
          </Link>
        </div>
        <div className="flex-none">
            <Link to={"/login"} className="btn btn-neutral">Войти</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero bg-base-200 flex-grow">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12">
          <img 
            src="/path-to-image.png" // Заменить на реальный путь
            className="max-w-sm rounded-lg shadow-2xl" 
            alt="Расписание"
          />
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Умное управление расписанием кафедры
            </h1>
            <p className="text-lg mb-8">
              Автоматизированная система работы с учебным расписанием 
              Московского авиационного института
            </p>
            <button className="btn btn-accent btn-lg">Начать использовать</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Наши возможности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card 1 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Экспорт в Google Календарь</h3>
                <p>Автоматическая синхронизация с вашим календарем</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Google Таблицы</h3>
                <p>Экспорт данных в удобном табличном формате</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Ручное редактирование</h3>
                <p>Гибкая настройка под ваши потребности</p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Уведомления</h3>
                <p>Настройка оповещений о важных событиях</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <div>
          <p className="font-bold text-lg">
            Проект разработан командой <AboutTeamTag/>
          </p>  
          <p>Московский авиационный институт, 2024</p>
        </div>
      </footer>
    </div>
  );
}