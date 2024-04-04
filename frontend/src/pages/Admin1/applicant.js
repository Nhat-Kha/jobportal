import { faInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Typography } from "@material-tailwind/react";
import { SetPopupContext } from "App";
import axios from "axios";
import { Button } from "flowbite-react";
import apiList from "libs/apiList";
import { userType } from "libs/isAuth";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import unorm from "unorm";

export default function Applicant() {
  const setPopup = useContext(SetPopupContext);
  const searchRef = useRef(null);
  const [all, setAll] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reloadContent, setReloadContent] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type (/) search");

  console.log("user before: ", all);

  useEffect(() => {
    const user = apiList.allApplicants;
    const normalizeText = (text) => {
      return unorm
        .nfkd(text)
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
    };
    axios
      .get(user)
      .then((response) => {
        console.log(response.data.allUser);
        const newData = response.data.allUser.filter((user) => {
          const normalizedTitle = normalizeText(user.name);
          return normalizedTitle.includes(normalizeText(searchQuery));
        });
        setAll(newData);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  }, [reloadContent, setPopup, searchQuery]);

  console.log("user after: ", all);

  const openModal = (user) => {
    setIsOpen(true);
    setSelectedUser(user);
    console.log(user.userId);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = all.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
      if (event.key === "Escape") {
        setSearchQuery("");
        if (searchRef.current) {
          searchRef.current.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (user) => {
    axios
      .delete(`${apiList.user}/${user}`, {
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

  return (
    <div className="min-h-screen pt-10">
      <div className="flex justify-between">
        <div className="pb-4 flex justify-center items-center">
          <span className="font-semibold text-slate-500">ALL APPLICANT</span>
          <span className="font-bold">({all.length})</span>
        </div>
        <div className="pb-4">
          <div className="relative bg-slate-50">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              placeholder={placeholderText}
              className="block w-full p-4 ps-10 text-sm text-gray-600 border-b border-l border-b-gray-300 border-l-gray-300
              rounded-bl-md outline-none bg-slate-50 focus:placeholder:text-black focus:text-black"
              onFocus={() => setPlaceholderText("Search name user")}
              onBlur={() => setPlaceholderText("Type (/) search")}
              onChange={handleSearchInputChange}
              ref={searchRef}
            />
          </div>
        </div>
      </div>
      <>
        {currentItems.map((applicant, index) => (
          <>
            <div
              key={index}
              className="flex items-center bg-white rounded-md hover:bg-slate-100"
            >
              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
                <img
                  src={`${applicant.profile}`}
                  alt={`${applicant.name}'s profile`}
                  className="w-[10rem] h-[10rem] rounded-xl hidden sm:block object-cover"
                />
              </div>
              <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
                <div>
                  <Typography variant="h5">{applicant.name}</Typography>
                </div>
                <div>
                  Education:{" "}
                  <span className="font-semibold flex md:flex-1 flex-wrap">
                    {applicant.education && applicant.education.length > 0 ? (
                      applicant.education.map((edu, index) => (
                        <span key={index} className="">
                          <span>{edu.institutionName}</span>
                          <span>
                            ({edu.startYear}-
                            {edu.endYear ? edu.endYear : "Ongoing"})
                          </span>
                          {index !== applicant.education.length - 1 && (
                            <span>, </span>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="text-red-500">Not updated</span>
                    )}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="text-bold">Skills:</div>
                  <div className="text-right">
                    <div className="flex flex-row gap-1 flex-wrap">
                      {applicant?.skills && applicant?.skills.length > 0 ? (
                        applicant?.skills.map((tag, index) => (
                          <div
                            key={index}
                            className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                            bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                          >
                            <span>{tag}</span>
                          </div>
                        ))
                      ) : (
                        <span className="font-semibold text-red-500">
                          Not updated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span>Date of birth: </span>
                  {applicant.dateOfBirth ? (
                    <span className="font-semibold">
                      {new Date(applicant.dateOfBirth).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Not updated
                    </span>
                  )}
                </div>
                <hr className="my-8 border-gray-300" />
              </div>
              <div className="px-6 py-4 whitespace-nowrap flex justify-center items-center text-sm text-gray-500 flex-1 w-2">
                <div className="w-[100px] flex gap-2">
                  <Button
                    className="rounded-full bg-red-100 w-10 h-10 hover:opacity-50"
                    onClick={() => {
                      setSelectedUser(applicant._id);
                      openModal(applicant);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="w-6 h-6 text-red-600"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ))}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(all.length / itemsPerPage) },
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

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this {selectedUser?.name}?
                      All of the candidates that has been referred will be
                      deleted as well.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-300 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => {
                        handleDelete(selectedUser?.userId);
                        console.log(selectedUser?.userId);
                      }}
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
    </div>
  );
}
