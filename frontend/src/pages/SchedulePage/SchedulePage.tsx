import { useState, useEffect, useMemo, useCallback } from 'react';
import NavBar from '../../components/NavBar';
import getWeeksRange from '../../api/GetWeeksRange';
import axios from 'axios';
import { format, startOfWeek } from 'date-fns';

import ScheduleHeader from './components/ScheduleHeader.1';
import ScheduleTable from './components/ScheduleTable';
import NotesPanel from './components/NotesPanel';
import EventModal from './components/EventModal';
import ExportModal from './components/ExportModal';
import ExportButton from './components/ExportButton';

const WORKDAY_START = 9 * 60; // 9:00 в минутах
const WORKDAY_END = 22 * 60; // 22:00 в минутах
const TIME_SLOT_DURATION = 90; // Длительность слота в минутах
const BREAK_DURATION = 15; // Длительность перерыва

export default function SchedulePage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedCell, setSelectedCell] = useState<{
    day: string;
    start: string;
    end: string;
  } | null>(null);
  const [events, setEvents] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [weeks, setWeeks] = useState<Date[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [cycleStartDate, setCycleStartDate] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const days = useMemo(() => ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [weeksData, teachersData, placesData, groupsData] = await Promise.all([
          getWeeksRange(),
          axios.get('http://localhost:8000/api/metrics/?type=teacher'),
          axios.get('http://localhost:8000/api/metrics/?type=place'),
          axios.get('http://localhost:8000/api/metrics/?type=group'),
        ]);

        setWeeks(weeksData);
        setTeachers(teachersData.data);
        setPlaces(placesData.data);
        setGroups(groupsData.data);
        setSelectedGroup(groupsData.data[0] || null);
      } catch (error) {
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
        const { data } = await axios.get('http://localhost:8000/api/schedule/', {
          params: {
            group_name: selectedGroup,
            date: format(cycleStartDate, 'yyyy-MM-dd'),
            teacher: selectedTeacher,
            place: selectedPlace,
          },
        });
        setEvents(data);
      } catch (error) {
        setEvents({});
      }
    };

    fetchEvents();
  }, [selectedGroup, cycleStartDate, selectedPlace, selectedTeacher]);

  const handleCellClick = (day: string, slot: { start: string; end: string }) => {
    setSelectedCell({ day, ...slot });
    if (document.getElementById('event_modal')) {
      (document.getElementById('event_modal') as HTMLDialogElement)?.showModal();
    }
  };

  const addEvent = (eventData: any) => {
    if (selectedCell) {
      const key = `${activeWeek}-${selectedCell.day}-${selectedCell.start}`;
      setEvents((prev) => ({ ...prev, [key]: eventData }));
    }
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes((prev: string[]) => [...prev, newNote]);
      setNewNote('');
    }
  };

  useEffect(() => {
    console.log(selectedGroup);
  }, [selectedGroup]);

  return (
    <>
      <NavBar />
      <div className='flex min-h-screen bg-base-200 p-4 gap-4'>
        <div className='flex-1 bg-base-100 rounded-box p-4'>
          <ScheduleHeader
            activeWeek={activeWeek}
            setActiveWeek={setActiveWeek}
            cycleStartDate={cycleStartDate}
            setCycleStartDate={setCycleStartDate}
            weeks={weeks}
            isLoading={isLoading}
            groups={groups}
            teachers={teachers}
            places={places}
            selectedGroup={selectedGroup}
            selectedTeacher={selectedTeacher}
            selectedPlace={selectedPlace}
            setSelectedGroup={setSelectedGroup}
            setSelectedTeacher={setSelectedTeacher}
            setSelectedPlace={setSelectedPlace}
          />

          <ExportButton />

          <ScheduleTable
            days={days}
            timeSlots={timeSlots}
            events={events}
            activeWeek={activeWeek}
            cycleStartDate={cycleStartDate}
            onCellClick={handleCellClick}
          />
        </div>

        <NotesPanel notes={notes} newNote={newNote} setNewNote={setNewNote} addNote={addNote} />

        <EventModal selectedCell={selectedCell} addEvent={addEvent} />

        <ExportModal />
      </div>
    </>
  );
}
