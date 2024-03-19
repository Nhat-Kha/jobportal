import { useContext, useEffect, useState } from "react";
import InputField from "components/InputField";
import apiList from "../../../libs/apiList";
import axios from "axios";
import { SetPopupContext } from "App";
import { userType } from "libs/isAuth";
import { useNavigate } from "react-router-dom";

export default function ResetPassword({ forgotPassword }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const setPopup = useContext(SetPopupContext);
  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
  });

  const type = userType();
  let history = useNavigate();

  useEffect(() => {
    if (type === "applicant") {
      history("/referrals");
    } else if (type === "recruiter") {
      history("/admin");
    }
  }, [type, history]);

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };
  const handleForgot = async () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    try {
      if (verified) {
        const response = await axios.post(apiList.forgot, { email });
        setPopup({
          open: true,
          icon: "success",
          message: "Successfully sent email",
        });
        console.log(response);
      } else {
        setPopup({
          open: true,
          icon: "warn",
          message: "Sent Email Fail",
        });
      }
    } catch (err) {
      setPopup({
        open: true,
        icon: "error",
        message: err.message || "An error occurred",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary md:pt-24 pt-12">
      <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none">
          Forgot your password?
        </h2>
        <p className="text-md text-gray-600 pb-8">
          Enter your email and we will send a link to you so that you can access
          your account again.
        </p>

        <InputField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname@example.com"
        />

        <p className="text-xs text-center mt-6 mb-3 text-red-500">
          {errorMessage}
        </p>

        <button
          type="submit"
          className="mt-2 w-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-100 font-semibold cursor-pointer px-4 py-3 rounded-lg text-sm"
          onClick={handleForgot}
        >
          Send reset email
        </button>

        <p className="text-xs text-center mt-6 mb-3">{message}</p>
      </div>
    </div>
  );
}
