import type { TNotesState } from '../types';

type NotesPanelProps = {
  notesState: TNotesState;
  setNotesState: React.Dispatch<React.SetStateAction<TNotesState>>;
};

export default function NotesPanel({ notesState, setNotesState }: NotesPanelProps) {
  const handleAddNote = () => {
    if (notesState.newNote.trim()) {
      setNotesState(prev => ({
        list: [...prev.list, prev.newNote],
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
            value={notesState.newNote}
            onChange={(e) => setNotesState(prev => ({ ...prev, newNote: e.target.value }))}
            placeholder='Новая пометка...'
            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
          />
          <button 
            className='btn btn-square' 
            onClick={handleAddNote}
            disabled={!notesState.newNote.trim()}
          >
            +
          </button>
        </div>
      </div>
      <ul className='menu'>
        {notesState.list.map((note, index) => (
          <li key={index} className='hover-bg'>
            <div className='py-2 flex justify-between items-center'>
              <span>{note}</span>
              <button 
                className='btn btn-xs btn-circle btn-ghost'
                onClick={() => setNotesState(prev => ({
                  ...prev,
                  list: prev.list.filter((_, i) => i !== index)
                }))}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
