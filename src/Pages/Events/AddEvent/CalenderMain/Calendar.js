import React, { useState, useEffect } from 'react'
import './CalendarStyle.css'
import CalendarHeader from './CalendarHeader';
import Day from './Day';
import NewEventModal from './NewEventModal';
import DeleteEventModal from './DeleteEventModal';
import { EVENTS } from '../../../../endpoint';
import axios from 'axios';

const Calendar = () => {
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState([]);

  const eventForDate = date => events.find(e => e.date === date);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('token'));
    axios.get(EVENTS, { headers: { "Authorization": `Bearer ${user}` } }).then(res => {
      setEvents(res.data);
      console.log(res.data)
    })

    const eventForDate = date => events.find(e => e.date === date);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dt = new Date();
    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const dayInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('UTC', {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setDateDisplay(`${dt.toLocaleDateString('UTC', { month: 'long' })} ${year}`)
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    const daysArr = [];

    for (let i = 1; i <= paddingDays + dayInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }
    setDays(daysArr);
  }, [events, nav])

  return (
    <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>

      </div>
      {
        clicked &&
        !eventForDate(clicked) &&
        <>

          <NewEventModal
            onClose={() => setClicked(null)}
            onSave={() => setClicked(null)}
            eDate={clicked}
          />

        </>
      }


      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal/>
      }
    </>
  )
}
export default Calendar
