import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
function AppointmentCard({ item }) {
  console.log(item.detials.phone);
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
        {/* <span className="appointment--card--age">
          {item.detials.age < 10 ? `0${item.detials.age}` : item.detials.age}{" "}
        </span> */}
        {/* <span className="appointment--card--gender">{item.detials.gender}</span> */}
        <span className="appointment--card--date">
          {monthName.substring(0, 3)} {day >= 10 ? day : `0${day}`}
        </span>
        <span className="request--card--time">{displayTime}</span>
      </div>
      <span className="appointment--card--time">{item.detials.phone}</span>
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
      .then((data) => {
        // setConfirmed(data.reverse())
        setConfirmed(data);
      });
  }
  const renderCustomInput = ({ ref }) => (
    <label className="date_filter_input" ref={ref}>
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          selectedDay
            ? "date_filter_input_icon activated"
            : "date_filter_input_icon"
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
    setConfirmed(filteredData);
  };
  useEffect(() => {
    confirmedFilter();
  }, [filteredDay]);
  useEffect(() => {
    confirmedFilter();
  }, [confirmedData, searchText]);
  // useEffect(() => {
  //   if (confirmed.length) {
  //     let sortedAppt = confirmed.sort(
  //       (a, b) => new Date(b.appointmentSlot) - new Date(a.appointmentSlot)
  //     );
  //     setConfirmed(sortedAppt);
  //     console.log(sortedAppt);
  //   }
  // }, [confirmed]);
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
            Reset
          </p>
        )}
      </div>
      <div className="appointments--body">
        {confirmed
          .sort(
            (a, b) => new Date(b.appointmentSlot) - new Date(a.appointmentSlot)
          )
          .map((item) => (
            <AppointmentCard change={change} key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default Appointments;
