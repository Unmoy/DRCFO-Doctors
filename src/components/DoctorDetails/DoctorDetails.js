import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../Dashboard/DashboardNav/DashboardNav";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const [details, setDetails] = useState({});
  console.log(details);
  const [image, setImage] = useState({});
  console.log(image);
  const doctorid = localStorage.getItem("doctor_id");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://reservefree-backend.herokuapp.com/get/docter?id=${doctorid}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  }, [doctorid]);

  const handleFileData = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    console.log("click");
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", doctorid);
    console.log(image, doctorid);
    fetch("https://reservefree-backend.herokuapp.com/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("image upload done", data);
      });
  };
  const handleEdit = () => {
    navigate(`/editpatient/${doctorid}`);
  };
  return (
    <div>
      <div className="doctor_details_head">
        <h2>Personal Details</h2>
      </div>
      <div className="doctor_details_wrapper">
        <div>
          <form
            className="doctor_image_box"
            encType="multipart/form-data"
            name="image"
            onSubmit={handleSubmit}
          >
            <div className="doctor_image_choose">
              <input
                required
                onChange={handleFileData}
                className="homeloan_input_field"
                type="file"
                name="national_id_pic"
              ></input>
              <img
                src={`https://reservefree-backend.herokuapp.com/image/display?name=${details.image}`}
                alt=""
              />
            </div>

            <div className="doctor_image_content">
              <p>Choose an image from your computer</p>
              <p>Minimum size 100 x 100 px</p>
              <button className="image_upload_cta" type="submit">
                Upload
              </button>
              <button className="image_delete_cta">Delete</button>
            </div>
          </form>
        </div>
        <div className="doctor_details_content">
          <div className="doctor_column1">
            <h6>Full Name*</h6>
            <p>{details.name}</p>
            <h6>Phone Number*</h6>
            <p>{details.phone}</p>
            <h6>Email ID</h6>
            <p>{details.email}</p>
            <h6>Education & Training</h6>
            <p>{details.education}</p>
          </div>
          <div className="doctor_column2">
            <h6>Add Specialities* </h6>
            <p>{details.speciality}</p>
            <h6>Bio*</h6>
            <p>{details.bio}</p>
            <h6>Consultation Fee</h6>
            <p className="fw-bold">₹600</p>
          </div>
        </div>
        <div className="details_edit_cta d-flex justify-content-end">
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
