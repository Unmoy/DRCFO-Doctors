import React, { useState, useEffect } from "react";
import "./ClinicTabs.css";
import directionicon from "../../assets/images/directionicon.png";
import map from "../../assets/images/map.png";
import SlotBox from "./SlotBox";
import { useNavigate, useParams } from "react-router-dom";

const ClinicTabs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [toggleState, setToggleState] = useState(1);
  const [clinic, setClinic] = useState({});
  const [appointmentData, setAppointmentData] = useState([]);
  console.log(appointmentData);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const handleEdit = () => {
    navigate(`/editclinic/${id}`);
  };
  useEffect(() => {
    fetch(`https://reservefree-backend.herokuapp.com/get/clinic?id=${id}`).then(
      (res) =>
        res.json().then((data) => {
          setClinic(data);
        })
    );
    fetch(`https://reservefree-backend.herokuapp.com/get/slots?clinicId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointmentData(data);
      });
  }, [id]);
  const createSlot = () => {
    navigate(`/createslot/${id}`);
  };
  return (
    <div className="clinic_tab_container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Clinic Details/Location
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Availability
        </button>
      </div>
      <div className="clinic_content-tabs">
        <div
          className={
            toggleState === 1
              ? "clinic_content  active-clinic_content"
              : "clinic_content"
          }
        >
          <div className="d-flex clinic_location">
            <div className="clinic_location">
              <h2>Location</h2>
              <h5>{clinic.name}</h5>
              <p>
                {clinic.street}, {clinic.area}, {clinic.city},{clinic.pincode},{" "}
                {clinic.state}
              </p>
              <button>
                Get Direction <img src={directionicon} alt="" />
              </button>
            </div>
            <div className="map_wrapper">
              <img src={map} alt="" />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="edit_btn_cta" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>

        <div
          className={
            toggleState === 2
              ? "clinic_content  active-clinic_content"
              : "clinic_content"
          }
        >
          <div>
            <div className="availablity_list d-flex flex-wrap">
              {appointmentData.map((item) => (
                <SlotBox key={item._id} item={item} clinicId={id} />
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <button className="edit_btn_cta" onClick={createSlot}>
                Create Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicTabs;
