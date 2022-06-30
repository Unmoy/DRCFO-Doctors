import React, { useEffect, useState } from "react";
import "./SideNav.css";
import userjpg from "../../assets/images/user.jpg";
import { NavLink, useLocation } from "react-router-dom";
const SideNav = ({ patient, focusName }) => {
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
          className={
            location.hash === "#complain" || focusName === "complain"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#complain">
            <span className="menu--text">Complain</span>
          </a>
        </div>
        {/* Clinic */}
        <div
          className={
            location.hash === "#diagnosis" || focusName === "diagnosis"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#diagnosis">
            <span className="menu--text">Diagnosis</span>
          </a>
        </div>
        {/* Patients */}
        <div
          className={
            location.hash === "#treatment" || focusName === "treatment"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#treatment">
            <span className="menu--text">Treatment</span>
          </a>
        </div>
        {/* Analytics */}
        <div
          className={
            location.hash === "#tests" || focusName === "test"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#tests">
            <span className="menu--text">Test</span>
          </a>
        </div>
        {/* Legal */}
        <div
          className={
            location.hash === "#drugs" || focusName === "drugName"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#drugs">
            <span className="menu--text">Drugs</span>
          </a>
        </div>
        {/* Follow up */}
        <div
          className={
            location.hash === "#follow" || focusName === "follow"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#follow">
            <span className="menu--text">Follow up</span>
          </a>
        </div>
        {/* General advice */}
        <div
          className={
            location.hash === "#advice" || focusName === "advice"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <a href="#advice">
            <span className="menu--text">General advice</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
