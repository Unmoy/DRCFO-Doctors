import React, { useState } from "react";
import "./Monitor.css";
import Requests from "../Request/Requests";
import Stats from "../stats/Stats";
import Appointments from "../AppointmentsList/Appointments";
import { useOutletContext } from "react-router-dom";
const Monitor = () => {
  const [change, setChange] = useState("false");
  const handleLoading = (value) => {
    setChange(value);
  };
  const [searchText, searchId] = useOutletContext();
  // console.log(searchText, searchId);
  return (
    <div className="monitor">
      <Stats />
      <div className="other">
        <Requests
          handleLoading={handleLoading}
          change={change}
          searchText={searchText}
          searchId={searchId}
        />
        <Appointments change={change} searchText={searchText} />
      </div>
    </div>
  );
};

export default Monitor;
