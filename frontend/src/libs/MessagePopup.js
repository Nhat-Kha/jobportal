import { useEffect } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MessagePopup = (props) => {
  const showToast = () => {
    toast[props.icon](props.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide,
    });
  };

  useEffect(() => {
    if (props.open) {
      showToast();
    }
  }, [props.open, props.icon, props.message]);

  return null;
};

export default MessagePopup;
