export type CurrentFiltersProps = {
  selectedGroup: string | null;
  selectedTeacher: string | null;
  selectedPlace: string | null;
  setSelectedGroup: (group: string | null) => void;
  setSelectedTeacher: (teacher: string | null) => void;
  setSelectedPlace: (place: string | null) => void;
};

export default function CurrentFilters({
  selectedGroup,
  selectedTeacher,
  selectedPlace,
  setSelectedGroup,
  setSelectedTeacher,
  setSelectedPlace,
}: CurrentFiltersProps) {
  return (
    <div className='relative pt-10'>
      <div className='flex flex-col gap-2 absolute left-0 top-0 '>
        {selectedGroup && (
          <div className='flex flex-row gap-2'>
            <div
              className='btn btn-square text-gray-500 gap-2 btn-xs'
              onClick={() => setSelectedGroup(null)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </div>
            <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
              {selectedGroup}
            </div>
          </div>
        )}
        {selectedTeacher && (
          <div className='flex flex-row gap-2'>
            <div
              className='btn btn-square text-gray-500 gap-2 btn-xs'
              onClick={() => setSelectedTeacher(null)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </div>
            <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
              {selectedTeacher}
            </div>
          </div>
        )}
        {selectedPlace && (
          <div className='flex flex-row gap-2'>
            <div
              className='btn btn-square text-gray-500 gap-2 btn-xs'
              onClick={() => setSelectedPlace(null)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='18' y1='6' x2='6' y2='18'></line>
                <line x1='6' y1='6' x2='18' y2='18'></line>
              </svg>
            </div>
            <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
              {selectedPlace}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
