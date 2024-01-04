import { useEffect, useState } from "react";
import InputField from "components/InputField";
import apiList from "../../libs/apiList";
import apiUploadImages from "../../libs/uploadImage";

export default function AccountSetting({ user, profile }) {
  const [tmpProfile, setTmpProfile] = useState();
  const [ImagesePreview, setImagesPreview] = useState([]);
  const [payload, setPayload] = useState("");
  const [originalProfile] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTmpProfile(profile);
  }, [profile]);

  const uploadFile = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", process.env.UPLOAD_PRESET_NAME);
      formData.append("folder", "jobportal");
      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  };

  const uploadLogo = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFile(file, "logo");
  };
}
