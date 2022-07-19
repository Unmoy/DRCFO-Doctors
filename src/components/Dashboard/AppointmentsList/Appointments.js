import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import RippleButton from "../../Shared/RippleButton";
function AppointmentCard({ item }) {
  // console.log(item.booking);
  const date = new Date(item.appointmentSlot);
  var gsDayNames = [
    " ",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  var monthName = gsDayNames[month];
  const year = date.getFullYear();
  // console.log(day, monthName, year);
  const navigate = useNavigate();
  const handlePrescriptions = () => {
    navigate(`/prescription/${item._id}`);
  };
  const initials = item.detials.name.charAt(0).toUpperCase();
  const displayTime =
    item.slot.time.substring(0, 8) + " - " + item.slot.time.substring(9, 17);
  return (
    <div className="appointment--card">
      <div className="appointment--card--profile">{initials}</div>
      <div className="appointment--card--detials">
        <span className="appointment--card--name" id="fixed">
          {item.detials.name}
        </span>
        <span className="appointment--card--age">{item.detials.age} </span>
        <span className="appointment--card--gender">{item.detials.gender}</span>
        <span className="appointment--card--date">
          {day > 10 ? day : `0${day}`} {monthName.substring(0, 3)}
        </span>
      </div>
      <span className="appointment--card--time">{displayTime}</span>
      {item?.booking === "Walk-in" ? (
        <span className="appointment--card--location_walkin">
          {item?.booking}
        </span>
      ) : (
        <span className="appointment--card--location">{item?.booking}</span>
      )}

      <div className="appointments--card--buttons">
        <div className="appointments--card-button--group">
          <button
            className="appointments--card--button accept"
            onClick={handlePrescriptions}
          >
            Diagnose
          </button>
        </div>
      </div>
    </div>
  );
}
function Appointments({ change, searchText }) {
  const [confirmed, setConfirmed] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredDay, setFilteredDay] = useState("");
  const [confirmedData, setFilterConfirmedData] = useState([]);
  // console.log(confirmed);
  const id = localStorage.getItem("doctor_id");
  var gsDayNames = [
    " ",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    if (selectedDay) {
      const date = selectedDay;
      const day = date?.day;
      const year = date?.year;
      var monthName = gsDayNames[date?.month];
      const newSelectedDay = `${monthName}${day},${year}`;
      setFilteredDay(newSelectedDay);
    }
  }, [selectedDay]);
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=CONFIRMED&status=YET_TO_VISIT`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // let sorted = data.sort((a, b) => {
        //   return new Date(a.appointmentSlot) > new Date(b.appointmentSlot)
        //     ? 1
        //     : -1;
        // });

        // console.log("Sorted", sorted);
        setConfirmed(data);
        setFilterConfirmedData(data);
      });
  }, [id]);

  if (change === "true") {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=CONFIRMED&status=YET_TO_VISIT`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setConfirmed(data.reverse()));
  }
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
          selectedDay
            ? "date_filter_input_icon activated"
            : "date_filter_input_icon"
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
        className="date_filter_input_input"
        style={{
          color: "red",
          textAlign: "right",
          padding: "10px",
          fontSize: "15px",
          fontWeight: "600",
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
    setFilteredDay("");
    setSelectedDay(null);
  };
  const confirmedFilter = () => {
    const filteredData = confirmedData.filter((val) => {
      if (
        (val.slot.date === filteredDay || !filteredDay) &&
        (!searchText ||
          val.detials.phone
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          val.detials.name
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()))
      ) {
        return val;
      }
    });
    setConfirmed(filteredData.reverse());
  };
  useEffect(() => {
    confirmedFilter();
  }, [filteredDay]);
  useEffect(() => {
    confirmedFilter();
  }, [confirmedData, searchText]);
  return (
    <div className="appointments--container">
      <div className="appointments--header">
        <span className="appointments--title">
          Appointments ({confirmed.length})
        </span>
        <span className="appointments--viewall">
          <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            wrapperClassName="wrappar_class"
            calendarClassName="responsive-calendar"
            renderInput={renderCustomInput}
          />
        </span>
        {selectedDay && (
          <p className="reset_btn" onClick={reset}>
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="reset_svg"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg> */}
            Reset
          </p>
        )}
      </div>
      <div className="appointments--body">
        {confirmed.map((item) => (
          <AppointmentCard change={change} key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Appointments;
