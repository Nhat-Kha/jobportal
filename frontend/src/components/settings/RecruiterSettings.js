import InputField from "components/InputField";
import { apiUploadImages } from "libs/uploadImage";
import { useEffect, useState } from "react";

export default function CompanySettings({ profile, user }) {
  const [tmpProfile, setTmpProfile] = useState();
  const [originalProfile] = useState(profile);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    profile: "",
    contactNumber: "",
  });

  useEffect(() => {
    setTmpProfile(profile);
  }, [profile]);

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
        let response = await apiUploadImages(formData);
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

  return (
    <div>
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

      <InputField
        label="Name"
        type="text"
        value={tmpProfile?.website}
        onChange={(e) => {
          setTmpProfile({
            ...tmpProfile,
            website: e.target.value,
          });
        }}
        placeholder="Enter Name Recruiter"
      />
      <div className="grid grid-cols-4 gap-4 mt-6">
        <InputField
          className="col-span-2"
          label="Founded"
          type="text"
          value={tmpProfile?.founded}
          onChange={(e) => {
            setTmpProfile({
              ...tmpProfile,
              founded: e.target.value,
            });
          }}
          placeholder="2021"
        />

        <InputField
          className="col-span-2"
          label="Employees"
          type="text"
          value={tmpProfile?.employees}
          onChange={(e) => {
            setTmpProfile({
              ...tmpProfile,
              employees: e.target.value,
            });
          }}
          placeholder="Name"
        />
      </div>

      <InputField
        label="Bio"
        type="text"
        className="mt-4"
        value={tmpProfile?.bio}
        onChange={(e) => {
          setTmpProfile({
            ...tmpProfile,
            bio: e.target.value,
          });
        }}
        placeholder="Bio"
      />

      <label className="block text-black text-sm font-semibold mb-2">
        About
      </label>
      <textarea
        className="block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
        rows="8"
        placeholder="Text about your company goes here."
        value={tmpProfile?.about}
        onChange={(e) =>
          setTmpProfile({
            ...tmpProfile,
            about: e.target.value,
          })
        }
      />

      <div className="flex mb-12 gap-3 relative mt-12">
        <img
          alt="banner"
          className="w-1/3 h-auto md:mr-6 mr-4 rounded-md"
          src={tmpProfile?.banner}
        />

        <div>
          <label class="uppercase tracking-wide text-black text-xs font-bold mb-2 mt-8">
            Banner
          </label>

          <form onSubmit={uploadBanner}>
            <input type="file" />
            <button
              type="submit"
              className="hover:opacity-80  cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
            >
              Upload
            </button>
          </form>
        </div>
      </div>

      <InputField
        className="col-span-2"
        label="Banner caption"
        type="text"
        value={tmpProfile?.caption}
        onChange={(e) => {
          setTmpProfile({
            ...tmpProfile,
            caption: e.target.value,
          });
        }}
        placeholder="Banner caption"
      />
      <div className="flex items-center pt-6">
        <div
          className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
          //   onClick={() => handleSave()}
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
