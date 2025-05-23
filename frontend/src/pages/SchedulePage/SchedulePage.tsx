import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import NavBar from '../../components/NavBar';
import getWeeksRange from '../../api/GetWeeksRange';
import { format, startOfWeek } from 'date-fns';

import ScheduleHeader from './components/ScheduleHeader.1';
import ScheduleTable from './components/ScheduleTable';
import NotesPanel from './components/NotesPanel';
import EventModal from './components/EventModal';
import ExportModal from './components/ExportModal';
import ExportButton from './components/ExportButton';
import type { TEvent, TCell, TCurrentFilters, TCurrentMetrics, TNotesState } from './types';

import api from '../../interceptors/api';

const WORKDAY_START = 9 * 60; // 9:00 в минутах
const WORKDAY_END = 22 * 60; // 22:00 в минутах
const TIME_SLOT_DURATION = 90; // Длительность слота в минутах
const BREAK_DURATION = 15; // Длительность перерыва

export default function SchedulePage() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedCell, setSelectedCell] = useState<TCell | null>(null);
  const [events, setEvents] = useState<Map<TCell, TEvent>>(new Map());
  const [notesState, setNotesState] = useState<TNotesState>({ list: [], newNote: '' });
  const [currentMetrics, setCurrentMetrics] = useState<TCurrentMetrics>({
    weeks: [],
    teachers: [],
    places: [],
    groups: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<TCurrentFilters>({
    selectedGroup: null,
    selectedTeacher: null,
    selectedPlace: null,
    cycleStartDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [weeksData, teachersData, placesData, groupsData] = await Promise.all([
          getWeeksRange(),
          api.get('metrics/', { params: { type: 'teacher' } }),
          api.get('metrics/', { params: { type: 'place' } }),
          api.get('metrics/', { params: { type: 'group' } }),
        ]);

        setCurrentMetrics(prev => ({
          ...prev,
          weeks: weeksData,
          teachers: teachersData.data,
          places: placesData.data,
          groups: groupsData.data,
        }));

        setCurrentFilters(prev => ({
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
        setEvents(new Map());
      }
    };

    fetchEvents();
  }, [
    currentFilters.selectedGroup,
    currentFilters.cycleStartDate,
    currentFilters.selectedPlace,
    currentFilters.selectedTeacher,
  ]);


  const handleCellClick = (day: string, slot: { start: string; end: string }) => {
    setSelectedCell({ day, ...slot });
    if (document.getElementById('event_modal')) {
      (document.getElementById('event_modal') as HTMLDialogElement)?.showModal();
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex min-h-screen bg-base-200 p-4 gap-4'>
        <div className='flex-1 bg-base-100 rounded-box p-4'>
          <ScheduleHeader
            activeWeek={activeWeek}
            currentMetrics={currentMetrics}
            currentFilters={currentFilters}
            isLoading={isLoading}
            setActiveWeek={setActiveWeek}
            setCurrentFilters={setCurrentFilters}
          />

          <ExportButton onClick={() => modalRef.current?.showModal()} />

          <ScheduleTable
            timeSlots={timeSlots}
            events={events}
            activeWeek={activeWeek}
            cycleStartDate={currentFilters.cycleStartDate}
            onCellClick={handleCellClick}
          />
        </div>

        <NotesPanel 
          notesState={notesState}
          setNotesState={setNotesState}
        />
        <EventModal 
          selectedCell={selectedCell} 
          addEvent={(cell, event) => {
            setEvents(prev => {
              const newMap = new Map(prev);
              newMap.set(cell, { 
                ...event, 
                start_date: new Date().toISOString() 
              });
              return newMap;
            });
          }}
        />
        <ExportModal 
          ref={modalRef}
          onExport={(format) => {
            // Логика экспорта
            console.log('Export to:', format);
          }}
        />
      </div>
    </>
  );
}
