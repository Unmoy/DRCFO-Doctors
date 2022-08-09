import "./Requests.css";
import accept from "../../../assets/images/accept.png";
import { useEffect, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { useRef } from "react";
function RequestCard({ item, handleLoading, searchId }) {
  const [active, setActive] = useState(false);
  const myRef = useRef(null);
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

  useEffect(() => {
    if (searchId && searchId == item._id) {
      setActive(true);
      if (myRef.current) {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => {
        setActive(false);
      }, 3000);
    }
  }, [searchId, item._id]);
  const initials = item.detials.name.charAt(0).toUpperCase();
  return (
    <div
      ref={myRef}
      className={active ? "request--card selected" : "request--card"}
    >
      <div className="request--card--profile">{initials}</div>
      <div className="request--card--detials">
        <span className="request--card--name">{item.detials.name}</span>
        {/* <span className="request--card--age">
          {" "}
          {item.detials.age < 10
            ? `0${item.detials.age}`
            : item.detials.age}{" "}
        </span> */}
        {/* <span className="request--card--gender">{item.detials.gender}</span> */}
        <span className="request--card--date">
          {monthName.substring(0, 3)} {day >= 10 ? day : `0${day}`}
        </span>
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

function Requests({ handleLoading, change, searchText, searchId }) {
  const [pending, setPending] = useState([]);
  const [filterReqeuestData, setFilterReqeuestData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredDay, setFilteredDay] = useState("");
  const id = localStorage.getItem("doctor_id");
  // console.log(filterReqeuestData);
  // console.log(pending);

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
        setPending(data.reverse());
        setFilterReqeuestData(data);
      });
    if (!filteredDay || !searchId || selectedDay) {
      // console.log(filteredDay, searchId);
      let interval = setInterval(() => {
        console.log("found");
        fetch(
          `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=PENDING`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setPending(data.reverse());
            setFilterReqeuestData(data);
          });
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [id, filteredDay]);

  if (change === "true") {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=PENDING`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPending(data.reverse());
      });
  }

  const renderCustomInput = ({ ref }) => (
    <label className="date_filter_input" ref={ref}>
      {/* <img src={image} alt="" /> */}
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
  }, [filteredDay, searchText, filterReqeuestData]);

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
        {pending &&
          pending.map((item) => (
            <RequestCard
              handleLoading={handleLoading}
              key={item._id}
              item={item}
              searchId={searchId}
            />
          ))}
      </div>
    </div>
  );
}

export default Requests;
