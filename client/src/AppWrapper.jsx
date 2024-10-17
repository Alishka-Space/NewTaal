import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
