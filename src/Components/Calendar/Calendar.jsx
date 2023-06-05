import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Calendar</h1>
      <div>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default CalendarPage;