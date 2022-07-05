import React, { useEffect, useState } from "react";
import "./Notification.css";
import Skeleton from "@mui/material/Skeleton";
const Notification = ({ item }) => {
  const [notifications, setNotifications] = useState({});

  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointment?appointmentId=${item.info.appointmentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNotifications(data);
          console.log(data);
        }
      });
  }, [item.info.appointmentId]);
  return (
    <div className="notification_card">
      {notifications?.detials?.name ? (
        <h2>
          <span className="booke_name">{notifications?.detials?.name}</span>{" "}
          scheduled a new appointment on {notifications?.slot?.date}
        </h2>
      ) : (
        <Skeleton animation="wave" />
      )}
    </div>
  );
};

export default Notification;
