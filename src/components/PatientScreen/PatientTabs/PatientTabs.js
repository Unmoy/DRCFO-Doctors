import React, { useEffect, useState } from "react";
import AppointmentCompletedCard from "../AppointmentCompletedCard";
import ConfirmedScreen from "../ConfirmedScreen";
import "./PatientTabs.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
const PatientTabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [confirmed, setConfirmed] = useState([]);
  console.log(confirmed.length);
  const [confirmedData, setConfirmedData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [confirmedFilterData, setConfirmedFilterData] = useState([]);
  console.log(confirmedFilterData.length);
  const [selectedDay, setSelectedDay] = useState({
    from: null,
    to: null,
  });
  const [bookingfilterday, setBookingFilterDay] = useState({
    from: null,
    to: null,
  });
  const [datefrom, setDateFrom] = useState("");
  const [dateto, setDateTo] = useState("");
  const [bookingdatefrom, setbookingDateFrom] = useState("");
  const [bookingdateto, setbookingDateTo] = useState("");

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const id = localStorage.getItem("doctor_id");
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
  const renderCustomInput = ({ ref }) => (
    <label className="date_filter_input" ref={ref}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        className={
          (selectedDay.from && selectedDay.to) ||
          (bookingfilterday.from && bookingfilterday.to)
            ? "booking_filter_icon activated"
            : "booking_filter_icon"
        }
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>

      <input
        readOnly
        ref={ref}
        className="tabs_date_filter_input"
        style={{
          outline: "none",
          border: "none",
          cursor: "pointer",
          marginRight: "20px",
          marginTop: "-10px",
        }}
      />
    </label>
  );
  const reset = () => {
    setBookingFilterDay({ from: null, to: null });
    setConfirmedFilterData(confirmed);
  };
  const appointmentreset = () => {
    setSelectedDay({ from: null, to: null });
    setFilterData(confirmedData);
  };

  useEffect(() => {
    if (selectedDay.from && selectedDay.to) {
      // console.log("from", selectedDay.from);
      // console.log("to", selectedDay.to);
      // 2022-07-28
      const from = `${selectedDay?.from?.year}-${
        selectedDay?.from?.month > 10
          ? selectedDay?.from?.month
          : `0${selectedDay?.from?.month}`
      }-${selectedDay?.from?.day}`;
      const dateto = `${selectedDay?.to?.year}-${
        selectedDay?.to?.month > 10
          ? selectedDay?.to?.month
          : `0${selectedDay?.to?.month}`
      }-${selectedDay?.to?.day}`;
      // setFilteredDay(from);
      // console.log(from);
      // console.log(dateto);
      setDateTo(dateto);
      setDateFrom(from);
    }
  }, [selectedDay]);
  useEffect(() => {
    if (bookingfilterday.from && bookingfilterday.to) {
      const from = `${bookingfilterday?.from?.year}-${
        bookingfilterday?.from?.month > 10
          ? bookingfilterday?.from?.month
          : `0${bookingfilterday?.from?.month}`
      }-${bookingfilterday?.from?.day}`;
      const dateto = `${bookingfilterday?.to?.year}-${
        bookingfilterday?.to?.month > 10
          ? bookingfilterday?.to?.month
          : `0${bookingfilterday?.to?.month}`
      }-${bookingfilterday?.to?.day}`;
      setbookingDateTo(dateto);
      setbookingDateFrom(from);
    }
  }, [bookingfilterday]);
  const appointmentFilter = () => {
    const filteredData = confirmedData.filter((item) => {
      // console.log(dayjs(item.appointmentSlot));
      // console.log(dayjs(datefrom));
      // console.log(dayjs(dateto));
      // console.log(dateto);
      console.log(datefrom, dateto);
      const appointmentDate = new Date(item.appointmentSlot);
      const from = new Date(datefrom);
      const to = new Date(dateto);
      if (
        appointmentDate > from &&
        appointmentDate < to
        // dayjs(item.appointmentSlot).isAfter(dayjs(datefrom)) &&
        // dayjs(item.appointmentSlot).isBefore(dayjs(dateto))
      ) {
        return item;
      }
    });
    // console.log(filteredData);
    setFilterData(filteredData);
  };
  const bookingFilter = () => {
    const filteredData = confirmed.filter((item) => {
      const appointmentDate = new Date(item.appointmentSlot);
      const from = new Date(bookingdatefrom);
      const to = new Date(bookingdateto);
      if (appointmentDate > from && appointmentDate < to) {
        return item;
      }
    });
    setConfirmedFilterData(filteredData);
  };
  useEffect(() => {
    if (bookingdatefrom && bookingdateto) {
      bookingFilter();
    }
  }, [bookingdatefrom, bookingdateto]);
  useEffect(() => {
    if (datefrom && dateto) {
      appointmentFilter();
    }
  }, [datefrom, dateto]);
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
                {bookingfilterday.from && bookingfilterday.to && (
                  <p className="reset_btn_booking" onClick={reset}>
                    Reset
                  </p>
                )}
                <DatePicker
                  value={bookingfilterday}
                  onChange={setBookingFilterDay}
                  wrapperClassName="booking_class"
                  // calendarClassName="responsive-calendar"
                  renderInput={renderCustomInput}
                />
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
                {selectedDay.from && selectedDay.to && (
                  <p className="reset_btn_booking" onClick={appointmentreset}>
                    Reset
                  </p>
                )}
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  className="booking_class"
                  renderInput={renderCustomInput}
                />
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
