import { addDays, addWeeks, format } from 'date-fns';

type WeeksDropDownProps = {
  weekData: {
    weeks: Date[];
    isLoading: boolean;
  };
  onWeekChange: {
    setActiveWeek: (week: number) => void;
    setCycleStartDate: (date: Date) => void;
  };
};

export default function WeeksDropDown({
  weekData: { weeks, isLoading },
  onWeekChange: { setActiveWeek, setCycleStartDate },
}: WeeksDropDownProps) {
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
  );
}