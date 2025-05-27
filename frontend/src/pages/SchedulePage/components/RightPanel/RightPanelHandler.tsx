// components/RightPanel/RightPanelHandler.tsx
import { FC } from 'react';
import NotesPanel from '../NotesPanel';
import EditEventPanel from '../EditEventPanel';
import EditNotePanel from '../EditNotePanel';
import { TEvent, TNote, TNotesState } from '../../types';

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
  isCreating: boolean;
  onEventCancel: () => void;
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
  isCreating,
  onEventCancel,
}) => {
  const handleEventSaveWithValidation = (updatedEvent: TEvent) => {
    if (!selectedEventInfo) {
      console.error('Попытка сохранить несуществующее событие');
      return;
    }
    onEventSave(updatedEvent);
    setSelectedEventInfo(null);
  };

  return (
    <>
      {selectedEventInfo ? (
        <EditEventPanel
          event={selectedEventInfo.event}
          onSave={handleEventSaveWithValidation}
          onCancel={onEventCancel}
          isCreating={isCreating}
        />
      ) : selectedNote ? (
        <EditNotePanel
          note={selectedNote}
          onSave={onNoteSave}
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
