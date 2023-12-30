import InputField from "components/InputField";
import JobAd from "components/JobAd";
import ReactQuill from "react-quill";
import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { MuiChipsInput } from "mui-chips-input";
import { SetPopupContext } from "App";
import apiList from "../libs/apiList";
import axios from "axios";

function WaitingBtn() {
  return (
    <div className="cursor-not-allowed transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg flex ml-2 mr-2 items-center font-semibold text-md justify-center px-8 py-3 bg-gray-300 rounded-xl text-black">
      Waiting for responses
    </div>
  );
}

export default function JobCreator({ jobToEdit, isComplete, props }) {
  const [tags, setTags] = useState([]);
  const addTag = (e) => {
    setTags((prevTags) => [...prevTags, e]);
  };
  const [job, setJob] = useState(
    jobToEdit || {
      title: "",
      maxApplicants: 100,
      maxPositions: 30,
      salary: 0,
      deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 16),
      skill: tags,
      duration: 0,
      jobType: "Full Time",
      status: "Open",
    }
  );

  const handleInput = (key, value) => {
    setJob({
      ...job,
      [key]: value,
    });
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
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  console.log(job.skill);
  console.log(tags);

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
            value={job.skill}
            onChange={(e) => addTag(e)}
            className="bg-white w-full block border border-grey-light p-3 rounded mb-4"
          />
        </div>

        {/* <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
          Job description
        </label>

        <ReactQuill
          theme="snow"
          placeholder="Job description goes here..."
          value={job.description || ""}
          onChange={(content) => setJob({ ...job, description: content })}
        /> */}

        <div className="flex items-center pt-6">
          {/* {isComplete ? (
            <button className="text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black">
              Save
            </button>
          ) : (
            <WaitingBtn />
          )} */}

          <button
            className="text-center transform hover:-translate-y-1 hover:shadow-lg 
          cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black"
            onClick={() => handleUpdate()}
          >
            Save
          </button>
          <Link
            to="/admin"
            className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-light px-8 py-3 rounded-xl border-none"
          >
            Cancel
          </Link>
        </div>
      </div>
      <div className="col-span-8 overflow-y-scroll">
        <JobAd job={job} tags={tags} description={job.description} />
      </div>
    </div>
  );
}
