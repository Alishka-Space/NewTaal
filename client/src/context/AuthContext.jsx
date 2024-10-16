import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    role: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (token && user && role) {
      setAuthState({ token, user, role });
    }
  }, []);

  const login = (token, user, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("role", role);

    setAuthState({ token, user, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setAuthState({ token: null, user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
