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
          <div className="tab_wrap">
            <div className="d-flex justify-content-end me-5 filter_wrapper">
              <div className="tabs_body ">
                {bookingstartDate && bookingendDate && (
                  <p className="patient_tab_reset_btn" onClick={reset}>
                    Reset
                  </p>
                )}
                <p onClick={() => setisOpen(!isopen)}>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={
                      !bookingstartDate && !bookingendDate
                        ? "legal_filter_input_icon"
                        : "legal_filter_input_icon activated"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg> */}
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      !bookingstartDate && !bookingendDate
                        ? "legal_filter_input_icon"
                        : "legal_filter_input_icon activated"
                    }
                  >
                    <path d="M20 18L25 9V21H6L5 18H20Z" fill="#545B74" />
                    <path
                      d="M25.3 2.00248V21.4592C25.129 21.7923 24.8874 22.0006 24.4775 22C18.0729 21.9961 11.6678 21.9941 5.26228 21.9941C4.75203 21.9941 4.45102 21.693 4.4497 21.1869C4.4497 20.5599 4.4497 19.9323 4.4497 19.3054V19.0611H4.14276C3.03205 19.0611 1.92068 19.0611 0.808642 19.0611C0.43437 19.0611 0.167033 18.8887 0.0515175 18.5837C-0.0639984 18.2787 0.0145524 17.9907 0.28915 17.7491C0.934203 17.1767 1.49028 16.5132 1.93938 15.78C3.62327 13.0886 4.36719 10.1262 4.44112 6.98619C4.47743 5.42335 4.44838 3.85855 4.45036 2.29441C4.45036 1.75692 4.74609 1.46564 5.29066 1.46564C6.41898 1.46564 7.54685 1.46564 8.67429 1.46564H8.94624C8.94624 1.22792 8.94624 1.02481 8.94624 0.8217C8.94624 0.329926 9.25319 -0.00445491 9.69413 0.000116702C10.1252 0.00403522 10.4248 0.334497 10.4281 0.811904C10.4281 1.02742 10.4281 1.24359 10.4281 1.45193H14.1339C14.1339 1.22792 14.1339 1.01763 14.1339 0.807985C14.1339 0.332538 14.4402 0.00142288 14.8719 0.000116702C15.3036 -0.00118947 15.6118 0.32666 15.6158 0.801454C15.6158 1.01828 15.6158 1.23445 15.6158 1.4467H19.3711C19.3711 1.20833 19.3678 0.989543 19.3711 0.769453C19.3777 0.329925 19.6839 0.00730066 20.0972 0.000116702C20.5104 -0.00706725 20.8444 0.31817 20.8523 0.7688C20.8563 0.994115 20.8523 1.22008 20.8523 1.4676H21.1414C22.1976 1.4676 23.2498 1.48262 24.3026 1.46042C24.7647 1.44866 25.102 1.57863 25.3 2.00248ZM23.8287 7.34538H5.92303C5.74876 11.0804 4.77117 14.5489 2.44171 17.5975H2.63973C8.30464 17.5975 13.9695 17.5954 19.6344 17.591C19.7601 17.5826 19.8785 17.53 19.9684 17.4428C20.6159 16.7807 21.1749 16.0393 21.6319 15.2366C22.6834 13.4282 23.3085 11.4762 23.6121 9.42024C23.7112 8.73646 23.756 8.04941 23.8287 7.34538ZM5.94019 5.8472H23.8056V2.94619H20.853C20.853 3.17085 20.853 3.38115 20.853 3.59144C20.849 4.06623 20.544 4.3967 20.1123 4.39735C19.6806 4.398 19.3744 4.06689 19.3711 3.5934C19.3711 3.37658 19.3711 3.1604 19.3711 2.95142H15.6151C15.6151 3.1911 15.6184 3.40858 15.6151 3.63063C15.6079 4.06885 15.299 4.39147 14.8851 4.39735C14.4712 4.40323 14.1412 4.07603 14.1346 3.62736C14.1313 3.40139 14.1346 3.17608 14.1346 2.94815H10.4275C10.4275 3.17542 10.4275 3.38637 10.4275 3.59732C10.4235 4.0695 10.1146 4.39996 9.68225 4.39735C9.24989 4.39474 8.94954 4.06362 8.94624 3.58752C8.94624 3.372 8.94624 3.15583 8.94624 2.94488H5.94151L5.94019 5.8472ZM23.8069 14.2224C23.7409 14.3569 23.7032 14.4333 23.6669 14.5104C22.9316 16.0706 22.0319 17.5192 20.7757 18.7313C20.6633 18.8435 20.5286 18.9315 20.3801 18.9896C20.2316 19.0477 20.0726 19.0747 19.913 19.0689C15.3518 19.062 10.7905 19.0602 6.22931 19.0637H5.94283V20.5175H23.8069V14.2224Z"
                      fill="#545B74"
                    />
                    <rect x="8" y="9" width="3" height="3" fill="#545B74" />
                    <rect x="13" y="9" width="3" height="3" fill="#545B74" />
                    <rect x="18" y="9" width="3" height="3" fill="#545B74" />
                    <rect x="13" y="14" width="3" height="3" fill="#545B74" />
                    <rect x="8" y="14" width="3" height="3" fill="#545B74" />
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
                {startDate && endDate && (
                  <p
                    className="patient_tab_reset_btn"
                    onClick={appointmentreset}
                  >
                    Reset
                  </p>
                )}
                <p onClick={() => setOpen(!open)}>
                  {/* <svg
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
                  </svg> */}
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 26 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      !startDate && !endDate
                        ? "legal_filter_input_icon patients_tabs_picker"
                        : "legal_filter_input_icon activated"
                    }
                  >
                    <path d="M20 18L25 9V21H6L5 18H20Z" fill="#212526" />
                    <path
                      d="M25.3 2.00248V21.4592C25.129 21.7923 24.8874 22.0006 24.4775 22C18.0729 21.9961 11.6678 21.9941 5.26228 21.9941C4.75203 21.9941 4.45102 21.693 4.4497 21.1869C4.4497 20.5599 4.4497 19.9323 4.4497 19.3054V19.0611H4.14276C3.03205 19.0611 1.92068 19.0611 0.808642 19.0611C0.43437 19.0611 0.167033 18.8887 0.0515175 18.5837C-0.0639984 18.2787 0.0145524 17.9907 0.28915 17.7491C0.934203 17.1767 1.49028 16.5132 1.93938 15.78C3.62327 13.0886 4.36719 10.1262 4.44112 6.98619C4.47743 5.42335 4.44838 3.85855 4.45036 2.29441C4.45036 1.75692 4.74609 1.46564 5.29066 1.46564C6.41898 1.46564 7.54685 1.46564 8.67429 1.46564H8.94624C8.94624 1.22792 8.94624 1.02481 8.94624 0.8217C8.94624 0.329926 9.25319 -0.00445491 9.69413 0.000116702C10.1252 0.00403522 10.4248 0.334497 10.4281 0.811904C10.4281 1.02742 10.4281 1.24359 10.4281 1.45193H14.1339C14.1339 1.22792 14.1339 1.01763 14.1339 0.807985C14.1339 0.332538 14.4402 0.00142288 14.8719 0.000116702C15.3036 -0.00118947 15.6118 0.32666 15.6158 0.801454C15.6158 1.01828 15.6158 1.23445 15.6158 1.4467H19.3711C19.3711 1.20833 19.3678 0.989543 19.3711 0.769453C19.3777 0.329925 19.6839 0.00730066 20.0972 0.000116702C20.5104 -0.00706725 20.8444 0.31817 20.8523 0.7688C20.8563 0.994115 20.8523 1.22008 20.8523 1.4676H21.1414C22.1976 1.4676 23.2498 1.48262 24.3026 1.46042C24.7647 1.44866 25.102 1.57863 25.3 2.00248ZM23.8287 7.34538H5.92303C5.74876 11.0804 4.77117 14.5489 2.44171 17.5975H2.63973C8.30464 17.5975 13.9695 17.5954 19.6344 17.591C19.7601 17.5826 19.8785 17.53 19.9684 17.4428C20.6159 16.7807 21.1749 16.0393 21.6319 15.2366C22.6834 13.4282 23.3085 11.4762 23.6121 9.42024C23.7112 8.73646 23.756 8.04941 23.8287 7.34538ZM5.94019 5.8472H23.8056V2.94619H20.853C20.853 3.17085 20.853 3.38115 20.853 3.59144C20.849 4.06623 20.544 4.3967 20.1123 4.39735C19.6806 4.398 19.3744 4.06689 19.3711 3.5934C19.3711 3.37658 19.3711 3.1604 19.3711 2.95142H15.6151C15.6151 3.1911 15.6184 3.40858 15.6151 3.63063C15.6079 4.06885 15.299 4.39147 14.8851 4.39735C14.4712 4.40323 14.1412 4.07603 14.1346 3.62736C14.1313 3.40139 14.1346 3.17608 14.1346 2.94815H10.4275C10.4275 3.17542 10.4275 3.38637 10.4275 3.59732C10.4235 4.0695 10.1146 4.39996 9.68225 4.39735C9.24989 4.39474 8.94954 4.06362 8.94624 3.58752C8.94624 3.372 8.94624 3.15583 8.94624 2.94488H5.94151L5.94019 5.8472ZM23.8069 14.2224C23.7409 14.3569 23.7032 14.4333 23.6669 14.5104C22.9316 16.0706 22.0319 17.5192 20.7757 18.7313C20.6633 18.8435 20.5286 18.9315 20.3801 18.9896C20.2316 19.0477 20.0726 19.0747 19.913 19.0689C15.3518 19.062 10.7905 19.0602 6.22931 19.0637H5.94283V20.5175H23.8069V14.2224Z"
                      fill="#545B74"
                    />
                    <rect x="8" y="9" width="3" height="3" fill="#545B74" />
                    <rect x="13" y="9" width="3" height="3" fill="#545B74" />
                    <rect x="18" y="9" width="3" height="3" fill="#545B74" />
                    <rect x="13" y="14" width="3" height="3" fill="#545B74" />
                    <rect x="8" y="14" width="3" height="3" fill="#545B74" />
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
