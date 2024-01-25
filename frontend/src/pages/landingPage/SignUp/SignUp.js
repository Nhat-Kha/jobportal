import React, { useState, useContext } from "react";
import InputField from "components/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SetPopupContext } from "App";
import axios from "axios";
import isAuth from "libs/isAuth";
import apiList from "../../../libs/apiList";
import { MuiChipsInput } from "mui-chips-input";
import FileUploadInput from "libs/FileUploadInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { apiUploadImages } from "libs/uploadImage";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [loggedin, setLoggedin] = useState(isAuth());
  const [phone, setPhone] = useState("");

  const [chips, setChips] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChip = (newChips) => {
    setChips(newChips);
  };

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
    news: false,
    bio: "",
    contactNumber: "",
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      type: event.target.value,
    }));
  };

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{1,4}\d{6,}$/;

    return phoneRegex.test(phoneNumber);
  };
  const removePhoneNumberPrefix = (phoneNumber) => {
    const prefixRegex = /^\+\d{1,4}/;

    return phoneNumber.replace(prefixRegex, "");
  };

  let allFieldsCheckedApplicant = false;
  let allFieldsCheckedRecruiter = false;

  if (signupDetails.type === "applicant") {
    allFieldsCheckedApplicant =
      signupDetails.name.trim().length > 0 &&
      signupDetails.email.trim().length > 0 &&
      signupDetails.password.trim().length > 0 &&
      chips.some((item) => item.trim() !== "") &&
      signupDetails.education.every(
        (item) => item.institutionName.trim() !== ""
      ) &&
      signupDetails.profile.trim().length > 0 &&
      typeof signupDetails.news === "boolean";

    console.log("Name:", signupDetails.name.trim().length > 0);
    console.log("Email:", signupDetails.email.trim().length > 0);
    console.log("Password:", signupDetails.password.trim().length > 0);
    console.log(
      "Chip:",
      chips.some((item) => item.trim() !== "")
    );
    console.log(
      "Education:",
      signupDetails.education.every(
        (item) => item.institutionName.trim() !== ""
      )
    );
    console.log("profile:", signupDetails.profile.trim().length > 0);
  } else {
    allFieldsCheckedRecruiter =
      signupDetails.name.trim().length > 0 &&
      signupDetails.email.trim().length > 0 &&
      signupDetails.password.trim().length > 0 &&
      signupDetails.bio.trim().length > 0 &&
      (signupDetails.contactNumber.trim().length === 0 ||
        isValidPhoneNumber(signupDetails.contactNumber)) &&
      signupDetails.profile.trim().length > 0 &&
      typeof signupDetails.news === "boolean";

    console.log("Name:", signupDetails.name.trim().length > 0);
    console.log("Email:", signupDetails.email.trim().length > 0);
    console.log("Password:", signupDetails.password.trim().length > 0);
    console.log("Bio:", signupDetails.bio.trim().length > 0);
    console.log(
      "Contact Number:",
      signupDetails.contactNumber.trim().length === 0 ||
        isValidPhoneNumber(signupDetails.contactNumber)
    );
    console.log("Profile:", signupDetails.profile.trim().length > 0);
    console.log("News:", typeof signupDetails.news === "boolean");
  }

  const handleInput = (key, value) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
    console.log(`Input ${key} value:`, value);
  };

  const handleLogin = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (!verified) {
      axios
        .post(apiList.signup, signupDetails)
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
          history("/");
          console.log("export" + response);
          console.log(response?.data.type);
        })
        .catch((err) => {
          setPopup({
            open: true,
            icon: "warn",
            message: err.response.data.message,
          });
          console.log(err.response.data.message);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        icon: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(updatedDetails);

    if (!verified) {
      axios
        .post(apiList.signup, updatedDetails)
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
            icon: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        icon: "error",
        message: "Incorrect Input",
      });
    }
  };

  const uploadFile = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = "";
    let files = e.target.files;

    if (files && files.length > 0) {
      let formData = new FormData();
      for (let i of files) {
        formData.append("file", i);
        formData.append("upload_preset", "jobportal");
        formData.append("folder", "jobportal");
        let response = await apiUploadImages(formData);
        if (response.status === 200) images = response.data?.secure_url;
        console.log(images);
      }

      setIsLoading(false);
      setImagesPreview(images);
      setSignupDetails((prevDetails) => ({
        ...prevDetails,
        profile: images,
      }));
    }
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8e5d4] md:py-24">
      <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none">
          Welcome to applicant
        </h2>
        <p className="text-md text-gray-600 pb-8">
          The information you add below is used to make your referrals more
          credible and it can be edited later.
        </p>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 bg-white">
            Select a type
          </label>
          <select
            className="block border border-grey-light w-full p-3 rounded mb-4"
            value={signupDetails.type}
            onChange={handleChange}
          >
            <option value="applicant" className="rounded mb-4 text-gray-950">
              Applicant
            </option>
            <option value="recruiter" className="rounded mb-4 text-gray-950">
              Recruiter
            </option>
          </select>
        </div>

        <InputField
          type="text"
          label="Name"
          value={signupDetails.name}
          error={inputErrorHandler.name.error}
          helperText={inputErrorHandler.name.message}
          onChange={(e) => handleInput("name", e.target.value)}
          placeholder="Firstname Lastname"
        />
        <InputField
          type="email"
          label="Email"
          value={signupDetails.email}
          onChange={(e) => handleInput("email", e.target.value)}
          inputErrorHandler={inputErrorHandler}
          handleInputError={handleInputError}
          placeholder="email@example.com"
        />
        <InputField
          type="password"
          label="Password"
          value={signupDetails.password}
          error={inputErrorHandler.password.error}
          helperText={inputErrorHandler.password.message}
          onChange={(e) => handleInput("password", e.target.value)}
          placeholder="Your password"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("password", true, "Password id required");
            } else {
              handleInputError("password", false, "");
            }
          }}
        />
        {signupDetails.type === "applicant" ? (
          <>
            {education.map((edu, index) => (
              <div className="flex justify-between" key={index}>
                <InputField
                  type="text"
                  label={`Institution Name ${index + 1}`}
                  value={edu.institutionName}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].institutionName = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="Institution name"
                />
                <InputField
                  type="number"
                  label={`Start Year ${index + 1}`}
                  value={edu.startYear}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].startYear = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="Start year"
                />
                <InputField
                  type="number"
                  label={`End Year ${index + 1}`}
                  value={edu.endYear}
                  onChange={(e) => {
                    const newEducation = [...education];
                    newEducation[index].endYear = e.target.value;
                    setEducation(newEducation);
                  }}
                  placeholder="End year"
                />
              </div>
            ))}
            <div>
              <button
                className="block w-full border p-3 rounded mb-4 bg-yellow-300"
                onClick={() =>
                  setEducation([
                    ...education,
                    {
                      institutionName: "",
                      startYear: "",
                      endYear: "",
                    },
                  ])
                }
              >
                Add another institution details
              </button>
            </div>

            <MuiChipsInput
              label="Skill *"
              helperText="Please enter to add skill"
              value={chips}
              onChange={handleChip}
              className="block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
            />
          </>
        ) : (
          <>
            <InputField
              label="bio (upto 250 words)"
              style={{ width: "100%" }}
              value={signupDetails.bio}
              onChange={(e) => {
                if (
                  e.target.value.split(" ").filter(function (n) {
                    return n != "";
                  }).length <= 250
                ) {
                  handleInput("bio", e.target.value);
                }
              }}
            />
            <div>
              <PhoneInput
                country={"vn"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
          </>
        )}
        <div className="w-full mb-6">
          <h2 className="font-semibold text-xl py-4">
            Avatar <span className="text-red-500">*</span>
          </h2>
          <div className="w-full">
            <label
              className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
              htmlFor="file"
            >
              <div className="flex flex-col items-center justify-center">
                Upload image
              </div>
            </label>
            <input
              onChange={uploadFile}
              hidden
              type="file"
              id="file"
              multiple
            />
            <div className="w-full">
              <h3 className="font-medium py-4">Select image</h3>
              <div className="flex gap-4 items-center">
                {signupDetails.profile ? (
                  <div className="relative w-1/3 h-1/3">
                    <img
                      src={
                        Array.isArray(signupDetails.profile)
                          ? signupDetails.profile[0]
                          : signupDetails.profile
                      }
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <p>No images selected</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <label className="block text-black text-sm font-medium mt-8 focus:outline-none outline-none">
          <input
            className="mr-2 leading-tight text-primary"
            type="checkbox"
            checked={signupDetails.news}
            onChange={() =>
              setSignupDetails((prevDetails) => ({
                ...prevDetails,
                news: !prevDetails.news,
              }))
            }
          />
          <span className="text-sm">
            Keep me up-to-date on exclusive Greet updates and new job posts! You
            can opt-out at any time.
          </span>
        </label>

        <button
          className={`mt-2 w-full font-semibold px-4 py-3 rounded-lg text-sm ${
            (signupDetails.type === "applicant" && allFieldsCheckedApplicant) ||
            (signupDetails.type === "recruiter" && allFieldsCheckedRecruiter)
              ? "bg-primary text-gray-500 hover:bg-[#F2994A] hover:text-black border-yellow-100 cursor-pointer"
              : "bg-yellow-100 text-yellow-800 cursor-not-allowed border-yellow-100"
          }`}
          onClick={() => {
            signupDetails.type === "applicant"
              ? handleLogin()
              : handleLoginRecruiter();
          }}
          disabled={
            (signupDetails.type === "applicant" &&
              !allFieldsCheckedApplicant) ||
            (signupDetails.type === "recruiter" && !allFieldsCheckedRecruiter)
          }
        >
          Create your account
        </button>

        <p className="text-xs text-center mt-6">
          By creating an account you agree to Greet's Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
