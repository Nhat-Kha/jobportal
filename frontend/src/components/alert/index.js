import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export default function Alert({ type, message }) {
  switch (type) {
    case "info":
      toast.info(message, {
        toastId: "info",
      });
      break;
    case "success":
      toast.success(message, {
        toastId: "success",
      });
      break;
    case "warning":
      toast.warning(message, {
        toastId: "warning",
      });
      break;
    case "error":
      toast.error(message, {
        toastId: "error",
      });
      break;
    default:
      toast(message, {
        toastId: "default",
      });
      break;
  }
}
