import React, { useEffect, useState } from "react";
import "../ClinicStepper/ClinicDetail.css";
import locationicon from "../../assets/images/locationicon.png";
import Box from "@mui/material/Box";

import { useNavigate, useParams } from "react-router-dom";

const EditClinic = () => {
  const [location, setLocation] = useState({});
  const [pincode, setPincode] = useState("");
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`https://reservefree-backend.herokuapp.com/get/clinic?id=${id}`).then(
      (res) =>
        res.json().then((data) => {
          setName(data.name);
          setFees(data.fees);
          setStreet(data.street);
          setArea(data.area);
          setCity(data.city);
          setState(data.state);
          setPincode(data.pincode);
        })
    );
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      name,
      fees,
      street,
      area,
      city,
      state,
      pincode,
      location,
    };

    console.log(data);
    fetch("https://reservefree-backend.herokuapp.com/edit/clinic", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => navigate(-1));
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
      <h1>Edit Clinic Details/Location</h1>
      <p>It’s going to take only few minutes</p>

      <form onSubmit={handleSubmit}>
        <div className="clinic_detail_box">
          <div>
            <label htmlFor="clinicName">Clinic Name*</label>
            <input
              type="text"
              className="clinic_input"
              placeholder="Enter Clinic Name"
              name="clinicname"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="fees">Consultation fee*</label>
            <input
              type="text"
              className="clinic_input"
              placeholder="Enter consultation fee"
              name="fees"
              defaultValue={fees}
              onChange={(e) => setFees(e.target.value)}
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
              defaultValue={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="area">Sec/Area/Locality</label>
            <input
              type="text"
              name="area"
              className="clinic_input"
              defaultValue={area}
              placeholder="Enter your Sec//Locality"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pincode">Pincode*</label>
            <input
              type="text"
              className="pincode_input"
              placeholder="Enter your Pincode"
              defaultValue={pincode}
              name="pincode"
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
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="state">State*</label>
            <input
              type="text"
              id="state"
              className="clinic_input"
              placeholder="Enter your "
              name="state"
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
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

export default EditClinic;
