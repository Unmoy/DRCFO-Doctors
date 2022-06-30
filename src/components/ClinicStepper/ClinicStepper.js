import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./ClinicStepper.css";
import PersonalDetail from "./PersonalDetail";
import ClinicDetail from "./ClinicDetail";
import Availability from "./Availability";
import { Navigate } from "react-router-dom";
import UpdateSlots from "./UpdateSlots";
const steps = ["Personal Details", "Clinic Details/Location", "Availability"];
const ClinicStepper = (props) => {
  const [activeStep, setActiveStep] = useState(parseInt(props.step));
  console.log(props.step);
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetail setActiveStep={setActiveStep} />;
      case 1:
        return <ClinicDetail setActiveStep={setActiveStep} />;
      case 2:
        return <Availability setActiveStep={setActiveStep} />;
      default:
        return "Page Not Available";
    }
  }
  return (
    <div className="clinic_stepper_screen">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Navigate to="/dashboard" />
          </>
        ) : (
          <>{getStepContent(activeStep)}</>
        )}
      </Box>
    </div>
  );
};

export default ClinicStepper;
