import InputField from "components/InputField";
import JobAd from "components/JobAd";
import ReactQuill from "react-quill";
import { useCallback, useEffect, useState } from "react";

import { useHistory, Link } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { MuiChipsInput } from "mui-chips-input";

function WaitingBtn() {
  return (
    <div className="cursor-not-allowed transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg flex ml-2 mr-2 items-center font-semibold text-md justify-center px-8 py-3 bg-gray-300 rounded-xl text-black">
      Waiting for responses
    </div>
  );
}

export default function JobCreator({ jobToEdit, isComplete }) {
  const [job, setJob] = useState(
    jobToEdit || {
      title: "",
      employment: "",
      hiring: "",
      skill: "",
      location: "",
      description: "",
      status: "Open",
    }
  );

  const [tags, setTags] = useState([]);
  const addTag = (newChips) => {
    setTags(newChips);
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
          type="text"
          label="Hiring Reward"
          placeholder="25 000"
          value={job.hiring}
          onChange={(e) => {
            setJob({
              ...job,
              hiring: e.target.value,
            });
          }}
        />
        {/* <div>
            {tags.map((tag, index) => {
              return (
                <div key={index}>
                  {tag} <span onClick={() => removeTag(tag)}>x</span>
                </div>
              );
            })}
            <InputField
              className="col-span-2"
              label="Skills"
              placeholder="skill"
              onChange={addTag}
            />
          </div> */}
        <div className="pb-4">
          <label className="block text-black text-sm font-semibold mb-2">
            Skills <span className="text-[#ff3131]">*</span>
          </label>
          <MuiChipsInput
            value={tags}
            onChange={addTag}
            className="bg-white w-full block border border-grey-light p-3 rounded mb-4"
          />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-1">
          <InputField
            className="col-span-2"
            type="text"
            label="Location"
            value={job.location}
            onChange={(e) => {
              setJob({
                ...job,
                location: e.target.value,
              });
            }}
            placeholder="Stockholm"
          />

          <InputField
            className="col-span-2"
            type="text"
            label="Employment Type"
            value={job.employment}
            onChange={(e) => {
              setJob({
                ...job,
                employment: e.target.value,
              });
            }}
            placeholder="Full Time"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
          Job description
        </label>

        <ReactQuill theme="snow" placeholder="Job description goes here..." />

        <div className="flex items-center pt-6">
          {isComplete ? (
            <button className="text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black">
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
        <JobAd job={job} description={job.description} />
      </div>
    </div>
  );
}
