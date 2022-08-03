import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { ToastContainer } from "react-toastify";

import { HMSRoomProvider } from "@100mslive/react-sdk";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
    <ToastContainer
      hideProgressBar={false}
      position="bottom-left"
      className="color_toast"
    />
  </BrowserRouter>
);
