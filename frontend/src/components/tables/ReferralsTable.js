import { SetPopupContext } from "App";
import axios from "axios";
import ReferralStatus from "components/statuses/ReferralStatus";
import apiList from "../../libs/apiList";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ApplicationTile from "./applications/applications";
import { Rating, Typography } from "@material-tailwind/react";
import { Modal } from "flowbite-react";

const th = ["Title", "Name", "job type", "Status", "Day apply and join"];

export default function ReferralsTable({ referrals }) {
  const history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  let currentDate = new Date();
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [rating, setRating] = useState(applications?.job?.rating || -1);
  const [open, setOpen] = useState(false);

  const appliedOn =
    applications.length > 0
      ? new Date(applications[0].dateOfApplication)
      : null;
  const joinedOn =
    applications.length > 0 ? new Date(applications[0].dateOfJoining) : null;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    console.log("data: ", apiList.applications);

    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.applications);
        setApplications(response.data.applications);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };
  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  function calculateDays(date) {
    let daysAgo = Math.floor((currentDate - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) return daysAgo + " day ago";
    else return daysAgo + " days ago";
  }

  const fetchRating = () => {
    if (applications.jobId) {
      axios
        .get(`${apiList.rating}?id=${applications.jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setRating(response.data.rating);
          console.log(response.data.rating);
        })
        .catch((err) => {
          console.log(err.response.data);
          setPopup({
            open: true,
            severity: "error",
            message: "Error",
          });
        });
    } else {
      console.log("Job ID is undefined");
    }
  };
  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: applications.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        fetchRating();
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        fetchRating();
        setOpen(false);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="mt-6 overflow-x-auto bg-white rounded-xl px-6 py-3">
        <div className="py-2 align-middle inline-block min-w-full">
          <table className="min-w-full divide-y divide-gray-500 z-0">
            <thead>
              <tr>
                {th.map((t, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold "
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300 divide-dashed">
              {applications && applications.length > 0 ? (
                applications.map((obj, index) => (
                  <>
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/jobs/${obj.jobId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-money hover:underline"
                        >
                          <Typography>{obj.job.title}</Typography>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          to={`/companies/${obj.recruiterId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-money hover:underline"
                        >
                          {obj.recruiterId && obj.recruiter.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {obj.job.jobType}
                      </td>
                      <td className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col-reverse">
                        <div>
                          <div
                            className="w-full h-full flex items-center justify-center uppercase rounded-xl"
                            style={{
                              background: colorSet[obj.status],
                              color: "#ffffff",
                            }}
                          >
                            {obj.status}
                          </div>
                        </div>
                        {obj.status === "accepted" ||
                        obj.status === "finished" ? (
                          <div>
                            <button
                              variant="contained"
                              color="primary"
                              className="w-full h-full flex items-center justify-center uppercase"
                              onClick={() => {
                                fetchRating();
                                setOpen(true);
                              }}
                            >
                              Rate Job
                            </button>
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>Applied On: {appliedOn.toLocaleDateString()}</div>
                        {obj.status === "accepted" ||
                        obj.status === "finished" ? (
                          <div>Joined On: {joinedOn.toLocaleDateString()}</div>
                        ) : null}
                      </td>
                    </tr>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      className="h-full flex items-center justify-center"
                    >
                      <div
                        style={{
                          padding: "20px",
                          outline: "none",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          minWidth: "30%",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="simple-controlled"
                          style={{ marginBottom: "30px" }}
                          value={rating === -1 ? null : rating}
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                        />
                        <button
                          variant="contained"
                          color="primary"
                          style={{ padding: "10px 50px" }}
                          onClick={() => changeRating()}
                        >
                          Submit
                        </button>
                      </div>
                    </Modal>
                  </>
                ))
              ) : (
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  No Applications Found
                </Typography>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
