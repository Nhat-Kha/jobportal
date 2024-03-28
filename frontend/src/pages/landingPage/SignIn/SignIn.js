import { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputField from "components/InputField";
import { SetPopupContext } from "App";
import axios from "axios";
import isAuth from "libs/isAuth";
import apiList from "../../../libs/apiList";
import { userType } from "libs/isAuth";

export default function SignIn({ login }) {
  const setPopup = useContext(SetPopupContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedin, setLoggedin] = useState(isAuth());
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  let allFieldsChecked =
    loginDetails.email.length > 0 && loginDetails.password.length > 0;

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("id", response.data._id);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            icon: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            icon: "warn",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        icon: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (allFieldsChecked) {
      handleLogin();
      console.log("Input valid on form submission:", loginDetails);
    } else {
      setPopup({
        open: true,
        icon: "warn",
        message: "Please fill in all required fields",
      });
    }
  };

  const type = userType();
  let history = useNavigate();

  useEffect(() => {
    if (type === "applicant") {
      history("/referrals");
    } else if (type === "recruiter") {
      history("/admin");
    } else if (type === "admin") {
      history("/dashboard/*");
    }
  }, [type, history]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-[#f8e5d4] md:pt-24 pt-12">
        <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
          <h2 className="text-4xl font-semibold text-gray-900 leading-none">
            Sign in
          </h2>
          <p className="text-md text-gray-600 pb-8">
            Please enter your details below to sign in.
          </p>

          <InputField
            type="email"
            label="Email"
            value={loginDetails.email}
            error={inputErrorHandler.email.message}
            onChange={(e) => handleInput("email", e.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            placeholder="email@example.com"
            onBlur={(e) => {
              if (e.target.value === "") {
                handleInputError("email", true, "Email is required!");
              } else {
                handleInputError("email", false, "");
              }
            }}
          />

          <InputField
            type="password"
            label="Password"
            value={loginDetails.password}
            error={inputErrorHandler.password.message}
            onChange={(e) => handleInput("password", e.target.value)}
            placeholder="**********"
            onBlur={(e) => {
              if (e.target.value === "") {
                handleInputError("password", true, "Password is required!");
              } else {
                handleInputError("password", false, "");
              }
            }}
          />

          <p className="text-xs text-center mt-6 mb-3 text-red-500">
            {errorMessage}
          </p>

          <button
            type="submit"
            className={`mt-2 w-full font-semibold px-4 py-3 rounded-lg text-sm ${
              allFieldsChecked
                ? "bg-primary text-gray-500 hover:bg-[#F2994A] hover:text-black border-yellow-100 cursor-pointer"
                : "bg-yellow-100 text-yellow-800 cursor-not-allowed border-yellow-100"
            }`}
          >
            Sign in
          </button>

          <Link
            className="block text-xs text-center mt-6 hover:underline text-semibold cursor-pointer
          hover:text-[#91b4bd]"
            to="/sign-in/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </form>
  );
}
