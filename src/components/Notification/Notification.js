import React, { useEffect, useState } from "react";
import "./Notification.css";
import Skeleton from "@mui/material/Skeleton";
const Notification = ({ item, setSearchId }) => {
  // console.log(item);
  const date = new Date(item.created);
  const time = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(date);
  // var time =
  //   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  // const getCreatedMin = date.getMinutes();
  const now = new Date();
  const getNowMin = now.getTime();

  const constactsDtae = date && new Date(date);
  const [notifications, setNotifications] = useState({});

  // console.log(now, constactsDtae);
  // console.log(getCreatedMin, getNowMin);
  // const DataAge = Math.round(now - constactsDtae);
  // console.log(time);
  // var m = Math.floor((DataAge % 3600) / 60);
  // console.log(m);
  const initials = notifications?.detials?.name.charAt(0).toUpperCase();
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointment?appointmentId=${item.info.appointmentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNotifications(data);
          // console.log(data.patientId);
        }
      });
  }, [item.info.appointmentId]);
  const sendPatientId = (value) => {
    // localStorage.setItem("notification_id", value);
    setSearchId(value);
  };
  return (
    <div
      className={
        item.status == "Notified"
          ? "notification_card new_notifier"
          : "notification_card"
      }
    >
      {notifications?.detials?.name ? (
        <div
          className="d-flex"
          onClick={() => sendPatientId(item.info.appointmentId)}
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

export default Notification;
