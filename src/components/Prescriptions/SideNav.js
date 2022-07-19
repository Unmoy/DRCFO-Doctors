import React, { useEffect, useState } from "react";
import "./SideNav.css";
import userjpg from "../../assets/images/user.jpg";
import { NavLink, useLocation } from "react-router-dom";
const SideNav = ({ patient, focusName, setSection, section }) => {
  const location = useLocation();
  // console.log(location.hash);
  return (
    <div className="sidenav">
      <div className="sidenav_brand">
        <img src={userjpg} alt="" className="sidenav_user_image" />
        <div>
          <h1 className="side_brand_name">{patient?.detials?.name}</h1>
          <p className="side_brand_age">Age : {patient?.detials?.age}</p>
        </div>
      </div>
      <div className="sidebar_menu">
        {/* Dashboard */}
        <div
          onClick={() => setSection("complain")}
          className={
            section === "complain" || focusName === "complain"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Complain</span>
        </div>
        {/* Clinic */}
        <div
          onClick={() => setSection("diagnosis")}
          className={
            section === "diagnosis" || focusName === "diagnosis"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Diagnosis</span>
        </div>
        {/* Patients */}
        <div
          onClick={() => setSection("treatment")}
          className={
            section === "treatment" || focusName === "treatment"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Treatment</span>
        </div>
        {/* Analytics */}
        <div
          onClick={() => setSection("test")}
          className={
            section === "test" || focusName === "test"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Test</span>
        </div>
        {/* Legal */}
        <div
          onClick={() => setSection("drugName")}
          className={
            section === "drugName" || focusName === "drugName"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Drugs</span>
        </div>
        {/* Follow up */}
        <div
          onClick={() => setSection("follow")}
          className={
            section === "follow" || focusName === "follow"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Follow up</span>
        </div>
        {/* General advice */}
        <div
          onClick={() => setSection("advice")}
          className={
            section === "advice" || focusName === "advice"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">General advice</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
