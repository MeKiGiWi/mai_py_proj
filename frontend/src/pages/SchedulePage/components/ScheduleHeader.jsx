import { format, addWeeks, addDays } from 'date-fns';

export default function ScheduleHeader({ 
  activeWeek, 
  setActiveWeek, 
  cycleStartDate, 
  setCycleStartDate,
  weeks,
  isLoading,
  groups,
  teachers,
  places
}) {
  const getWeekRange = (weekNumber) => {
    const weekStart = addWeeks(cycleStartDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, 'dd.MM')} - ${format(weekEnd, 'dd.MM')}`;
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      {/* Week tabs */}
      <div className="tabs tabs-boxed bg-base-200">
        {[1, 2].map(week => (
          <button
            key={week}
            className={`tab tab-lg ${activeWeek === week ? 'tab-active' : ''}`}
            onClick={() => setActiveWeek(week)}
          >
            Неделя {week} ({getWeekRange(week)})
          </button>
        ))}
      </div>

      {/* Weeks range dropdown */}
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1">
          Выбрать неделю
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 
        rounded-box w-48 max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar
        grid grid-cols-1 gap-1">
          {isLoading ? (
            <li><span>Загрузка...</span></li>
          ) : (
            weeks.map((week, index) => (
              <li key={week} className="w-full items-center">
                <a onClick={() => {
                  setActiveWeek(index % 2 + 1);
                  const date = addWeeks(week, -(index % 2));
                  setCycleStartDate(date);
                }}>
                  {format(week, 'dd.MM')} - {format(addDays(week, 6), 'dd.MM')}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Filters dropdown */}
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
          </svg>
        </div>
        
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
          <li className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="flex justify-between">
              Группа
            </div>
            <ul className="dropdown-content z-[2] menu p-2 shadow bg-base-100 
            rounded-box w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden 
            no-scrollbar grid grid-cols-1 gap-1">
              {groups.map(group => (
                <li key={group}><a>{group}</a></li>
              ))}
            </ul>
          </li>

          <li className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="flex justify-between">
              Преподаватель
            </div>
            <ul className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box 
            w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar
            grid grid-cols-1 gap-1">
              {teachers.map(teacher => (
                <li key={teacher}><a>{teacher}</a></li>
              ))}
            </ul>
          </li>

          <li className="dropdown dropdown-right">
            <div tabIndex={0} role="button" className="flex justify-between">
              Аудитория
            </div>
            <ul className="dropdown-content z-[2] menu p-2 shadow bg-base-100 
            rounded-box w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden 
            no-scrollbar grid grid-cols-1 gap-1">
              {places.map(place => (
                <li key={place}><a>{place}</a></li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
} 