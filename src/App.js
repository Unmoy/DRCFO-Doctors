import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Monitor from "./components/Dashboard/Monitor/Monitor";
import { AuthProvider } from "./components/context/AuthContext";
import ClinicStepper from "./components/ClinicStepper/ClinicStepper";
import UpdateSlots from "./components/ClinicStepper/UpdateSlots";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import Clinicscreen from "./components/Clinicscreen/Clinicscreen";
import ClinicTabs from "./components/Clinicscreen/ClinicTabs";
import PatientScreen from "./components/PatientScreen/PatientScreen";
import EditClinic from "./components/EditClinic/EditClinic";
import EditPatient from "./components/EditPatient/EditPatient";
import UpdateDashboardSlots from "./components/Clinicscreen/UpdateDashboardSlots";
import Prescriptions from "./components/Prescriptions/Prescriptions";
import CreateSlot from "./components/Clinicscreen/CreateSlot";
import CreateAppointment from "./components/CreateAppointment/CreateAppointment";
import AppointmentListForm from "./components/AppointmentListForm/AppointmentListForm";
// APP JS
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clinicdetails" element={<ClinicStepper step="0" />} />
        <Route path="/addslots" element={<ClinicStepper step="2" />} />
        <Route path="/editslots/:id" element={<UpdateSlots />} />
        <Route exact path="editclinic/:id" element={<EditClinic />} />
        <Route exact path="editpatient/:id" element={<EditPatient />} />
        <Route exact path="createslot/:id" element={<CreateSlot />} />
        <Route
          exact
          path="updatedashboardslots/:clinicid/:slotid"
          element={<UpdateDashboardSlots />}
        />
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Monitor />} />
          <Route path="monitor" element={<Monitor />} />
          <Route exact path="clinicscreen" element={<Clinicscreen />} />
          <Route exact path="patient" element={<PatientScreen />} />
          <Route exact path="analytics" element={<Analytics />} />
          <Route exact path="legal" element={<AppointmentListForm />} />
          <Route exact path="doctordetails" element={<DoctorDetails />} />
          <Route exact path="tabs/:id" element={<ClinicTabs />} />
        </Route>
        {/* Prescrition Routes */}
        <Route path="/prescription/:id" element={<Prescriptions />} />
        <Route
          exact
          path="/createappointment"
          element={<CreateAppointment />}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

const Analytics = () => {
  return <div className="text-center fs-5 fw-bold">Analytics</div>;
};
