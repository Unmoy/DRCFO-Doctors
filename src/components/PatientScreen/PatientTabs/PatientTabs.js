import React, { useEffect, useState } from "react";
import AppointmentCompletedCard from "../AppointmentCompletedCard";
import ConfirmedScreen from "../ConfirmedScreen";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientTabs.css";
// import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
// import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const ClickOutHandler = require("react-onclickout");
const PatientTabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [confirmed, setConfirmed] = useState([]);
  console.log(confirmed.length);
  const [confirmedData, setConfirmedData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [confirmedFilterData, setConfirmedFilterData] = useState([]);
  console.log(confirmedFilterData.length);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingstartDate, setbookingStartDate] = useState(null);
  const [bookingendDate, setbookingEndDate] = useState(null);
  const id = localStorage.getItem("doctor_id");
  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=CONFIRMED&status=YET_TO_VISIT`
    )
      .then((response) => response.json())
      .then((data) => {
        setConfirmedFilterData(data);
        setConfirmed(data);
      });
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&status=COMPLETED`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFilterData(data);
        setConfirmedData(data);
      });
  }, [id]);

  const reset = () => {
    setbookingStartDate(null);
    setbookingEndDate(null);
    setConfirmedFilterData(confirmed);
  };
  const appointmentreset = () => {
    setStartDate(null);
    setEndDate(null);
    setFilterData(confirmedData);
  };

  const appointmentFilter = () => {
    const filteredData = confirmedData.filter((item) => {
      const appointmentDate = new Date(item.appointmentSlot);
      console.log(startDate, endDate);
      const from = new Date(startDate);
      const to = new Date(endDate);
      if (appointmentDate > from && appointmentDate < to) {
        return item;
      }
    });
    setFilterData(filteredData);
  };
  const bookingFilter = () => {
    const filteredData = confirmed.filter((item) => {
      const appointmentDate = new Date(item.appointmentSlot);
      const from = new Date(bookingstartDate);
      const to = new Date(bookingendDate);
      if (appointmentDate > from && appointmentDate < to) {
        return item;
      }
    });
    setConfirmedFilterData(filteredData);
  };
  useEffect(() => {
    if (bookingstartDate && bookingendDate) {
      bookingFilter();
    }
  }, [bookingstartDate, bookingendDate]);
  useEffect(() => {
    if (startDate && endDate) {
      appointmentFilter();
    }
  }, [startDate, endDate]);

  const [open, setOpen] = useState(false);
  const [isopen, setisOpen] = useState(false);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const onbookingChange = (dates) => {
    const [start, end] = dates;
    setbookingStartDate(start);
    setbookingEndDate(end);
  };
  const clickOut = (e) => {
    setOpen(false);
  };
  const clickOutbooking = (e) => {
    setisOpen(false);
  };
  return (
    <div className="patient_tab_container">
      <div className="patients_tab_header">
        <button
          className={
            toggleState === 1 ? "patients_tabs active-tabs" : "patients_tabs"
          }
          onClick={() => toggleTab(1)}
        >
          Booking Confirmed
        </button>
        <button
          className={
            toggleState === 2 ? "patients_tabs active-tabs" : "patients_tabs"
          }
          onClick={() => toggleTab(2)}
        >
          No Show
        </button>
        <button
          className={
            toggleState === 3 ? "patients_tabs active-tabs" : "patients_tabs"
          }
          onClick={() => toggleTab(3)}
        >
          Appointment Completed
        </button>
      </div>
      <div className="">
        <div
          className={
            toggleState === 1
              ? "patient_content_tab  active-clinic_content"
              : "patient_content_tab"
          }
        >
          <div className="">
            <div className="d-flex justify-content-end me-5 filter_wrapper">
              <div className="tabs_body">
                {bookingstartDate && bookingendDate && (
                  <p className="legal_reset_btn" onClick={reset}>
                    Reset
                  </p>
                )}
                <p onClick={() => setisOpen(!isopen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      !bookingstartDate && !bookingendDate
                        ? "legal_filter_input_icon patients_tabs_picker"
                        : "legal_filter_input_icon activated"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </p>

                {isopen && (
                  <ClickOutHandler onClickOut={clickOutbooking}>
                    <DatePicker
                      selected={bookingstartDate}
                      onChange={onbookingChange}
                      startDate={bookingstartDate}
                      endDate={bookingendDate}
                      selectsRange
                      inline
                      calendarClassName="calender_range"
                    />
                  </ClickOutHandler>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap confirmed_wrapper">
              {confirmedFilterData.map((item, index) => (
                <ConfirmedScreen item={item} key={index} />
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            toggleState === 2
              ? "patient_content_tab  active-clinic_content"
              : "patient_content_tab"
          }
        >
          <div>
            <div className="d-flex flex-wrap justify-content-center align-items-center noShows_text">
              No Data Available
            </div>
          </div>
        </div>
        <div
          className={
            toggleState === 3
              ? "patient_content_tab  active-clinic_content"
              : "patient_content_tab"
          }
        >
          <div>
            <div className="d-flex justify-content-end me-5 filter_wrapper">
              <div className="tabs_body">
                {/* {selectedDay.from && selectedDay.to && (
                  <p className="reset_btn_booking" onClick={appointmentreset}>
                    Reset
                  </p>
                )}
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  className="booking_class"
                  renderInput={renderCustomInput}
                /> */}
                {startDate && endDate && (
                  <p className="legal_reset_btn" onClick={appointmentreset}>
                    Reset
                  </p>
                )}
                <p onClick={() => setOpen(!open)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      !startDate && !endDate
                        ? "legal_filter_input_icon patients_tabs_picker"
                        : "legal_filter_input_icon activated"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </p>

                {open && (
                  <ClickOutHandler onClickOut={clickOut}>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      calendarClassName="calender_range"
                    />
                  </ClickOutHandler>
                )}
              </div>
            </div>
            <div className="d-flex flex-wrap">
              {filterData.map((item, index) => (
                <AppointmentCompletedCard item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTabs;
