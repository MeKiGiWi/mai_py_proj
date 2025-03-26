import axios from 'axios';

export default async function getWeeksRange() {
  try {
    const response = await axios.get('http://localhost:8000/api/weeks-range/');
    const start_date = response.data[0];
    const end_date = response.data[1];
    
    // Get Monday date for start_date
    const start = new Date(start_date);
    const startMonday = new Date(start);
    startMonday.setDate(start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1));
    const finalStartDate = startMonday.toISOString().split('T')[0];

    // Get Monday date for end_date  
    const end = new Date(end_date);
    const endMonday = new Date(end);
    endMonday.setDate(end.getDate() - end.getDay() + (end.getDay() === 0 ? -6 : 1));
    const finalEndDate = endMonday.toISOString().split('T')[0];

    let weeks = [];
    for (let i = 0; i <= (new Date(finalEndDate) - new Date(finalStartDate)) / (7 * 24 * 60 * 60 * 1000); i++) {
      weeks.push(new Date(new Date(finalStartDate).getTime() + i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    }
    return weeks;
  } catch (error) {
    console.error('Error fetching weeks range:', error);
    return [];
  }
}
