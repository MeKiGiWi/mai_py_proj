// types.ts
export type TNote = {
  id: string;
  content: string;
  createdAt: Date;
};

export type TNotesState = {
  list: TNote[];
  newNote: string;
};

type NotesPanelProps = {
  notesState: TNotesState;
  setNotesState: React.Dispatch<React.SetStateAction<TNotesState>>;
  onNoteSelect: (note: TNote) => void;
  onNoteDelete: (noteId: string) => void;
};

export default function NotesPanel({ 
  notesState: { list, newNote }, 
  setNotesState,
  onNoteSelect,
  onNoteDelete,
}: NotesPanelProps) {
  const addNote = () => {
    if (newNote.trim()) {
      const newNoteObj: TNote = {
        id: Date.now().toString(),
        content: newNote.trim(),
        createdAt: new Date()
      };
      
      setNotesState(prev => ({
        list: [...prev.list, newNoteObj],
        newNote: ''
      }));
    }
  };

  return (
    <div className='w-80 bg-base-100 rounded-box p-4'>
      <h3 className='text-xl font-bold mb-4'>Пометки</h3>
      <div className='divider'></div>
      <div className='form-control'>
        <div className='input-group'>
          <input
            type='text'
            className='input input-bordered flex-1'
            value={newNote}
            onChange={(e) => setNotesState(prev => ({
              ...prev,
              newNote: e.target.value
            }))}
            placeholder='Новая пометка...'
          />
          <button className='btn btn-square' onClick={addNote}>
            +
          </button>
        </div>
      </div>
      <ul className='menu'>
        {list.map((note) => (
          <li key={note.id} className='hover-bg group relative'>
            <a className='py-2 pr-8 cursor-pointer' onClick={() => onNoteSelect(note)}>
              {note.content}
            </a>
            {/* Кнопка удаления */}
            <button
              className='absolute right-2 top-1/2 -translate-y-1/2 opacity-0 
                      group-hover:opacity-100 transition-[opacity,transform] duration-200 
                      btn btn-xs btn-circle active:scale-95 active:!translate-y-[-50%]'
              onClick={(e) => {
                e.preventDefault();
                onNoteDelete(note.id);
              }}
              aria-label='Удалить пометку'
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}