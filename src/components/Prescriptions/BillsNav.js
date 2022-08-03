import React from "react";
import { Link } from "react-router-dom";
import leftarrow from "../../assets/images/leftarrow.png";
const BillsNav = () => {
  return (
    <nav className="NavbarItems">
      <div className="logo">
        <Link to="/" className="route_link">
          <span className="topbar_header">
            <img src={leftarrow} alt="" /> Prescription Generator
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default BillsNav;
