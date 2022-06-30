import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchicon from "../../assets/images/template.png";
import "./Topbar.css";
import leftarrow from "../../assets/images/leftarrow.png";
const Topbar = ({ docterId, loadTemplate }) => {
  const [defaultTemplate, setDefaultTemplate] = useState([]);
  const [doctorTemplate, setDoctorTemplate] = useState([]);
  // console.log(doctorTemplate);
  useEffect(() => {
    fetch(
      "https://reservefree-backend.herokuapp.com/get/prescription-template?template=default&display=title"
    )
      .then((response) => response.json())
      .then((data) => {
        setDefaultTemplate(data);
      });
    fetch(
      `https://reservefree-backend.herokuapp.com/get/prescription-template?docterId=${docterId}&display=title`
    )
      .then((response) => response.json())
      .then((data) => {
        setDoctorTemplate(data);
      });
  }, [docterId]);
  const openPrescription = (id) => {
    loadTemplate(id);
  };
  return (
    <nav className="NavbarItems">
      <div className="logo">
        <Link to="/dashboard" className="route_link">
          <span className="topbar_header">
            <img src={leftarrow} alt="" /> Prescription Generator
          </span>
        </Link>
      </div>
      <span className="template_container template_dropdown_container">
        <h1>Select Template</h1>
        <div className="template_dropdown">
          <div className="">
            <img src={searchicon} alt="" className="template_icon_clinic" />
            <input
              type="text"
              name="email"
              className="template_search"
              placeholder="Search"
            />
          </div>

          <h6>My Template</h6>
          <p>Use the template to prefill the feilds</p>
          <div className="template_list">
            {doctorTemplate.length
              ? doctorTemplate.map((item, index) => (
                  <div className="template_item" key={index}>
                    <h5>{item.complain}</h5>
                    <button
                      className="template_use_btn"
                      onClick={() => openPrescription(item._id)}
                    >
                      Use
                    </button>
                  </div>
                ))
              : null}
          </div>
          <h2>Suggested Templates</h2>
          <div className="suggested_list">
            {defaultTemplate.map((item, index) => (
              <div className="template_item" key={index}>
                <h5>{item.complain}</h5>
                <button
                  className="template_use_btn"
                  onClick={() => openPrescription(item._id)}
                >
                  Use
                </button>
              </div>
            ))}
          </div>
        </div>
      </span>
    </nav>
  );
};

export default Topbar;
