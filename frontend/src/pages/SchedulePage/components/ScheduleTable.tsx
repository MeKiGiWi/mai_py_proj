import { format, addDays, addWeeks } from 'date-fns';
import { useMemo } from 'react';
import { TEvent } from '../types';

type ScheduleTableProps = {
  timeSlots: { start: string; end: string }[];
  events: Record<string, TEvent>;
  filters: {
    activeWeek: number;
    cycleStartDate: Date;
  };
  onCellClick: (
    day: string,
    slot: { start: string; end: string },
    event?: TEvent,
    eventKey?: string,
  ) => void;
  onEventDelete: (eventKey: string) => void;
};

export default function ScheduleTable({
  timeSlots,
  events,
  filters: { activeWeek, cycleStartDate },
  onCellClick,
  onEventDelete,
}: ScheduleTableProps) {
  const { days } = useMemo(() => {
    return {
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    };
  }, []);

  const getJSXWeekDays = (days: string[]) => {
    return days.map((day) => (
      <th key={day} className="text-center bg-base-200">
        {day}
      </th>
    ));
  };

  const getJSXTableCels = (timeSlots: { start: string; end: string }[]) => {
    return timeSlots.map((slot) => (
      <tr key={slot.start}>
        <td
          className={`border-l-0 ${slot.start != '20:00' ? 'border' : 'border-r'}
          border-base-content/15
            whitespace-nowrap max-w-1 bg-base-200 
            text-large font-semibold text-gray-500`}
        >
          {slot.start}
          <br />
          {slot.end}
        </td>
        {days.map((day) => {
          const current_day = addDays(
            addWeeks(cycleStartDate, activeWeek - 1),
            days.indexOf(day),
          );
          const eventKey = `${format(current_day, 'yyyy-MM-dd')}T${slot.start === '9:00' ? '09:00' : slot.start}:00Z`;
          const event = events[eventKey];
          console.log(eventKey, events[eventKey], "key value");
          console.log
          return (
            <td
              key={day}
              className={`${slot.start != '20:00' && 'border border-base-content/15'} border-l-0 border-r-0 
                cursor-pointer hover:bg-base-300 w-[170px] max-w-[130px] 
                min-h-21.5 h-21.5 break-words overflow-hidden p-2 align-top relative group`}
              onClick={() => onCellClick(day, slot, event, eventKey)}
            >
              {event ? (
                <div className="flex flex-col gap-1 p-1">
                  {/* Кнопка удаления */}
                  <button
                    className="absolute top-1 right-1 btn btn-error btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 min-h-0 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventDelete(eventKey);
                    }}
                    aria-label="Удалить событие"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g transform="rotate(45, 50, 50)">
                        <rect
                          x="45"
                          y="20"
                          width="10"
                          height="60"
                          fill="white"
                        />
                        <rect
                          x="20"
                          y="45"
                          width="60"
                          height="10"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </button>

                  <div className="text-balance text-gray-600 line-clamp-3 min-h-[60px] font-stretch-50% font-medium">
                    {event.lesson_name}
                  </div>
                </div>
              ) : (
                <div className="min-h-[68px] p-1"></div>
              )}
              {event && (
                <div className="relative w-full h-2 mt-5">
                  <div className="text-gray-500 btn btn-xs absolute bottom-0 left-0 hover:bg-base-200 hover:border-base-300 cursor-default">
                    {event.place}
                  </div>
                  <div className="text-gray-500 btn btn-xs btn-circle absolute bottom-0 right-0 hover:bg-base-200 hover:border-base-300 cursor-default">
                    {event.lesson_type}
                  </div>
                </div>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="border rounded-box border-base-content/15 bg-base-100">
      <table className="table max-w-full w-full overflow-hidden">
        <thead className="">
          <tr>
            <th className="w-20 bg-base-200">Время</th>
            {getJSXWeekDays(days)}
          </tr>
        </thead>
        <tbody>{getJSXTableCels(timeSlots)}</tbody>
      </table>
    </div>
  );
}
