import { useEffect, useState } from 'react';
import GoogleIcon from '@/components/GoogleIcon';

export default function ExportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const timeSlots = ['9:00', '10:45', '13:00', '14:45', '16:30', '18:15', '20:00'];

  const handleDateSelect = (date: Date, type: 'start' | 'end') => {
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    });
    type === 'start'
      ? setStartDate(prev => `${formattedDate} ${prev.split(' ')[3] || ''}`.trim())
      : setEndDate(prev => `${formattedDate} ${prev.split(' ')[3] || ''}`.trim());
  };

  const handleTimeSelect = (time: string, type: 'start' | 'end') => {
    type === 'start'
      ? setStartDate(prev => `${prev.split(' ').slice(0, 3).join(' ')} ${time}`)
      : setEndDate(prev => `${prev.split(' ').slice(0, 3).join(' ')} ${time}`);
  };

  const handleExport = (type: 'calendar' | 'sheets') => {
    console.log(
      `Экспорт в Google ${type === 'calendar' ? 'Календарь' : 'Таблицы'}`,
      `С: ${startDate}`,
      `До: ${endDate}`
    );
    onClose();
  };

  useEffect(() => {
    console.log('Start date updated:', startDate);
  }, [startDate]);

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div
        className="modal-box max-w-md relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg mb-4 text-center">Экспорт расписания</h3>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text">Начальная дата и время</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="input w-full input-sm focus:outline-none focus:ring-0"
                  onChange={(e) => handleDateSelect(new Date(e.target.value), 'start')}
                />

                <select
                  className="select w-full select-sm focus:outline-none focus:ring-0"
                  onChange={(e) => handleTimeSelect(e.target.value, 'start')}
                  value={startDate.split(' ')[3] || ''}
                >
                  <option value="" disabled>Время</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text">Конечная дата и время</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="input w-full input-sm focus:outline-none focus:ring-0"
                  onChange={(e) => handleDateSelect(new Date(e.target.value), 'end')}
                />

                <select
                  className="select w-full select-sm focus:outline-none focus:ring-0"
                  onChange={(e) => handleTimeSelect(e.target.value, 'end')}
                  value={endDate.split(' ')[3] || ''}
                >
                  <option value="" disabled>Время</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              className="btn btn-primary btn-sm gap-2 w-52"
              onClick={() => handleExport('calendar')}
            >
              <GoogleIcon />
              Google Календарь
            </button>
            <button
              className="btn btn-secondary btn-sm gap-2 w-52 pr-7"
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