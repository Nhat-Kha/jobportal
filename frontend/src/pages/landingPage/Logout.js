import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

import { SetPopupContext } from "App";
import Home from "./Home";
const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
  }, []);
  return <Navigate to="/" element={<Home />} />;
};

export default Logout;
