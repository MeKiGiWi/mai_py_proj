import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* macOS-style Navigation */}
      <nav className="backdrop-blur-xl bg-white/70 sticky top-0 z-50 border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* <School className="h-6 w-6 text-indigo-500" /> */} 
            <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              PlanIT МАИ
            </span>
          </div>
          <Link 
          to={"/login"}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
            {/* <LogIn className="h-4 w-4" /> */}
            <span>Войти</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section*/}
      <main className="flex-grow container mx-auto px-6">
        <section className="py-20 max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute "></div>
            <h1 className="relative text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Эффективное управление расписанием кафедры
            </h1>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Оптимизируйте рабочий процесс с помощью современного и удобного инструмента для работы с расписанием
          </p>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
            Начать работу
          </button>
        </section>

        {/* Features Grid with Vibrant Cards */}
        <section className="py-16">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/50 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
              {/* <Calendar className="h-6 w-6 text-indigo-500 mb-4" /> */}
              <h3 className="text-lg font-medium text-gray-900">Google Календарь</h3>
              <p className="text-gray-600 mt-2">
                Мгновенная синхронизация расписания с календарем
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
              {/* <FileSpreadsheet className="h-6 w-6 text-indigo-500 mb-4" /> */}
              <h3 className="text-lg font-medium text-gray-900">Google Таблицы</h3>
              <p className="text-gray-600 mt-2">
                Быстрый экспорт данных для анализа
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
              {/* <Edit3 className="h-6 w-6 text-indigo-500 mb-4" /> */}
              <h3 className="text-lg font-medium text-gray-900">Персонализация</h3>
              <p className="text-gray-600 mt-2">
                Гибкая настройка под ваши задачи
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-all duration-300">
              {/* <Bell className="h-6 w-6 text-indigo-500 mb-4" /> */}
              <h3 className="text-lg font-medium text-gray-900">Уведомления</h3>
              <p className="text-gray-600 mt-2">
                Мгновенные оповещения об изменениях
              </p>
            </div>
          </div>
        </section>

        {/* Productivity Section */}
        <section className="py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            {/* <Zap className="h-8 w-8 text-indigo-500 mr-2" /> */}
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Повысьте продуктивность
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Получайте мгновенные уведомления об изменениях в расписании, 
            важных событиях и обновлениях. Будьте в курсе всех изменений 
            и эффективно планируйте свое время.
          </p>
        </section>
      </main>

      {/* Footer with Gradient Border */}
      <footer className="border-t border-gray-200/50 py-8 backdrop-blur-xl bg-white/70">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {/* <School className="h-5 w-5 text-indigo-500" /> */}
            <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              PlanIT МАИ
            </span>
          </div>
          <p className="text-gray-600 text-sm">Разработано командой "23*73"</p>
        </div>
      </footer>
    </div>
  );
}

export default App;