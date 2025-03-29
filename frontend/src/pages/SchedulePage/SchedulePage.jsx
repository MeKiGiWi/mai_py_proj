import { useState, useEffect, useMemo, useCallback } from 'react';
import NavBar from '../../components/NavBar';
import getWeeksRange from '../../api/GetWeeksRange';
import axios from 'axios';
import { format, addDays, addWeeks, startOfWeek } from 'date-fns';

import ScheduleHeader from './components/ScheduleHeader';
import ScheduleTable from './components/ScheduleTable';
import NotesPanel from './components/NotesPanel';
import EventModal from './components/EventModal';
import ExportModal from './components/ExportModal';

// Константы для конфигурации
const WORKDAY_START = 9 * 60; // 9:00 в минутах
const WORKDAY_END = 22 * 60; // 22:00 в минутах
const TIME_SLOT_DURATION = 90; // Длительность слота в минутах
const BREAK_DURATION = 15; // Длительность перерыва

export default function SchedulePage() {
  // Состояния
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedCell, setSelectedCell] = useState(null);
  const [events, setEvents] = useState({});
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [weeks, setWeeks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [cycleStartDate, setCycleStartDate] = useState(() => 
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const days = useMemo(() => ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'], []);

  // Объединение запросов данных
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [weeksData, teachersData, placesData, groupsData] = await Promise.all([
          getWeeksRange(),
          axios.get('http://localhost:8000/api/metrics/?type=teacher'),
          axios.get('http://localhost:8000/api/metrics/?type=place'),
          axios.get('http://localhost:8000/api/metrics/?type=group')
        ]);
        
        setWeeks(weeksData);
        setTeachers(teachersData.data);
        setPlaces(placesData.data);
        setGroups(groupsData.data);
        setSelectedGroup(groupsData.data[0] || null);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const formatTime = useCallback((minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  }, []);

  const timeSlots = useMemo(() => {
    const slots = [];
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
      if (!selectedGroup) return;

      try {
        const { data } = await axios.get('http://localhost:8000/api/schedule/by-group/', {
          params: {
            group: "М8О-116БВ-24",
            date: format(cycleStartDate, 'yyyy-MM-dd')
          }
        });
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
  }, [selectedGroup, cycleStartDate]);

  const handleCellClick = (day, slot) => {
    setSelectedCell({ day, ...slot });
    document.getElementById('event_modal').showModal();
  };

  const addEvent = (eventData) => {
    const key = `${activeWeek}-${selectedCell.day}-${selectedCell.start}`;
    setEvents(prev => ({ ...prev, [key]: eventData }));
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes(prev => [...prev, newNote]);
      setNewNote('');
    }
  };

  return (
    <>
      <NavBar/>
      <div className="flex min-h-screen bg-base-200 p-4 gap-4">
        {/* Main schedule panel */}
        <div className="flex-1 bg-base-100 rounded-box p-4">
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
          />

          {/* Export button and modal */}
          <div className="flex gap-2 my-4">
            <div>
              <button 
                className="btn btn-accent gap-2"
                onClick={() => document.getElementById('export_modal').showModal()}
              >
                Экспорт
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7l7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </button>
            </div>
          </div>

          <ScheduleTable 
            days={days}
            timeSlots={timeSlots}
            events={events}
            activeWeek={activeWeek}
            cycleStartDate={cycleStartDate}
            onCellClick={handleCellClick}
          />
        </div>

        <NotesPanel 
          notes={notes}
          newNote={newNote}
          setNewNote={setNewNote}
          addNote={addNote}
        />

        <EventModal 
          selectedCell={selectedCell}
          addEvent={addEvent}
        />

        <ExportModal />
      </div>
    </>
  );
}