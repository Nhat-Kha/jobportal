import React, { useState, useEffect, useContext } from "react";
import InputField from "components/InputField";
import { apiUploadImages } from "libs/uploadImage";
import axios from "axios";
import { SetPopupContext } from "App";
import apiList from "libs/apiList";

export default function Settings() {
  const setPopup = useContext(SetPopupContext);

  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState("");
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    password: "",
    skills: [],
    resume: "",
    profile: "",
  });
  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const handleUpdate = () => {
    console.log(education);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setProfileDetails(updatedDetails);
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
    setOpen(false);
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
        severity: "error",
        message: "Error",
      });
    }
  };

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
        {Object.keys(profileDetails.education).map((index) => (
          <div className="flex justify-between" key={index}>
            <InputField
              type="text"
              label={`Institution Name ${index + 1}`}
              value={profileDetails.education[index].institutionName}
              onChange={(e) => {
                const newEdu = [...profileDetails.education];
                newEdu[index].institutionName = e.target.value;
                setProfileDetails((prevDetails) => ({
                  ...prevDetails,
                  education: newEdu,
                }));
              }}
              placeholder="Institution name"
            />
            <InputField
              type="number"
              label={`Start Year ${index + 1}`}
              value={profileDetails.education.startYear}
              onChange={(e) => {
                const newEdu = [...profileDetails.education];
                newEdu[index].startYear = e.target.value;
                setProfileDetails((prevDetails) => ({
                  ...prevDetails,
                  education: newEdu,
                }));
              }}
              placeholder="Start year"
            />
            <InputField
              type="number"
              label={`End Year ${index + 1}`}
              value={profileDetails.education.endYear}
              onChange={(e) => {
                const newEdu = [...profileDetails.education];
                newEdu[index].endYear = e.target.value;
                setProfileDetails((prevDetails) => ({
                  ...prevDetails,
                  education: newEdu,
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

        <div className="w-full mb-6">
          <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
          <div className="w-full">
            <label
              className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
              htmlFor="file"
            >
              <div className="flex flex-col items-center justify-center">
                Thêm ảnh
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
              <h3 className="font-medium py-4">Ảnh đã chọn</h3>
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

        <div className="flex items-center justify-center pt-6">
          <button
            className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
            onClick={() => handleUpdate()}
          >
            Save changes
          </button>
        </div>

        {/* {loading ? (
          <div
            className="absolute inset-0 flex justify-center items-center z-10"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
          >
            {!saved ? (
              <div>
                <div className="animate-spin rounded-full mx-auto h-12 w-12 border-b-2 border-gray-900 mb-4"></div>{" "}
                <p className="font-semibold text-lg">Saving changes...</p>
              </div>
            ) : (
              <div className="text-center">
                <FontAwesomeIcon
                  className="text-5xl mb-3 text-money"
                  icon={faCheck}
                />
                <p className="font-semibold text-lg">Changes saved!</p>
              </div>
            )}
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
