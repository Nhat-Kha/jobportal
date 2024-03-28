import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faMoneyBillWave,
  faMapMarkerAlt,
  faAward,
  faHand,
  faUsers,
  faCalendarDays,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import icon from "assets/icon.jpg";
import axios from "axios";
import apiList from "../../libs/apiList";
import { Rating } from "@material-tailwind/react";
import { userType } from "libs/isAuth";
import { SetPopupContext } from "App";

export default function InfoRecruiter() {
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [company, setCompany] = useState();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [sop, setSop] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const setPopup = useContext(SetPopupContext);
  let history = useNavigate();
  const { id } = useParams();

  const userApply = () => {
    return (
      (jobs && jobs.status === "accepted") ||
      (jobs && jobs.status === "finished")
    );
  };

  const handleApply = () => {
    if (userApply()) {
      setPopup({
        open: true,
        icon: "success",
        message:
          "You already have an accepted job. Cannot apply for another job.",
      });
      return;
    }
    let address = apiList.jobs;
    const jobId = jobs[0]?._id;

    axios
      .post(
        `${address}/${jobId}/applications`,
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
        history(`/jobs/${jobId}/refer`);
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  useEffect(() => {
    let address = apiList.user;
    axios
      .get(`${address}/${id}`)
      .then((response) => {
        console.log(response);
        setCompany(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let address = apiList.jobs;
        const response = await axios.get(`${address}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const checkAcceptedJob = async () => {
      try {
        const response = await axios.get(
          `${apiList.jobs}/${jobs._id}/check-accepted`,
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

    if (jobs.length > 0) {
      checkAcceptedJob();
    }
  }, [jobs]);

  const filterjob = jobs.filter((obj) => obj.userId === id);

  return (
    <>
      <div className="md:pt-32 pt-12 pb-20">
        <div className="lg:w-9/12 w-11/12 mx-auto rounded-xl">
          <div className="flex">
            <img
              alt="company logo"
              className="md:h-24 md:w-24 w-16 h-16 md:mr-6 mr-4 rounded-md"
              src={company?.profile}
            />

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl md:pt-6 pt-3">
                {company?.name}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-3 lg:gap-14 gap-3">
            <div className="lg:col-span-2 col-span-3">
              <h1 className="text-3xl font-medium md:mt-12 mt-6 mb-3">
                About {company?.name}
              </h1>
              <p className="md:text-xl text-md">{company?.bio}</p>
            </div>
            <div className="lg:col-span-1 col-span-3">
              <h1 className="text-3xl font-medium md:mt-12 mt-4 mb-3">
                Phone contact
              </h1>
              <p className="md:text-xl text-md">{company?.contactNumber}</p>
            </div>
            <div className="col-span-3">
              <img
                src={company?.profile}
                alt="company"
                className="w-[30%] h-[100%] rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12 pt-20 ">
          <div className="block pt-4">
            <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
              Jobs at {company?.name} <span>({filterjob.length})</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 ">
            {jobs.length > 0 ? (
              jobs
                .filter((job) => job.userId === id)
                .map((job, index) => {
                  const deadline = new Date(job.deadline).toLocaleDateString();
                  return (
                    <div
                      key={index}
                      className="transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
                    >
                      <div className="flex items-center text-left pb-4">
                        <img
                          className="w-14 h-14 rounded-2xl mr-4"
                          src={company?.profile}
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
                      <div className="pl-1 pb-1 flex gap-2">
                        <Rating
                          className="text-yellow-400"
                          value={job.rating !== -1 ? job.rating : null}
                          readonly
                        />
                        <span className="font-semibold">-</span>
                        <h6 className="md:text-xl text-lg font-bold text-gray-500">
                          {job.rating}
                        </h6>
                      </div>
                      <p className="pl-1 pb-1">
                        <FontAwesomeIcon
                          icon={faMoneyBillWave}
                          className="text-xl text-green-500 mr-2"
                        />
                        <span className="text-xl font-medium">
                          {job.salary} $
                        </span>
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
                            {job.duration !== 0
                              ? `${job.duration} month`
                              : `Flexible`}
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
                          <span className="font-medium text-xl">
                            {job.location}
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
                          <span className="font-medium text-xl">
                            {deadline}
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
                          <span className="font-medium text-xl">
                            {" "}
                            {job.maxApplicants}
                          </span>
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
                      <div className="flex items-baseline">
                        {job.skillsets && job.skillsets.length > 0 ? (
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
                        {userType() === "applicant" ? (
                          <>
                            {job.maxPositions - job.acceptedCandidates > 0 ? (
                              <Link
                                className={`hover:opacity-80 ease-out duration-300 flex cursor-pointer items-center font-semibold 
                                text-md justify-center px-8 py-3 bg-primary rounded-xl text-black ${
                                  hasAcceptedJob
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() => handleApply()}
                                title={
                                  hasAcceptedJob
                                    ? "You already have an accepted job"
                                    : ""
                                }
                              >
                                {hasAcceptedJob ? "Job accepted!" : "Apply"}
                              </Link>
                            ) : (
                              <p className="text-md justify-center px-8 py-3 bg-gray-400 rounded-xl text-black">
                                Position Filled
                              </p>
                            )}
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
                  );
                })
            ) : (
              <h5 style={{ textAlign: "center" }}>No jobs found</h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
