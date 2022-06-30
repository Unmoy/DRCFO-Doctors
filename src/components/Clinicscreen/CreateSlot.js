import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateSlot = () => {
  const { id } = useParams();
  const [fromdayTime, setFromDayTime] = useState("AM");
  const [todayTime, setToDayTime] = useState("AM");
  const [timefrom, setTimeFrom] = useState("10:00");
  const [timeto, setTimeTo] = useState("12:00");
  const [weekdays, setWeekdays] = useState({ days: [] });
  const [slotsCount, setSlotsCount] = useState("");
  const navigate = useNavigate();
  const getStartTime = (e) => {
    var ts = e.target.value;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h;
    ts = h + ts.substr(2, 3);
    setTimeFrom(ts);
    console.log(ts);
  };
  const getEndTime = (e) => {
    var ts = e.target.value;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h;
    ts = h + ts.substr(2, 3);
    setTimeTo(ts);
    console.log(ts);
  };

  const handlefromdayTimeChange = (e) => {
    const fromdayTimevalue = e.currentTarget.value;
    setFromDayTime(fromdayTimevalue);
  };
  const handletodayTimeChange = (e) => {
    const todayTimevalue = e.currentTarget.value;
    setToDayTime(todayTimevalue);
  };

  const handleweekdays = (e) => {
    const { value, checked } = e.target;
    const { days } = weekdays;
    if (checked) {
      setWeekdays({
        days: [...days, value],
      });
    } else {
      setWeekdays({
        days: days.filter((e) => e !== value),
      });
    }
  };

  const getSlotsCount = (e) => {
    setSlotsCount(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const from = { timefrom, fromdayTime };
    const to = { timeto, todayTime };
    const appointment = {
      ...weekdays,
      from: from,
      to: to,
      patients: slotsCount,
    };

    const slots = { clinicId: id, slot: appointment };
    console.log(slots);
    await fetch("https://reservefree-backend.herokuapp.com/add/slot", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slots),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(-1);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          id="slots_collector"
          className="availability_form container d-flex justify-content-center flex-column"
        >
          <h1>Availablity</h1>
          <p>It’s going to take only few minutes</p>
          <h4 className="mb-2">Create Slot</h4>
          <div className="availability_box d-flex justify-content-center">
            <div className="w-75 d-flex justify-content-evenly">
              <div className="time_slot">
                <>
                  <label htmlFor="timefrom" className="timefrom">
                    From*
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    className="without_ampm"
                    defaultValue={timefrom}
                    onChange={getStartTime}
                    required
                  />
                </>

                <input
                  id="toggle-on-left"
                  className="toggle toggle-left"
                  value="AM"
                  type="radio"
                  onChange={handlefromdayTimeChange}
                  checked={fromdayTime === "AM"}
                />
                <label htmlFor="toggle-on-left" className="daytime_label">
                  AM
                </label>
                <input
                  id="toggle-off-right"
                  className="toggle toggle-right"
                  value="PM"
                  type="radio"
                  onChange={handlefromdayTimeChange}
                  checked={fromdayTime === "PM"}
                  required
                />
                <label htmlFor="toggle-off-right" className="daytime_label">
                  PM
                </label>
              </div>
              <div className="time_slot">
                <label htmlFor="timeto" className="timefrom">
                  To*
                </label>
                <input
                  type="time"
                  name="endTime"
                  className="without_ampm"
                  defaultValue={timeto}
                  onChange={getEndTime}
                  required
                />

                <input
                  id="toggle-on"
                  className="toggle toggle-left"
                  value="AM"
                  type="radio"
                  onChange={handletodayTimeChange}
                  checked={todayTime === "AM"}
                />
                <label htmlFor="toggle-on" className="daytime_label">
                  AM
                </label>
                <input
                  id="toggle-off"
                  className="toggle toggle-right"
                  value="PM"
                  type="radio"
                  onChange={handletodayTimeChange}
                  checked={todayTime === "PM"}
                />
                <label htmlFor="toggle-off" className="daytime_label">
                  PM
                </label>
              </div>
            </div>
          </div>
          <h4 className="mb-3 mt-3 date_select_heading">Select Days</h4>
          <div className="d-flex justify-content-center">
            <div className="weekDays-selector">
              <input
                type="checkbox"
                id="weekday-mon"
                className="weekday"
                onChange={handleweekdays}
                value="Monday"
              />
              <label htmlFor="weekday-mon" className="weekdays_label">
                Mon
              </label>
              <input
                type="checkbox"
                id="weekday-tue"
                className="weekday"
                onChange={handleweekdays}
                value="Tuesday"
              />
              <label htmlFor="weekday-tue" className="weekdays_label">
                Tue
              </label>
              <input
                type="checkbox"
                id="weekday-wed"
                className="weekday"
                onChange={handleweekdays}
                value="Wednesday"
              />
              <label htmlFor="weekday-wed" className="weekdays_label">
                Wed
              </label>
              <input
                type="checkbox"
                id="weekday-thu"
                className="weekday"
                onChange={handleweekdays}
                value="Thursday"
              />
              <label htmlFor="weekday-thu" className="weekdays_label">
                Thu
              </label>
              <input
                type="checkbox"
                id="weekday-fri"
                className="weekday"
                onChange={handleweekdays}
                value="Friday"
              />
              <label htmlFor="weekday-fri" className="weekdays_label">
                Fri
              </label>
              <input
                type="checkbox"
                id="weekday-sat"
                className="weekday"
                onChange={handleweekdays}
                value="Saturday"
              />
              <label htmlFor="weekday-sat" className="weekdays_label">
                Sat
              </label>
              <input
                type="checkbox"
                id="weekday-sun"
                className="weekday"
                onChange={handleweekdays}
                value="Sunday"
              />
              <label htmlFor="weekday-sun" className="weekdays_label">
                Sun
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center flex-column ">
            <h3 className="slot_num_header">
              How many Appointment do you want in the above slot?
            </h3>
            <div className="d-flex justify-content-center">
              <input
                className="slots_num"
                type="number"
                placeholder="Enter the number of appointment (eg. 20)"
                onChange={getSlotsCount}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button className="create_slot_btn" onSubmit={handleSubmit}>
              Create Slot
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSlot;
