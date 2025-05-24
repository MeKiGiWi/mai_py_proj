import type { TCurrentMetrics } from '../types';

type FiltersDropdownProps = {
  filters: Pick<TCurrentMetrics, 'groups' | 'teachers' | 'places'>;
  onSelect: {
    group: (group: string) => void;
    teacher: (teacher: string) => void;
    place: (place: string) => void;
  };
};

export default function FiltersDropdown({
  filters: { groups, teachers, places },
  onSelect: { 
    group: handleGroupClick, 
    teacher: handleTeacherClick, 
    place: handlePlaceClick 
  }
}: FiltersDropdownProps) {
  return (
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
        {/* Группы */}
        <li className='dropdown dropdown-right'>
          <div tabIndex={0} role='button' className='flex justify-between'>
            <span>Группа</span>
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

        {/* Преподаватели */}
        <li className='dropdown dropdown-right'>
          <div tabIndex={0} role='button' className='flex justify-between'>
            <span>Преподаватель</span>
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

        {/* Аудитории */}
        <li className='dropdown dropdown-right'>
          <div tabIndex={0} role='button' className='flex justify-between'>
            <span>Аудитория</span>
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
  );
}