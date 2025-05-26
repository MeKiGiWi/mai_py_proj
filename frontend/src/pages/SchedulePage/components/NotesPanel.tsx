// NotesPanel.tsx
type TNotesState = {
  list: string[];
  newNote: string;
};

type NotesPanelProps = {
  notesState: TNotesState;
  setNotesState: React.Dispatch<React.SetStateAction<TNotesState>>;
  addNote: () => void;
};

export default function NotesPanel({
  notesState: { list, newNote },
  setNotesState,
  addNote,
}: NotesPanelProps) {
  return (
    <div className="w-80 bg-base-100 rounded-box p-4">
      <h3 className="text-xl font-bold mb-4">Пометки</h3>
      <div className="divider"></div>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            className="input input-bordered flex-1"
            value={newNote}
            onChange={(e) =>
              setNotesState((prev) => ({
                ...prev,
                newNote: e.target.value,
              }))
            }
            placeholder="Новая пометка..."
          />
          <button className="btn btn-square" onClick={addNote}>
            +
          </button>
        </div>
      </div>
      <ul className="menu">
        {list.map((note, index) => (
          <li key={index} className="hover-bg">
            <a className="py-2">{note}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
