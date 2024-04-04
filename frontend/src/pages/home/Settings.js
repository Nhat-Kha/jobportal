import React, { useState, useEffect, useContext } from "react";
import InputField from "components/InputField";
import { apiUploadImages } from "libs/uploadImage";
import axios from "axios";
import { SetPopupContext } from "App";
import apiList from "../../libs/apiList";
import { getId } from "libs/isAuth";
import { useParams } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";

export default function Settings() {
  const setPopup = useContext(SetPopupContext);
  const getUser = getId();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState("");
  const [userData, setUserData] = useState();
  const [fileResume, setFileResume] = useState("");
  const [open, setOpen] = useState(false);
  const [chips, setChips] = useState([]);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    password: "",
    skills: [],
    resume: "",
    profile: "",
    education: [
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ],
    dateOfBirth: new Date(),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${apiList.user}/${getUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails({
          ...response.data,
          skills: response.data.skills || [],
          education: response.data.education.map((edu) => ({
            institutionName: edu.institutionName ? edu.institutionName : "",
            startYear: edu.startYear ? edu.startYear : "",
            endYear: edu.endYear ? edu.endYear : "",
          })),
        });
        setChips(response.data.skills || []);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };

  console.log("update education: ", profileDetails.education);

  const handleUpdate = async () => {
    try {
      console.log("fetch: ", `${apiList.updateUser}/${getUser}`);

      const updatedEducation = profileDetails.education
        .filter((edu) => edu.institutionName.trim() !== "")
        .map((edu) =>
          edu.endYear === "" ? { ...edu, endYear: undefined } : edu
        );

      const updatedDetails = {
        ...profileDetails,
        education: updatedEducation,
        skills: chips.filter((item) => item.trim() !== ""),
      };

      console.log("updatedDetails:", updatedDetails);

      const response = await axios.put(
        `${apiList.updateUser}/${getUser}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Server response:", response.data);

      setPopup({
        open: true,
        icon: "success",
        message: response.data.message,
      });

      // Fetch updated data after the update
      getData();
      setOpen(false);
    } catch (err) {
      console.error("Update error:", err);

      setPopup({
        open: true,
        icon: "error",
        message: err.response?.data?.message || "Error occurred during update.",
      });
    }
  };

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
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

      setImagesPreview(images);
      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        profile: images,
      }));
    } else {
      console.log("error");
      setPopup({
        open: true,
        icon: "error",
        message: "Error",
      });
    }
  };
  console.log("profileDetails", profileDetails);

  const uploadResume = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", fileResume);
    formData.append("userId", profileDetails.userId);
    formData.append("name", profileDetails.name);
    console.log("select file: ", fileResume);
    const result = await axios.post(apiList.uploadResume, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(result);
  };

  const handleChip = (newChips) => {
    setChips(newChips);
  };

  function toLocalTime(utcDateTime) {
    if (utcDateTime) {
      const utcDate = new Date(utcDateTime);
      const localDate = new Date(
        utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
      );
      return localDate.toISOString().slice(0, 16);
    } else {
      return "";
    }
  }

  function toUTC(localDateTime) {
    const localDate = new Date(localDateTime);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );
    return utcDate.toISOString();
  }

  // const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <div className="bg-light py-28">
      <div className="bg-white rounded-xl p-6 pb-10 overflow-x-auto mx-auto md:w-5/12 w-11/12 relative z-0">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mt-4 mb-16">
          Settings
        </h2>

        <InputField
          className="md:col-span-2 col-span-4"
          label="Name"
          type="text"
          placeholder="Firstname Lastname"
          value={profileDetails.name}
          onChange={(e) =>
            setProfileDetails({ ...profileDetails, name: e.target.value })
          }
        />
        <InputField
          className="mt-8 hover:border-black"
          type="datetime-local"
          label="Application Deadline"
          placeholder="dd/mm/yy"
          value={toLocalTime(profileDetails.dateOfBirth)}
          onChange={(e) => {
            const localTime = e.target.value;
            const utcTime = toUTC(localTime);
            setProfileDetails({
              ...profileDetails,
              dateOfBirth: utcTime,
            });
          }}
        />
        {profileDetails.education.map((edu, index) => (
          <div className="flex justify-between" key={index}>
            <InputField
              type="text"
              label={`Institution Name ${index + 1}`}
              value={edu.institutionName}
              onChange={(e) => {
                const newEducation = [...profileDetails.education];
                newEducation[index].institutionName = e.target.value;
                setProfileDetails((prevDetails) => ({
                  ...prevDetails,
                  education: newEducation,
                }));
              }}
              placeholder="Institution name"
            />
            <InputField
              type="number"
              label={`Start Year ${index + 1}`}
              value={edu.startYear}
              onChange={(e) => {
                const newEducation = [...profileDetails.education];
                newEducation[index].startYear = e.target.value;
                setProfileDetails((prevDetails) => ({
                  ...prevDetails,
                  education: newEducation,
                }));
              }}
              placeholder="Start year"
            />
            <InputField
              type="number"
              label={`End Year ${index + 1}`}
              value={edu.endYear}
              onChange={(e) => {
                const newEducation = [...profileDetails.education];
                newEducation[index].endYear = e.target.value;
                setProfileDetails((prevDetails) => ({
                  ...prevDetails,
                  education: newEducation,
                }));
              }}
              placeholder="End year"
            />
          </div>
        ))}

        <div>
          <button
            className="block w-full border p-3 rounded mb-4 bg-yellow-300"
            onClick={() => {
              setProfileDetails((prevDetails) => ({
                ...prevDetails,
                education: [
                  ...prevDetails.education,
                  {
                    institutionName: "",
                    startYear: "",
                    endYear: "",
                  },
                ],
              }));
            }}
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
                {profileDetails.profile ? (
                  <div className="relative w-1/3 h-1/3 ">
                    <img
                      src={profileDetails.profile}
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

        <div>
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">
              Resume <span className="text-red-500">*</span>
            </h2>
            <form onSubmit={uploadResume}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFileResume(e.target.files[0])}
              />
              <button
                type="submit"
                className="hover:opacity-80  cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
        <div> {new Date(profileDetails.dateOfBirth).toLocaleDateString()}</div>

        <div className="flex items-center justify-center pt-6">
          <button
            className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
            onClick={() => handleUpdate()}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
