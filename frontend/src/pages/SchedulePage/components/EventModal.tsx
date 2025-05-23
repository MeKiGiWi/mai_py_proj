import type { TCell, TEvent } from '../types';
import { useState } from 'react';

type EventModalProps = {
  selectedCell: TCell | null;
  addEvent: (cell: TCell, event: Omit<TEvent, 'start_date'>) => void;
};


export default function EventModal({ selectedCell, addEvent }: EventModalProps) {
  
  const [eventName, setEventName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleSubmit = () => {
    if (!selectedCell) return;
    
    const newEvent: Omit<TEvent, 'start_date'> = {
      group_name: null,
      lesson_name: eventName,
      lesson_type: selectedColor,
      teacher: null,
      place: null,
    };

    addEvent(selectedCell, newEvent);
    setEventName('');
    setSelectedColor('');
  };

  return (
    <dialog id='event_modal' className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg mb-4'>
          Событие: {selectedCell?.day} {selectedCell?.start} - {selectedCell?.end}
        </h3>
        
        <div className='form-control mt-6'>
          <label className='label'>
            <span className='label-text mr-2'>Название</span>
          </label>
          <input
            type='text'
            className='input left-9 mt-2'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        {/* Event color selection */}
        <div className='form-control mt-4'>
          <label className='label'>
            <span className='label-text mb-2'>Цвет метки</span>
          </label>
          <div className='flex gap-2'>
            {['badge-primary', 'badge-secondary', 'badge-accent'].map((color) => (
              <button
                key={color}
                className={`badge ${color} gap-2 ${selectedColor === color ? 'badge-outline' : ''}`}
                onClick={() => setSelectedColor(color)}
              >
                █
              </button>
            ))}
          </div>
        </div>

        <div className='modal-action'>
          <form method='dialog'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSubmit}
              disabled={!eventName || !selectedColor}
            >
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <form method='dialog' className='modal-backdrop'>
        <button>Закрыть</button>
      </form>
    </dialog>
  );
}
