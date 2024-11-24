import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Shared/ProtectedRoute";
import AppNavbar from "./components/Layout/Navbar";
// import Staffs from "./pages/Staffs";
// import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import AppFooter from "./components/Layout/Footer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Spinner } from "react-bootstrap";
const LazyStaffs = React.lazy(() => import("./pages/Staffs"));
const LazyServices = React.lazy(() => import("./pages/Services"));
const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong!</div>}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/" element={<Navigate to="/appointments" />} /> */}
            <Route path="/" element={<Appointments />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/services"
              element={
                <Suspense
                  fallback={
                    <div
                      className="position-relative"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minHeight: "50vh",
                      }}
                    >
                      <Spinner animation="border" variant="primary" />
                    </div>
                  }
                >
                  <LazyServices />
                </Suspense>
              }
            />
            <Route
              path="/staffs"
              element={
                <Suspense
                  fallback={
                    <div
                      className="position-relative"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minHeight: "50vh",
                      }}
                    >
                      <Spinner animation="border" variant="primary" />
                    </div>
                  }
                >
                  <LazyStaffs />
                </Suspense>
              }
            />
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
    </ErrorBoundary>
  );
};

export default App;
