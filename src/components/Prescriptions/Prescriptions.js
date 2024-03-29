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
import PatientVitals from "./PatientVitals";
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
  const [VitalsModalIsOpen, setVitalsModalOpen] = useState(false);
  const complainref = useRef(null);
  const diagnosisref = useRef(null);
  const treatmentref = useRef(null);
  const testref = useRef(null);
  const adviceref = useRef(null);
  const drugNameref = useRef(null);
  const [section, setSection] = useState("");
  const [drugName, setDrugName] = useState("");
  const [drugSetIndex, setDrugSetIndex] = useState(null);
  const [vitalsData, setVitalsData] = useState({});
  const [complaintags, setComplainTags] = useState([]);
  const [diagnosetags, setDiagnoseTags] = useState([]);
  const [treatmenttags, setTreatmentTags] = useState([]);
  const [advicetags, setAdviceTags] = useState([]);
  console.log(advicetags);
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
    // console.log(drugName);
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

  const handleAdvice = (e) => {
    e.preventDefault();
    setAdvice(e.target.value);
  };

  const submitbtn = (e) => {
    console.log(e);
    e.preventDefault();

    const precriptionData = {
      id,
      complain: complaintags,
      treatment: treatmenttags,
      test: testList,
      drug: drugList,
      diagnosis: diagnosetags,
      followUpdate: followup,
      generalAdvice: advicetags,
      template: saveTemplate,
      docterId: docterId,
      vitals: vitalsData,
    };
    setDisable(true);
    console.log(precriptionData);
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

        if (data.message == "SUCCESS") {
          openModal();
        }
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

  const removeDiagnoseTags = (indexToRemove) => {
    setDiagnoseTags([
      ...diagnosetags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addDiagnoseTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setDiagnoseTags([...diagnosetags, text]);
      event.target.value = "";
    }
  };
  const updateDiagnoseTagsHandler = (e) => {
    if (diagnosetags.length > 0 && e.target.value == "") {
      const copyOfTags = [...diagnosetags];
      copyOfTags.pop();
      setDiagnoseTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getDiagnoseTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...diagnosetags.filter((_, index) => index !== i)];
    setDiagnoseTags(copyOfTags);
    // console.log(copyOfTags);
    if (diagnosisref.current) {
      diagnosisref.current.value = text;
      diagnosisref.current.focus();
    }
  };
  const setDiagnoseFocus = () => {
    if (diagnosisref.current) {
      diagnosisref.current.focus();
    }
  };
  const removeAdviceTags = (indexToRemove) => {
    setAdviceTags([
      ...advicetags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addAdviceTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setAdviceTags([...advicetags, text]);
      event.target.value = "";
    }
  };
  const updateAdviceTagsHandler = (e) => {
    if (advicetags.length > 0 && e.target.value == "") {
      const copyOfTags = [...advicetags];
      copyOfTags.pop();
      setAdviceTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getAdviceTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...advicetags.filter((_, index) => index !== i)];
    setAdviceTags(copyOfTags);
    // console.log(copyOfTags);
    if (adviceref.current) {
      adviceref.current.value = text;
      adviceref.current.focus();
    }
  };
  const setAdviceFocus = () => {
    if (adviceref.current) {
      adviceref.current.focus();
    }
  };
  const removeTreatmentTags = (indexToRemove) => {
    setTreatmentTags([
      ...treatmenttags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTreatmentTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setTreatmentTags([...treatmenttags, text]);
      event.target.value = "";
    }
  };
  const updateTreatmentTagsHandler = (e) => {
    if (treatmenttags.length > 0 && e.target.value == "") {
      // console.log(e);
      const copyOfTags = [...treatmenttags];
      copyOfTags.pop();
      setTreatmentTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getTreatmentTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...treatmenttags.filter((_, index) => index !== i)];
    setTreatmentTags(copyOfTags);
    // console.log(copyOfTags);
    if (treatmentref.current) {
      treatmentref.current.value = text;
      treatmentref.current.focus();
    }
  };
  const setTreatmentFocus = () => {
    if (treatmentref.current) {
      treatmentref.current.focus();
    }
  };
  const removeTags = (indexToRemove) => {
    setComplainTags([
      ...complaintags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTags = (event) => {
    // console.log(event.target.value.length);
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setComplainTags([...complaintags, text]);
      event.target.value = "";
    }
  };
  const updateTagsHandler = (e) => {
    // console.log(e.target.value.length);
    if (complaintags.length > 0 && e.target.value == "") {
      // console.log(e);
      const copyOfTags = [...complaintags];
      copyOfTags.pop();
      setComplainTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...complaintags.filter((_, index) => index !== i)];
    setComplainTags(copyOfTags);
    // console.log(copyOfTags);
    if (complainref.current) {
      complainref.current.value = text;
      complainref.current.focus();
    }
  };
  const setcomplainFocus = () => {
    if (complainref.current) {
      complainref.current.focus();
    }
  };

  return (
    <>
      <Topbar
        docterId={docterId}
        loadTemplate={loadTemplate}
        setIsOpen={setVitalsModalOpen}
        modalIsOpen={VitalsModalIsOpen}
        setVitalsData={setVitalsData}
        vitalsData={vitalsData}
        patient={patient}
      />
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
              {vitalsData.weight ||
              vitalsData.bp_input1 ||
              vitalsData.bp_input2 ||
              vitalsData.diabetes ||
              vitalsData.height ||
              vitalsData.hip ||
              vitalsData.SPO2 ||
              vitalsData.pulse ||
              vitalsData.temperature ? (
                <>
                  <label className="vitals_header">
                    Vitals
                    <span
                      className="vitals_edit_cta"
                      onClick={() => setVitalsModalOpen(true)}
                    >
                      (edit)
                    </span>
                  </label>
                  <PatientVitals vitalsData={vitalsData} />
                </>
              ) : null}

              <div className="prescription_content" id="complain">
                <label htmlFor="complain">Complain</label>
                <div className="tags-input" onClick={setcomplainFocus}>
                  <ul id="tags">
                    {complaintags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeTags(index)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        id="complain"
                        name="complain"
                        cols="50"
                        rows="1"
                        className="complain_textarea"
                        onKeyUp={(event) =>
                          event.code == "Enter" ? addTags(event) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace" ? updateTagsHandler(e) : null
                        }
                        onFocus={handleFocus}
                        ref={complainref}
                      ></textarea>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="prescription_content" id="diagnosis">
                <label htmlFor="diagnosis">Diagnosis</label>
                <div className="tags-input" onClick={setDiagnoseFocus}>
                  <ul id="tags">
                    {diagnosetags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getDiagnoseTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeDiagnoseTags(index)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        name="diagnosis"
                        id="diagnosis"
                        cols="50"
                        rows="1"
                        className="diagnose_textarea"
                        onFocus={handleFocus}
                        ref={diagnosisref}
                        onKeyUp={(e) =>
                          e.code == "Enter" ? addDiagnoseTags(e) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace"
                            ? updateDiagnoseTagsHandler(e)
                            : null
                        }
                      ></textarea>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="prescription_content" id="treatment">
                <label htmlFor="treatment">Treatment</label>
                <div className="tags-input" onClick={setTreatmentFocus}>
                  <ul id="tags">
                    {treatmenttags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getTreatmentTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeTreatmentTags(index)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        name="treatment"
                        id="treatment"
                        cols="50"
                        rows="1"
                        className="treatment_textarea"
                        onFocus={handleFocus}
                        ref={treatmentref}
                        onKeyUp={(e) =>
                          e.code == "Enter" ? addTreatmentTags(e) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace"
                            ? updateTreatmentTagsHandler(e)
                            : null
                        }
                      ></textarea>
                    </li>
                  </ul>
                </div>
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
                <div className="tags-input" onClick={setAdviceFocus}>
                  <ul id="tags">
                    {advicetags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getAdviceTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeAdviceTags(index)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        id="date"
                        name="advice"
                        cols="50"
                        rows="1"
                        className="advice_textarea"
                        onKeyUp={(event) =>
                          event.code == "Enter" ? addAdviceTags(event) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace"
                            ? updateAdviceTagsHandler(e)
                            : null
                        }
                        onFocus={handleFocus}
                        ref={adviceref}
                      ></textarea>
                    </li>
                  </ul>
                </div>
                {/* <textarea
                  onFocus={handleFocus}
                  id="date"
                  name="advice"
                  cols="120"
                  rows="7"
                  className="advice_textarea"
                  ref={adviceref}
                ></textarea> */}
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
