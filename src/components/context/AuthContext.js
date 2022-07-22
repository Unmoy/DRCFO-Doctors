import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authentication } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      if (user) {
        setCurrentUser({
          user_name: user.displayName,
          user_email: user.email,
          user_uid: user.uid,
        });
        fetch("https://reservefree-backend.herokuapp.com/auth/docter", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("doctor_id", data.id);
            if (data.message === "SUCCESS") {
              if (data.docter) {
                navigate("/");
              } else {
                navigate("/clinicdetails");
              }
            } else {
              console.log(data.message);
            }
          });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  async function signInWithPhone(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   return signInWithPhoneNumber(auth, number, recaptchaVerifier);
        },
      },
      auth
    );
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }
  async function signInWithOtp(result, otp) {
    try {
      const res = await result.confirm(otp);
      const user = res.user;
      if (user) {
        console.log(user);
        setCurrentUser({
          user_phone: user.phoneNumber,
          user_uid: user.uid,
        });

        fetch("https://reservefree-backend.herokuapp.com/auth/docter", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            phone: user.phoneNumber,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "SUCCESS") {
              localStorage.setItem("doctor_id", data.id);
              if (data.docter) {
                navigate("/");
              } else {
                navigate("/clinicdetails");
              }
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logout() {
    auth.signOut();
    setCurrentUser({});
    return;
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          user_name: user._delegate.displayName,
          user_email: user._delegate.email,
          user_uid: user._delegate.uid,
          user_phone: user._delegate.phoneNumber,
        });
        // fetch("https://reservefree-backend.herokuapp.com/auth/docter", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     uid: user._delegate.uid,
        //     phone: user._delegate.phoneNumber,
        //   }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data.message === "SUCCESS") {
        //       localStorage.setItem("doctor_id", data.id);
        //       if (data.docter) {
        //         navigate("/");
        //       } else {
        //         navigate("/clinicdetails");
        //       }
        //     }
        //   });
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    signInWithPhone,
    signInWithOtp,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
