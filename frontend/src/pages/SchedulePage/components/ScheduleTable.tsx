import { format, addDays, addWeeks } from 'date-fns';

export default function ScheduleTable({
  days,
  timeSlots,
  events,
  activeWeek,
  cycleStartDate,
  onCellClick,
}: {
  days: string[];
  timeSlots: { start: string; end: string }[];
  events: Record<string, any>;
  activeWeek: number;
  cycleStartDate: Date;
  onCellClick: (day: string, slot: { start: string; end: string }) => void;
}) {
  const getJSXWeekDays = (days: string[]) => {
    return days.map((day) => (
      <th key={day} className='text-center bg-base-200'>
        {day}
      </th>
    ));
  };

  const getJSXTableCels = (timeSlots: { start: string; end: string }[]) => {
    return timeSlots.map((slot) => (
      <tr key={slot.start}>
        <td className=' whitespace-nowrap max-w-1 bg-base-200'>
          {slot.start}
          <br />
          {slot.end}
        </td>
        {days.map((day) => {
          const current_day = addDays(addWeeks(cycleStartDate, activeWeek - 1), days.indexOf(day));
          const eventKey = `${format(current_day, 'yyyy-MM-dd')}T${slot.start === '9:00' ? '09:00' : slot.start}:00Z`;
          const event = events[eventKey];
          return (
            <td
              key={day}
              className='cursor-pointer hover:bg-base-300 
                    w-[170px] max-w-[130px] min-h-21.5 h-21.5
                    break-words overflow-hidden p-2 align-top'
              onClick={() => onCellClick(day, slot)}
            >
              {event && (
                <div className='flex flex-col gap-1 p-1'>
                  <div className='text-sm font-medium line-clamp-3'>{event.lesson_name}</div>
                </div>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className='border rounded-box border-base-content/5 bg-base-100'>
      <table className='table max-w-full w-full overflow-hidden'>
        <thead className=''>
          <tr>
            <th className='w-20 bg-base-200'>Время</th>
            {getJSXWeekDays(days)}
          </tr>
        </thead>
        <tbody>{getJSXTableCels(timeSlots)}</tbody>
      </table>
    </div>
  );
}
