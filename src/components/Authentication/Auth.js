import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner.png";
import google from "../../assets/images/g-icon.png";
import "./Login.css";
import "./OtpForm.css";
import { useNavigate } from "react-router-dom";
import RippleButton from "../Shared/RippleButton";

const Login = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("login");
  const [loading, setLoading] = useState(false);
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const { currentUser } = useAuth();
  const { signInWithGoogle } = useAuth();
  const { signInWithPhone } = useAuth();
  const { signInWithOtp } = useAuth();
  const { logout } = useAuth();

  const googleLogin = async () => {
    try {
      setError("");
      await signInWithGoogle();
    } catch {
      setError("Failed to create an account");
    }
  };

  const getOtp = async () => {
    console.log(number);
    if (number === "" || number === undefined) return setStatus("login");
    try {
      let newNumber = "+91" + number;
      const response = await signInWithPhone(newNumber);
      setStatus("otp");
      setResult(response);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    let otp1 = "";
    otp.map((o) => (otp1 += o));
    if (otp1 === "" || otp1 === null) return;
    signInWithOtp(result, otp1);
    setLoading(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getOtp();
    }
  };
  const handleVerifyKeyPress = (e) => {
    if (e.key === "Enter") {
      verifyOtp();
    }
  };
  return (
    <section className="login_screen">
      <div className="container">
        <div className="row d-flex align-items-center">
          {status === "login" && (
            <>
              <div className="col-md-6 mb-4">
                <div className="login_form">
                  <h1>Welcome!</h1>
                  <p className="login_sub_heading">
                    Sign In entering the information below
                  </p>
                  <div>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      className="number_input"
                      placeholder="Enter Phone Number"
                      value={
                        number !== "" && number !== undefined ? number : null
                      }
                      onChange={(e) => setNumber(e.target.value)}
                      onKeyDown={handleKeyPress}
                      autoFocus={number ? "autofocus" : "autofocus"}
                    />
                    <div id="recaptcha-container" />
                    <div className="login_btn">
                      <button
                        onClick={() => {
                          getOtp();
                        }}
                      >
                        Log In
                      </button>
                    </div>
                    <div className="divider">
                      <h1>or</h1>
                    </div>
                    <div className="google_btn">
                      <button
                        onClick={() => {
                          googleLogin();
                        }}
                      >
                        Log in with <img src={google} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login_banner col-md-6">
                <img src={banner} alt="" />
              </div>
            </>
          )}
          {status === "otp" && (
            <>
              <div className="col-md-6 mb-4">
                <div className="login_form">
                  <h1>Welcome!</h1>
                  <p className="otp_login_sub_heading">
                    Enter the OTP, we have sended on your number
                  </p>
                  <div>
                    <div className="w-75 d-flex justify-content-between mb-0">
                      <p className="num">+91-{number}</p>
                      <p
                        className="change_num"
                        onClick={async () => {
                          await setStatus("login");
                          setOtp(new Array(6).fill(""));
                          document.getElementById("number").focus();
                        }}
                      >
                        Change Number
                      </p>
                    </div>
                    <div className="w-75 otp_box d-flex justify-content-center ms-3">
                      {otp.map((data, index) => {
                        return (
                          <input
                            autoFocus={index == 0 ? true : false}
                            className="verify_otp"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            onKeyDown={handleVerifyKeyPress}
                          />
                        );
                      })}
                    </div>
                    <div className="login_btn">
                      <button
                        onClick={() => {
                          verifyOtp();
                        }}
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login_banner col-md-6">
                <img src={banner} alt="" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
