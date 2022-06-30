import React, { useState } from "react";
import "./PersonalDetail.css";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useAuth } from "../context/AuthContext";
// Assest Imports
import userLogo from "../../assets/images/login_user.png";
import phoneLogo from "../../assets/images/phone.png";
import mailLogo from "../../assets/images/mail.png";
import specialLogo from "../../assets/images/speciality.png";
import eduLogo from "../../assets/images/edu.png";
import expLogo from "../../assets/images/exp.png";
const PersonalDetail = ({ setActiveStep }) => {
  const doctorId = localStorage.getItem("doctor_id");
  const { currentUser } = useAuth();

  const [specialities, setSpecialitites] = useState([]);
  console.log(specialities);
  const onSubmit = (data) => {
    data.id = doctorId;
    data.specialities = specialities;
    if (data.email === undefined) {
      data.email = currentUser.user_email;
    }
    if (data.phone === undefined) {
      data.phone = currentUser.user_phone;
    }
    console.log(data);
    fetch("https://reservefree-backend.herokuapp.com/add/docter", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const { register, handleSubmit } = useForm();
  const topSpecialities = [
    "Orthopedics",
    "Knee Surgery",
    "Neck bone surgery",
    "Accident fracture Surgery",
    "Joint Pain",
    "Joint Replacement Surgeon",
  ];

  return (
    <div className="personal_detail_form d-flex justify-content-center align-items-center flex-column">
      <h1>Personal Details</h1>
      <p>It’s going to take only few minutes</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="personal_detail_box">
          <div className="input_icons">
            <label htmlFor="name">Full Name*</label>
            <img src={userLogo} alt="" className="input_icon_clinic" />
            <input
              {...register("name")}
              type="text"
              className="stepper_input"
              defaultValue={currentUser.user_name ? currentUser.user_name : ""}
            />
          </div>
          <div className="input_icons">
            <label htmlFor="number">Phone Number*</label>
            <img src={phoneLogo} alt="" className="input_icon_clinic" />
            <input
              {...register("phone")}
              type="text"
              className="stepper_input "
              defaultValue={
                currentUser.user_phone ? currentUser.user_phone : ""
              }
              disabled={currentUser.user_phone ? true : false}
            />
          </div>
          <div className="input_icons">
            <label htmlFor="email">Email ID</label>
            <img src={mailLogo} alt="" className="input_icon_clinic" />
            <input
              {...register("email")}
              type="text"
              name="email"
              className="stepper_input"
              defaultValue={
                currentUser.user_email ? currentUser.user_email : ""
              }
              disabled={currentUser.user_email ? true : false}
            />
          </div>
          <div className="input_icons">
            <label htmlFor="education">Education</label>
            <img src={eduLogo} alt="" className="input_icon_clinic" />
            <input
              {...register("education")}
              type="text"
              name="education"
              className="stepper_input"
            />
          </div>
          <div className="input_icons">
            <label htmlFor="specialities">Add Specialities*</label>
            <img src={specialLogo} alt="" className="input_icon_clinic_auto" />
            <Autocomplete
              onChange={(e, value) => setSpecialitites(value)}
              multiple
              id="tags-standard"
              options={topSpecialities}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  className="speciality_input"
                />
              )}
            />
          </div>
          <div className="input_icons">
            <label htmlFor="experience">Total Year of Experiance </label>
            <img src={expLogo} alt="" className="input_icon_clinic" />
            <input
              {...register("experience")}
              type="text"
              name="experience"
              className="stepper_input"
              placeholder="Enter total year of Experiance"
            />
          </div>
          <div>
            <label htmlFor="bio">Add Bio*</label>
            <textarea
              {...register("bio", { required: true })}
              name="bio"
              cols="40"
              rows="5"
              className="stepper_input5"
            ></textarea>
          </div>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <button className="stepper_btn" type="submit">
            Save & Next
          </button>
        </Box>
      </form>
    </div>
  );
};

export default PersonalDetail;
