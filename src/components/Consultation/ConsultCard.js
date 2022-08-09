import React, { useState } from "react";
import "./ConsultCard.css";
const ConsultCard = ({ setOpen }) => {
  return (
    <div className="ConsultCard">
      <div>
        <h2>Activate Video Consultation</h2>
        <p>
          Provide secure video consultation to your patients from the comfort of
          your home
        </p>
      </div>
      <div>
        <button className="start_consult_cta">Get Started</button>
        <button className="close_consult_panel" onClick={() => setOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConsultCard;
