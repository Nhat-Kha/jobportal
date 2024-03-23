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
import { userType } from "libs/isAuth";

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
export default function JobEditor({ jobToEdit, props }) {
  let history = useNavigate();
  const [editing, setEditing] = useState(true);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const setPopup = useContext(SetPopupContext);
  const { job, getData } = props;
  const type = userType();

  const [jobs, setJobs] = useState(
    jobToEdit || {
      name: isAuth(),
      title: "",
      maxApplicants: 0,
      maxPositions: 0,
      salary: 0,
      deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 16),
      skillsets: [],
      duration: 0,
      jobType: "Full Time",
      status: "Open",
      description: "",
      location: "",
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
    setJobs((prevJob) => ({
      ...prevJob,
      skillsets: tags,
    }));
  }, [tags]);

  let isComplete =
    (jobs && jobs.title && jobs.title.length > 0) ||
    (jobs && jobs.maxApplicants && jobs.maxApplicants.length > 0) ||
    (jobs && jobs.maxPositions && jobs.maxPositions.length > 0) ||
    (jobs && jobs.salary && jobs.salary.length > 0) ||
    (jobs && jobs.deadline && jobs.deadline.length > 0) ||
    (jobs && jobs.skillsets && jobs.skillsets.length > 0) ||
    (jobs && jobs.duration && jobs.duration.length > 0) ||
    (jobs && jobs.jobType && jobs.jobType.length > 0) ||
    (jobs && jobs.location && jobs.location.length > 0) ||
    (jobs && jobs.description && jobs.description.length > 0);

  const [description, setDescription] = useState(jobs?.description);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    history(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setJobs({ ...jobs, description: description });
  }, [description]);

  useEffect(() => {
    setJobDetails(jobs);
  }, [jobs]);

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleJobUpdate = () => {
    console.log("fetch: ", `${apiList.jobs}/${id}`);
    axios
      .put(`${apiList.jobs}/${id}`, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        getData(response.data);
        handleCloseUpdate();
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: err,
        });
        handleCloseUpdate();
      });
  };

  return (
    <div className="w-1/2 mx-auto gap-2 mt-32 grid">
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
        <div className="bg-slate-100 shadow-2xl px-4 py-6 rounded-2xl">
          <div>
            <InputField
              className="mt-8"
              type="text"
              label="Job Title"
              value={jobs.title}
              onChange={(e) => {
                setJobs({
                  ...jobs,
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
              value={jobs.salary}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  salary: e.target.value,
                });
              }}
            />
            <InputField
              className="mt-8 hover:border-black"
              type="text"
              label="Job type"
              placeholder="25 000"
              value={jobs.jobType}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  jobType: e.target.value,
                });
              }}
            />
            <InputField
              className="mt-8 hover:border-black"
              type="text"
              label="duration"
              placeholder="25 000"
              value={jobs.duration}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  duration: e.target.value,
                });
              }}
            />
            <InputField
              className="mt-8 hover:border-black"
              type="text"
              label="location"
              placeholder="TP.Ho Chi Minh"
              value={jobs.location}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  location: e.target.value,
                });
              }}
            />
            <InputField
              className="mt-8 hover:border-black"
              type="datetime-local"
              label="Application Deadline"
              placeholder="dd/mm/yy"
              value={jobs.deadline}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  deadline: e.target.value,
                });
              }}
            />
            <InputField
              className="mt-8 hover:border-black"
              type="number"
              label="Maximum Number Of Applicants"
              placeholder="100"
              value={jobs.maxApplicants}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  maxApplicants: e.target.value,
                });
              }}
            />
            <InputField
              className="mt-8 hover:border-black"
              type="number"
              label="Positions Available"
              placeholder="20"
              value={jobs.maxPositions}
              onChange={(e) => {
                setJobs({
                  ...jobs,
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
              value={jobs.description}
              onChange={(e) => {
                setJobs({
                  ...jobs,
                  description: e,
                });
              }}
              placeholder="Job description goes here..."
            />
          </div>
        </div>
      ) : (
        <JobAd edit={jobs} />
      )}

      <div className="flex items-center pt-6 mt-12">
        {isComplete ? (
          <button
            className="text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black"
            onClick={() => handleJobUpdate()}
          >
            Save
          </button>
        ) : (
          <WaitingBtn />
        )}

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
