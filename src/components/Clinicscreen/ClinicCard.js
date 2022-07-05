import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import "./ClinicCard.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const label = { inputProps: { "aria-label": "Switch demo" } };
const ClickOutHandler = require("react-onclickout");
const ClinicCard = ({ item, doctorInfo }) => {
  const [active, setActive] = useState(item.active);
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedEnableDay, setSelectedEnableDay] = useState([]);
  const [disabledDay, setDisabledDay] = useState([]);
  // console.log(disabledDay);
  const [enabledDay, setEnabledDay] = useState([]);
  // console.log(enabledDay);

  const [dates, setDates] = useState([]);
  const [enableddates, setEnabledDates] = useState([]);
  // console.log(enableddates);
  const [array, setArray] = useState([]);
  const [enabledarray, setEnabledArray] = useState([]);
  // console.log(dates);
  const navigate = useNavigate();
  const viewDetails = () => {
    navigate(`/dashboard/tabs/${item._id}`);
  };
  const handlevalue = (e) => {
    console.log(e.target.checked);
    setActive(e.target.checked);
  };
  // useEffect(() => {
  //   fetch("https://reservefree-backend.herokuapp.com/update/clinic", {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: item._id,
  //       active: active,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, [active, item._id]);

  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/clinic/dates?clinicId=${item._id}&month=07&year=2022&state=inactive`
    )
      .then((response) => response.json())
      .then((data) => {
        setDisabledDay(data);
      });
    fetch(
      `https://reservefree-backend.herokuapp.com/get/clinic/dates?clinicId=${item._id}&month=07&year=2022&state=active`
    )
      .then((response) => response.json())
      .then((data) => {
        setEnabledDay(data);
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
  }, [disabledDay]);
  useEffect(() => {
    let enablearray = enabledDay;
    // console.log(disabledDay);
    let newArray = enablearray.map((a) => ({
      year: parseInt(a.substring(0, 4)),
      month: parseInt(a.substring(5, 7)),
      day: parseInt(a.substring(8, 10)),
    }));
    setEnabledArray(newArray);
    // console.log(newArray);
  }, [enabledDay]);
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
  useEffect(() => {
    const newDay = selectedEnableDay;
    var a = [];
    newDay.map((date) => {
      const day = date.day;
      const month = date.month;
      const year = date.year;
      const newString = `${year}-${month > 10 ? month : `0${month}`}-${
        day > 10 ? day : `0${day}`
      }`;
      a.push(newString);
      setEnabledDates(a);
    });
  }, [selectedEnableDay]);
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
  const handleEnable = () => {
    console.log(enableddates);
    fetch("https://reservefree-backend.herokuapp.com/update/clinic", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id,
        activeDates: enableddates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const disabledateInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="Disable Dates"
      style={{
        fontSize: "15px",
        outline: "none",
        border: "none",
        background: "none",
        cursor: "pointer",
      }}
    />
  );
  const enabledateInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="Enable Dates"
      style={{
        fontSize: "15px",
        outline: "none",
        border: "none",
        background: "none",
        cursor: "pointer",
        margin: "0 0px",
      }}
      className="my-custom-input-class" // a styling class
    />
  );
  const [open, setOpen] = useState(false);

  const clickOut = (e) => {
    setOpen(false);
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
        <div className="dates_dropdown_container">
          {/* <Switch
            checked={active === false ? false : true}
            {...label}
            color="success"
            onChange={handlevalue}
          /> */}
          <ClickOutHandler onClickOut={clickOut}>
            <div className="dates_dropdown">
              <p
                className="btn btn-primary dropdown-toggle dates_drop_btn"
                onClick={() => setOpen(!open)}
              >
                Manage Availablity
              </p>
              {open && (
                <ul className="date_ul">
                  <li>
                    <DatePicker
                      value={selectedEnableDay}
                      onChange={setSelectedEnableDay}
                      shouldHighlightWeekends
                      disabledDays={enabledarray}
                      renderInput={enabledateInput}
                      renderFooter={() => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "0rem 2rem",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleEnable();
                              setOpen(false);
                            }}
                            style={{
                              border: "none",
                              borderRadius: "5px",
                              padding: "0.5rem 2rem",
                              background: "#e6ebff",
                              fontSize: "16px",
                              marginTop: "-30px",
                              marginBottom: "20px",
                              color: "#194af5",
                            }}
                          >
                            Enable
                          </button>
                        </div>
                      )}
                    />
                  </li>
                  <li>
                    <DatePicker
                      value={selectedDay}
                      onChange={setSelectedDay}
                      shouldHighlightWeekends
                      disabledDays={array}
                      renderInput={disabledateInput}
                      renderFooter={() => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "0rem 2rem",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              handleDisable();
                              setOpen(false);
                            }}
                            style={{
                              border: "none",
                              borderRadius: "5px",
                              padding: "0.5rem 2rem",
                              background: "#e6ebff",
                              fontSize: "16px",
                              marginTop: "-30px",
                              marginBottom: "20px",
                              color: "#194af5",
                            }}
                          >
                            Disable
                          </button>
                        </div>
                      )}
                    />
                  </li>
                </ul>
              )}
            </div>
          </ClickOutHandler>
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
          {/* <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a date"
            inputClassName="my-custom-input"
            shouldHighlightWeekends
            disabledDays={array} // here we pass them
          />
          <button onClick={handleDisable}>Disable</button> */}
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
