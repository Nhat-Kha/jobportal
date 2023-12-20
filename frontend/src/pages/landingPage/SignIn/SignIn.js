import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import useRole from "hooks/useRole";
import { SetPopupContext } from "App";

import { redirect } from "react-router-dom";

import axios from "axios";

import isAuth from "libs/isAuth";
import apiList from "../../../libs/apiList";
// import apiList from "../../../libs/apiList";

export default function SignIn({ login }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const role = useRole();
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

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
    if (!verified) {
      axios
        .get(apiList.login, loginDetails)
        .then((response) => {
          if (response.data) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", response.data.type);
            setLoggedin(isAuth());
            setPopup({
              open: true,
              severity: "success",
              message: "Logged in successfully",
            });
            console.log(response);
          } else {
            // Handle the case where the response or response.data is undefined
            setPopup({
              open: true,
              severity: "error",
              message: "Invalid server response",
            });
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            setPopup({
              open: true,
              severity: "error",
              message: err.response.data.message,
            });
            console.log(err.response);
          } else if (err.response && err.response.status === 401) {
            setPopup({
              open: true,
              severity: "error",
              message: "User does not exist or credentials are incorrect",
            });
          } else {
            // Handle other error cases
            setPopup({
              open: true,
              severity: "error",
              message: "An error occurred during login.",
            });
            console.log(err);
          }
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <redirect to="/" />
  ) : (
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
          onChange={(e) => handleInput("email", e.target.value)}
          inputErrorHandler={inputErrorHandler}
          handleInputError={handleInputError}
          placeholder="email@example.com"
        />

        <InputField
          type="password"
          label="Password"
          value={loginDetails.password}
          onChange={(e) => handleInput("password", e.target.value)}
          placeholder="**********"
        />

        <p className="text-xs text-center mt-6 mb-3 text-red-500">
          {errorMessage}
        </p>

        <button
          type="submit"
          className="mt-2 w-full bg-primary text-gray-500 hover:bg-[#F2994A] hover:text-black border-yellow-100 font-semibold cursor-pointer px-4 py-3 rounded-lg text-sm"
          onClick={() => {
            handleLogin();
            console.log("Input valid on button:", loginDetails);
          }}
        >
          Sign in
        </button>
        <Link
          className="block text-xs text-center mt-6 hover:underline text-semibold cursor-pointer
          hover:text-[#91b4bd]"
          to="/sign-in/reset-password"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
