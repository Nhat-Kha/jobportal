import React, { useEffect, useState } from "react";
import { SetPopupContext } from "App";
import InputField from "components/InputField";
import apiList from "../../../libs/apiList";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Reset = () => {
  const { token } = useParams();
  const history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [payload, setPayload] = useState({ password: "", confirmPassword: "" });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
  });

  console.log(payload);

  const handleReset = async () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      const data = { ...payload, token };
      try {
        const response = await axios.put(apiList.reset, data);
        setPopup({
          open: true,
          icon: "success",
          message: "Changed password successfully",
        });
        console.log(response);
        history("/sign-in");
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };

  const handleInput = (key, value) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  return (
    <div>
      <section className="min-h-screen bg-primary">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md bg-white sm:p-8">
            <h2 className="text-4xl font-semibold text-gray-900 leading-none">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <InputField
                  label="New password"
                  type="password"
                  name="password"
                  id="password"
                  value={payload.password}
                  onChange={(e) => handleInput("password", e.target.value)}
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <div>
                <InputField
                  label="Confirm password"
                  type="password"
                  name="confirm-password"
                  value={payload.confirmPassword}
                  onChange={(e) =>
                    handleInput("confirmPassword", e.target.value)
                  }
                  id="confirm-password"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-normal text-gray-500"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => handleReset()}
              className="mt-2 w-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-100 font-semibold cursor-pointer px-4 py-3 rounded-lg text-sm"
            >
              Reset passwod
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
