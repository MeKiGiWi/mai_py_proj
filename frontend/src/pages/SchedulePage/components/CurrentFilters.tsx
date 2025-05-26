import type { TCurrentFilters } from '../types';

type CurrentFiltersProps = {
  currentFilters: Pick<
    TCurrentFilters,
    'selectedGroup' | 'selectedTeacher' | 'selectedPlace'
  >;
  setCurrentFilters: (update: Partial<TCurrentFilters>) => void;
};

export default function CurrentFilters({
  currentFilters,
  setCurrentFilters,
}: CurrentFiltersProps) {
  return (
    <div className="relative pt-10">
      <div className="flex flex-col gap-2 absolute left-0 top-0">
        {currentFilters.selectedGroup && (
          <FilterPill
            label={currentFilters.selectedGroup}
            onClear={() => setCurrentFilters({ selectedGroup: null })}
          />
        )}
        {currentFilters.selectedTeacher && (
          <FilterPill
            label={currentFilters.selectedTeacher}
            onClear={() => setCurrentFilters({ selectedTeacher: null })}
          />
        )}
        {currentFilters.selectedPlace && (
          <FilterPill
            label={currentFilters.selectedPlace}
            onClear={() => setCurrentFilters({ selectedPlace: null })}
          />
        )}
      </div>
    </div>
  );
}

type FilterPillProps = {
  label: string;
  onClear: () => void;
};

const FilterPill = ({ label, onClear }: FilterPillProps) => (
  <div className="flex flex-row gap-2">
    <button
      className="btn btn-square text-gray-500 gap-2 btn-xs"
      onClick={onClear}
      aria-label={`Удалить фильтр ${label}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <div className="text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default">
      {label}
    </div>
  </div>
);
