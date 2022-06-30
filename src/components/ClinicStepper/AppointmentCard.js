import React from "react";
import "./AppointmentCard.css";
import { useNavigate } from "react-router-dom";
const AppointmentCard = ({ appointment }) => {
  console.log(appointment);
  const navigate = useNavigate();
  const handleClick = () => {
    const url = `/editslots/${appointment._id}`;
    navigate(url);
  };
  return (
    <div className="appt_card">
      <div className=" d-flex justify-content-between">
        <h6 className="appt_time">
          {appointment.from.timefrom} {appointment.from.fromdayTime} -
          {appointment.to.timeto} {appointment.to.todayTime}
        </h6>
        <div>
          <button onClick={handleClick}>Edit</button>
        </div>
      </div>
      <div className="appt_days">
        <ul>
          {appointment.days.map((day) => (
            <li>{day.substring(0, 3)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentCard;
