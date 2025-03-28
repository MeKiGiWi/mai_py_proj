import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import getWeeksRange from '../scripts/GetWeeksRange';
import axios from 'axios';
import { format, addDays, addWeeks, startOfWeek } from 'date-fns';

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
  const [cycleStartDate, setCycleStartDate] = useState(() => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    return start;
  });

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

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await axios.get(`http://localhost:8000/api/schedule/by-group/?group=М8О-116БВ-24&date=${format(cycleStartDate, 'yyyy-MM-dd')}`);
      setEvents(eventsData.data);
    };

    fetchEvents();
  }, [cycleStartDate]);

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
          <div>

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
                        const date = addWeeks(week, -(index % 2));
                        setCycleStartDate(date);
                      }}>
                        {format(week, 'dd.MM')} - {format(addDays(week, 6), 'dd.MM')}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>

              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
              </svg> */}

          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
              </svg>
            </div>
            
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-48">
              <li className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="flex justify-between">
                  Группа
                </div>
                <ul className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-48 ml-2">
                  <li><a>Subitem 1</a></li>
                  <li><a>Subitem 2</a></li>
                </ul>
              </li>

              <li className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="flex justify-between">
                  Преподаватель
                </div>
                <ul className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-48 ml-2">
                  <li><a>Subitem 3</a></li>
                  <li><a>Subitem 4</a></li>
                </ul>
              </li>

              <li className="dropdown dropdown-right">
                <div tabIndex={0} role="button" className="flex justify-between">
                  Аудитория
                </div>
                <ul className="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-48 ml-2">
                  <li><a>Subitem 5</a></li>
                  <li><a>Subitem 6</a></li>
                </ul>
              </li>
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
          <table className="table table-zebra table-fixed w-full">
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
                    const current_day = addDays(addWeeks(cycleStartDate, activeWeek - 1), days.indexOf(day));

                    const eventKey = `${format(current_day, 'yyyy-MM-dd')}T${slot.start === '9:00' ? '09:00' : slot.start}:00Z`;
                    const event = events[eventKey];
                    if (event !== undefined) {
                      console.log(event[eventKey], eventKey, 'event');
                    }
                    return (
                      <td
                        key={day}
                        className="cursor-pointer hover:bg-base-300 
                        w-[200px] min-w-[200px] max-w-[200px]
                        break-words overflow-hidden p-2 align-top"
                        onClick={() => {
                          handleCellClick(day, slot);
                          document.getElementById('event_modal').showModal();
                        }}
                      >
                        {event && (
                          <div className="flex flex-col gap-1 p-1">
                            <div className="text-sm font-medium">{event.lesson_name}</div>
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