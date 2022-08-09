import React from "react";
import "./Finance.css";
import image from "../../../assets/images/finance.png";
const Finance = () => {
  return (
    <div className="finance_container">
      <div>
        <h2 className="bank_header">Add your bank </h2>
      </div>
      <div className="finance_wrapper">
        <div className="finance_input_box">
          <div>
            <label htmlFor="">Benificiary Name*</label>
            <input
              type="text"
              className="finance_input"
              placeholder="Enter benificiary name"
              name="Benificiary Name"
              required
            />
          </div>
          <div>
            <label htmlFor="">Bank Account Number*</label>
            <input
              type="text"
              className="finance_input"
              placeholder="Enter bank number"
              name="account no"
              required
            />
          </div>
          <div>
            <label htmlFor="">Confirm Account Number*</label>
            <input
              type="text"
              className="finance_input"
              placeholder="Enter bank number"
              name="account no"
              required
            />
          </div>
          <div>
            <label htmlFor="">IFSC Code*</label>
            <input
              type="text"
              className="finance_input"
              placeholder="Enter IFSC Code"
              name="IFSC Code"
              required
            />
          </div>
          <div>
            <label htmlFor="">Bank Name*</label>
            <input
              type="text"
              className="finance_input"
              placeholder="Enter Bank Name"
              name="Bank Name"
              required
            />
          </div>
          <button className="add_bank_cta">Add Your Bank</button>
        </div>
        <div className="finance_body">
          <div className="finance_image">
            <img src={image} alt="" />
          </div>
          <div>
            <h5>Add Your Bank & Activate Video Consultation</h5>
            <p>
              Provide secure video consultation to your patients from the
              comfort of your home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
