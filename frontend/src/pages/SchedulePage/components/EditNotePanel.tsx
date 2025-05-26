import { useState } from 'react';
import { TNote } from '../types';

type EditNotePanelProps = {
  note: TNote;
  onSave: (updatedNote: TNote) => void;
  onCancel: () => void;
};

export default function EditNotePanel({ note, onSave, onCancel }: EditNotePanelProps) {
  const [content, setContent] = useState(note.content);
  
  return (
    <div className="w-80 bg-base-100 rounded-box p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Редактировать пометку</h2>
      
      <textarea
        className="textarea textarea-bordered h-32"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Текст пометки..."
      />
      
      <div className="flex gap-2">
        <button 
          onClick={onCancel} 
          className="btn btn-ghost flex-1"
        >
          Отмена
        </button>
        <button 
          onClick={() => onSave({ ...note, content })}
          className="btn btn-primary flex-1"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}