import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import {
  faMoneyBillWave,
  faMapMarkerAlt,
  faCalendarDays,
  faUsers,
  faHand,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Rating } from "@material-tailwind/react";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import icon from "assets/icon.jpg";

const Myjob = (props, index) => {
  const { job } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    console.log(job._id);
    console.log(sop);
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const deadline = new Date(job.deadline).toLocaleDateString();
  console.log("skill: ", job.skillsets);
  return (
    <div index={index}>
      <div
        className="transform ease-in duration-100 
        hover:-translate-y-2 hover:shadow-lg w-full 
      bg-white rounded-2xl p-6 text-left cursor-default"
      >
        <div className="flex items-center text-left pb-4">
          <img
            className="w-14 h-14 rounded-2xl mr-4"
            src={icon}
            alt="Company logo"
          />
          <div>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {job.title}
            </p>
            <p className="text-md text-gray-600">
              Posted By : {job.recruiter.name}
            </p>
          </div>
        </div>
        <div className="pl-1 pb-1">
          <Rating value={job.rating !== -1 ? job.rating : null} readonly />
        </div>
        <p className="pl-1 pb-1">
          <FontAwesomeIcon
            icon={faMoneyBillWave}
            className="text-xl text-green-500 mr-2"
          />
          <span className="text-xl font-medium">{job.salary} $</span>
          <span className="text-sm font-semibold tracking-wide">
            {" "}
            / hiring reward
          </span>
        </p>
        <p className="pl-1">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-xl text-red-500 mr-3.5 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Duration:{" "}
            <span className="font-medium text-xl">
              {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
            </span>
          </span>
        </p>

        <p className="pl-1">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-xl text-red-500 mr-3 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Date Of Posting:{" "}
            <span className="font-medium text-xl">{deadline}</span>
          </span>
        </p>
        <p className="pl-1">
          <FontAwesomeIcon
            icon={faUsers}
            className="text-xl text-red-500 mr-2"
          />
          <span className="text-base font-semibold tracking-wide">
            Number of Applicants:
            <span className="font-medium text-xl"> {job.maxApplicants}</span>
          </span>
        </p>
        <p className="pl-1">
          <FontAwesomeIcon
            icon={faHand}
            className="text-xl text-red-500 mr-2"
          />
          <span className="text-base font-semibold tracking-wide">
            Remaining Number of Positions:{" "}
            <span className="font-medium text-xl">
              {job.maxPositions - job.acceptedCandidates}
            </span>
          </span>
        </p>
        <div className="pl-1 flex mt-3 gap-2">
          {job.skillsets
            ? job.skillsets.map((skill, index) => (
                <div className="whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
                  <span key={index}>{skill}</span>
                </div>
              ))
            : null}
        </div>
        <div className="flex items-center pt-6">
          <Link
            className="hover:opacity-80 flex cursor-pointer items-center font-semibold 
            text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
            to={`/jobs/${job._id}/refer`}
          >
            Refer
          </Link>

          <Link
            className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black  hover:bg-light px-3 py-3 rounded-xl border-none"
            to={`/jobs/${job._id}`}
          >
            About the job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Myjob;
