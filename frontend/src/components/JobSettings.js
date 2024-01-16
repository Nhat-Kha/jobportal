import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import apiList from "libs/apiList";
import { Fragment, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JobStatus from "./statuses/JobStatus";
import { SetPopupContext } from "App";

export default function JobSettings({ job, id }) {
  let [isOpen, setIsOpen] = useState(false);
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);

  const handleDelete = async () => {
    let address = apiList.jobs;

    await axios
      .delete(`${address}/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPopup({
          Open: true,
          icon: "success",
          message: response.data.message,
        });
        setIsOpen(false);
        setIsOpen(response.data);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          Open: true,
          icon: "error",
          message: err.response.data.message,
        });
      });
  };
  if (job == null) {
    return <h1>Loding...</h1>;
  }

  return (
    <>
      <div className="mt-12">
        <label className="block mb-6 text-sm font-medium text-gray-700">
          Job status
        </label>
        <JobStatus job={job} id={id} />

        <button
          className="mt-12 w-60 text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-red-400 rounded-xl text-white"
          onClick={() => setIsOpen(true)}
        >
          Delete job
        </button>
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
