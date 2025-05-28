import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import getWeeksRange from '../../api/GetWeeksRange';
import { format, startOfWeek, addDays, addWeeks } from 'date-fns';

import ScheduleHeader from './components/ScheduleHeader.1';
import ScheduleTable from './components/ScheduleTable';
import ExportModal from './components/ExportModal';
import ExportButton from './components/ExportButton';
import RightPanel from './components/RightPanel';
import type {
  TEvent,
  TCurrentFilters,
  TCurrentMetrics,
  TNotesState,
  TSelectedEvent,
  TNote,
} from './types';

import api from '@/interceptors/api';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const WORKDAY_START = 9 * 60; // 9:00 в минутах
const WORKDAY_END = 22 * 60; // 22:00 в минутах
const TIME_SLOT_DURATION = 90; // Длительность слота в минутах
const BREAK_DURATION = 15; // Длительность перерыва

export default function SchedulePage() {
  const [currentFilters, setCurrentFilters] = useState<TCurrentFilters>({
    activeWeek: 1,
    selectedGroup: null,
    selectedTeacher: null,
    selectedPlace: null,
    cycleStartDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const [currentMetrics, setCurrentMetrics] = useState<TCurrentMetrics>({
    weeks: [],
    teachers: [],
    places: [],
    groups: [],
  });

  const [notesState, setNotesState] = useState<TNotesState>({
    list: [],
    newNote: '',
  });

  const [events, setEvents] = useState<Record<string, TEvent>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedEventInfo, setSelectedEventInfo] =
    useState<TSelectedEvent | null>(null);
  const [selectedNote, setSelectedNote] = useState<TNote | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [weeksData, teachersData, placesData, groupsData] =
          await Promise.all([
            getWeeksRange(),
            api.get('metrics/', { params: { type: 'teacher' } }),
            api.get('metrics/', { params: { type: 'place' } }),
            api.get('metrics/', { params: { type: 'group' } }),
          ]);

        setCurrentMetrics({
          weeks: weeksData,
          teachers: teachersData.data,
          places: placesData.data,
          groups: groupsData.data,
        });

        setCurrentFilters((prev) => ({
          ...prev,
          selectedGroup: groupsData.data[0] || null,
        }));
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const getTimeSlots = () => {
    const slots: { start: string; end: string }[] = [];
    let currentStart = WORKDAY_START;

    while (currentStart + TIME_SLOT_DURATION <= WORKDAY_END) {
      if (currentStart === 12 * 60 + 30) {
        currentStart += 30;
      }

      slots.push({
        start: formatTime(currentStart),
        end: formatTime(currentStart + TIME_SLOT_DURATION),
      });

      currentStart += TIME_SLOT_DURATION + BREAK_DURATION;
    }

    return slots;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('schedule/', {
          params: {
            group_name: currentFilters.selectedGroup,
            date: format(currentFilters.cycleStartDate, 'yyyy-MM-dd'),
            teacher: currentFilters.selectedTeacher,
            place: currentFilters.selectedPlace,
          },
        });
        setEvents(data);
      } catch (error) {
        setEvents({});
      }
    };

    fetchEvents();
  }, [currentFilters]);

  const handleCellClick = (
    day: string,
    slot: { start: string; end: string },
    event?: TEvent,
    eventKey?: string,
  ) => {
    if (event && eventKey) {
      setSelectedEventInfo({ event, eventKey });
      setIsCreatingEvent(false);
    } else {
      const currentDate = addDays(
        addWeeks(currentFilters.cycleStartDate, currentFilters.activeWeek - 1),
        DAYS.indexOf(day),
      );
      const hours = slot.start.split(':')[0];
      const minutes = slot.start.split(':')[1];
      currentDate.setHours(Number(hours));
      currentDate.setMinutes(Number(minutes));
      const newEventKey = format(currentDate, "yyyy-MM-dd") +
        "T" +
        (slot.start === '9:00' ? '09:00' : slot.start) +
        ":00Z";

      setSelectedEventInfo({
        event: {
          group_name: currentFilters.selectedGroup || '',
          lesson_name: 'Новое занятие',
          lesson_type: 'ЛК',
          teacher: '',
          place: '',
          start_date: currentDate,
          repeat_type: 'none',
        },
        eventKey: newEventKey,
      });
      setIsCreatingEvent(true);
    }
  };

  const handleEventCancel = () => {
    if (isCreatingEvent && selectedEventInfo) {
      setEvents((prev) => {
        const newEvents = { ...prev };
        delete newEvents[selectedEventInfo.eventKey];
        return newEvents;
      });
    }
    setSelectedEventInfo(null);
    setIsCreatingEvent(false);
  };

  const handleEventDelete = (eventKey: string) => {
    setEvents((prev) => {
      const newEvents = { ...prev };
      const deletedEvent = events[eventKey];
      api.delete("schedule/", {
        data: {
          date: deletedEvent.start_date?.toISOString(),
          place: deletedEvent.place,
          group_name: deletedEvent.group_name,
          teacher: deletedEvent.teacher,
          lesson_name: deletedEvent.lesson_name,
          lesson_type: deletedEvent.lesson_type,
        }
      })
      delete newEvents[eventKey];
      return newEvents;
    });
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-base-200 p-4 gap-4">
        <div className="flex-1 bg-base-100 rounded-box p-4">
          <ScheduleHeader
            currentFilters={currentFilters}
            currentMetrics={currentMetrics}
            isLoading={isLoading}
            setCurrentFilters={setCurrentFilters}
          />

          <ExportButton onClick={() => setIsExportModalOpen(true)} />
          <ExportModal
            open={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
          />

          <ScheduleTable
            timeSlots={getTimeSlots()}
            events={events}
            filters={{
              activeWeek: currentFilters.activeWeek,
              cycleStartDate: currentFilters.cycleStartDate,
            }}
            onCellClick={handleCellClick}
            onEventDelete={handleEventDelete}
          />
        </div>

        <RightPanel
          selectedEventInfo={selectedEventInfo}
          selectedNote={selectedNote}
          notesState={notesState}
          setNotesState={setNotesState}
          setEvents={setEvents}
          setSelectedEventInfo={setSelectedEventInfo}
          setSelectedNote={setSelectedNote}
          isCreating={isCreatingEvent}
          onEventCancel={handleEventCancel}
        />
      </div>
    </>
  );
}
