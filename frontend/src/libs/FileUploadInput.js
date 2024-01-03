import Axios from "axios";
import React, { useContext, useState } from "react";
import { SetPopupContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import InputField from "components/InputField";

export default function FileUploadInput(props) {
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });

  const handleUpload = () => {
    if (!file) {
      setMsg("No file selected");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    setMsg("upload...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    Axios.post(uploadTo, data, {
      onUploadProgress: (ProgressEvent) => {
        setProgress((prevState) => {
          return { ...prevState, pc: ProgressEvent.progress * 100 };
        });
        // setProgress(
        //   parseInt(
        //     Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
        //   )
        // );
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setMsg("Upload success");
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.log(err.file);
        setPopup({
          open: true,
          severity: "error",
          message: err.response,
          // message: err.response.data
          //   ? err.response.data.message
          //   : err.response.statusText,
        });
      });
  };

  return (
    <div className={props.className}>
      <div className="flex flex-row items-center gap-6">
        <div className="grow-0 basis-1/4 max-w-[25%]">
          <button className="bg-blue-400 w-[100%] h-[100%]" component="label">
            {props.icon}
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              //   onChange={onChange}
              //   onChange={(e) => {}
              //     setSource({...source, place_img: e.target.files[0]})
              //   }
            />
          </button>
        </div>
        <div className="grow-0 basis-1/2 max-w-[50%]">
          <InputField
            label={props.label}
            value={file ? file.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            style={{ width: "100%" }}
          />
        </div>
        <div className="grow-0 basis-1/4 max-w-[25%]">
          <button
            className="w-[100%] h-[100%] bg-red-500"
            onClick={() => handleUpload()}
            disabled={file ? false : true}
          >
            <FontAwesomeIcon icon={faUpload} />
          </button>
        </div>
      </div>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}
    </div>
  );
}
