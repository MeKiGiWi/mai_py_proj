import type { TCurrentFilters } from '../types';

export type CurrentFiltersProps = {
  currentFilters: TCurrentFilters;
  setCurrentFilters: React.Dispatch<React.SetStateAction<TCurrentFilters>>;
};

export default function CurrentFilters({
  currentFilters,
  setCurrentFilters,
}: CurrentFiltersProps) {
  const handleClearFilter = (filterType: keyof TCurrentFilters) => {
    setCurrentFilters(prev => ({
      ...prev,
      [filterType]: null
    }));
  };

  return (
    <div className='relative pt-10'>
      <div className='flex flex-col gap-2 absolute left-0 top-0 '>
        {currentFilters.selectedGroup && (
          <div className='flex flex-row gap-2'>
            <div
              className='btn btn-square text-gray-500 gap-2 btn-xs'
              onClick={() => handleClearFilter('selectedGroup')}
            >
              {/* Иконка закрытия */}
            </div>
            <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
              {currentFilters.selectedGroup}
            </div>
          </div>
        )}
        {currentFilters.selectedTeacher && (
          <div className='flex flex-row gap-2'>
            <div
              className='btn btn-square text-gray-500 gap-2 btn-xs'
              onClick={() => handleClearFilter('selectedTeacher')}
            >
              {/* Иконка закрытия */}
            </div>
            <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
              {currentFilters.selectedTeacher}
            </div>
          </div>
        )}
        {currentFilters.selectedPlace && (
          <div className='flex flex-row gap-2'>
            <div
              className='btn btn-square text-gray-500 gap-2 btn-xs'
              onClick={() => handleClearFilter('selectedPlace')}
            >
              {/* Иконка закрытия */}
            </div>
            <div className='text-gray-500 btn btn-xs hover:bg-base-200 hover:border-base-300 cursor-default'>
              {currentFilters.selectedPlace}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}