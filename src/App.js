import { CircularProgress, CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import RequiredAuth from "./pages/auth/RequiredAuth";
import Layout from "./Shared/Layout/Layout";
const App = () => {
  // Lazy load routes from src\pages
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
  const PassengerList = React.lazy(() => import("./pages/PassengerList"));
  const AncillaryService = React.lazy(() =>
    import("./pages/AncillaryServicePage")
  );
  const PassengerCheckIn = React.lazy(() => import("./pages/PassengerCheckIn"));
  const PassengerInFlight = React.lazy(() =>
    import("./pages/PassengerInFlight")
  );
  return (
    <>
      <CssBaseline />
      <React.Suspense
        fallback={<CircularProgress className="circular-center" />}
      >
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <RequiredAuth>
                  <Dashboard />
                </RequiredAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequiredAuth>
                  <Dashboard />
                </RequiredAuth>
              }
            />
            <Route
              path="/passenger-list"
              element={
                <RequiredAuth>
                  <PassengerList />
                </RequiredAuth>
              }
            />
            <Route
              path="/ancillary-services"
              element={
                <RequiredAuth>
                  <AncillaryService />
                </RequiredAuth>
              }
            />
            <Route
              path="/check-in"
              element={
                <RequiredAuth>
                  <PassengerCheckIn />
                </RequiredAuth>
              }
            />
            <Route
              path="/in-flight"
              element={
                <RequiredAuth>
                  <PassengerInFlight />
                </RequiredAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            {/* 404 Page Redirection */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </React.Suspense>
    </>
  );
};

export default App;
