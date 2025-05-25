import api from '../interceptors/api';
import { startOfWeek, addWeeks, parseISO } from 'date-fns';

export default async function getWeeksRange(): Promise<Date[]> {
  try {
    const response = await api.get('metrics/?type=week-range');
    const startDate = parseISO(response.data[0]);
    const endDate = parseISO(response.data[1]);

    // Получение дат понедельника для начальной и конечной дат
    const startMonday = startOfWeek(startDate, { weekStartsOn: 1 });
    const endMonday = startOfWeek(endDate, { weekStartsOn: 1 });

    // Рассчитать количество недель между датами
    const weeks: Date[] = [];
    let currentDate = startMonday;

    while (currentDate <= endMonday) {
      weeks.push(currentDate);
      currentDate = addWeeks(currentDate, 1);
    }

    return weeks;
  } catch (error) {
    console.error('Error fetching weeks range:', error);
    return [];
  }
}
