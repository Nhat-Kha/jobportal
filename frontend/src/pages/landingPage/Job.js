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

  // console.log(job.userId);

  return (
    <>
      <div className="lg:w-6/12 w-11/12 mx-auto md:mt-20 mt-10 pb-10">
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

      <Banner
        title="Looking for something else?"
        button="Explore the job board"
        link="/jobs"
      />
    </>
  );
}
