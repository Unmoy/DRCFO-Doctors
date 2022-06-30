import React from "react";
import { useNavigate } from "react-router-dom";
const SlotBox = ({ item, clinicId }) => {
  console.log(item, clinicId);
  const navigate = useNavigate();
  const handleClick = () => {
    const url = `/updatedashboardslots/${clinicId}/${item._id}`;
    navigate(url);
  };
  return (
    <div className="appt_card">
      <div className=" d-flex justify-content-between">
        <h6 className="appt_time">
          {item.from.timefrom} {item.from.fromdayTime} -{item.to.timeto}{" "}
          {item.to.todayTime}
        </h6>
        <div>
          <button onClick={handleClick}>Edit</button>
        </div>
      </div>
      <div className="appt_days">
        <ul>
          {item.days.map((day) => (
            <li>{day.substring(0, 3)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlotBox;
