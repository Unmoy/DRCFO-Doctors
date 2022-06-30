import React, { useEffect, useState } from "react";
import AppointmentCompletedCard from "../AppointmentCompletedCard";
import ConfirmedScreen from "../ConfirmedScreen";
import "./PatientTabs.css";

const PatientTabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [confirmed, setConfirmed] = useState([]);
  const [confirmedData, setConfirmedData] = useState([]);
  console.log(confirmed);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    const id = localStorage.getItem("doctor_id");
    console.log(id);
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&confirmation=CONFIRMED&status=YET_TO_VISIT`
    )
      .then((response) => response.json())
      .then((data) => setConfirmed(data));
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointments?docterId=${id}&status=COMPLETED`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setConfirmedData(data));
  }, []);
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
          <div className="d-flex flex-wrap confirmed_wrapper">
            {confirmed.map((item) => (
              <ConfirmedScreen item={item} />
            ))}
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
            <div className="d-flex flex-wrap">
              {/* <AppointmentCard />
              <AppointmentCard /> */}
              No Shows
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
            <div className="d-flex flex-wrap">
              {confirmedData.map((item) => (
                <AppointmentCompletedCard item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTabs;
