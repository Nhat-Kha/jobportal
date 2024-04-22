import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "../../libs/apiList";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating, Typography } from "@material-tailwind/react";
import { Button, Modal, ModalBody } from "flowbite-react";
import { getId } from "libs/isAuth";
import { Dialog, Transition } from "@headlessui/react";

const th = [
  "Title",
  "Name",
  "job type",
  "Status",
  "Day apply and join",
  "rating",
];

export default function ReferralsTable(props) {
  const setPopup = useContext(SetPopupContext);
  const UserId = getId();
  const { referrals } = props;
  const [rating, setRating] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  useEffect(() => {
    const newRatings = referrals.map((referral) => referral.job.rating);
    if (newRatings.some((rating) => rating != null)) {
      const firstNonNullRating = newRatings.find((rating) => rating != null);
      setRating(firstNonNullRating);
    }
  }, [referrals]);

  console.log("applicant: ", referrals);
  console.log("rating first: ", rating);

  const appliedOn =
    referrals.length > 0 ? new Date(referrals[0].dateOfApplication) : null;

  const joinedOn =
    referrals.length > 0 ? new Date(referrals[0].dateOfJoining) : null;

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const fetchRating = async (referral) => {
    if (referral && referral.job._id) {
      try {
        const response = await axios.get(
          `${apiList.rating}?id=${referral.job._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const fetchedRating = response.data.rating;

        if (!isNaN(fetchedRating)) {
          const index = referrals.findIndex(
            (item) => item._id === referral.job._id
          );
          if (index !== -1) {
            referrals[index].rating = fetchedRating;
            setRating(fetchedRating);
          }
        } else {
          console.log("Rating không hợp lệ");
        }
      } catch (err) {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      }
    }
  };

  const changeRating = async (jobId) => {
    console.log("job id: ", jobId);
    try {
      if (referrals.length === 0) {
        console.log("No referrals found");
        return;
      }

      await axios.put(
        apiList.rating,
        { rating: rating, jobId: jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPopup({
        open: true,
        icon: "success",
        message: "Rating updated successfully",
      });

      fetchRating();
      setOpen(false);
    } catch (err) {
      setPopup({
        open: true,
        icon: "error",
        message: err.response.data.message,
      });
      setOpen(false);
    }
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
              {referrals && referrals.length > 0 ? (
                <>
                  {referrals.map((obj, index) => {
                    if (obj.userId === UserId) {
                      return (
                        <React.Fragment key={index}>
                          <tr>
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
                            <td className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-col-reverse gap-y-1">
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
                                    className="w-full h-full flex items-center justify-center uppercase font-semibold transition ease-in-out duration-1000"
                                    onClick={() => {
                                      setSelectedReferral(obj);
                                      fetchRating(obj);
                                      setOpen(true);
                                    }}
                                  >
                                    Rate Job
                                  </button>
                                </div>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  Job No Rate
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>
                                Applied On: {appliedOn.toLocaleDateString()}
                              </div>
                              {obj.status === "accepted" ||
                              obj.status === "finished" ? (
                                <div>
                                  Joined On: {joinedOn.toLocaleDateString()}
                                </div>
                              ) : (
                                <div>
                                  <span className="font-semibold">
                                    Job rejection
                                  </span>
                                </div>
                              )}
                            </td>
                            <td>
                              {obj.job.rating !== -1 ? (
                                <Rating value={obj.job.rating} readonly />
                              ) : (
                                <span>No Rating</span>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    }
                  })}
                </>
              ) : (
                <Typography style={{ textAlign: "center" }}>
                  No Applications Found
                </Typography>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <span className="font-normal text-slate-500">
          <span className="text-red-500">*</span>If the job is{" "}
          <span className="font-semibold uppercase">accepted</span>, click on
          the <span className="font-semibold uppercase">'Rate Job'</span> line
          to evaluate it.
          <span className="text-red-500">*</span>
        </span>
      </div>

      {/* <Modal
        show={open}
        onClose={handleClose}
        className={`transition-opacity ${
          open ? "opacity-100 transition duration-300" : "opacity-0"
        } bg-overlay-70`}
        size="md"
      >
        <div className="fixed w-[25%] top-[25%]">
          <Modal.Header className="bg-slate-200 border-none rounded-t-2xl font-bold">
            Select
          </Modal.Header>
          <div>
            <Modal.Body className="bg-gray-100 p-5 outline-none flex flex-col justify-center min-w-[30%] items-center gap-4">
              <div>
                <span className="font-bold">Job name</span>:
                <span className="font-semibold">
                  {" "}
                  {selectedReferral?.job?.title}
                </span>
              </div>
              <Rating
                name="simple-controlled"
                value={rating === -1 ? null : rating}
                onChange={(newValue) => {
                  setRating(newValue);
                }}
                className="text-yellow-300 mb-[10px]"
              />
            </Modal.Body>
            <Modal.Footer className="bg-gray-100 flex justify-center rounded-b-2xl">
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => {
                  changeRating(selectedReferral?.jobId);
                }}
                className="bg-gray-200 hover:bg-slate-300 transition duration-300"
              >
                <span className="font-semibold">Submit</span>
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal> */}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child>
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <h1 className="text-center text-3xl font-semibold">Select</h1>
                <div className="relative bg-white p-2 mt-6">
                  <div className="bg-gray-100 p-5 outline-none flex flex-col justify-center min-w-[30%] items-center gap-4">
                    <div>
                      <span className="font-bold">Job name</span>:
                      <span className="font-semibold">
                        {" "}
                        {selectedReferral?.job?.title}
                      </span>
                    </div>
                    <Rating
                      name="simple-controlled"
                      value={rating === -1 ? null : rating}
                      onChange={(newValue) => {
                        setRating(newValue);
                      }}
                      className="text-yellow-300 mb-[10px]"
                    />
                  </div>
                  <div className="bg-gray-100 flex justify-center rounded-b-2xl pb-6 gap-2">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ padding: "10px 50px" }}
                      onClick={() => {
                        changeRating(selectedReferral?.jobId);
                      }}
                      className="bg-yellow-200 text-gray-500 hover:bg-yellow-300 hover:text-black border-yellow-100 cursor-pointer"
                    >
                      <span className="font-semibold">Submit</span>
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ padding: "10px 50px" }}
                      onClick={() => {
                        handleClose();
                      }}
                      className="bg-gray-200 hover:bg-slate-300 transition duration-300"
                    >
                      <span className="font-semibold">Cancel</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
