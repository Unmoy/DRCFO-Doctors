import React from "react";
import "./PatientVitals.css";
const PatientVitals = ({ vitalsData }) => {
  console.log(vitalsData);
  return (
    <div className="PatientVitals">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-evenly vitals_box">
          <div>
            <h1>BP(mmHg)</h1>
            <p>
              {vitalsData?.bp_input1 ? vitalsData.bp_input1 : "NA"}/
              {vitalsData?.bp_input2 ? vitalsData.bp_input2 : "NA"}
            </p>
          </div>
          <div>
            <h1>Pulse(bpm)</h1>
            <p>{vitalsData?.pulse ? vitalsData.pulse : "NA"}</p>
          </div>
          <div>
            <h1>Height(cm)</h1>
            <p>{vitalsData?.height ? vitalsData.height : "NA"}</p>
          </div>
          <div>
            <h1>On set Diabetes(mg/dL)</h1>
            <p>{vitalsData?.diabetes ? vitalsData.diabetes : "NA"}</p>
          </div>
          <div>
            <h1>Weight(kg)</h1>
            <p>{vitalsData?.weight ? vitalsData.weight : "NA"}</p>
          </div>
          <div>
            <h1>Hip(cm)</h1>
            <p>{vitalsData?.hip ? vitalsData.hip : "NA"}</p>
          </div>
          <div>
            <h1>Temperature(f)</h1>
            <p>{vitalsData?.temperature ? vitalsData.temperature : "NA"}</p>
          </div>
          <div>
            <h1>SPO2(%)</h1>
            <p>{vitalsData?.SPO2 ? vitalsData.SPO2 : "NA"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientVitals;
