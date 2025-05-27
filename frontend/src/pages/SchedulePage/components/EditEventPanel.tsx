import { useState } from 'react';
import type { TEvent } from '../types';

type EditEventPanelProps = {
  event: TEvent;
  onSave: (updatedEvent: TEvent) => void;
  onCancel: () => void;
  isCreating: boolean;
};

export default function EditEventPanel({ 
  event, 
  onSave, 
  onCancel,
  isCreating 
}: EditEventPanelProps) {
  const [formData, setFormData] = useState<TEvent>({ 
    ...event,
    lesson_name: event.lesson_name || 'Новое занятие'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      start_date: event.start_date // Сохраняем оригинальную дату
    });
  };

  const LESSON_TYPE_OPTIONS = [
    { value: "ЛК", label: "Лекция" },
    { value: "ПЗ", label: "Практическое занятие" },
    { value: "ЛР", label: "Лабораторная работа" },
    { value: "ЭКЗ", label: "Экзамен" }
  ];

  return (
    <div className="w-80 bg-base-100 rounded-box p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">
        {isCreating ? 'Новое занятие' : 'Редактирование занятия'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div className="form-control">
          <label className="label">
            <span className="label-text mb-1">Название занятия</span>
          </label>
          <input
            type="text"
            name="lesson_name"
            value={formData.lesson_name || ''}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text mb-1">Тип занятия</span>
          </label>
          <select
            name="lesson_type"
            value={formData.lesson_type || ''}
            onChange={handleChange}
            className="select select-bordered"
            required
          >
            {LESSON_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text mb-1">Преподаватель</span>
          </label>
          <input
            type="text"
            name="teacher"
            value={formData.teacher || ''}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text mb-1">Аудитория</span>
          </label>
          <input
            type="text"
            name="place"
            value={formData.place || ''}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="flex gap-2 mt-6">
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-ghost flex-1"
          >
            Отмена
          </button>
          <button 
            type="submit" 
            className="btn btn-primary flex-1"
          >
            {isCreating ? 'Создать' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}