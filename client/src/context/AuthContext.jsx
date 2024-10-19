import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
    role: localStorage.getItem("role"),
    id: localStorage.getItem("id"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");

    if (token && user && role) {
      setAuthState({ token, user, role, id });
    }
  }, []);

  const login = (token, user, role, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("role", role);
    localStorage.setItem("id", id);

    setAuthState({ token, user, role, id });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("id");

    setAuthState({ token: null, user: null, role: null, id: null });
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
