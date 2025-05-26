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
  const {
    activeWeek,
    cycleStartDate,
    selectedGroup,
    selectedTeacher,
    selectedPlace,
  } = currentFilters;
  const { weeks, groups, teachers, places } = currentMetrics;
  const handleFiltersUpdate = (update: Partial<TCurrentFilters>) => {
    setCurrentFilters((prev) => ({
      ...prev,
      ...update,
    }));
  };
  const handleFilterkClick = (title: string, item: string) => {
    if (title === 'Группа') {
      setCurrentFilters({
        ...currentFilters,
        selectedGroup: item,
      });
    }
    if (title === 'Преподаватель') {
      setCurrentFilters({
        ...currentFilters,
        selectedTeacher: item,
      });
    }
    if (title === 'Аудитория') {
      setCurrentFilters({
        ...currentFilters,
        selectedPlace: item,
      });
    }
  };

  const getWeekRange = (weekNumber: number) => {
    const weekStart = addWeeks(cycleStartDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);
    return `${format(weekStart, 'dd.MM')} - ${format(weekEnd, 'dd.MM')}`;
  };

  return (
    <div className="flex items-center gap-4 mb-4 relative">
      {/* Week tabs */}
      <div className="tabs tabs-boxed bg-base-200">
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
          isLoading: isLoading,
        }}
        onWeekChange={{
          setActiveWeek: (week) => handleFiltersUpdate({ activeWeek: week }),
          setCycleStartDate: (date) =>
            handleFiltersUpdate({ cycleStartDate: date }),
        }}
      />

      <FiltersDropdown
        groups={groups}
        teachers={teachers}
        places={places}
        handleFilterClick={handleFilterkClick}
      />

      <CurrentFilters
        currentFilters={{ selectedGroup, selectedTeacher, selectedPlace }}
        setCurrentFilters={handleFiltersUpdate}
      />
    </div>
  );
}
