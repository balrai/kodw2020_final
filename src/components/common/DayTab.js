import React from "react";

export default function DayTab({ day, value, date, active, changeDay }) {
  return (
    <>
      <div
        className={active ? "activeDay" : "dayTab"}
        onClick={() => changeDay(value)}
      >
        <div className='day'>{day}</div>
        <div className='date'>{date}</div>
      </div>
    </>
  );
}
