import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function SchedulePage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [events, setEvents] = useState({});
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [cycleStartDate, setCycleStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // generete time slots
  const generateTimeSlots = () => {
    const slots = [];
    let currentStart = 9 * 60; // 9:00 in minutes
    const endTime = 22 * 60; // 21:00 in minutes
    
    while (currentStart + 90 <= endTime) {
      if (currentStart === 12 * 60 + 30 /* 12:30 in minutes*/) {
        currentStart += 30; // handle big break
      }  
      const startHour = Math.floor(currentStart / 60);
      const startMinute = currentStart % 60;
      const end = currentStart + 90;
      const endHour = Math.floor(end / 60);
      const endMinute = end % 60;

      const startTime = `${startHour}:${startMinute.toString().padStart(2, '0')}`;
      const endTime = `${endHour}:${endMinute.toString().padStart(2, '0')}`;
      
      slots.push({ start: startTime, end: endTime });
      currentStart = end + 15; // Appending 15 minutes break
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Formating dates
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  // getting diaposone of days for week 
  const getWeekRange = (weekNumber) => {
    const startDate = new Date(cycleStartDate);
    const weekStart = new Date(startDate.setDate(startDate.getDate() + (weekNumber-1)*7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
  };

  const handleCellClick = (day, slot) => {
    setSelectedCell({ day, ...slot });
    setIsModalOpen(true);
  };

  const addEvent = (eventData) => {
    const key = `${activeWeek}-${selectedCell.day}-${selectedCell.start}-${selectedCell.end}`;
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
      <div className="flex-1 bg-base-100 rounded-box p-4">
        {/* Data choose*/}
        <div className="flex items-center gap-4 mb-4">
          <div className="tabs tabs-boxed bg-base-200">
            {[1, 2].map(week => (
              <button
                key={week}
                className={`tab tab-lg ${activeWeek === week ? 'tab-active' : ''}`}
                onClick={() => setActiveWeek(week)}
              >
                Неделя {week} ({getWeekRange(week)})
              </button>
              // TODO: Пофиксить getWeekRange
            ))}
          </div>
          
          <div className="form-control">
            <input 
              type="date" 
              className="input input-bordered" 
              value={cycleStartDate}
              onChange={(e) => setCycleStartDate(e.target.value)}
            />
          </div>
        </div>

        {/* Dashboard */}
        <div className="flex gap-2 my-4">
            <div>
        {/* button for open modal window*/}
            <button 
                className="btn btn-accent gap-2"
                onClick={() => document.getElementById('export_modal').showModal()}
            >
                Экспорт
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7l7-7zM5 18v2h14v-2H5z"/>
                </svg>
            </button>

            {/* modal window */}
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
                
                {/* closing */}
                <form method="dialog" className="modal-backdrop">
                <button></button>
                </form>
            </dialog>
            </div>
        </div>

        {/* Schedule */}
        <div className="overflow-x-auto">
          <table className="table table-zebra table-compact w-full">
            <thead>
              <tr>
                <th className="bg-base-200">Время</th>
                {days.map(day => (
                  <th key={day} className="bg-base-200 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot.start}>
                  <td className="bg-base-200 whitespace-nowrap">
                    {slot.start} - {slot.end}
                  </td>
                  {days.map(day => {
                    const eventKey = `${activeWeek}-${day}-${slot.start}-${slot.end}`;
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
                          <div className={`badge gap-2 ${events[eventKey].color}`}>
                            {events[eventKey].title}
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
              className="input input-bordered flex-1" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Новая пометка..." />
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

      {/* Modal window of event in schedule */}
      <dialog id="event_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Событие: {selectedCell?.day} {selectedCell?.start} - {selectedCell?.end}
          </h3>
           {/*TODO: Заредизайнить*/}
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text mr-2">Название</span>
            </label>
            <input 
              type="text" 
              className="input left-9 mt-2"
            />
          </div>

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
                  // TODO: Логика сохранения
                }}
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>

        {/* Background for closing */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => document.getElementById('event_modal').close()}>
            Закрыть Эта типа невидимо 
          </button>
        </form>
      </dialog>
    </div>
    </>
  );
}