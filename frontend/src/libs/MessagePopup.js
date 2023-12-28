import swal from "sweetalert";

export default function MessagePopup(props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  if (props.open) {
    swal({
      title: props.title === "success" ? "Good job!" : "Again",
      text: props.message === true ? "You clicked the button!" : "",
      icon: props.icon === "success" ? "success" : "error",
      onClose: handleClose,
    });
  }

  return null;
}
