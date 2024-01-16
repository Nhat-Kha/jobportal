import isAuth from "libs/isAuth";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JobAd from "./JobAd";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";
import { MuiChipsInput } from "mui-chips-input";
import axios from "axios";
import apiList from "../libs/apiList";
import { SetPopupContext } from "App";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

function WaitingBtn() {
  return (
    <div className="cursor-not-allowed transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg flex ml-2 mr-2 items-center font-semibold text-md justify-center px-8 py-3 bg-gray-300 rounded-xl text-black">
      Waiting for responses
    </div>
  );
}
export default function JobEditor({ jobToEdit, _id }) {
  let history = useNavigate();
  const [editing, setEditing] = useState(true);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { id } = useParams();

  const setPopup = useContext(SetPopupContext);

  // const { user } = isAuth();
  const [job, setJob] = useState(
    jobToEdit || {
      name: isAuth(),
      title: "",
      maxApplicants: "",
      maxPositions: "",
      salary: 0,
      deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 16),
      skillsets: [],
      duration: 0,
      jobType: "Full Time",
      status: "Open",
      description: "",
    }
  );
  const [jobDetails, setJobDetails] = useState(job);

  const [tags, setTags] = useState([]);

  const handleDeleteTag = (deletedTag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag[0] !== deletedTag[0]));
  };

  const addTag = (e) => {
    const newTags = e;

    setTags((prevTags) => {
      const updatedTags = [...prevTags];

      newTags.forEach((newTag) => {
        if (!updatedTags.some((tag) => tag[0] === newTag[0])) {
          updatedTags.push(newTag);
        }
      });

      return updatedTags;
    });
  };

  useEffect(() => {
    setJob((prevJob) => ({
      ...prevJob,
      skillsets: tags,
    }));
  }, [tags]);

  // let isComplete =
  //   job.title.length > 0 &&
  //   job.employment.length > 0 &&
  //   job.hiring.length > 0 &&
  //   job.interview.length > 0 &&
  //   job.location.length > 0 &&
  //   job.description.length > 0;

  // console.log("isComplete:", isComplete);

  const [description, setDescription] = useState(job?.description);

  useEffect(() => {
    setJob({ ...job, description: description });
  }, [description]);

  useEffect(() => {
    setJobDetails(job);
  }, [job]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleJobUpdate = () => {
    console.log("Job data to be sent:", job);
    console.log(`${apiList.jobs}/${id}`);

    const address = `${apiList.jobs}/${id}`;

    axios
      .put(address, job, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          setPopup({
            open: true,
            icon: "success",
            message: response.data.message,
          });
          setJob();
          handleCloseUpdate();
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log(err.response);
          setPopup({
            open: true,
            icon: "error",
            message: err.response.data.message,
          });
        } else {
          console.error("Error response format:", err.response);
        }
        handleCloseUpdate();
      });
  };

  return (
    <div className="w-1/2 mx-auto mt-32  grid">
      <div className="bg-light p-1 rounded-xl w-56 justify-self-end ">
        <button
          className={`${
            editing ? "bg-white text-black" : "bg-light text-gray-400"
          } px-5 py-2 bg-white rounded-xl mr-1 font-medium`}
          onClick={() => setEditing(true)}
        >
          <FontAwesomeIcon
            icon={faPen}
            className={`${
              editing ? "text-money" : "text-gray-400"
            } mr-2.5 text-sm`}
          />
          Edit
        </button>
        <button
          className={`${
            !editing ? "bg-white text-black" : "bg-light text-gray-400"
          } px-4 py-2 bg-white rounded-xl font-medium`}
          onClick={() => setEditing(false)}
        >
          <FontAwesomeIcon
            icon={faEye}
            className={`${
              !editing ? "text-money" : "text-gray-400"
            } mr-2.5 text-sm`}
          />
          Preview
        </button>
      </div>

      {editing ? (
        <>
          <InputField
            className="mt-8"
            type="text"
            label="Job Title"
            value={job.title}
            onChange={(e) => {
              setJob({
                ...job,
                title: e.target.value,
              });
            }}
            placeholder="Title"
          />
          <InputField
            className="mt-8 hover:border-black"
            type="number"
            label="salary Reward"
            placeholder="..."
            value={job.salary}
            onChange={(e) => {
              setJob({
                ...job,
                salary: e.target.value,
              });
            }}
          />
          <InputField
            className="mt-8 hover:border-black"
            type="text"
            label="Job type"
            placeholder="25 000"
            value={job.jobType}
            onChange={(e) => {
              setJob({
                ...job,
                jobType: e.target.value,
              });
            }}
          />
          <InputField
            className="mt-8 hover:border-black"
            type="text"
            label="duration"
            placeholder="25 000"
            value={job.duration}
            onChange={(e) => {
              setJob({
                ...job,
                duration: e.target.value,
              });
            }}
          />
          <InputField
            className="mt-8 hover:border-black"
            type="datetime-local"
            label="Application Deadline"
            placeholder="dd/mm/yy"
            value={job.deadline}
            onChange={(e) => {
              setJob({
                ...job,
                deadline: e.target.value,
              });
            }}
          />
          <InputField
            className="mt-8 hover:border-black"
            type="number"
            label="Maximum Number Of Applicants"
            placeholder="100"
            value={job.maxApplicants}
            onChange={(e) => {
              setJob({
                ...job,
                maxApplicants: e.target.value,
              });
            }}
          />
          <InputField
            className="mt-8 hover:border-black"
            type="number"
            label="Positions Available"
            placeholder="20"
            value={job.maxPositions}
            onChange={(e) => {
              setJob({
                ...job,
                maxPositions: e.target.value,
              });
            }}
          />
          <div className="pb-4">
            <label className="block text-black text-sm font-semibold mb-2">
              Skills <span className="text-[#ff3131]">*</span>
            </label>
            <MuiChipsInput
              value={tags}
              onChange={(e) => {
                addTag(e);
              }}
              className="bg-white w-full block border border-grey-light p-3 rounded mb-4"
              onDeleteChip={(deletedTag) => handleDeleteTag(deletedTag)}
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
            Job description
          </label>

          <ReactQuill
            modules={modules}
            theme="snow"
            value={job.description}
            onChange={(e) => {
              setJob({
                ...job,
                description: e,
              });
            }}
            placeholder="Job description goes here..."
          />
        </>
      ) : (
        <JobAd edit={job} />
      )}

      <div className="flex items-center pt-6 mt-12">
        <button
          className="text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black"
          onClick={() => handleJobUpdate()}
        >
          Save
        </button>

        <WaitingBtn />

        <Link
          to="/admin"
          className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-light px-8 py-3 rounded-xl border-none"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
