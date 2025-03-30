import { format, addWeeks, addDays } from 'date-fns';

type ScheduleHeaderProps = {
  activeWeek: number;
  setActiveWeek: (week: number) => void;
  cycleStartDate: Date;
  setCycleStartDate: (date: Date) => void;
  selectedGroup: string | null;
  selectedTeacher: string | null;
  selectedPlace: string | null;
  setSelectedGroup: (group: string) => void;
  setSelectedTeacher: (teacher: string) => void;
  setSelectedPlace: (place: string) => void;
  weeks: Date[];
  isLoading: boolean;
  groups: string[];
  teachers: string[];
  places: string[];
};

export default function ScheduleHeader({
  activeWeek,
  setActiveWeek,
  cycleStartDate,
  setCycleStartDate,
  selectedGroup,
  selectedTeacher,
  selectedPlace,
  setSelectedGroup,
  setSelectedTeacher,
  setSelectedPlace,
  weeks,
  isLoading,
  groups,
  teachers,
  places,
}: ScheduleHeaderProps) {
  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
  };

  const handleTeacherClick = (teacher: string) => {
    setSelectedTeacher(teacher);
  };

  const handlePlaceClick = (place: string) => {
    setSelectedPlace(place);
  };
  const getWeekRange = (weekNumber: number) => {
    const weekStart = addWeeks(cycleStartDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, 'dd.MM')} - ${format(weekEnd, 'dd.MM')}`;
  };

  return (
    <div className='flex items-center gap-4 mb-4 relative'>
      {/* Week tabs */}
      <div className='tabs tabs-boxed bg-base-200'>
        {[1, 2].map((week) => (
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
      <div className='dropdown dropdown-hover'>
        <div tabIndex={0} role='button' className='btn m-1'>
          Выбрать неделю
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <ul
          className='dropdown-content z-[1] menu p-2 shadow bg-base-100 
        rounded-box w-48 max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar
        grid grid-cols-1 gap-1'
        >
          {isLoading ? (
            <li>
              <span>Загрузка...</span>
            </li>
          ) : (
            weeks.map((week, index) => (
              <li key={week.toISOString()} className='w-full items-center'>
                <a
                  onClick={() => {
                    setActiveWeek((index % 2) + 1);
                    const date = addWeeks(week, -(index % 2));
                    setCycleStartDate(date);
                  }}
                >
                  {format(week, 'dd.MM')} - {format(addDays(week, 6), 'dd.MM')}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Filters dropdown */}
      <div className='dropdown relative'>
        <div tabIndex={0} role='button' className='btn btn-square'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z'
            />
          </svg>
        </div>

        <ul className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48'>
          <li className='dropdown dropdown-right'>
            <div tabIndex={0} role='button' className='flex justify-between'>
              <span className='text-gray-500'>Группа</span>
            </div>
            <ul
              className='dropdown-content z-[2] menu p-2 shadow bg-base-100 
            rounded-box w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden 
            no-scrollbar grid grid-cols-1 gap-1'
            >
              {groups.map((group) => (
                <li key={group}>
                  <button onClick={() => handleGroupClick(group)}>{group}</button>
                </li>
              ))}
            </ul>
          </li>

          <li className='dropdown dropdown-right'>
            <div tabIndex={0} role='button' className='flex justify-between'>
              <span className='text-gray-500'>Преподаватель</span>
            </div>
            <ul
              className='dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box 
            w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar
            grid grid-cols-1 gap-1'
            >
              {teachers.map((teacher) => (
                <li key={teacher}>
                  <button onClick={() => handleTeacherClick(teacher)}>{teacher}</button>
                </li>
              ))}
            </ul>
          </li>

          <li className='dropdown dropdown-right'>
            <div tabIndex={0} role='button' className='flex justify-between'>
              <span className='text-gray-500'>Аудитория</span>
            </div>
            <ul
              className='dropdown-content z-[2] menu p-2 shadow bg-base-100 
            rounded-box w-48 ml-2 max-h-56 overflow-y-auto overflow-x-hidden 
            no-scrollbar grid grid-cols-1 gap-1'
            >
              {places.map((place) => (
                <li key={place}>
                  <button onClick={() => handlePlaceClick(place)}>{place}</button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className='relative pt-10'>
        <div className='flex flex-col gap-2 absolute left-0 top-0 '>
          {selectedGroup && (
            <div className='flex flex-row gap-2'>
              <div
                className='btn btn-square text-gray-500 gap-2 btn-xs'
                onClick={() => setSelectedGroup(null)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </div>
              <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
                {selectedGroup}
              </div>
            </div>
          )}
          {selectedTeacher && (
            <div className='flex flex-row gap-2'>
              <div
                className='btn btn-square text-gray-500 gap-2 btn-xs'
                onClick={() => setSelectedTeacher(null)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </div>
              <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
                {selectedTeacher}
              </div>
            </div>
          )}
          {selectedPlace && (
            <div className='flex flex-row gap-2'>
              <div
                className='btn btn-square text-gray-500 gap-2 btn-xs'
                onClick={() => setSelectedPlace(null)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </div>
              <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
                {selectedPlace}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
