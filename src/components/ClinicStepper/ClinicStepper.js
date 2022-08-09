import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./ClinicStepper.css";
import PropTypes from "prop-types";
import PersonalDetail from "./PersonalDetail";
import ClinicDetail from "./ClinicDetail";
import Availability from "./Availability";
import { Navigate } from "react-router-dom";
import UpdateSlots from "./UpdateSlots";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
const steps = ["Personal Details", "Clinic Details/Location", "Availability"];
const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#49AA19",
  }),
  "& .QontoStepIcon-completedIcon": {
    backgroundColor: "#49AA19",
    borderRadius: "50%",
    width: 20,
    height: 20,
    zIndex: 1,
  },
  "& .QontoStepIcon-circle": {
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        // <Check className="QontoStepIcon-completedIcon" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          className="QontoStepIcon-completedIcon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}
QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

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
                <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            <Navigate to="/" />
          </>
        ) : (
          <>{getStepContent(activeStep)}</>
        )}
      </Box>
    </div>
  );
};

export default ClinicStepper;
