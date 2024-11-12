            
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useState } from 'react';
import './Calendar.css'; // create this file for styling

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInCurrentMonth = daysInMonth(month, year);
    const firstDayOfMonth = startDayOfMonth(month, year);

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
    }
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const isToday =
        day === currentDate.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push(
        <div
          className={`calendar-day ${isToday ? 'today' : ''}`}
          key={day}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <header>
        <button onClick={() => changeMonth(-1)}>
        <FaChevronLeft />
            </button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>
        <FaChevronRight/>
        </button>
      </header>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div className="calendar-day-name" key={day}>
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
