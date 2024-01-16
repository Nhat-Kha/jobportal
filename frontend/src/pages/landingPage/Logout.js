import { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { SetPopupContext } from "App";
import Home from "./Home";

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const logout = async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      localStorage.removeItem("id");
      setPopup({
        open: true,
        icon: "success",
        message: "Logged out successfully",
      });

      setLoggedOut(true);
    };

    logout();
  }, [setPopup]);
  return <Navigate to="/" element={<Home />} />;
};

export default Logout;
