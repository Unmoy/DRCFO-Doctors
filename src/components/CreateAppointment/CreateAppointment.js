import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateAppointment.css";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
const useStyles = makeStyles(() => ({
  root: {
    background: "#fff",
    borderRadius: "4px",
  },
}));
const CreateAppointment = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const doctorId = localStorage.getItem("doctor_id");
  const { register, handleSubmit } = useForm();
  const [clinicId, setClinicId] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [gender, setGender] = useState("");
  const [clinicsList, setClinicsList] = useState([]);
  let added30Min = new Date(time?.getTime() + 30 * 60 * 1000);

  const startTime = time?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = added30Min?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const appointmentTime = startTime + " " + endTime;
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/clinics?docterId=${doctorId}&dashboard=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setClinicsList(data.clinics);
      });
  }, [doctorId]);
  const onSubmit = (data) => {
    data.docterId = doctorId;
    data.clinicId = clinicId;
    data.booking = "Walk-in";
    data.payment = "PAY_ON_VISIT";
    data.date = date;
    data.gender = gender;
    data.time = appointmentTime;
    console.log(data);
    fetch("https://reservefree-backend.herokuapp.com/add/appointment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard");
      });
  };
  const getGender = (e) => {
    // e.prevenDefault();
    setGender(e.target.value);
  };
  var gsDayNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleDate = (val) => {
    var monthName = gsDayNames[val.getMonth()];
    var day = val.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = val.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var year = val.getFullYear();
    setDate(monthName + day + "," + year);
  };
  const handleClinic = (e) => {
    setClinicId(e.target.value);
  };
  return (
    <div className="createappointment_form">
      <Link to="/dashboard" className="home_link">
        <div className="myappointment--textbox d-flex justify-content-start align-items-center">
          <svg
            width="30"
            height="21"
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="myappointment--backarrow"
          >
            <path
              d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM27 10.5L2 10.5V13.5L27 13.5V10.5Z"
              fill="#000"
            />
          </svg>
          <span className="myappointment--text">Dashboard</span>
        </div>
      </Link>
      <div className=" d-flex justify-content-center align-items-center flex-column">
        <h1>Create Appointment</h1>
        <p>It’s going to take only few minutes</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="createappointment_box">
            <div className="input_icons">
              <label htmlFor="name">Patient Name*</label>
              <input
                {...register("name")}
                type="text"
                className="createappointment_input"
                placeholder="Enter Patient Name"
              />
            </div>
            <div className="input_icons">
              <label htmlFor="number">Phone Number*</label>
              <input
                {...register("phone")}
                type="text"
                className="createappointment_input "
                placeholder="Enter phone number"
              />
            </div>
            <div className="input_icons">
              <label htmlFor="gender">Gender</label>
              <div className="gender_box">
                <input
                  onChange={getGender}
                  className="checkbox-tools"
                  type="radio"
                  name="tools"
                  id="tool-1"
                  value="Male"
                />
                <label className="for-checkbox-tools" htmlFor="tool-1">
                  Male
                </label>
                <input
                  onChange={getGender}
                  className="checkbox-tools"
                  type="radio"
                  name="tools"
                  id="tool-2"
                  value="Female"
                />
                <label className="for-checkbox-tools" htmlFor="tool-2">
                  Female
                </label>
                <input
                  onChange={getGender}
                  className="checkbox-tools"
                  type="radio"
                  name="tools"
                  id="tool-3"
                  value="Others"
                />
                <label className="for-checkbox-tools" htmlFor="tool-3">
                  Others
                </label>
              </div>
            </div>
            <div className="input_icons">
              <label htmlFor="fees">Consulation Fees*</label>
              <input
                {...register("fees")}
                type="text"
                name="fees"
                className="createappointment_input"
                placeholder="Consulation Fees"
              />
            </div>
            <div className="input_icons">
              <label htmlFor="age">Age</label>
              <input
                {...register("age")}
                type="text"
                name="age"
                className="createappointment_input"
                placeholder="Enter Age"
              />
            </div>
            <div className="input_icons">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="text"
                name="email"
                className="createappointment_input"
                placeholder="Enter Email"
              />
            </div>
            <div className="input_icons material_input">
              <label htmlFor="follow">Appointment Date</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={(newValue) => {
                    handleDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      className={classes.root}
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "Select Appointment Date",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="input_icons material_input">
              <label htmlFor="time">Appointment Time</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      className={classes.root}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div
              className="input_icons custom-select"
              style={{ width: "200px" }}
            >
              <label htmlFor="cars">Select Clinic:</label>
              <select className="custom_select" onClick={handleClinic}>
                <option value="No Clinic">Select Clinic</option>
                {clinicsList.map((item) => (
                  <option
                    key={item._id}
                    className="select-items"
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <button className="stepper_btn" type="submit">
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
