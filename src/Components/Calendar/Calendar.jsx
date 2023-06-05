import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
    const events = [
      {
        title: 'Event 1',
        start: '2023-06-01',
        end: '2023-06-03'
      },
      {
        title: 'Event 2',
        start: '2023-06-05'
      },
    ];
  
    return (
      <div>
        <h1>Calendar</h1>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events}/>
      </div>
    );
  };
  
  export default Calendar;
  