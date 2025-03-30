export default function NotesPanel({ notes, newNote, setNewNote, addNote }) {
  return (
    <div className='w-80 bg-base-100 rounded-box p-4'>
      <h3 className='text-xl font-bold mb-4'>Пометки</h3>
      <div className='form-control'>
        <div className='input-group'>
          <input
            type='text'
            className='input input-bordered flex-1'
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder='Новая пометка...'
          />
          <button className='btn btn-square' onClick={addNote}>
            +
          </button>
        </div>
      </div>
      <div className='divider'></div>
      <ul className='menu'>
        {notes.map((note, index) => (
          <li key={index} className='hover-bg'>
            <a className='py-2'>{note}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
