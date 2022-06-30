import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import DashboardNav from "./DashboardNav/DashboardNav";
const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  // console.log(searchText);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard_outlet">
        <DashboardNav setSearchText={setSearchText} />
        <Outlet context={[searchText]} />
      </div>
    </div>
  );
};

export default Dashboard;
