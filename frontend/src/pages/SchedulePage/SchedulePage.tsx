import { useState, useEffect, useMemo, useCallback } from 'react';
import NavBar from '../../components/NavBar';
import getWeeksRange from '../../api/GetWeeksRange';
import api from '@/interceptors/api';
import { format, startOfWeek } from 'date-fns';

import ScheduleHeader from './components/ScheduleHeader.1';
import ScheduleTable from './components/ScheduleTable';
import NotesPanel from './components/NotesPanel';
import EventModal from './components/EventModal';
import ExportModal from './components/ExportModal';
import ExportButton from './components/ExportButton';
import { TEvent, TCurrentMetrics, TCurrentFilters, TCell } from './types';

const WORKDAY_START = 9 * 60; // 9:00 в минутах
const WORKDAY_END = 22 * 60; // 22:00 в минутах
const TIME_SLOT_DURATION = 90; // Длительность слота в минутах
const BREAK_DURATION = 15; // Длительность перерыва

export default function SchedulePage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedCell, setSelectedCell] = useState<TCell | null>(null);
  const [events, setEvents] = useState<Map<TCell, TEvent>>(new Map());
  const [currentMetrics, setCurrentMetrics] = useState<TCurrentMetrics>({
    weeks: [],
    teachers: [],
    places: [],
    groups: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<TCurrentFilters>({
    selectedGroup: null,
    selectedPlace: null,
    selectedTeacher: null,
    cycleStartDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [weeksData, teachersData, placesData, groupsData] = await Promise.all([
          getWeeksRange(),
          api.get(`${import.meta.env.VITE_API_URL}metrics/?type=teacher`),
          api.get(`${import.meta.env.VITE_API_URL}metrics/?type=place`),
          api.get(`${import.meta.env.VITE_API_URL}metrics/?type=group`),
        ]);

        setCurrentMetrics({
          weeks: weeksData,
          teachers: teachersData.data,
          places: placesData.data,
          groups: groupsData.data,
        });
        setCurrentFilters({
          ...currentFilters,
          selectedGroup: groupsData.data[0] || null,
        });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const formatTime = useCallback((minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  }, []);

  const timeSlots = useMemo(() => {
    const slots: { start: string; end: string }[] = [];
    let currentStart = WORKDAY_START;

    while (currentStart + TIME_SLOT_DURATION <= WORKDAY_END) {
      if (currentStart === 12 * 60 + 30) {
        currentStart += 30;
      }

      const startTime = formatTime(currentStart);
      const endTime = formatTime(currentStart + TIME_SLOT_DURATION);

      slots.push({ start: startTime, end: endTime });
      currentStart += TIME_SLOT_DURATION + BREAK_DURATION;
    }

    return slots;
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('http://localhost:8000/api/schedule/', {
          params: {
            group_name: currentFilters.selectedGroup,
            date: format(currentFilters.cycleStartDate, 'yyyy-MM-dd'),
            teacher: currentFilters.selectedTeacher,
            place: currentFilters.selectedPlace,
          },
        });
        const eventsMap = new Map<TCell, TEvent>();
        Object.entries(data).forEach(([key, event]) => {
          const [week, day, start] = key.split('-');
          eventsMap.set({ day, start, end: '' }, event as TEvent);
        });
        setEvents(eventsMap);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(new Map());
      }
    };

    fetchEvents();
  }, [currentFilters]);

  const handleCellClick = (day: string, slot: { start: string; end: string }) => {
    setSelectedCell({ day, ...slot });
    if (document.getElementById('event_modal')) {
      (document.getElementById('event_modal') as HTMLDialogElement)?.showModal();
    }
  };

  const addEvent = (eventData: TEvent) => {
    if (selectedCell) {
      setEvents((prev) => {
        const newEvents = new Map(prev);
        newEvents.set(selectedCell, eventData);
        return newEvents;
      });
    }
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes((prev) => [...prev, newNote.trim()]);
      setNewNote('');
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex min-h-screen bg-base-200 p-4 gap-4'>
        <div className='flex-1 bg-base-100 rounded-box p-4'>
          <ScheduleHeader
            activeWeek={activeWeek}
            setActiveWeek={setActiveWeek}
            isLoading={isLoading}
            currentFilters={currentFilters}
            setCurrentFilters={setCurrentFilters}
            currentMetrics={currentMetrics}
          />

          <ExportButton />

          <ScheduleTable
            timeSlots={timeSlots}
            events={Object.fromEntries(events)}
            activeWeek={activeWeek}
            cycleStartDate={currentFilters.cycleStartDate}
            onCellClick={handleCellClick}
          />
        </div>

        <NotesPanel events={events} />

        <EventModal selectedCell={selectedCell} addEvent={addEvent} />

        <ExportModal />
      </div>
    </>
  );
}
