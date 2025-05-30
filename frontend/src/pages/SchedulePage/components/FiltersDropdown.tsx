import DoubleDropDown from './DoubledDropDown';

type FiltersDropdownProps = {
  groups: string[];
  teachers: string[];
  places: string[];
  handleFilterClick: (title: string, item: string) => void;
};

export default function FiltersDropdown({
  groups,
  teachers,
  places,
  handleFilterClick,
}: FiltersDropdownProps) {
  return (
    <div className="dropdown relative">
      <div tabIndex={0} role="button" className="btn btn-square">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
          />
        </svg>
      </div>

      <DoubleDropDown
        titles={['Группа', 'Преподаватель', 'Аудитория']}
        items={[groups, teachers, places]}
        handleClick={handleFilterClick}
      />
    </div>
  );
}
