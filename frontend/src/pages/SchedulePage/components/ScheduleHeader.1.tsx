import { addWeeks, addDays, format } from 'date-fns';
import CurrentFilters from './CurrentFilters';
import FiltersDropdown from './FiltersDropdown';
import WeeksDropDown from './WeeksDropDown';
import type { TCurrentFilters, TCurrentMetrics } from '../types';

type ScheduleHeaderProps = {
  activeWeek: number;
  currentMetrics: TCurrentMetrics;
  currentFilters: TCurrentFilters;
  isLoading: boolean;
  setActiveWeek: React.Dispatch<React.SetStateAction<number>>;
  setCurrentFilters: React.Dispatch<React.SetStateAction<TCurrentFilters>>;
};

export default function ScheduleHeader({
  activeWeek,
  currentMetrics,
  currentFilters,
  isLoading,
  setActiveWeek,
  setCurrentFilters,
}: ScheduleHeaderProps) {
  const getWeekRange = (weekNumber: number) => {
    const weekStart = addWeeks(currentFilters.cycleStartDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, 'dd.MM')} - ${format(weekEnd, 'dd.MM')}`;
  };

  const handleCycleDateChange = (newDate: Date) => {
    setCurrentFilters(prev => ({
      ...prev,
      cycleStartDate: newDate
    }));
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

      <WeeksDropDown
        activeWeek={activeWeek}
        currentFilters={currentFilters}
        currentMetrics={currentMetrics}
        isLoading={isLoading}
        setActiveWeek={setActiveWeek}
        onDateChange={handleCycleDateChange}
      />

      <FiltersDropdown
        currentMetrics={currentMetrics}
        setCurrentFilters={setCurrentFilters}
      />

      <CurrentFilters
        currentFilters={currentFilters}
        setCurrentFilters={setCurrentFilters}
      />
    </div>
  );
}
