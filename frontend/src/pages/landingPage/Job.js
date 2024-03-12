import axios from "axios";
import JobAd from "components/JobAd";
import apiList from "../../libs/apiList";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Banner from "components/Banner";
import { userType } from "libs/isAuth";
import { SetPopupContext } from "App";

export default function Job(props) {
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();
  const [job, setJob] = useState();
  const [allJob, setAllJob] = useState();
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const userApply = () => {
    return (
      (job && job.status === "accepted") || (job && job.status === "finished")
    );
  };

  const handleApply = () => {
    console.log(job._id);

    if (userApply()) {
      setPopup({
        open: true,
        icon: "success",
        message:
          "You already have an accepted job. Cannot apply for another job.",
      });
      return;
    } else {
      setPopup({
        open: true,
        icon: "warn",
        message: "You already have an accepted job",
      });
    }

    axios
      .post(`${apiList.jobs}/${job._id}/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        history(`/jobs/${job._id}/refer`);
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

  const handleClickJob = () => {
    history.go(0);
  };

  useEffect(() => {
    const checkAcceptedJob = async () => {
      try {
        const response = await axios.get(
          `${apiList.jobs}/${id}/check-accepted`,
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
  }, []);

  useEffect(() => {
    axios
      .get(`${apiList.jobs}/${id}`)
      .then((response) => {
        setJob(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const all = apiList.jobs;
    axios.get(all).then((response) => {
      setAllJob(response.data);
      console.log(response.data);
    });
  }, []);

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
    <>
      <div className="flex">
        <div className="lg:w-6/12 w-11/12 h-full ml-44 mr-20 md:mt-20 mt-10 pb-10">
          <JobAd about={job} />
          <div className="text-center mx-auto mt-12 mb-10">
            {userType() === "applicant" ? (
              <Link
                className={`hover:opacity-80 ease-out duration-300 flex cursor-pointer items-center font-semibold 
                text-md justify-center px-8 py-3 bg-primary rounded-xl text-black ${
                  hasAcceptedJob ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleApply()}
                title={hasAcceptedJob ? "You already have an accepted job" : ""}
              >
                {hasAcceptedJob ? "Job accepted!" : "Apply"}
              </Link>
            ) : null}
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/3 2xl:w-2/4 md:mt-20 mt-10 pb-10">
          <p className="text-gray-500 font-semibold">Similar Job Post</p>

          <div className="w-full flex flex-wrap gap-4">
            {allJob?.slice(0, 6).map(
              (job, index) =>
                job._id !== id && (
                  <Link
                    to={`/jobs/${job._id}`}
                    key={index}
                    onClick={handleClickJob}
                  >
                    <div
                      className="w-full h-[30rem] md:w-[16rem] 2xl:w-[18rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                      rounded-md px-3 py-5 "
                    >
                      <div className="flex gap-3">
                        <img
                          src={job?.recruiter.profile}
                          alt={job?.recruiter.name}
                          className="w-14 h-14"
                        />

                        <div className="">
                          <p className="text-lg font-semibold truncate">
                            {job.title}
                          </p>
                          <span className="flex gap-2 items-center">
                            {job.location}
                          </span>
                        </div>
                      </div>

                      <div className="py-3">
                        <p className="text-sm">
                          {job.recruiter.bio ? (
                            <>
                              <span>
                                {" "}
                                {job.recruiter.bio.slice(0, 150) + "..."}
                              </span>
                            </>
                          ) : (
                            <div className="text-base">No description yet</div>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pb-2">
                        <p className="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm">
                          {job.jobType}
                        </p>
                        <span className="text-gray-500 text-sm">
                          {calculateDays(new Date(job.dateOfPosting))}{" "}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-row gap-1">
                          {job.skillsets.map((tag, index) => (
                            <div
                              key={index}
                              className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                            >
                              <span className="">{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>

      <Banner
        title="Looking for something else?"
        button="Explore the job board"
        link="/jobs"
      />
    </>
  );
}
