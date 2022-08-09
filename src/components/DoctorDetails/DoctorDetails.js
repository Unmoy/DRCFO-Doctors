import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../Dashboard/DashboardNav/DashboardNav";
import "./DoctorDetails.css";
import { ToastContainer, toast } from "react-toastify";
const DoctorDetails = () => {
  const [details, setDetails] = useState({});
  const [image, setImage] = useState({});
  console.log(image);
  const doctorid = localStorage.getItem("doctor_id");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [timer, setTimer] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getDocotorData();
  }, [doctorid]);

  const getDocotorData = () => {
    fetch(`https://reservefree-backend.herokuapp.com/get/docter?id=${doctorid}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };
  const handleFileData = (e) => {
    setLoader(true);
    setData(e.target.files[0]);
    const file = e.target.files[0];
    details.image = "";
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        imageUrl: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      setImage({
        imageUrl: reader.result,
      });
      setTimeout(() => {
        setLoader(false);
        setTimer(true);
      }, 2000);
    } else {
      setImage({
        imageUrl: "",
      });
      setTimeout(() => {
        setLoader(false);
        setTimer(true);
      }, 2000);
    }
  };
  const uploadPic = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", data);
    formData.append("id", doctorid);
    fetch("https://reservefree-backend.herokuapp.com/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("image upload done", data);
        if (data.message === "SUCCESS") {
          toast("Your profile image is uploaded succesfully");
          getDocotorData();
          // setImage({});
        }
      });
  };
  const deletePic = (e) => {
    e.preventDefault();
    if (details.image) {
      // console.log(details.image);
      fetch(
        `https://reservefree-backend.herokuapp.com/image/delete?name=${details.image}&id=${doctorid}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("image deleted", data);
          if (data.message === "SUCCESS") {
            toast("Your profile image has been removed succesfully");
          }
          setTimeout(() => {
            getDocotorData();
          }, 500);
        });
    }
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
          >
            {/* <div className="doctor_image_choose">
              <input
                onChange={handleFileData}
                className="upload_pic_input"
                type="file"
         
              ></input>
              <img src={image.imageUrl} alt="" />
              {details?.image ? (
                <img
                  src={`https://reservefree-backend.herokuapp.com/image/display?name=${details.image}`}
                  alt=""
                />
              ) : null}
            </div> */}
            <div className="wrapper">
              {loader ? <div className="loader"></div> : null}
              <div className="file-upload">
                <input type="file" onChange={handleFileData} />
                {details?.image ? (
                  <img
                    src={`https://reservefree-backend.herokuapp.com/image/display?name=${details.image}`}
                    alt=""
                  />
                ) : (
                  <img src={image.imageUrl} alt="" />
                )}
                {image.imageUrl || details?.image ? null : (
                  <svg
                    className="upload_svg"
                    width="50"
                    height="50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="doctor_image_content">
              <p>Choose an image from your computer</p>
              <p>Minimum size 100 x 100 px</p>
              <button
                className={
                  timer ? "image_upload_cta loader_true " : "image_upload_cta"
                }
                type="submit"
                onClick={uploadPic}
              >
                Upload
              </button>
              <button className="image_delete_cta" onClick={deletePic}>
                Delete
              </button>
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
