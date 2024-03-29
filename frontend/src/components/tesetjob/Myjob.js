import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  faMoneyBillWave,
  faMapMarkerAlt,
  faCalendarDays,
  faUsers,
  faHand,
  faAward,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Rating } from "@material-tailwind/react";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";

import { userType } from "libs/isAuth";

const Myjob = ({ job }, index) => {
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [sop, setSop] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const userApply = () => {
    return (
      (job && job.status === "accepted") || (job && job.status === "finished")
    );
  };

  const handleApply = () => {
    console.log(job._id);
    console.log(sop);

    if (userApply()) {
      setPopup({
        open: true,
        icon: "success",
        message:
          "You already have an accepted job. Cannot apply for another job.",
      });
      return;
    }

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
          icon: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  useEffect(() => {
    if (userType() === "applicant") {
      const checkAcceptedJob = async () => {
        try {
          const response = await axios.get(
            `${apiList.jobs}/${job._id}/check-accepted`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setHasAcceptedJob(response.data.hasAcceptedJob);
        } catch (error) {
          console.error(error);
        }
      };

      checkAcceptedJob();
    }
  }, []);

  useEffect(() => {
    if (job) {
      const userID = job.userId;
      axios.get(`${apiList.allRecruiter}`).then((response) => {
        const filteredRecruiters = response.data.allUser.filter(
          (recruiter) => recruiter.userId === userID
        );
        setRecruiters(filteredRecruiters);
      });
    }
  }, [job]);

  // const deadline = new Date(job.deadline).toLocaleDateString();

  function calculateDays(date) {
    let daysAgo = Math.floor((new Date() - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) {
      return daysAgo + " day ago";
    } else if (daysAgo < 7) {
      return daysAgo + " days ago";
    } else if (daysAgo < 14) {
      return "1 week ago";
    } else if (daysAgo < 30) {
      return Math.floor(daysAgo / 7) + " weeks ago";
    } else if (daysAgo < 60) {
      return "1 month ago";
    } else {
      return Math.floor(daysAgo / 30) + " months ago";
    }
  }
  return (
    <div>
      <div
        className="transform ease-in duration-100 
        hover:-translate-y-2 hover:shadow-lg w-full h-full
      bg-white rounded-2xl p-6 text-left cursor-default"
      >
        <div className="flex items-center text-left pb-4">
          {recruiters.map((recruiter, index) => (
            <img
              className="w-14 h-14 rounded-2xl mr-4"
              key={index}
              src={recruiter.profile}
              alt="Company logo"
            />
          ))}
          <div>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {job.title}
            </p>
            <p className="text-md text-gray-600">
              Posted By : {job.recruiter.name}
            </p>
          </div>
        </div>
        {job.rating !== -1 && (
          <div className="pl-1 pb-1 flex gap-2">
            <Rating
              className="text-yellow-400"
              value={job.rating || null}
              readonly
            />
            <span className="font-semibold">-</span>
            <h6 className="md:text-xl text-lg font-bold text-gray-500">
              {job.rating}
            </h6>
          </div>
        )}
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
            icon={faHourglassHalf}
            className="text-xl text-orange-400 mr-3.5 ml-1"
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
            icon={faMapMarkerAlt}
            className="text-xl text-orange-400 mr-3.5 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Location:{" "}
            <span className="font-medium text-xl">{job.location}</span>
          </span>
        </p>

        <p className="pl-1">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="text-xl text-red-500 mr-3 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Date Of Posting:{" "}
            <span className="font-medium text-xl">
              {calculateDays(new Date(job.dateOfPosting))}
            </span>
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
        <div className="flex items-baseline flex-wrap">
          {job.skillsets && job.skillsets.length >= 0 ? (
            <>
              <FontAwesomeIcon
                icon={faAward}
                className="text-xl text-red-500 mr-3 ml-2"
              />
              <span className="text-base font-semibold tracking-wide">
                Skill:{" "}
              </span>
              <div className="pl-1 flex mt-3 gap-2">
                {job.skillsets
                  ? job.skillsets.map((skill, index) => (
                      <div
                        key={index}
                        className="whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                      >
                        <span>{skill}</span>
                      </div>
                    ))
                  : null}
              </div>
            </>
          ) : null}
        </div>
        <div className="flex items-center pt-6">
          {userType() === "applicant" && job ? (
            <>
              {job.maxPositions !== undefined &&
              job.acceptedCandidates !== undefined ? (
                <>
                  {job.maxPositions - job.acceptedCandidates > 0 ? (
                    <Link
                      className={`hover:opacity-80 ease-out duration-300 flex items-center font-semibold 
                        text-md justify-center px-8 py-3 bg-primary rounded-xl text-black ${
                          hasAcceptedJob
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      onClick={() => handleApply()}
                      title={
                        hasAcceptedJob ? "You already have an accepted job" : ""
                      }
                    >
                      {hasAcceptedJob ? "Job accepted!" : "Apply"}
                    </Link>
                  ) : (
                    <p className="text-md justify-center px-8 py-3 bg-gray-400 rounded-xl cursor-not-allowed text-black">
                      Position Filled
                    </p>
                  )}
                </>
              ) : null}
            </>
          ) : null}
          <Link
            className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-gray-100 hover:bg-gray-200 ease-out duration-300 px-3 py-3 rounded-xl border-none"
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
