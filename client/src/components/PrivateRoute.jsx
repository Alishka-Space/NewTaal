import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.token) {
      navigate("/signin");
    }
  }, [authState, navigate]);

  return authState.token ? <Outlet /> : null;
};

export default PrivateRoute;
