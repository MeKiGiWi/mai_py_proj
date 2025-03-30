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
  return (
    <div className=''>
      <table className='table table-zebra table-fixed w-full'>
        <thead>
          <tr className='max-w-15'>
            <th className='bg-base-200 max-w-1'>Время</th>
            {days.map((day) => (
              <th key={day} className='bg-base-200 text-center'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot.start}>
              <td className='bg-base-200 whitespace-nowrap max-w-15'>
                {slot.start} - {slot.end}
              </td>
              {days.map((day) => {
                const current_day = addDays(
                  addWeeks(cycleStartDate, activeWeek - 1),
                  days.indexOf(day),
                );
                const eventKey = `${format(current_day, 'yyyy-MM-dd')}T${slot.start === '9:00' ? '09:00' : slot.start}:00Z`;
                const event = events[eventKey];
                return (
                  <td
                    key={day}
                    className='cursor-pointer hover:bg-base-300 
                    w-[200px] min-w-[200px] max-w-[200px]
                    break-words overflow-hidden p-2 align-top'
                    onClick={() => onCellClick(day, slot)}
                  >
                    {event && (
                      <div className='flex flex-col gap-1 p-1'>
                        <div className='text-sm font-medium'>{event.lesson_name}</div>
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
  );
}
