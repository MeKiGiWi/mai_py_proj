// components/RightPanelHandler.tsx
import { FC } from 'react';
import NotesPanel from './NotesPanel';
import EditEventPanel from './EditEventPanel';
import EditNotePanel from './EditNotePanel';
import { TEvent, TNote, TNotesState } from '../types';

type TSelectedEvent = {
  event: TEvent;
  eventKey: string;
};

type RightPanelHandlerProps = {
  selectedEventInfo: TSelectedEvent | null;
  selectedNote: TNote | null;
  notesState: TNotesState;
  setNotesState: React.Dispatch<React.SetStateAction<TNotesState>>;
  onEventSave: (updatedEvent: TEvent) => void;
  onNoteSave: (updatedNote: TNote) => void;
  onNoteDelete: (noteId: string) => void;
  setSelectedEventInfo: (value: TSelectedEvent | null) => void;
  setSelectedNote: (value: TNote | null) => void;
};

const RightPanelHandler: FC<RightPanelHandlerProps> = ({
  selectedEventInfo,
  selectedNote,
  notesState,
  setNotesState,
  onEventSave,
  onNoteSave,
  onNoteDelete,
  setSelectedEventInfo,
  setSelectedNote,
}) => {
  // Обработчик сохранения события с проверкой на null
  const handleEventSave = (updatedEvent: TEvent) => {
    if (!selectedEventInfo) return;
    onEventSave(updatedEvent);
    setSelectedEventInfo(null);
  };

  // Обработчик сохранения заметки
  const handleNoteSave = (updatedNote: TNote) => {
    onNoteSave(updatedNote);
    setSelectedNote(null);
  };

  return (
    <>
      {selectedEventInfo ? (
        <EditEventPanel
          event={selectedEventInfo.event}
          onSave={handleEventSave}
          onCancel={() => setSelectedEventInfo(null)}
        />
      ) : selectedNote ? (
        <EditNotePanel
          note={selectedNote}
          onSave={handleNoteSave}
          onCancel={() => setSelectedNote(null)}
        />
      ) : (
        <NotesPanel
          notesState={notesState}
          setNotesState={setNotesState}
          onNoteSelect={setSelectedNote}
          onNoteDelete={onNoteDelete}
        />
      )}
    </>
  );
};

export default RightPanelHandler;