import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const addEvent = () => {
    const newEvent = {
      date: date,
      title: 'New Event',
    };

    setEvents([...events, newEvent]);
  };

  const handleEventTitleChange = (index, event) => {
    const updatedEvents = [...events];
    updatedEvents[index].title = event.target.value;
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Calendar</h1>
      <div className="calendar-display">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <button onClick={addEvent}>Add Event</button>
      {events.map((event, index) => (
        <div key={index}>
          <p>
            <span className='bold'>Event Date:</span> {event.date.toDateString()} | <span className='bold'>Event Title:</span>
            <input
              type='text'
              value={event.title}
              onChange={(e) => handleEventTitleChange(index, e)}
            />
          </p>
        </div>
      ))}
    </div>
  );
}

export default CalendarPage;