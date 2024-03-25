import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { userType } from "libs/isAuth";

const th = ["Job", "Job type", "Skill", "Date upload", "Delete job"];

export default function Job() {
  const setPopup = useContext(SetPopupContext);
  let history = useNavigate();

  const [job, setJob] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [reloadContent, setReloadContent] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    const allJob = apiList.jobs;
    console.log(allJob);

    axios
      .get(allJob)
      .then((response) => {
        console.log(response.data);
        setJob(response.data);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  }, [reloadContent]);

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

  const handleDelete = () => {
    axios
      .delete(`${apiList.jobs}/${selectedJobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        setReloadContent(!reloadContent);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = job.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };

  return (
    <>
      <div className="mt-12 overflow-x-auto bg-white rounded-md">
        <table className="min-w-full z-0">
          <thead className="border-b border-t rounded-md border-gray-400">
            <tr>
              {th.map((t) => (
                <th
                  key={t}
                  className="border-l border-gray-200 px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold"
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>

          {currentItems.length !== 0 ? (
            <tbody className="divide-y divide-gray-300 divide-dashed">
              {currentItems.map((currentJob, index) => (
                <tr
                  key={index}
                  className="hover:bg-light divide-x divide-gray-300 divide-dashed cursor-default"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {currentJob.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {currentJob.jobType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-1">
                      {currentJob.skillsets.map((tag, index) => (
                        <div
                          key={index}
                          className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                        >
                          <span className="">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calculateDays(new Date(currentJob.dateOfPosting))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="w-[50%] border border-red-400 bg-red-400 rounded-md hover:bg-red-500 cursor-pointer"
                      onClick={() => {
                        if (userType() === "admin") {
                          setSelectedJobId(currentJob._id);
                          setIsOpen(true);
                        } else {
                          setPopup({
                            open: true,
                            icon: "error",
                            message:
                              "You don't have permissions to delete the job",
                          });
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-white"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            ""
          )}
        </table>

        {job.length === 0 ? (
          <h3 className="mt-20 text-center">No jobs matched your search...</h3>
        ) : (
          " "
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(job.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 bg-${
                selectedPage === i + 1 ? "yellow" : "white"
              } text-black border hover:border-yellow-300 rounded ${
                selectedPage === i + 1 ? "bg-yellow-200" : ""
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this job? All of the
                    candidates that has been referred will be deleted as well.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-300 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
