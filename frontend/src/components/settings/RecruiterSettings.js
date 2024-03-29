import { SetPopupContext } from "App";
import axios from "axios";
import InputField from "components/InputField";
import apiList from "libs/apiList";
import { getId } from "libs/isAuth";
import { apiUploadImages } from "libs/uploadImage";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CompanySettings({ profile, user }) {
  const setPopup = useContext(SetPopupContext);
  const getUser = getId();

  const [tmpProfile, setTmpProfile] = useState();
  const [originalProfile] = useState(profile);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    profile: "",
    contactNumber: "",
    banner: "",
  });

  useEffect(() => {
    setTmpProfile(profile);
  }, [profile]);

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
        setProfileDetails(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };

  const uploadBanner = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFile(file, "banner");
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
        let response = await toast.promise(apiUploadImages(formData), {
          pending: "Uploading images...",
          success: "Images uploaded successfully 👌",
          error: "Error uploading images 🤯",
        });
        if (response.status === 200) images = response.data?.secure_url;
        console.log(images);
      }

      setIsLoading(false);
      setImagesPreview(images);
      setProfileDetails((prevDetail) => ({
        ...prevDetail,
        profile: images,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("fetch: ", `${apiList.updateUser}/${getUser}`);

      const updatedDetails = {
        ...profileDetails,
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

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-medium leading-6 text-gray-900">
        Edit public profile
      </h3>
      <p className="mt-1 text-sm text-gray-600">
        This information will be displayed publicly so be careful what you
        share.
      </p>
      <div className="flex mb-12 gap-3 relative mt-12">
        <div>
          <div className="w-full">
            <div className="flex gap-4 items-center">
              {profileDetails.profile ? (
                <div className="relative w-1/3 h-1/3 ">
                  <img
                    src={
                      Array.isArray(profileDetails.profile)
                        ? profileDetails.profile[0]
                        : profileDetails.profile
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

          <form>
            <input onChange={uploadFile} type="file" id="file" multiple />
            <button
              type="submit"
              onSubmit={uploadFile}
              className="hover:opacity-80  cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
            >
              Upload
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <InputField
          className="col-span-2"
          label="Name"
          type="text"
          value={profileDetails?.name}
          onChange={(e) =>
            setProfileDetails({
              ...profileDetails,
              name: e.target.value,
            })
          }
          placeholder="Enter name recruiter"
        />

        <InputField
          className="col-span-2"
          label="Contact number"
          type="number"
          value={profileDetails?.contactNumber}
          onChange={(e) =>
            setProfileDetails({
              ...profileDetails,
              contactNumber: e.target.value,
            })
          }
          placeholder="Number phone"
        />
      </div>

      <label className="block text-black text-sm font-semibold mb-2">
        About
      </label>
      <textarea
        className="block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
        rows="8"
        placeholder="Text about your company goes here."
        value={profileDetails?.bio}
        onChange={(e) =>
          setProfileDetails({
            ...profileDetails,
            bio: e.target.value,
          })
        }
      />

      <InputField
        className="col-span-2"
        label="Banner caption"
        type="text"
        value={profileDetails?.banner}
        onChange={(e) => {
          setProfileDetails({
            ...profileDetails,
            banner: e.target.value,
          });
        }}
        placeholder="Banner caption"
      />
      <div className="flex items-center pt-6">
        <div
          className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
          onClick={() => handleUpdate()}
        >
          Save
        </div>

        <div
          className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-light px-8 py-3 rounded-xl border-none"
          onClick={() => setTmpProfile(originalProfile)}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}
