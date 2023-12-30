import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import { SetPopupContext } from "App";
import Home from "./Home";
const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
  }, []);
  return <Navigate to="/" element={<Home />} />;
};

export default Logout;
