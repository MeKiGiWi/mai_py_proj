import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import getWeeksRange from '../scripts/GetWeeksRange';
import axios from 'axios';
import { format, addDays, addWeeks } from 'date-fns';

/**
 * Main schedule page component that displays a weekly schedule with events and notes
 */
export default function SchedulePage() {
  // State management for schedule functionality
  const [activeWeek, setActiveWeek] = useState(1); // Current active week (1 or 2)
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls event modal visibility
  const [selectedCell, setSelectedCell] = useState(null); // Currently selected schedule cell
  const [events, setEvents] = useState({}); // Stores all schedule events
  const [notes, setNotes] = useState([]); // List of notes
  const [newNote, setNewNote] = useState(''); // Text for new note
  const [weeks, setWeeks] = useState([]); // Available weeks from API
  const [isLoading, setIsLoading] = useState(true); // Loading state for weeks data
  const [cycleStartDate, setCycleStartDate] = useState(() => {return new Date();});

  // Days of the week labels
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  /**
   * Fetch available weeks from the API when component mounts
   */
  useEffect(() => {
    const fetchWeeks = async () => {
      try 
      {
        const weeksData = await getWeeksRange();
        setWeeks(weeksData);
      } 
      catch (error)
      {
        console.error('Error fetching weeks:', error);
      } 
      finally 
      {
        setIsLoading(false);
      }
    };

    fetchWeeks();
  }, []);


  /**
   * Generates time slots for the schedule
   * Creates 90-minute slots with 15-minute breaks
   * Special handling for lunch break at 12:15
   */
  const generateTimeSlots = () => {
    const slots = [];
    let currentStart = 9 * 60; // Start at 9:00
    const endTime = 22 * 60; // End at 22:00
    
    while (currentStart + 90 <= endTime) {
      if (currentStart === 12 * 60 + 30) {
        currentStart += 30; // Handle long break at 12:15
      }  
      const startHour = Math.floor(currentStart / 60);
      const startMinute = currentStart % 60;
      const end = currentStart + 90;
      const endHour = Math.floor(end / 60);
      const endMinute = end % 60;

      const startTime = `${startHour}:${startMinute.toString().padStart(2, '0')}`;
      const endTime = `${endHour}:${endMinute.toString().padStart(2, '0')}`;
      
      slots.push({ start: startTime, end: endTime });
      currentStart = end + 15; // Add 15-minute break
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  /**
   * Calculates date range for a specific week
   * @param {number} weekNumber - Week number (1 or 2)
   * @returns {string} Formatted date range string
   */
  const getWeekRange = (weekNumber) => {
    const weekStart = addWeeks(cycleStartDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);

    return `${format(weekStart, 'dd.MM')} - ${format(weekEnd, 'dd.MM')}`;
  };

  /**
   * Handles click on schedule cell
   * Opens event modal and sets selected cell
   */
  const handleCellClick = (day, slot) => {
    setSelectedCell({ day, ...slot });
    setIsModalOpen(true);
  };

  /**
   * Adds new event to the schedule
   * @param {Object} eventData - Event data including color and title
   */
  const addEvent = (eventData) => {
    const key = `${activeWeek}-${selectedCell.day}-${selectedCell.start}`;
    setEvents(prev => ({ ...prev, [key]: eventData }));
  };

  /**
   * Adds new note to the notes list
   */
  const addNote = () => {
    if (newNote.trim()) {
      setNotes(prev => [...prev, newNote]);
      setNewNote('');
    }
  };

  useEffect(() => {
    console.log(cycleStartDate, 'cycleStartDate');
  }, [cycleStartDate]);

  return (
    <>
    <NavBar/>
    <div className="flex min-h-screen bg-base-200 p-4 gap-4">
      {/* Main schedule panel */}
      <div className="flex-1 bg-base-100 rounded-box p-4">
        {/* Date and week selection panel */}
        <div className="flex items-center gap-4 mb-4">
          {/* Week tabs */}
          <div className="tabs tabs-boxed bg-base-200">
            {[1, 2].map(week => (
              <button
                key={week}
                className={`tab tab-lg ${activeWeek === week ? 'tab-active' : ''}`}
                onClick={() => setActiveWeek(week)}
              >
                Неделя {week} ({getWeekRange(week)})
              </button>
            ))}
          </div>

          {/* Weeks range dropdown with scrollable list */}
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">
              Выбрать неделю
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 
            rounded-box w-48 max-h-56 overflow-y-auto overflow-x-hidden no-scrollbar
             grid grid-cols-1 gap-1">
              {isLoading ? (
                <li><span>Загрузка...</span></li>
              ) : (
                weeks.map((week, index) => (
                  <li key={week} className="w-full items-center">
                    <a onClick={() => {
                      setActiveWeek(index % 2 + 1);
                      const date = addWeeks(new Date(week), -(index % 2));
                      console.log(week, 'week');
                      setCycleStartDate(date);
                    }}>
                      {format(week, 'dd.MM')} - {format(addDays(new Date(week), 6), 'dd.MM')}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

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

            {/* Export options modal */}
            <dialog id="export_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Экспорт расписания</h3>
                    <div className="flex flex-col gap-3">
                        <button className="btn btn-block text-info hover:bg-blue-50">
                        Google Документы
                        </button>
                        <button className="btn btn-block text-success hover:bg-green-50">
                        Google Календарь
                        </button>
                    </div>
                </div>
                
                <form method="dialog" className="modal-backdrop">
                <button></button>
                </form>
            </dialog>
            </div>
        </div>

        {/* Schedule table */}
        <div className="">
          <table className="table table-zebra table-auto w-full">
            <thead>
              <tr className="max-w-15">
                <th className="bg-base-200 max-w-1">Время</th>
                {days.map(day => (
                  <th key={day} className="bg-base-200 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot.start}>
                  <td className="bg-base-200 whitespace-nowrap max-w-15">
                    {slot.start} - {slot.end}
                  </td>
                  {days.map(day => {
                    const eventKey = `${activeWeek}-${day}-${slot.start}`;
                    // console.log(events, eventKey, 'events');
                    return (
                      <td
                        key={day}
                        className="cursor-pointer hover:bg-base-300 transition-colors h-12"
                        onClick={() => {
                          handleCellClick(day, slot);
                          document.getElementById('event_modal').showModal();
                        }}
                      >
                        {events[eventKey] && (
                          <div className="flex flex-col gap-1 p-1">
                            <div className="text-sm font-medium">{events[eventKey].lesson_name}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side panel with notes */}
      <div className="w-80 bg-base-100 rounded-box p-4">
        <h3 className="text-xl font-bold mb-4">Пометки</h3>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              className="input input-bordered flex-1" 
              value={newNote} 
              onChange={(e) => setNewNote(e.target.value)} 
              placeholder="Новая пометка..." 
            />
            <button className="btn btn-square" onClick={addNote}>
              +
            </button>
          </div>
        </div>
        <div className="divider"></div>
        <ul className="menu">
          {notes.map((note, index) => (
            <li key={index} className="hover-bg">
              <a className="py-2">{note}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Event creation/editing modal */}
      <dialog id="event_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Событие: {selectedCell?.day} {selectedCell?.start} - {selectedCell?.end}
          </h3>
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text mr-2">Название</span>
            </label>
            <input 
              type="text" 
              className="input left-9 mt-2"
            />
          </div>

          {/* Event color selection */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text mb-2">Цвет метки</span>
            </label>
            <div className="flex gap-2">
              {['badge-primary', 'badge-secondary', 'badge-accent'].map(color => (
                <button
                  key={color}
                  className={`badge ${color} gap-2`}
                  onClick={() => addEvent({ color })}
                >
                  █
                </button>
              ))}
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  // TODO: Save logic
                }}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => document.getElementById('event_modal').close()}>
            Закрыть
          </button>
        </form>
      </dialog>
    </div>
    </>
  );
}