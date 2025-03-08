import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Навбар */}
      <nav className="navbar bg-base-100 shadow-lg px-4 py-3">
        <div className="navbar-start">
          <h1 className="text-xl font-bold text-primary">PlanIT МАИ</h1>
        </div>
        <div className="navbar-end">
          <Link to="/login" className="btn btn-primary btn-sm">
            Войти
          </Link>
        </div>
      </nav>

      {/* Герой-секция */}
      <div className="hero bg-base-200 flex-grow">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Умное расписание кафедры программирования
            </h1>
            <p className="text-xl mb-8">
              Автоматизация работы с расписанием аудиторий и учебных групп
            </p>
            <Link to="/login" className="btn btn-primary btn-lg">
              Начать работу
            </Link>
          </div>
        </div>
      </div>

      {/* Возможности */}
      <div className="py-16 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Наши возможности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Карточка 1 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Экспорт расписания</h3>
                <p>Интеграция с Google Календарем и Google Таблицами</p>
              </div>
            </div>

            {/* Карточка 2 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Персонализация</h3>
                <p>Индивидуальное редактирование и добавление пометок</p>
              </div>
            </div>

            {/* Карточка 3 */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-bold mt-4">Синхронизация</h3>
                <p>Мгновенное обновление данных для всех пользователей</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Футер */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p className="font-bold">
            Разработано командой <span className="text-primary">23*73</span>
          </p>
          <p>Московский авиационный институт, 2024</p>
        </div>
      </footer>
    </div>
  );
}