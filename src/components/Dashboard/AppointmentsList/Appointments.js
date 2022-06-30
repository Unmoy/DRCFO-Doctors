import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

function AppointmentCard({ item }) {
  console.log(item);
  const navigate = useNavigate();
  const handlePrescriptions = () => {
    navigate(`/prescription/${item._id}`);
  };
  const initials = item.detials.name.charAt(0).toUpperCase();
  useEffect(() => {
    function downscale(length, expectedMaxLength, baseFontSize, minFontSize) {
      const scalingFactor = 1 - Math.min((1 / expectedMaxLength) * length, 1);
      return Math.ceil(
        Math.max(
          scalingFactor * (baseFontSize - minFontSize) + minFontSize,
          minFontSize
        )
      );
    }
    const label = document.getElementById("fixed");
    const resizedFontSize = downscale(
      label.textContent.length,
      parseInt(window.getComputedStyle(label).fontSize, 10),
      8
    );
    label.style.fontSize = `${resizedFontSize}px`;
  }, []);
  return (
    <div className="appointment--card">
      <div className="appointment--card--profile">{initials}</div>
      <div className="appointment--card--detials">
        <span
          // className={
          //   item.detials.name.length > 20
          //     ? "appointment--card--name2"
          //     : "appointment--card--name"
          // }
          className="appointment--card--name"
          id="fixed"
        >
          {item.detials.name}
        </span>
        <span className="appointment--card--age">{item.detials.age} </span>
        <span className="appointment--card--gender">{item.detials.gender}</span>
      </div>
      <span className="appointment--card--time">{item.slot.time}</span>
      {item?.booking ? (
        <span className="appointment--card--location_walkin">Walk In</span>
      ) : (
        <span className="appointment--card--location">Online</span>
      )}

      <div className="appointments--card--buttons">
        <div className="appointments--card-button--group">
          <span
            className="appointments--card--button accept"
            onClick={handlePrescriptions}
          >
            Diagnose
          </span>
        </div>
      </div>
    </div>
  );
}
function Appointments({ change, searchText }) {
  const [confirmed, setConfirmed] = useState([]);
  console.log(confirmed);
  const id = localStorage.getItem("doctor_id");
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=CONFIRMED&status=YET_TO_VISIT`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let sorted = data.sort((a, b) => {
          return new Date(a.appointmentSlot) > new Date(b.appointmentSlot)
            ? 1
            : -1;
        });

        console.log("Sorted", sorted);
        setConfirmed(sorted);
      });
  }, []);

  if (change === "true") {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=CONFIRMED&status=YET_TO_VISIT`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setConfirmed(data));
  }
  return (
    <div className="appointments--container">
      <div className="appointments--header">
        <span className="appointments--title">
          Appointments ({confirmed.length})
        </span>
        <span className="appointments--viewall"> View all &gt;</span>
      </div>
      <div className="appointments--body">
        {confirmed
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
            <AppointmentCard change={change} key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default Appointments;
