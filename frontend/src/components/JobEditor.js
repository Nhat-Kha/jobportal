import isAuth from "libs/isAuth";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JobAd from "./JobAd";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

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

  const { user } = isAuth();
  const [job, setJob] = useState(
    jobToEdit || {
      company: user.displayName,
      companyId: user.uid,
      logo: user.photoURL,
      title: "",
      employment: "",
      hiring: "",
      interview: "",
      location: "",
      description: "",
      status: "Open",
      time: Date.now(),
    }
  );

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

  const addToDatabase = useCallback(async () => {
    if (jobToEdit && _id) {
      return;
    }
  });

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
          <div className="grid grid-cols-4 gap-4 mt-6">
            <InputField
              className="col-span-2"
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
            <InputField
              className="col-span-2"
              label="Interview Reward"
              type="text"
              placeholder="1000"
              value={job.interview}
              onChange={(e) => {
                setJob({
                  ...job,
                  interview: e.target.value,
                });
              }}
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

          <ReactQuill
            modules={modules}
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Job description goes here..."
          />
        </>
      ) : (
        <JobAd job={job} description={job.description} />
      )}

      <div className="flex items-center pt-6 mt-12">
        <button
          className="text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black"
          onClick={() => addToDatabase()}
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
