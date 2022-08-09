import "./SideNav.css";
import userjpg from "../../assets/images/user.jpg";
import { useNavigate } from "react-router-dom";
const SideNav = ({ patient, focusName, setSection, section }) => {
  const navigate = useNavigate();
  const navigatetobills = () => {
    navigate(`/patientbills/${patient._id}`);
  };
  return (
    <div className="sidenav">
      <div className="sidenav_brand">
        <img src={userjpg} alt="" className="sidenav_user_image" />
        <div className="">
          <h1 className="side_brand_name">{patient?.detials?.name}</h1>
          <p className="side_brand_age">
            {patient?.detials?.gender}, {patient?.detials?.age} years
          </p>
          <p className="side_brand_number">{patient?.detials?.phone}</p>
        </div>
      </div>
      <button className="medical_history_cta" onClick={navigatetobills}>
        Medical History
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="bottom_bar"></div>
      <div className="sidebar_menu">
        {/* Dashboard */}
        <div
          onClick={() => setSection("complain")}
          className={
            section === "complain" || focusName === "complain"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Complain</span>
        </div>
        {/* Clinic */}
        <div
          onClick={() => setSection("diagnosis")}
          className={
            section === "diagnosis" || focusName === "diagnosis"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Diagnosis</span>
        </div>
        {/* Patients */}
        <div
          onClick={() => setSection("treatment")}
          className={
            section === "treatment" || focusName === "treatment"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Treatment</span>
        </div>
        {/* Analytics */}
        <div
          onClick={() => setSection("test")}
          className={
            section === "test" || focusName === "test"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Test</span>
        </div>
        {/* Legal */}
        <div
          onClick={() => setSection("drugName")}
          className={
            section === "drugName" || focusName === "drugName"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Drugs</span>
        </div>
        {/* Follow up */}
        <div
          onClick={() => setSection("follow")}
          className={
            section === "follow" || focusName === "follow"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">Follow up</span>
        </div>
        {/* General advice */}
        <div
          onClick={() => setSection("advice")}
          className={
            section === "advice" || focusName === "advice"
              ? "sidebar_nav_item active"
              : "sidebar_nav_item"
          }
        >
          <span className="menu--text">General advice</span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
