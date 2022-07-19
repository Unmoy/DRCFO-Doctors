import "./Requests.css";
import accept from "../../../assets/images/accept.png";
import { useEffect, useState } from "react";

import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";

function RequestCard({ item, handleLoading }) {
  // console.log(item);
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
  const handleAction = (value) => {
    fetch("https://reservefree-backend.herokuapp.com/update/appointment", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id,
        confirmation: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    handleLoading("true");
  };

  const initials = item.detials.name.charAt(0).toUpperCase();
  return (
    <div className="request--card">
      <div className="request--card--profile">{initials}</div>
      <div className="request--card--detials">
        <span className="request--card--name">{item.detials.name}</span>
        <span className="request--card--age">{item.detials.age} </span>
        <span className="request--card--gender">{item.detials.gender}</span>
        <span className="request--card--date">
          {day > 10 ? day : `0${day}`} {monthName.substring(0, 3)}{" "}
        </span>
        &bull;
        <span className="request--card--time">{item.slot.time}</span>
      </div>
      <div className="requests--card--buttons">
        <div className="requests--card-button--group">
          <span
            className="requests--card--button decline"
            onClick={() => handleAction("CANCELLED")}
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L14.9996 14.9996"
                stroke="#194AF5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M15.0015 1L1.00187 14.9996"
                stroke="#194AF5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            className="requests--card--button accept"
            onClick={() => handleAction("CONFIRMED")}
          >
            <img src={accept} alt="" />
          </span>
        </div>
      </div>
    </div>
  );
}

function Requests({ handleLoading, change, searchText }) {
  const [pending, setPending] = useState([]);
  const [filterReqeuestData, setFilterReqeuestData] = useState([]);

  // console.log(pending);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredDay, setFilteredDay] = useState("");
  const [appointmentlength, setAppointmentLength] = useState("");
  // console.log(appointmentlength);

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
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=PENDING`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPending(data);
        setFilterReqeuestData(data);
      });
    let interval = setInterval(() => {
      fetch(
        `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=PENDING`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPending(data);
          setFilterReqeuestData(data);
        });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [id]);
  useEffect(() => {
    requestFilter();
  }, [filterReqeuestData, searchText]);
  if (change === "true") {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=PENDING`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPending(data);
      });
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
  const requestFilter = () => {
    const filteredData = filterReqeuestData.filter((val) => {
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
    setPending(filteredData);
  };
  useEffect(() => {
    requestFilter();
  }, [filteredDay, searchText]);

  return (
    <div className="requests--container">
      <div className="requests--header">
        <span className="requests--title">Requests ({pending.length})</span>
        <span className="requests--viewall">
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
            Reset
          </p>
        )}
      </div>
      <div className="requests--body">
        {pending.reverse().map((item) => (
          <RequestCard
            handleLoading={handleLoading}
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Requests;
