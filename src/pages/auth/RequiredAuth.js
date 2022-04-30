import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children, auth: { isAuthenticated } }) => {
  const location = useLocation();
  return isAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RequiredAuth);
