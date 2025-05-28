// components/RightPanel/index.tsx
import { FC } from 'react';
import RightPanelHandler from './RightPanelHandler';
import { TEvent, TNote, TNotesState } from '../../types';
import api from '@/interceptors/api';

type RightPanelProps = {
  selectedEventInfo: { event: TEvent; eventKey: string } | null;
  selectedNote: TNote | null;
  notesState: TNotesState;
  setNotesState: React.Dispatch<React.SetStateAction<TNotesState>>;
  setEvents: React.Dispatch<React.SetStateAction<Record<string, TEvent>>>;
  setSelectedEventInfo: (
    value: { event: TEvent; eventKey: string } | null,
  ) => void;
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
  onEventCancel,
}) => {
  const handleNoteDelete = (noteId: string) => {
    setNotesState((prev) => ({
      ...prev,
      list: prev.list.filter((note) => note.id !== noteId),
    }));
  };

  const handleNoteUpdate = (updatedNote: TNote) => {
    setNotesState((prev) => ({
      ...prev,
      list: prev.list.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    }));
    setSelectedNote(null);
  };

  const handleEventUpdate = (updatedEvent: TEvent) => {
    if (!selectedEventInfo) return;

    const finalEvent = isCreating
      ? { ...updatedEvent, start_date: selectedEventInfo.event.start_date }
      : updatedEvent;
    const newDate = updatedEvent.start_date?.toISOString()
    const every_week = selectedEventInfo.event.repeat_type == 'alternate_week' ? true : false;

    if (selectedEventInfo.event.repeat_type == 'none')
      api.patch("schedule/", {
        data: {
          date: newDate,
          place: updatedEvent.place,
          group_name: updatedEvent.group_name,
          teacher: updatedEvent.teacher,
          lesson_name: updatedEvent.lesson_name,
          lesson_type: updatedEvent.lesson_type,
        }
      }
      )
    else
      api.put("cycled/", {
        data: {
          date: newDate,
          place: updatedEvent.place,
          group_name: updatedEvent.group_name,
          teacher: updatedEvent.teacher,
          lesson_name: updatedEvent.lesson_name,
          lesson_type: updatedEvent.lesson_type,
          every_week: every_week,
        }
      }
      )
    setEvents((prev) => {
      return {
        ...prev,
        [selectedEventInfo.eventKey]: finalEvent,
      }
    });
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
