import React, { useEffect, useState } from "react";
import "./Notification.css";
import SubNotificationCard from "./SubNotificationCard";

const Notification = ({ item, setSearchId }) => {
  console.log(item);
  const today = new Date();
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const isToday = item.date == today.toDateString();
  const isYesterday = yesterday.toDateString() == item.date;

  return (
    <div>
      <div className="date_header">
        {isToday ? "Today" : isYesterday ? "Yesterday" : item.date}
      </div>
      {item &&
        item?.data.map((note, index) => (
          <SubNotificationCard
            note={note}
            key={index}
            setSearchId={setSearchId}
          />
        ))}
    </div>
  );
};

export default Notification;
