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
import PrivateRoute from "./components/Authentication/PrivateRoute";
// APP JS
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Dashboard Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<Monitor />} />
          <Route path="monitor" element={<Monitor />} />
          <Route path="clinicscreen" element={<Clinicscreen />} />
          <Route path="patient" element={<PatientScreen />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="legal" element={<AppointmentListForm />} />
          <Route path="doctordetails" element={<DoctorDetails />} />
          <Route path="tabs/:id" element={<ClinicTabs />} />
        </Route>
        {/* Prescrition Routes */}
        <Route
          path="/prescription/:id"
          element={
            <PrivateRoute>
              <Prescriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/createappointment"
          element={
            <PrivateRoute>
              <CreateAppointment />
            </PrivateRoute>
          }
        ></Route>
        {/* Other Routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/clinicdetails"
          element={
            <PrivateRoute>
              <ClinicStepper step="0" />
            </PrivateRoute>
          }
        />
        <Route
          path="/addslots"
          element={
            <PrivateRoute>
              <ClinicStepper step="2" />
            </PrivateRoute>
          }
        />
        <Route
          path="/editslots/:id"
          element={
            <PrivateRoute>
              <UpdateSlots />
            </PrivateRoute>
          }
        />
        <Route
          path="editclinic/:id"
          element={
            <PrivateRoute>
              <EditClinic />
            </PrivateRoute>
          }
        />
        <Route
          path="editpatient/:id"
          element={
            <PrivateRoute>
              <EditPatient />
            </PrivateRoute>
          }
        />
        <Route
          path="createslot/:id"
          element={
            <PrivateRoute>
              <CreateSlot />
            </PrivateRoute>
          }
        />
        <Route
          path="updatedashboardslots/:clinicid/:slotid"
          element={
            <PrivateRoute>
              <UpdateDashboardSlots />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

const Analytics = () => {
  return <div className="text-center fs-5 fw-bold">Analytics</div>;
};
