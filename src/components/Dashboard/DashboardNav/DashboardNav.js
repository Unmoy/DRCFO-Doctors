import "./DashboardNav.css";
import userjpg from "../../../assets/images/login_user.png";
import bellicon from "../../../assets/images/bell.png";
import chaticon from "../../../assets/images/chat.png";
import manageicon from "../../../assets/images/manageicon.png";
import searchicon from "../../../assets/images/dashboard_search_icon.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import io from "socket.io-client";
function DashboardNav({ setSearchText }) {
  const [details, setDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const doctorid = localStorage.getItem("doctor_id");
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://reservefree-backend.herokuapp.com/get/docter?id=${doctorid}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  }, [doctorid]);
  const handleLogout = () => {
    console.log("logout");
    logout();
    localStorage.removeItem("doctor_id");
    navigate("/");
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  // const socket = io.connect("https://reservefree-backend.herokuapp.com");
  // const socket = io.connect("http://localhost:3001");

  // const joinRoom = () => {
  //   if (doctorid !== "") {
  //     socket.emit("join_room", doctorid);
  //   }
  // };
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);
  useEffect(() => {
    getNotifications();
    checkNotifications();
    let interval = setInterval(() => {
      checkNotifications();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const checkNotifications = async () => {
    await fetch(
      `https://reservefree-backend.herokuapp.com/notify/check?user=${doctorid}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log("received");
          console.log(data);
          getNotifications();
        } else {
          console.log("Checking");
        }
      });
  };
  const getNotifications = async () => {
    await fetch(
      `https://reservefree-backend.herokuapp.com/notify/getAll?user=${doctorid}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNotifications(data);
          console.log(data);
        }
      });
  };
  return (
    <div className="dashboard_nav">
      <div className="search--box">
        <div className="search--bar">
          <img src={searchicon} alt="search" className="search--icon" />
          <input
            type="text"
            placeholder="Search patient name, date"
            className="search--text"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="header_options">
        <img
          src={bellicon}
          alt="messages"
          className="header--icon"
          onClick={() => setOpen(!open)}
        />
        <div className="counter">2</div>
        {open && (
          <div className="notification_container">
            <div className="notification_header">
              <h3>Notifications</h3>
            </div>
            {notifications &&
              notifications.map((item) => <h2>{item.message}</h2>)}
          </div>
        )}
        <img src={chaticon} alt="messages" className="header--icon" />
        <span className="header--item dropdown">
          {details?.image?.length ? (
            <img
              src={`https://reservefree-backend.herokuapp.com/image/display?name=${details.image}`}
              alt=""
              className="user--icon"
            />
          ) : (
            <img src={userjpg} alt="" className="user--icon--demo" />
          )}

          <div className="header--dropdown">
            <NavLink to="doctordetails" className="naviagtor_link">
              <span className="header--dropdown--element header--dropdown--element--top">
                Manage Profile
                <img src={manageicon} alt="" className="manage_icon" />
              </span>
            </NavLink>
            <span className="header--dropdown--element" onClick={handleLogout}>
              Logout
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}

export default DashboardNav;
