import "./DashboardNav.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userjpg from "../../../assets/images/login_user.png";
import bellicon from "../../../assets/images/bell.png";
// import chaticon from "../../../assets/images/chat.png";
import manageicon from "../../../assets/images/manageicon.png";
import searchicon from "../../../assets/images/dashboard_search_icon.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Notification from "../../Notification/Notification";
const ClickOutHandler = require("react-onclickout");
function DashboardNav({ setSearchText, setSearchId }) {
  // console.log(first)
  const [details, setDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [sortedNotification, setSortedNotification] = useState([]);
  // console.log(sortedNotification);
  const doctorid = localStorage.getItem("doctor_id");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState(notifications.length && true);
  useEffect(() => {
    if (notifications.length) {
      setView(true);
    }
  }, [notifications.length]);
  useEffect(() => {
    fetch(`https://reservefree-backend.herokuapp.com/get/docter?id=${doctorid}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  }, [doctorid]);
  const handleLogout = () => {
    console.log("logout");
    logout();
    localStorage.removeItem("doctor_id");
    navigate("/login");
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
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (notifications.length > 0) {
      let NewNotifications = [];
      for (let j = 0; j < notifications.length; j++) {
        // console.log(j);
        const item = notifications[j];
        const date = new Date(item.created).toDateString();
        // console.log(date.toDateString());
        let result = NewNotifications.filter((i) => {
          // console.log(i.created);
          return i.date === date;
        });
        // console.log(result);
        if (result.length > 0) {
          // console.log("if", date, result);
          NewNotifications = NewNotifications.map((i) => {
            if (i.date === date) {
              // console.log("if1", date);
              return { date: date, data: [...i.data, item] };
            } else {
              return i;
            }
          });
        } else {
          // console.log("else", date, item);
          NewNotifications.push({ date: date, data: [item] });
        }
      }
      // console.log("Sorted", NewNotifications);
      setSortedNotification(NewNotifications);
    }
  }, [notifications]);

  const checkNotifications = async () => {
    await fetch(
      `https://reservefree-backend.herokuapp.com/notify/check?user=${doctorid}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          // console.log("received");
          // alert("New Appointment");
          toast("You have a new appointment");
          getNotifications();
        } else {
          // console.log("Checking");
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
          setNotifications(data.reverse());
          // console.log(data[0].created);
        }
      });
  };
  const clickOut = async (e) => {
    setOpen(false);
    // console.log("hepe");
    await fetch(
      `https://reservefree-backend.herokuapp.com/notify/update?user=${doctorid}&read=true`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // alert("a");
        getNotifications();
      });
  };

  return (
    <div className="dashboard_nav">
      <div className="search--box">
        <div className="search--bar">
          <img src={searchicon} alt="search" className="search--icon" />
          <input
            type="text"
            placeholder="Search patient name, contact number..."
            className="search--text"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="header_options">
        <svg
          width="30"
          height="30"
          viewBox="0 0 36 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="header--icon"
          onClick={() => {
            setView(false);
            setOpen(!open);
          }}
        >
          <path
            d="M17.1487 37.7133C16.3683 37.5528 15.6026 37.3582 14.9209 36.9163C14.0455 36.349 13.3822 35.6017 12.9265 34.6387H22.3894C22.0877 35.3554 21.6154 35.9523 21.0269 36.4578C20.2446 37.1303 19.3387 37.5325 18.312 37.6617C18.2659 37.6672 18.2234 37.6958 18.1792 37.7142H17.1478L17.1487 37.7133Z"
            fill="#545B74"
          />
          <path
            d="M17.6651 33.176C14.5692 33.1862 11.4752 33.0847 8.407 32.6843C6.51498 32.4371 4.63218 32.0709 2.77337 31.6364C0.492984 31.1041 -0.407363 28.5488 0.990204 26.666C2.20604 25.0286 3.37852 23.3682 4.31946 21.5545C5.33143 19.6026 6.0851 17.5639 6.30373 15.36C6.38491 14.5427 6.36646 13.7143 6.46977 12.9007C6.83139 10.0548 8.13579 7.6988 10.2732 5.80032C11.2538 4.92857 12.3654 4.26161 13.5941 3.79852C13.8128 3.71642 13.9041 3.61403 13.929 3.36034C14.0969 1.62699 15.5655 0.193447 17.3228 0.0172523C19.0054 -0.151563 20.6779 0.935126 21.212 2.54856C21.2886 2.7801 21.403 3.02179 21.3947 3.25518C21.3808 3.63617 21.5949 3.73026 21.8864 3.85664C25.77 5.53003 28.0707 8.47369 28.8419 12.6157C28.9517 13.2033 28.9757 13.8121 28.9849 14.4117C29.02 16.6275 29.6565 18.6884 30.5845 20.6699C31.5559 22.7446 32.7911 24.6596 34.2071 26.4585C34.9617 27.416 35.2117 28.4723 34.8159 29.6337C34.4728 30.641 33.7606 31.308 32.7367 31.6013C30.5605 32.2249 28.3346 32.6022 26.0818 32.7729C23.2812 32.9851 20.475 33.1179 17.6706 33.2849L17.666 33.177L17.6651 33.176Z"
            fill="#545B74"
          />
        </svg>
        {view && <div className="counter">{notifications.length}</div>}
        {/* <img src={bellicon} alt="messages" className="header--icon" /> */}
        {open && (
          <ClickOutHandler onClickOut={clickOut}>
            <div className="notification_container">
              <div className="notification_header">
                <h3>Notifications</h3>
              </div>
              {sortedNotification &&
                sortedNotification.map((item, index) => (
                  <Notification
                    key={index}
                    item={item}
                    setSearchId={setSearchId}
                    setOpen={setOpen}
                  />
                ))}
            </div>
          </ClickOutHandler>
        )}
        {/* <img src={chaticon} alt="messages" className="header--icon" /> */}
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
