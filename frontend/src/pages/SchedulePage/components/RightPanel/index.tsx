// components/RightPanel/index.tsx
import { FC } from 'react';
import RightPanelHandler from './RightPanelHandler';
import { TEvent, TNote, TNotesState } from '../../types';

type RightPanelProps = {
  selectedEventInfo: { event: TEvent; eventKey: string } | null;
  selectedNote: TNote | null;
  notesState: TNotesState;
  setNotesState: React.Dispatch<React.SetStateAction<TNotesState>>;
  setEvents: React.Dispatch<React.SetStateAction<Record<string, TEvent>>>;
  setSelectedEventInfo: (value: { event: TEvent; eventKey: string } | null) => void;
  setSelectedNote: (value: TNote | null) => void;
  isCreating: boolean;
  onEventCancel: () => void;
};

const RightPanel: FC<RightPanelProps> = ({
  selectedEventInfo,
  selectedNote,
  notesState,
  setNotesState,
  setEvents,
  setSelectedEventInfo,
  setSelectedNote,
  isCreating,
  onEventCancel
}) => {
  const handleNoteDelete = (noteId: string) => {
    setNotesState(prev => ({
      ...prev,
      list: prev.list.filter(note => note.id !== noteId)
    }));
  };

  const handleNoteUpdate = (updatedNote: TNote) => {
    setNotesState(prev => ({
      ...prev,
      list: prev.list.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      )
    }));
    setSelectedNote(null);
  };

  const handleEventUpdate = (updatedEvent: TEvent) => {
    if (!selectedEventInfo) return;
    
    const finalEvent = isCreating
      ? { ...updatedEvent, start_date: new Date() }
      : updatedEvent;

    setEvents(prev => ({
      ...prev,
      [selectedEventInfo.eventKey]: finalEvent
    }));
    setSelectedEventInfo(null);
  };

  return (
    <RightPanelHandler
      selectedEventInfo={selectedEventInfo}
      selectedNote={selectedNote}
      notesState={notesState}
      setNotesState={setNotesState}
      onEventSave={handleEventUpdate}
      onNoteSave={handleNoteUpdate}
      onNoteDelete={handleNoteDelete}
      setSelectedEventInfo={setSelectedEventInfo}
      setSelectedNote={setSelectedNote}
      isCreating={isCreating}
      onEventCancel={onEventCancel}
    />
  );
};

export default RightPanel;