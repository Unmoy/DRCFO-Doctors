import "./Stats.css";
import patienticon from "../../../assets/images/background/patients.png";
import calendericon from "../../../assets/images/background/calender.png";
import clockicon from "../../../assets/images/background/clock.png";
import revenueicon from "../../../assets/images/background/revenue.png";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
function Stats() {
  const doctorid = localStorage.getItem("doctor_id");
  const [stats, setStats] = useState({});
  useEffect(() => {
    getStats();
    let interval = setInterval(() => {
      getStats();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const getStats = async () => {
    await fetch(
      `https://reservefree-backend.herokuapp.com/get/docter/stats?id=${doctorid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        // console.log(data);
      });
  };
  return (
    <div className="stats--container">
      <div className="stat--card card--1">
        <span className="stat--icon--div icon--1">
          <img src={patienticon} alt="icon" className="stat--icon" />
        </span>
        <span className="stat--text">
          <span className="stat--heading">Today's closing</span>
          <span className="stat--value">
            {stats?.patients ? (
              stats?.patients?.completed
            ) : (
              <Skeleton animation="wave" />
            )}
          </span>
        </span>
      </div>
      <div className="stat--card card--2">
        <span className="stat--icon--div icon--2">
          <img src={revenueicon} alt="icon" className="stat--icon" />
        </span>
        <span className="stat--text">
          <span className="stat--heading">Today's Revenue</span>
          <span className="stat--value">
            {stats?.revenue ? (
              <span>&#8377; {stats?.revenue?.today}</span>
            ) : (
              <Skeleton animation="wave" />
            )}
          </span>
        </span>
      </div>
      <div className="stat--card card--3">
        <span className="stat--icon--div icon--3">
          <img src={calendericon} alt="icon" className="stat--icon" />
        </span>
        <span className="stat--text">
          <span className="stat--heading">Monthly Revenue</span>
          <span className="stat--value">
            {/* &#8377; {stats?.revenue?.monthly} */}
            {stats?.revenue ? (
              <span>&#8377; {stats?.revenue?.monthly}</span>
            ) : (
              <Skeleton animation="wave" />
            )}
          </span>
        </span>
      </div>
      <div className="stat--card card--4">
        <span className="stat--icon--div icon--4">
          <img src={clockicon} alt="icon" className="stat--icon" />
        </span>
        <span className="stat--text">
          <span className="stat--heading">Yesterday's No-show</span>
          <span className="stat--value">
            {stats?.patients?.noShow}
            {stats?.patients ? (
              stats?.patients?.noShow
            ) : (
              <Skeleton animation="wave" />
            )}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Stats;
