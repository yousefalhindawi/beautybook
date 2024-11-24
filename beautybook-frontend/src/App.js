import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Navigate,
} from "react-router-dom";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import AppointmentList from "./components/Appointments/AppointmentList";
// import ProtectedRoute from "./components/Shared/ProtectedRoute";
// import Test from "../Test";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
// import Test from "./Test";
import ProtectedRoute from "./components/Shared/ProtectedRoute";
import AppNavbar from "./components/Layout/Navbar";
import Staffs from "./pages/Staffs";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import AppFooter from "./components/Layout/Footer";

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/appointments" />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/staffs" element={<Staffs />} />
        </Route>
        {/* <Route path="/" element={<Navigate to="/appointments" />} /> */}
        {/* <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentList />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <AppFooter />
    </Router>
  );
};

export default App;
