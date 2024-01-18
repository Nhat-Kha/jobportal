import Axios from "axios";
import { SetPopupContext } from "../App";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import InputField from "components/InputField";

const LinearProgress = ({ progress }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(progress);
  }, [progress]);

  return (
    <div className="w-full bg-gray-200">
      <div
        className="h-4 bg-green-500 transition-all duration-300 ease-in-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default function FileUploadInput(props) {
  const setPopup = useContext(SetPopupContext);
  const { uploadTo, identifier, handleInput } = props;
  const [file, setFile] = useState("");
  const [currentProgress, setCurrentProgress] = useState(0);

  const handleUpload = () => {
    console.log(file);

    Axios.post(uploadTo, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setCurrentProgress(
          parseInt((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    })
      .then((response) => {
        console.log(response.data);
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: err.response.statusText || "Unknown error",
        });
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentProgress < 100) {
        setCurrentProgress((prevProgress) => prevProgress + 10);
      } else {
        clearInterval(intervalId);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [currentProgress]);
  return (
    <div className={props.className}>
      <div className="flex container">
        <div>
          <button className="w-full h-full">
            <FontAwesomeIcon icon={props.icon} />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                console.log(event.target.files);
                setCurrentProgress(0);
                const selectedFile = event.target.files[0];
                const newFormData = new FormData();
                newFormData.append("file", selectedFile);
                setFile(newFormData);
              }}
            />
          </button>
        </div>
        <div>
          <InputField
            label={props.label}
            value={file ? file.name || "" : ""}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <button className="w-full h-full" onClick={() => handleUpload()}>
            <FontAwesomeIcon icon={faCloudArrowUp} />
          </button>
        </div>
      </div>
      {currentProgress !== 0 ? (
        <div className="flex items-center justify-center h-screen">
          <LinearProgress progress={currentProgress} />
        </div>
      ) : null}
    </div>
  );
}
