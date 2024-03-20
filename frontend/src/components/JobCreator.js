import InputField from "components/InputField";
import JobAd from "components/JobAd";
import ReactQuill from "react-quill";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { MuiChipsInput } from "mui-chips-input";
import { SetPopupContext } from "App";
import apiList from "../libs/apiList";
import axios from "axios";
import isAuth from "libs/isAuth";

function WaitingBtn() {
  return (
    <div className="cursor-not-allowed transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg flex ml-2 mr-2 items-center font-semibold text-md justify-center px-8 py-3 bg-gray-300 rounded-xl text-black">
      Waiting for responses
    </div>
  );
}

export default function JobCreator({ jobToEdit }) {
  const setPopup = useContext(SetPopupContext);

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
      location: "",
      status: "Open",
      description: "",
    }
  );

  let isComplete =
    job.title.length > 0 &&
    job.maxApplicants.length > 0 &&
    job.maxPositions.length > 0 &&
    job.salary.length > 0 &&
    job.deadline.length > 0 &&
    job.skillsets.length > 0 &&
    job.duration.length > 0 &&
    job.jobType.length > 0 &&
    job.location.length > 0 &&
    job.description.length > 0;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: ["red", "blue"] }, { background: ["red", "blue"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleUpdate = () => {
    console.log(job);
    axios
      .post(apiList.jobs, job, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJob({
          title: "",
          maxApplicants: "",
          maxPositions: "",
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "",
          duration: "",
          salary: "",
          description: "",
          location: "",
        });
        setPopup({
          open: true,
          icon: "success",
          message: "Post created successfully",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="grid grid-cols-12 overflow-y-hidden h-screen">
      <div className="col-span-4 bg-light px-12 py-4 overflow-y-scroll">
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
          type="text"
          label="location"
          placeholder="25 000"
          value={job.location}
          onChange={(e) => {
            setJob({
              ...job,
              location: e.target.value,
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
        <tr>
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
        </tr>
        <div className="flex items-center pt-6">
          {isComplete ? (
            <button
              onClick={() => handleUpdate()}
              className="text-center transform hover:-translate-y-1 hover:shadow-lg 
              cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black"
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
      <div className="col-span-8 overflow-y-scroll">
        <JobAd job={job} tags={tags} />
      </div>
    </div>
  );
}
