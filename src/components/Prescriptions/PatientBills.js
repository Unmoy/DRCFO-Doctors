import React, { useEffect, useRef, useState } from "react";
import BillsNav from "./BillsNav";
import "./PatientBills.css";
import image from "../../assets/images/Rectangle 129.png";
import { useParams } from "react-router-dom";
const PatientBills = () => {
  const [payType, setPayType] = useState("");
  const [total, setTotal] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [patient, setPatient] = useState({});
  const [singleService, setsingleService] = useState({});
  const [services, setServices] = useState([]);
  const [prices, setPrices] = useState([]);
  // console.log(prices);
  const complainref = useRef(null);
  const priceRef = useRef(null);
  const gstRef = useRef(null);
  // console.log(services);
  const { id } = useParams();
  const getPaymentDetail = (e) => {
    setPayType(e.target.value);
  };

  const EditService = (index, item) => {
    setServices([...services.filter((_, i) => i !== index)]);
    if (complainref.current && priceRef.current && gstRef.current) {
      complainref.current.value = item.name;
      priceRef.current.value = item.price;
      gstRef.current.value = item.gst;
    }
  };
  const DeleteService = (index) => {
    setServices([...services.filter((_, i) => i !== index)]);
  };
  const addService = (e) => {
    e.target.reset();
    e.preventDefault();
    setServices([...services, singleService]);
    fetch("https://reservefree-backend.herokuapp.com/add/services", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        services: services,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  const addBill = (e) => {
    e.preventDefault();
    setServices([...services, singleService]);
    fetch("https://reservefree-backend.herokuapp.com/add/services", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        services: services,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  const handleService = (e) => {
    e.preventDefault();
    setsingleService({
      ...singleService,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointment?appointmentId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPatient(data);
      });
  }, [id]);
  useEffect(() => {
    if (services.length) {
      services.map((item) => setPrices([...prices, item.price]));
    }
  }, [services]);

  useEffect(() => {
    if (prices.length) {
      console.log(prices);
      var sum = prices.reduce(function (a, b) {
        return Number(a) + Number(b);
      }, 0);
      setTotal(sum + Number(patient?.fees));
      console.log(sum);
    }
  }, [prices]);
  useEffect(() => {
    if (total) {
      setTotalAmount(total + 0);
    }
  }, [total]);

  return (
    <div className="bill">
      <BillsNav />
      <div className="bills_wrapper p-5 mt-5">
        <div className="d-flex justify-content-center algn-items-center flex-column mb-3">
          <div className="confirm_header">
            <h1>Patient Details</h1>
          </div>
          <div className="d-flex">
            <div className="detail_col_image">
              <img src={image} alt="" />
            </div>
            <div className="bills_content d-flex align-items-center justify-content-between">
              <div className="detail_col_1">
                <h6>Full name*</h6>
                {patient?.detials?.name}
              </div>
              <div className="detail_col_2">
                <h6>Email</h6>
                {patient?.detials?.email}
              </div>
              <div className="detail_col_3">
                <h6>Phone Number*</h6>
                {patient?.detials?.phone}
              </div>
              <div className="detail_col_5">
                <h6>Gender</h6>
                {patient?.detials?.gender}
              </div>
              <div className="detail_col_4">
                <h6>Age</h6>
                {patient?.detials?.age} years old
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="services_box">
          <form onSubmit={addService}>
            <h5>Services</h5>
            <ul>
              <li>
                <h4>Consultation Fee</h4>
                <p>₹{patient?.fees}</p>
                {/* <button className="bills_edit_cta">Edit</button>
              <button className="bills_delete_cta">Delete</button> */}
              </li>
              {services &&
                services.map((item, index) => (
                  <li key={index}>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                    <button
                      className="bills_edit_cta"
                      onClick={() => EditService(index, item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bills_delete_cta"
                      onClick={() => DeleteService(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
            <div className="add_service_box">
              <h3>Add New Service</h3>
              <input
                type="text"
                className="service_input"
                placeholder="Enter service name"
                name="name"
                onChange={(e) => handleService(e)}
                ref={complainref}
              />
              <input
                type="text"
                onChange={(e) => handleService(e)}
                className="service_input"
                placeholder="Price"
                name="price"
                ref={priceRef}
              />
              <input
                type="text"
                onChange={(e) => handleService(e)}
                className="service_input"
                placeholder="GST(%)"
                name="gst"
                ref={gstRef}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="service_save_btn">
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="divider"></div>
        <div className="amount_box">
          <h2>Amount Details</h2>
          <div>
            <div className="amount_content">
              <div className="d-flex justify-content-between">
                <p>Final Price</p>
                <span>₹{total ? total : patient?.fees}</span>
              </div>
              <div className="d-flex justify-content-between">
                <p>Tax</p>
                <span>₹0</span>
              </div>
              <div className="d-flex justify-content-between total_box">
                <p>Total Amount</p>
                <span>₹{totalAmount ? totalAmount : patient?.fees}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="pay_wrapper">
          <h1>Mode of Payment</h1>
          <div className="pay_type_selector">
            <p>
              <input
                type="radio"
                id="test1"
                name="radio-group"
                className="payment_radio_input"
                value="UPI"
                onClick={getPaymentDetail}
              />
              <label htmlFor="test1">UPI</label>
            </p>
            <p>
              <input
                type="radio"
                id="test2"
                name="radio-group"
                className="payment_radio_input"
                value="Netbanking"
                onClick={getPaymentDetail}
              />
              <label htmlFor="test2">Netbanking</label>
            </p>
            <p>
              <input
                type="radio"
                id="test3"
                name="radio-group"
                className="payment_radio_input"
                value="Credit/Debit Card"
                onClick={getPaymentDetail}
              />
              <label htmlFor="test3">Credit/Debit Card</label>
            </p>
            <p>
              <input
                type="radio"
                id="test4"
                name="radio-group"
                className="payment_radio_input"
                value="Cash"
                onClick={getPaymentDetail}
              />
              <label htmlFor="test4">Cash</label>
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="bill_submit" onClick={addBill}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientBills;
