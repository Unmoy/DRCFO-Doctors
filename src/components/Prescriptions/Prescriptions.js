import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmModal from "./Modal";
import "./Prescriptions.css";
import SideNav from "./SideNav";
import Topbar from "./Topbar";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink, useLocation } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
const drugTemplate = {
  drugName: "",
  unit: "",
  dosage: "",
  duration: "",
  description: "",
};
const testTemplate = {
  test: "",
};
const Prescriptions = () => {
  const { id } = useParams();
  const [complain, setComplain] = useState("");
  const [treatment, setTreatment] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [followup, setFollowUp] = useState(null);
  const [drugList, setDrugList] = useState([drugTemplate]);
  const [drugSet, setDrugSet] = useState([]);
  const [testList, setTestList] = useState([testTemplate]);
  const [patient, setPatient] = useState({});
  const [docterId, setDoctorId] = useState("");
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const textInput = useRef(null);
  const [focusName, setFocusName] = useState("");
  const location = useLocation();
  const complainref = useRef(null);
  const diagnosisref = useRef(null);
  const treatmentref = useRef(null);
  const testref = useRef(null);
  // const dateref = useRef(null);
  const adviceref = useRef(null);
  const drugNameref = useRef(null);
  const [section, setSection] = useState("");
  const [drugName, setDrugName] = useState("");
  const [drugSetIndex, setDrugSetIndex] = useState(null);
  console.log(drugName);
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    fetch(
      `https://reservefree-backend.herokuapp.com/get/appointment?appointmentId=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctorId(data.docterId);
        setPatient(data);
      });
  }, [id]);
  useEffect(() => {
    console.log(drugName);
    if (drugName.length > 0) {
      fetch(
        `https://reservefree-backend.herokuapp.com/search?query=${drugName}&search=drug`
      )
        .then((res) => res.json())
        .then((data) => {
          setDrugSet(data);
        });
    }
  }, [drugName]);
  const addrow = (e) => {
    e.preventDefault();
    setDrugList([...drugList, drugTemplate]);
  };
  const addtest = (e) => {
    e.preventDefault();
    setTestList([...testList, testTemplate]);
  };
  const handleText = (e, index) => {
    e.preventDefault();
    if (e.target.name === "drugName") {
      setDrugName(e.target.value);
      setDrugSetIndex(index);
    }
    const updatedList = drugList.map((item, i) =>
      index === i
        ? Object.assign(item, {
            [e.target.name]: e.target.value,
          })
        : item
    );
    setDrugList(updatedList);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addrow(e);
    }
  };
  const handleTestKeyPress = (e, index) => {
    const newtestList = [...testList];
    if (e.key === "Enter") {
      if (e.target.value.length === 0) {
        e.preventDefault();
        newtestList.splice(index, 1);
        setTestList(newtestList);
        // DrugInput.current.focus();
        document.getElementById("drugInput").focus();
      } else {
        addtest(e);
      }
    }
  };
  const removeDrug = (e, index) => {
    // console.log(e.key);
    const filteredDrugs = [...drugList];
    if (e.key === "Enter" && e.target.value.length === 0) {
      e.preventDefault();
      filteredDrugs.splice(index, 1);
      // document.getElementById("date").focus();
      textInput.current.focus();
      console.log(textInput.current);
    }
    setDrugList(filteredDrugs);
  };

  const handleTests = (e, index) => {
    const updatedTestList = testList.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    setTestList(updatedTestList);
  };
  const handleComplain = (e) => {
    e.preventDefault();
    setComplain(e.target.value);
  };
  const handleTreatment = (e) => {
    e.preventDefault();
    setTreatment(e.target.value);
  };
  const handleDiagnosis = (e) => {
    e.preventDefault();
    setDiagnosis(e.target.value);
  };

  const handleAdvice = (e) => {
    e.preventDefault();
    setAdvice(e.target.value);
  };

  const submitbtn = (e) => {
    console.log(e);
    e.preventDefault();

    const precriptionData = {
      id,
      complain: complain,
      treatment: treatment,
      test: testList,
      drug: drugList,
      diagnosis: diagnosis,
      followUpdate: followup,
      generalAdvice: advice,
      template: saveTemplate,
      docterId: docterId,
    };
    setDisable(true);
    fetch("https://reservefree-backend.herokuapp.com/add/prescription", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(precriptionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        openModal();
      });
  };
  const loadTemplate = (id) => {
    console.log(id);
    window.scrollTo(0, 0);
    fetch(
      `https://reservefree-backend.herokuapp.com/get/prescription-template?id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setComplain(data.complain);
        setTreatment(data.treatment);
        setDiagnosis(data.diagnosis);
        setAdvice(data.generalAdvice);
        setFollowUp(data.followUpdate);
        setDrugList(data.drug);
        setTestList(data.test);
        document.getElementById("save_btn").disabled = true;
      });
  };

  const handleFocus = (e) => {
    // console.log(e.target.name);
    setFocusName(e.target.name);
    setSection("");
  };
  const onSuggestHandler = (value, index) => {
    // setDrugName(value);
    console.log(value);
    setDrugSet([]);
    setDrugList(
      drugList.map((item, i) => {
        if (index == i) {
          return { ...item, drugName: value };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    if (section === "complain") {
      complainref.current.focus();
    } else if (section === "diagnosis") {
      diagnosisref.current.focus();
    } else if (section === "treatment") {
      treatmentref.current.focus();
    } else if (section === "treatment") {
      treatmentref.current.focus();
    } else if (section === "test") {
      testref.current.focus();
    } else if (section === "drugName") {
      drugNameref.current.focus();
    } else if (section === "follow") {
      textInput.current.focus();
    } else if (section === "advice") {
      adviceref.current.focus();
    }
  }, [section]);
  console.log(drugList);
  console.log(drugSet);

  return (
    <>
      <Topbar docterId={docterId} loadTemplate={loadTemplate} />
      <div>
        <SideNav
          patient={patient}
          focusName={focusName}
          setSection={setSection}
          section={section}
        />
        <form onSubmit={submitbtn} autoComplete="off">
          <div className="prescription_outlet">
            <div className="prescription_container">
              <div className="prescription_content" id="complain">
                <label htmlFor="complain">Complain</label>
                <textarea
                  id="complain"
                  name="complain"
                  cols="120"
                  rows="7"
                  className="prescription_textarea"
                  onChange={handleComplain}
                  value={complain}
                  required
                  onFocus={handleFocus}
                  ref={complainref}
                ></textarea>
              </div>
              <div className="prescription_content" id="diagnosis">
                <label htmlFor="diagnosis">Diagnosis</label>
                <textarea
                  name="diagnosis"
                  cols="120"
                  rows="7"
                  className="prescription_textarea"
                  onChange={handleDiagnosis}
                  value={diagnosis}
                  onFocus={handleFocus}
                  ref={diagnosisref}
                ></textarea>
              </div>
              <div className="prescription_content" id="treatment">
                <label htmlFor="treatment">Treatment</label>
                <textarea
                  name="treatment"
                  cols="120"
                  rows="7"
                  className="prescription_textarea"
                  onChange={handleTreatment}
                  value={treatment}
                  onFocus={handleFocus}
                  ref={treatmentref}
                ></textarea>
              </div>
              <div className="prescription_content" id="tests">
                <label htmlFor="test">Test</label>
                {testList.map((test, index) => (
                  <div key={index}>
                    <input
                      autoFocus={index >= 1 ? true : false}
                      name="test"
                      type="text"
                      className="prescription_input"
                      placeholder="Write Test Name"
                      onChange={(e) => handleTests(e, index)}
                      defaultValue={test.test}
                      // onBlur={(e) => removeTest(e, index)}
                      onKeyDown={(e) => handleTestKeyPress(e, index)}
                      onFocus={handleFocus}
                      ref={testref}
                    ></input>
                  </div>
                ))}
                <div className="d-flex justify-content-end">
                  <button className="addtest_btn" onClick={addtest}>
                    Add More{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="enter_icon"
                    >
                      <path
                        d="M38.4371 0H6.56222C2.94369 0 0 2.94371 0 6.56258V38.4377C0 42.0563 2.94369 45 6.56254 45H38.4375C42.0563 45 45 42.0563 45 38.4374V6.56226C44.9997 2.94371 42.056 0 38.4371 0V0ZM37.4999 25.3124C37.4999 25.83 37.0799 26.25 36.5623 26.25H16.875V30.9374C16.875 31.2918 16.6744 31.616 16.3574 31.7755C16.2243 31.8411 16.0799 31.875 15.9374 31.875C15.7387 31.875 15.54 31.8113 15.3749 31.6876L7.87508 26.0626C7.63872 25.8862 7.49997 25.6069 7.49997 25.3124C7.49997 25.018 7.63872 24.7386 7.87508 24.5625L15.3749 18.9376C15.658 18.7238 16.0407 18.6918 16.3555 18.8494C16.6744 19.0088 16.875 19.3331 16.875 19.6875V24.3749H35.6245V14.0627C35.6245 13.5451 36.0445 13.1251 36.5621 13.1251C37.0797 13.1251 37.4997 13.5451 37.4997 14.0627L37.4999 25.3124Z"
                        fill="#B7B7B7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="prescription_content" id="drugs">
                <label htmlFor="test">RX</label>
                <table className="table_prescription">
                  <thead className="point-table-head">
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left">Drug Name</th>
                      <th className="text-center">Unit</th>
                      <th className="text-center">Dosage</th>
                      <th className="text-center">Duration</th>
                      <th className="text-center">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {drugList.map((item, index) => (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="drugname_input">
                          <input
                            // id="drugInput"
                            id={index < 1 ? "drugInput" : null}
                            autoFocus={index >= 1 ? true : false}
                            name="drugName"
                            type="text"
                            className="prescription_table_input"
                            onChange={(e) => {
                              handleText(e, index);
                            }}
                            onKeyDown={(e) => removeDrug(e, index)}
                            onBlur={() => {
                              setTimeout(() => {
                                setDrugSet([]);
                              }, 500);
                            }}
                            value={item.drugName}
                            onFocus={handleFocus}
                            ref={drugNameref}
                          />
                          {drugSetIndex === index && drugSet.length > 0 && (
                            <div className="drug_suggestion">
                              {drugSet.map((set, i) => (
                                <div
                                  key={i}
                                  className="drug_suggestion_card"
                                  onClick={() => {
                                    console.log(set.brandName);
                                    onSuggestHandler(set.brandName, index);
                                  }}
                                >
                                  {set.brandName},{" "}
                                  <span className="manufacturer">
                                    {set.composition}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="small_box">
                          <input
                            name="unit"
                            type="text"
                            className="prescription_table_input"
                            placeholder="e.g 1 table spoon"
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.unit}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="dosage"
                            type="text"
                            className="prescription_table_input"
                            placeholder="e.g 1-0-1"
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.dosage}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="duration"
                            type="text"
                            className="prescription_table_input"
                            placeholder="e.g 2 days"
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.duration}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="description"
                            type="text"
                            className="prescription_table_input"
                            placeholder=""
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.description}
                            onKeyDownCapture={handleKeyPress}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <button className="addrow_btn" onClick={addrow}>
                    Add More{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="enter_icon"
                    >
                      <path
                        d="M38.4371 0H6.56222C2.94369 0 0 2.94371 0 6.56258V38.4377C0 42.0563 2.94369 45 6.56254 45H38.4375C42.0563 45 45 42.0563 45 38.4374V6.56226C44.9997 2.94371 42.056 0 38.4371 0V0ZM37.4999 25.3124C37.4999 25.83 37.0799 26.25 36.5623 26.25H16.875V30.9374C16.875 31.2918 16.6744 31.616 16.3574 31.7755C16.2243 31.8411 16.0799 31.875 15.9374 31.875C15.7387 31.875 15.54 31.8113 15.3749 31.6876L7.87508 26.0626C7.63872 25.8862 7.49997 25.6069 7.49997 25.3124C7.49997 25.018 7.63872 24.7386 7.87508 24.5625L15.3749 18.9376C15.658 18.7238 16.0407 18.6918 16.3555 18.8494C16.6744 19.0088 16.875 19.3331 16.875 19.6875V24.3749H35.6245V14.0627C35.6245 13.5451 36.0445 13.1251 36.5621 13.1251C37.0797 13.1251 37.4997 13.5451 37.4997 14.0627L37.4999 25.3124Z"
                        fill="#B7B7B7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="prescription_content" id="follow">
                <label htmlFor="follow">Follow Up Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputRef={textInput}
                    value={followup}
                    onChange={(newValue) => {
                      setFollowUp(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        onFocus={() => {
                          setFocusName("follow");
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
                {/* <input
                  type="date"
                  className="prescription_date_input"
                  onChange={handleFollowup}
                  value={followup}
                /> */}
              </div>
              <div className="prescription_content" id="advice">
                <label htmlFor="advice">General advice</label>
                <textarea
                  onFocus={handleFocus}
                  id="date"
                  name="advice"
                  cols="120"
                  rows="7"
                  className="prescription_textarea"
                  onChange={handleAdvice}
                  value={advice}
                  ref={adviceref}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end me-5">
                <button
                  disabled={disable}
                  id="save_btn"
                  onClick={(e) => setSaveTemplate(true)}
                  className="save_btn"
                  type="submit"
                  name="submit"
                  value="true"
                >
                  Submit & Save as template
                </button>
                <button
                  disabled={disable}
                  type="submit"
                  className="submit_btn"
                  name="submit"
                  value="false"
                >
                  Submit
                </button>
                <ConfirmModal modalIsOpen={modalIsOpen} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Prescriptions;
