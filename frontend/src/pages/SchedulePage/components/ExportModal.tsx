import { useState } from 'react';
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
        <option key={i} value={date.toISOString()}>
          {dateString}
        </option>,
      );
    }
    return options;
  };

  const handleExport = (type: 'calendar' | 'sheets') => {
    console.log(
      `Экспорт в Google ${type === 'calendar' ? 'Календарь' : 'Таблицы'}`,
    );
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div
        className="modal-box w-2xl max-w-5xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg mb-4">Экспорт расписания</h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <select
              className="select select-bordered w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            >
              <option disabled value="">
                Выберите первую пару
              </option>
              {generateDateOptions()}
            </select>

            <select
              className="select select-bordered w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            >
              <option disabled value="">
                Выберите последнюю пару
              </option>
              {generateDateOptions()}
            </select>
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
