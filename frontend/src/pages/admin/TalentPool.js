import { useState, useEffect, Fragment } from "react";

import CandidateTable from "components/tables/CandidateTable";
import { userType } from "libs/isAuth";
import Loader from "components/Loader";
import axios from "axios";
import apiList from "libs/apiList";
import blog1 from "assets/blogs/blog-1.png";
import blog2 from "assets/blogs/blog-2.png";
import blog3 from "assets/blogs/blog-3.png";
import blog4 from "assets/blogs/blog-4.png";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import news from "data/authors-table-data";

export default function TalentPool() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [applicant, setApplicant] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterUser, setFilterUser] = useState(null);

  useEffect(() => {
    axios.get(apiList.users).then((response) => {
      setUsers(response.data.allUser);
    });
  }, []);

  useEffect(() => {
    axios.get(apiList.allApplicants).then((response) => {
      console.log(response.data.allUser);
      const filteredApplicants = response.data.allUser.filter((user) => {
        return user.skills.length >= 2 && user.education.length >= 1;
      });
      setApplicant(filteredApplicants);
    });
  }, []);

  const openModal = (user) => {
    const found = users.find((u) => u._id === user.userId);
    if (found) {
      setSelectedUser({ ...found, ...user });
      setIsOpen(true);
    }

    console.log("found: ", found);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      <div className="md:w-10/12 w-12/12 mx-auto md:py-28 py-10">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mb-4">
          Talent Pool
        </h2>

        <div>
          <section>
            <div className="container lg:w-4/5 h-auto mx-auto mt-8 p-8 bg-light shadow-xl rounded-2xl">
              <div>
                <h2 className="text-indigo-500 text-2xl font font-medium">
                  Top Players
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-8 mt-8">
                  {applicant.map((user, index) => (
                    <div
                      onClick={() => openModal(user)}
                      key={index}
                      className="flex items-center cursor-pointer rounded-xl"
                    >
                      <img
                        className="h-16 w-16 mr-4 rounded-xl bg-cover"
                        src={user.profile}
                        alt=""
                      />
                      <h3 className="text-gray-900 font-medium text-xl">
                        {user.name}
                      </h3>
                      <span className="text-[#64748b] text-sm">
                        {user.email}
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="border-t border-slate-300 rounded-3xl my-8" />
                <div>
                  <h2 className="text-indigo-500 text-2xl font font-medium">
                    Top reference blog
                  </h2>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {news.map((data) => (
                      <Link to={`/blog/news/${data.id}`}>
                        <div
                          class="flex flex-col lg:flex-row gap-4 hover:bg-slate-200 rounded-lg"
                          key={data.id}
                        >
                          <img
                            src={data.img}
                            alt=""
                            className="lg:h-32 lg:w-[12rem] mr-4 rounded-md"
                          />
                          <div>
                            <h3 className="text-gray-900 text-xl font-medium leading-8">
                              {data.title.slice(0, 30) + "..."}
                            </h3>
                            <p className="text-gray-500 text-lg mt-4">
                              By{" "}
                              <span className="text-indigo-600">
                                {data.useUpload}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                    {selectedUser && (
                      <>
                        <h1 className="text-left text-3xl font-semibold">
                          {selectedUser.name}
                        </h1>
                        <span className="text-[#64748b] text-sm">
                          Personal Information of {selectedUser.email}
                        </span>
                        <div className="relative bg-white p-2 mt-6">
                          <div className="flex items-center gap-4 py-2">
                            <img
                              className="h-16 w-16 mr-4 rounded-full"
                              src={selectedUser.profile}
                              alt=""
                            />
                            <div className="grid gap-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-medium">
                                  {selectedUser.name}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-b border-gray-200 dark:border-gray-800">
                            <div className="grid grid-cols-2 gap-6 p-6">
                              <div className="space-y-2">
                                <label className="text-sm" htmlFor="name">
                                  Name
                                </label>
                                <p>
                                  <span className="font-semibold">
                                    {selectedUser.name}
                                  </span>
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm">Education</label>
                                <p>
                                  <span className="font-semibold">
                                    {selectedUser.education
                                      .map((edu) => {
                                        return `${edu.institutionName} (${
                                          edu.startYear
                                        }-${
                                          edu.endYear ? edu.endYear : "Ongoing"
                                        })`;
                                      })
                                      .join(", ")}
                                  </span>
                                </p>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm">Birthday</label>
                                {selectedUser.dateOfBirth ? (
                                  <p>
                                    <span className="font-semibold">
                                      {new Date(
                                        selectedUser.dateOfBirth
                                      ).toLocaleDateString()}
                                    </span>
                                  </p>
                                ) : (
                                  <p>
                                    <span className="text-red-500">
                                      Invalid Date
                                    </span>
                                  </p>
                                )}
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm">Skills</label>
                                <div className="flex flex-row gap-1">
                                  {selectedUser.skills.map((tag, index) => (
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
                          </div>
                          <div className="flex justify-end pt-2">
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ padding: "10px 50px" }}
                              onClick={() => {
                                closeModal();
                              }}
                              className="bg-gray-900 hover:opacity-70 rounded-lg"
                            >
                              <span className="font-bold text-xs text-white uppercase">
                                Cancel
                              </span>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
}
