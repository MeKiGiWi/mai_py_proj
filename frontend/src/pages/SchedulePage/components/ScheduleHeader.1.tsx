import { addWeeks, addDays, format } from 'date-fns';
import Filters from './Filters';
import FiltersDropdown from './FiltersDropdown';
import WeeksDropDown from './WeeksDropDown';
import { TCurrentFilters, TCurrentMetrics } from '../types';
import { Dispatch, SetStateAction } from 'react';

type ScheduleHeaderProps = {
  activeWeek: number;
  setActiveWeek: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  currentFilters: TCurrentFilters;
  setCurrentFilters: Dispatch<SetStateAction<TCurrentFilters>>;
  currentMetrics: TCurrentMetrics;
};

export default function ScheduleHeader({
  activeWeek,
  setActiveWeek,
  isLoading,
  currentFilters,
  setCurrentFilters,
  currentMetrics,
}: ScheduleHeaderProps) {
  const getWeekRange = (weekNumber: number) => {
    const weekStart = addWeeks(currentFilters.cycleStartDate, weekNumber - 1);
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

      <WeeksDropDown
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        cycleStartDate={currentFilters.cycleStartDate}
        setCycleStartDate={(date) => {
          if (date instanceof Date) {
            setCurrentFilters({ ...currentFilters, cycleStartDate: date });
          } else {
            setCurrentFilters({
              ...currentFilters,
              cycleStartDate: date(currentFilters.cycleStartDate),
            });
          }
        }}
        weeks={currentMetrics.weeks}
        isLoading={isLoading}
      />

      <FiltersDropdown
        currentMetrics={currentMetrics}
        setCurrentFilters={setCurrentFilters}
        currentFilters={currentFilters}
      />

      <Filters currentFilters={currentFilters} setCurrentFilters={setCurrentFilters} />
    </div>
  );
}
