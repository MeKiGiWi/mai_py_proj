import { addWeeks, addDays, format } from 'date-fns';
import CurrentFilters from './CurrentFilters';
import FiltersDropdown from './FiltersDropdown';
import WeeksDropDown from './WeeksDropDown';
import { title } from 'process';

type ScheduleHeaderProps = {
  activeWeek: number;
  setActiveWeek: React.Dispatch<React.SetStateAction<number>>;
  cycleStartDate: Date;
  setCycleStartDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedGroup: string | null;
  selectedTeacher: string | null;
  selectedPlace: string | null;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTeacher: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedPlace: React.Dispatch<React.SetStateAction<string | null>>;
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
  const handleFilterkClick = (title: string, item: string) => {
    if (title === 'Группа') {
      setSelectedGroup(item);
    }
    if (title === 'Преподаватель') {
      setSelectedTeacher(item);
    }
    if (title === 'Аудитория') {
      setSelectedPlace(item);
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
            onClick={() => setActiveWeek(week)}
          >
            Неделя {week} ({getWeekRange(week)})
          </button>
        ))}
      </div>

      <WeeksDropDown
        activeWeek={activeWeek}
        setActiveWeek={setActiveWeek}
        cycleStartDate={cycleStartDate}
        setCycleStartDate={setCycleStartDate}
        weeks={weeks}
        isLoading={isLoading}
      />

      <FiltersDropdown
        groups={groups}
        teachers={teachers}
        places={places}
        handleFilterClick={handleFilterkClick}
      />

      <CurrentFilters
        selectedGroup={selectedGroup}
        selectedTeacher={selectedTeacher}
        selectedPlace={selectedPlace}
        setSelectedGroup={setSelectedGroup}
        setSelectedTeacher={setSelectedTeacher}
        setSelectedPlace={setSelectedPlace}
      />
    </div>
  );
}
