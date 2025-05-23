import { addDays, addWeeks, format } from 'date-fns';
import type { TCurrentFilters, TCurrentMetrics } from '../types';

type WeeksDropDownProps = {
  activeWeek: number;
  currentFilters: TCurrentFilters;
  currentMetrics: TCurrentMetrics;
  isLoading: boolean;
  setActiveWeek: React.Dispatch<React.SetStateAction<number>>;
  onDateChange: (newDate: Date) => void;
};

export default function WeeksDropDown({
  activeWeek,
  currentFilters,
  currentMetrics,
  isLoading,
  setActiveWeek,
  onDateChange,
}: WeeksDropDownProps) {
  const handleWeekSelect = (week: Date, index: number) => {
    const newActiveWeek = (index % 2) + 1;
    const calculatedDate = addWeeks(week, -(index % 2));
    
    setActiveWeek(newActiveWeek);
    onDateChange(calculatedDate);
  };

  return (
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
          <li><span>Загрузка...</span></li>
        ) : currentMetrics.weeks?.map((week, index) => (
          <li key={week.toISOString()}>
            <button 
              className={`${
                currentFilters.cycleStartDate.getTime() === week.getTime() 
                ? 'bg-base-200 font-semibold' 
                : ''
              } hover:bg-base-200 p-2 rounded text-left`}
              onClick={() => handleWeekSelect(week, index)}
            >
              <span className='text-sm'>
                {format(week, 'dd.MM')} - {format(addDays(week, 6), 'dd.MM')}
              </span>
              <div className='text-xs text-gray-500 mt-1'>
                Неделя {(index % 2) + 1}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}