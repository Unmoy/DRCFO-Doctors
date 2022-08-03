import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const SubNotificationCard = ({ note, setSearchId, setOpen }) => {
  const [notifications, setNotifications] = useState({});
  // console.log(note.created);
  const date = new Date(note.created);
  const time = date.toLocaleTimeString(navigator, {
    hour: "2-digit",
    minute: "2-digit",
  });
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointment?appointmentId=${note.info.appointmentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNotifications(data);
          // console.log(data.patientId);
        }
      });
  }, [note.info.appointmentId]);
  const initials = notifications?.detials?.name.charAt(0).toUpperCase();
  const sendPatientId = (value) => {
    setSearchId(value);
    setOpen(false);
  };
  return (
    <div
      className={
        note.status == "Notified"
          ? "notification_card new_notifier"
          : "notification_card"
      }
    >
      {notifications?.detials?.name ? (
        <div
          className="d-flex"
          onClick={() => sendPatientId(note.info.appointmentId)}
        >
          <div className="request--card--profile initials_box">{initials}</div>
          <h2 className="h2_wrao">
            <span className="booke_name">{notifications?.detials?.name}</span>{" "}
            scheduled a new appointment on {notifications?.slot?.date}
          </h2>
          <p className="notification_time">{time}</p>
        </div>
      ) : (
        <Skeleton animation="wave" />
      )}
    </div>
  );
};

export default SubNotificationCard;
