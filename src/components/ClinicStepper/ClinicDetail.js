import React, { useEffect, useState } from "react";
import "./ClinicDetail.css";
import locationicon from "../../assets/images/locationicon.png";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

const ClinicDetail = ({ setActiveStep }) => {
  const doctorId = localStorage.getItem("doctor_id");
  const [location, setLocation] = useState({});
  const [pincode, setPincode] = useState("");

  const onSubmit = (data) => {
    data.id = doctorId;
    data.location = location;
    fetch("https://reservefree-backend.herokuapp.com/add/clinic", {
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
        localStorage.setItem("clinic_id", data.clinicId);
      });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const fetchPincode = async (pincode) => {
    if (pincode.length == 6) {
      fetch("https://api.postalpincode.in/pincode/" + pincode)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.getElementById("city").value =
            data[0].PostOffice[0].District;
          document.getElementById("state").value = data[0].PostOffice[0].State;
          console.log(data[0].PostOffice[0].State);
          console.log(data[0].PostOffice[0].District);
        });
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addlocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  return (
    <div className="clinic_detail_form d-flex justify-content-center align-items-center flex-column">
      <h1>Clinic Details/Location</h1>
      <p>It’s going to take only few minutes</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="clinic_detail_box">
          <div>
            <label htmlFor="clinicName">Clinic Name*</label>
            <input
              type="text"
              className="clinic_input"
              placeholder="Enter Clinic Name"
              name="clinicname"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="fees">Consultation fee*</label>
            <input
              type="text"
              className="clinic_input"
              placeholder="Enter consultation fee"
              name="fees"
              {...register("fees", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="clinicLocation">
              Add current location to get better result
            </label>
            <button className="location_button" onClick={addlocation}>
              <img src={locationicon} alt="locationicon"></img> Add Current
              Location
            </button>
          </div>
          <div>
            <label htmlFor="houseNum">House/Street/Gali Number*</label>
            <input
              type="text"
              className="clinic_input"
              placeholder="Enter your House/Street/Gali Number"
              name="houseNum"
              {...register("street", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="area">Sec/Area/Locality</label>
            <input
              type="text"
              name="area"
              className="clinic_input"
              placeholder="Enter your Sec/Area/Locality"
              {...register("area", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="pincode">Pincode*</label>
            <input
              type="text"
              className="pincode_input"
              placeholder="Enter your Pincode"
              name="pincode"
              {...register("pincode", { required: true })}
              onChange={(e) => {
                setPincode(e.target.value);
                fetchPincode(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="city">City*</label>
            <input
              type="text"
              name="city"
              id="city"
              className="clinic_input"
              placeholder="Enter your City"
              {...register("city", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="state">State*</label>
            <input
              type="text"
              id="state"
              className="clinic_input"
              placeholder="Enter your State"
              name="state"
              {...register("state", { required: true })}
            />
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
        </div>
      </form>
    </div>
  );
};

export default ClinicDetail;
