import React, { useEffect, useState } from "react";
import ClinicCard from "./ClinicCard";
import "./Clinicscreen.css";

const Clinicscreen = () => {
  const [clinicsList, setClinicsList] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState({});
  // console.log(clinicsList);
  const id = localStorage.getItem("doctor_id");
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/clinics?docterId=${id}&dashboard=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setClinicsList(data.clinics);
        setDoctorInfo(data.docter);
      });
  }, [id]);
  return (
    <div className="clinic_list_wrapper">
      {clinicsList.map((item) => (
        <ClinicCard key={item._id} item={item} doctorInfo={doctorInfo} />
      ))}
    </div>
  );
};

export default Clinicscreen;
