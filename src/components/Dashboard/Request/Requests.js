import "./Requests.css";
import accept from "../../../assets/images/accept.png";
import { useEffect, useState } from "react";
// import _ from "underscore";
// import { toast } from "react-toastify";
function RequestCard({ item, handleLoading }) {
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
        <span className="request--card--gender">{item.detials.gender} </span>
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
  const [data, setData] = useState([]);
  // console.log(pending);
  const id = localStorage.getItem("doctor_id");
  // const observer = () => {
  //   _.observe(pending, function () {
  //     console.log("something happened");
  //   });
  // };
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=PENDING`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // toast("Wow so easy");
        setPending(data);
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
          // observer();
          setPending(data);
        });
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [id]);

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
        setData(data);
      });
  }
  useEffect(() => {
    SearchFilter();
  }, [searchText]);
  const SearchFilter = () => {
    data.filter((item) => {
      if (searchText == "") {
        setPending(pending);
      } else if (item.detials.phone.includes(searchText)) {
        setPending([item]);
      }
    });
  };
  return (
    <div className="requests--container">
      <div className="requests--header">
        <span className="requests--title">Requests ({pending.length})</span>
        <span className="requests--viewall"> View All &gt;</span>
      </div>
      <div className="requests--body">
        {pending
          .filter((val) => {
            if (searchText == "") {
              return val;
            } else if (
              val.detials.phone.includes(searchText) ||
              val.detials.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => (
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
