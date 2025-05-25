import { useEffect, useState } from 'react';
import GoogleIcon from '@/components/GoogleIcon';
import DoubleDropDown from './DoubledDropDown';
import { se } from 'date-fns/locale';
export default function ExportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const timeSlots = ['9:00', '10:45', '13:00'];
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i < 31; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        weekday: 'short',
      });
      options.push(
        // value: date.toISOString(),
        dateString,
      );
    }
    return options;
  };

  const handleStartDateSelect = (day: string, time: string) => {
    const selectedDate = day + ' ' + time;
    setStartDate(selectedDate);
  };

  const handleEndDateSelect = (day: string, time: string) => {
    const selectedDate = day + ' ' + time;
    setEndDate(selectedDate);
  };

  const handleExport = (type: 'calendar' | 'sheets') => {
    console.log(
      `Экспорт в Google ${type === 'calendar' ? 'Календарь' : 'Таблицы'}`,
    );
    onClose();
  };

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div
        className="modal-box w-2xl max-w-5xl relative h-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg mb-6">Экспорт расписания</h3>

        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4">
            <div className="dropdown relative">
              <div tabIndex={0} role="button" className="btn w-80">
                <span>{startDate ? startDate : 'Экспортировать с пары'}</span>
              </div>

              <DoubleDropDown
                titles={generateDateOptions()}
                items={timeSlots}
                handleClick={handleStartDateSelect}
              />
            </div>
            <div className="dropdown relative">
              <div tabIndex={0} role="button" className="btn w-80">
                <span>{endDate ? endDate : 'Экспортировать до пары'}</span>
              </div>

              <DoubleDropDown
                titles={generateDateOptions()}
                items={timeSlots}
                handleClick={handleEndDateSelect}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="btn btn-primary gap-2"
              onClick={() => handleExport('calendar')}
            >
              <GoogleIcon />
              Google Календарь
            </button>

            <button
              className="btn btn-secondary gap-2"
              onClick={() => handleExport('sheets')}
            >
              <GoogleIcon />
              Google Таблицы
            </button>
          </div>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}
