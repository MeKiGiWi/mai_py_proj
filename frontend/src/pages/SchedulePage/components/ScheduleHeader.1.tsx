import { addWeeks, addDays, format } from 'date-fns';
import CurrentFilters from './CurrentFilters';
import FiltersDropdown from './FiltersDropdown';
import WeeksDropDown from './WeeksDropDown';
import type { TCurrentFilters, TCurrentMetrics } from '../types';

type ScheduleHeaderProps = {
  currentFilters: TCurrentFilters;
  currentMetrics: TCurrentMetrics;
  isLoading: boolean;
  setCurrentFilters: React.Dispatch<React.SetStateAction<TCurrentFilters>>;
};

export default function ScheduleHeader({
  currentFilters,
  currentMetrics,
  isLoading,
  setCurrentFilters,
}: ScheduleHeaderProps) {
  const { activeWeek, cycleStartDate, selectedGroup, selectedTeacher, selectedPlace } = currentFilters;
  const { weeks, groups, teachers, places } = currentMetrics;

  const handleFiltersUpdate = (update: Partial<TCurrentFilters>) => {
    setCurrentFilters(prev => ({
      ...prev,
      ...update
    }));
  };

  const getWeekRange = (weekNumber: number) => {
    const weekStart = addWeeks(cycleStartDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, 'dd.MM')} - ${format(weekEnd, 'dd.MM')}`;
  };

  return (
    <div className='flex items-center gap-4 mb-4 relative'>
      <div className='tabs tabs-boxed bg-base-200'>
        {[1, 2].map((week) => (
          <button
            key={week}
            className={`tab tab-lg ${activeWeek === week ? 'tab-active' : ''}`}
            onClick={() => handleFiltersUpdate({ activeWeek: week })}
          >
            Неделя {week} ({getWeekRange(week)})
          </button>
        ))}
      </div>

      <WeeksDropDown
        weekData={{
          weeks: weeks,
          isLoading: isLoading
        }}
        onWeekChange={{
          setActiveWeek: (week) => handleFiltersUpdate({ activeWeek: week }),
          setCycleStartDate: (date) => handleFiltersUpdate({ cycleStartDate: date })
        }}
      />

      <FiltersDropdown
        filters={{ groups, teachers, places }}
        onSelect={{
          group: (group) => handleFiltersUpdate({ selectedGroup: group }),
          teacher: (teacher) => handleFiltersUpdate({ selectedTeacher: teacher }),
          place: (place) => handleFiltersUpdate({ selectedPlace: place })
        }}
      />

      <CurrentFilters
        currentFilters={{ selectedGroup, selectedTeacher, selectedPlace }}
        setCurrentFilters={handleFiltersUpdate}
      />
    </div>
  );
}