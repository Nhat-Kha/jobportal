import InputField from "components/InputField";

export default function EmailInput({ props }) {
  const {
    value,
    onChange,
    label,
    inputErrorHandler,
    handleInputError,
    required,
    className,
  } = props;

  return (
    <InputField
      label={label}
      value={value}
      onChange={onChange}
      onBlur={(event) => {
        if (event.target.value === "") {
          if (required) {
            handleInputError("email", true, "Email is required");
          } else {
            handleInputError("email", false, "");
          }
        } else {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(event.target.value).toLowerCase())) {
            handleInputError("email", false, "");
          } else {
            handleInputError("email", true, "Incorrect email format");
          }
        }
      }}
      error={inputErrorHandler.email.error}
      className={className}
    />
  );
}
