import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import "./ClinicCard.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const label = { inputProps: { "aria-label": "Switch demo" } };

const ClinicCard = ({ item, doctorInfo }) => {
  const [active, setActive] = useState(item.active);
  const [selectedDay, setSelectedDay] = useState([]);
  const [disabledDay, setDisabledDay] = useState([]);
  const [dates, setDates] = useState([]);
  const [array, setArray] = useState([]);
  console.log(dates);
  const navigate = useNavigate();
  const viewDetails = () => {
    navigate(`/dashboard/tabs/${item._id}`);
  };
  const handlevalue = (e) => {
    console.log(e.target.checked);
    setActive(e.target.checked);
  };
  useEffect(() => {
    fetch("https://reservefree-backend.herokuapp.com/update/clinic", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id,
        active: active,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [active, item._id]);

  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/clinic/dates?clinicId=${item._id}&month=06&year=2022&state=inactive`
    )
      .then((response) => response.json())
      .then((data) => {
        setDisabledDay(data);
      });
  }, [item._id]);
  useEffect(() => {
    let array = disabledDay;
    // console.log(disabledDay);
    let newArray = array.map((a) => ({
      year: parseInt(a.substring(0, 4)),
      month: parseInt(a.substring(5, 7)),
      day: parseInt(a.substring(8, 10)),
    }));
    setArray(newArray);
    // console.log(newArray);
  }, [disabledDay]);
  useEffect(() => {
    const newDay = selectedDay;
    var a = [];
    newDay.map((date) => {
      const day = date.day;
      const month = date.month;
      const year = date.year;
      const newString = `${year}-${month > 10 ? month : `0${month}`}-${
        day > 10 ? day : `0${day}`
      }`;
      a.push(newString);
      setDates(a);
    });
  }, [selectedDay]);
  const handleDisable = () => {
    fetch("https://reservefree-backend.herokuapp.com/update/clinic", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id,
        inactiveDates: dates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="clinic_box">
      <div className="clinic_box_header">
        <div>
          <h1>{item.name}</h1>
          <p>
            <span>{doctorInfo.speciality}</span>
          </p>
          <h6>{doctorInfo.experience} years experience overall</h6>
        </div>
        <div>
          <Switch
            checked={active === false ? false : true}
            {...label}
            color="success"
            onChange={handlevalue}
          />
        </div>
      </div>
      <div className="clinic_box_details">
        <div className="clinic_box_detail_col_1">
          <h5>Full name</h5>
          <p>{doctorInfo.name}</p>
          <h5>Phone Number*</h5>
          <p>{doctorInfo.phone}</p>
        </div>
        <div>
          <h5>Address</h5>
          <p className="address">
            {item.street}, {item.area}, {item.city}, {item.pincode},{" "}
            {item.state}
          </p>
          <h4>Get direction</h4>
        </div>
      </div>
      <div className=" d-flex justify-content-end">
        <button className="details_view_cta" onClick={viewDetails}>
          View Details
        </button>
        <div>
          <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a date"
            inputClassName="my-custom-input"
            shouldHighlightWeekends
            disabledDays={array} // here we pass them
          />
          <button onClick={handleDisable}>Disable</button>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
