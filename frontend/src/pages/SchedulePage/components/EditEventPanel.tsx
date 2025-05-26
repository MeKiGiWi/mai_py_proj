import { useState } from 'react';
import type { TEvent } from '../types';

export default function EditEventPanel({ 
  event, 
  onSave, 
  onCancel 
}: { 
  event: TEvent;
  onSave: (updatedEvent: TEvent) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<TEvent>({ ...event });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="w-80 bg-base-100 rounded-box p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Панель редактирования</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Группа</span>
          </label>
          <input
            type="text"
            name="group_name"
            value={formData.group_name || ''}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Название занятия</span>
          </label>
          <input
            type="text"
            name="lesson_name"
            value={formData.lesson_name || ''}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Тип занятия</span>
          </label>
          <select
            name="lesson_type"
            value={formData.lesson_type || ''}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="">Выберите тип</option>
            <option value="ЛК">Лекция</option>
            <option value="ПЗ">Практическое занятие</option>
            <option value="ЛР">Лабораторная работа</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Преподаватель</span>
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
            <span className="label-text">Место</span>
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
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
