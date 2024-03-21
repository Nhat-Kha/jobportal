import {
  Card,
  Checkbox,
  ListItemPrefix,
  Option,
  Select,
  Slider,
  Typography,
} from "@material-tailwind/react";
import { Button, List, ListItem, Modal } from "flowbite-react";
import { Fragment, useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";

export default function FilterPopup(props) {
  const {
    open,
    handleClose,
    searchOptions,
    setSearchOptions,
    getData,
    handleJobTypeChange,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState([0, 400]);

  const changeWidth = (event) => {
    setValues(event.target.value);
  };

  const handleChangeMin = (event) => {
    setSearchOptions({
      ...searchOptions,
      salary: [event.target.value, searchOptions.salary[1]],
    });
  };

  const handleChangeMax = (event) => {
    setSearchOptions({
      ...searchOptions,
      salary: [searchOptions.salary[0], event.target.value],
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="flex items-center bg-white border-gray-500"
        variant="gradient"
      >
        <FontAwesomeIcon icon={faFilter} className="text-black" />
        <span className="text-black ml-2">Filter</span>
      </Button>
      {/* <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-overlay-70"
      >
        <Modal.Header className="bg-gray-200 border-none rounded-t-2xl">
          Select
        </Modal.Header>
        <Modal.Body className="bg-gray-100">
          <div className="grid grid-rows-3 space-y-6">
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-center">Job Type</p>
              <div className="flex gap-4 w-3/4">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <input
                      type="checkbox"
                      id="fullTimeCheckbox"
                      checked={searchOptions.jobType.fullTime}
                      onChange={() => {
                        handleJobTypeChange("fullTime");
                      }}
                    />
                    <label htmlFor="fullTimeCheckbox">Full time</label>
                  </ListItemPrefix>
                </label>
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <input
                      type="checkbox"
                      id="partTimeCheckbox"
                      checked={searchOptions.jobType.partTime}
                      onChange={() => {
                        handleJobTypeChange("partTime");
                      }}
                    />
                    <label htmlFor="partTimeCheckbox">Part time</label>
                  </ListItemPrefix>
                </label>
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-2">
                    <input
                      type="checkbox"
                      id="wfhCheckbox"
                      checked={searchOptions.jobType.wfh}
                      onChange={() => {
                        handleJobTypeChange("wfh");
                      }}
                    />
                    <label htmlFor="wfhCheckbox">Work at home</label>
                  </ListItemPrefix>
                </label>
              </div>
            </div>
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Salary</p>
              <div className="w-96">
                <div className="w-full">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={searchOptions.salary[0]}
                    step="1"
                    onChange={handleChangeMin}
                    className="slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={searchOptions.salary[1]}
                    step="1"
                    onChange={handleChangeMax}
                    className="slider"
                  />
                  <output className="text-sm text-gray-500">
                    {searchOptions.salary[0] * (100000 / 100)} -{" "}
                    {searchOptions.salary[1] * (100000 / 100)}
                  </output>
                </div>
              </div>
            </div>
            <div className="flex flex-rows justify-around items-center">
              <p className="flex justify-start">Duration</p>
              <div className="w-3/4">
                <select
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  value={searchOptions.duration}
                  onChange={(event) =>
                    setSearchOptions({
                      ...searchOptions,
                      duration: event.target.value,
                    })
                  }
                >
                  <option className="rounded mb-4 text-gray-950" value="0">
                    All
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="1">
                    1
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="2">
                    2
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="3">
                    3
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="4">
                    4
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="5">
                    5
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="6">
                    6
                  </option>
                  <option className="rounded mb-4 text-gray-950" value="7">
                    7
                  </option>
                </select>
              </div>
            </div>
            <div className=" grid-cols-3 flex flex-rows justify-around items-center">
              <div className="flex justify-start">Sort</div>
              <div className="col-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-300 rounded p-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="salary"
                    checked={searchOptions.sort.salary.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="salary"
                    className="mr-2"
                  />
                  <label htmlFor="salary" className="cursor-pointer">
                    Salary
                  </label>
                  <button
                    disabled={!searchOptions.sort.salary.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            desc: !searchOptions.sort.salary.desc,
                          },
                        },
                      });
                    }}
                    className="ml-1"
                  >
                    {searchOptions.sort.salary.desc ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    )}
                  </button>
                </div>
                <div className="border border-gray-300 rounded p-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="duration"
                    checked={searchOptions.sort.duration.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="duration"
                    className="mr-2"
                  />
                  <label htmlFor="duration" className="cursor-pointer">
                    Duration
                  </label>
                  <button
                    disabled={!searchOptions.sort.duration.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            desc: !searchOptions.sort.duration.desc,
                          },
                        },
                      });
                    }}
                    className="ml-2"
                  >
                    {searchOptions.sort.duration.desc ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    )}
                  </button>
                </div>
                <div className="border border-gray-300 rounded p-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="rating"
                    checked={searchOptions.sort.rating.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                    className="mr-2"
                  />
                  <label htmlFor="rating" className="cursor-pointer">
                    Rating
                  </label>
                  <button
                    disabled={!searchOptions.sort.rating.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            desc: !searchOptions.sort.rating.desc,
                          },
                        },
                      });
                    }}
                    className="ml-1"
                  >
                    {searchOptions.sort.rating.desc ? (
                      <FontAwesomeIcon icon={faArrowDown} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowUp} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-gray-200 rounded-b-2xl flex justify-end">
          <Button
            onClick={() => {
              getData();
              setOpenModal(false);
            }}
            className="bg-blue-400 hover:bg-blue-600 mr-5"
          >
            I accept
          </Button>
          <Button
            color="gray"
            className="hover:bg-gray-400 hover:text-white border-none"
            onClick={() => setOpenModal(false)}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpenModal(false)}
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
              <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <h1 className="text-center text-3xl font-semibold pb-4">
                  Select
                </h1>
                <hr />
                <div className="bg-white p-2 mt-6">
                  <div className="">
                    <div className="px-3">
                      <h2 className="font-semibold text-lg pb-1">Job Type</h2>
                      <div className="flex justify-start items-center"></div>
                      <div className="flex gap-4 w-full">
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-2">
                            <input
                              type="checkbox"
                              id="fullTimeCheckbox"
                              checked={searchOptions.jobType.fullTime}
                              onChange={() => {
                                handleJobTypeChange("fullTime");
                              }}
                            />
                            <label htmlFor="fullTimeCheckbox">Full time</label>
                          </ListItemPrefix>
                        </label>
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-2">
                            <input
                              type="checkbox"
                              id="partTimeCheckbox"
                              checked={searchOptions.jobType.partTime}
                              onChange={() => {
                                handleJobTypeChange("partTime");
                              }}
                            />
                            <label htmlFor="partTimeCheckbox">Part time</label>
                          </ListItemPrefix>
                        </label>
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-2">
                            <input
                              type="checkbox"
                              id="wfhCheckbox"
                              checked={searchOptions.jobType.wfh}
                              onChange={() => {
                                handleJobTypeChange("wfh");
                              }}
                            />
                            <label htmlFor="wfhCheckbox">Work at home</label>
                          </ListItemPrefix>
                        </label>
                      </div>
                    </div>
                    <div className="px-3">
                      <p className="font-semibold text-lg pb-1">Salary</p>
                      <div className="flex justify-start items-center">
                        <div className="w-full flex gap-2">
                          <output className="text-sm text-gray-500 w-2/4 flex justify-center">
                            {searchOptions.salary[0] * (100000 / 100)}$ -{" "}
                            {searchOptions.salary[1] * (100000 / 100)}$
                          </output>
                          <div className="w-3/4">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={searchOptions.salary[0]}
                              step="1"
                              onChange={handleChangeMin}
                              className="slider"
                            />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={searchOptions.salary[1]}
                              step="1"
                              onChange={handleChangeMax}
                              className="slider z-30"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-3">
                      <p className="font-semibold text-lg pb-1">Duration</p>
                      <div className="flex justify-start items-center">
                        <div className="w-3/4">
                          <select
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            value={searchOptions.duration}
                            onChange={(event) =>
                              setSearchOptions({
                                ...searchOptions,
                                duration: event.target.value,
                              })
                            }
                          >
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="0"
                            >
                              All
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="1"
                            >
                              1
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="2"
                            >
                              2
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="3"
                            >
                              3
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="4"
                            >
                              4
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="5"
                            >
                              5
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="6"
                            >
                              6
                            </option>
                            <option
                              className="rounded mb-4 text-gray-950"
                              value="7"
                            >
                              7
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="px-3">
                      <div className="flex justify-start text-lg font-semibold">
                        Sort
                      </div>
                      <div className=" grid-cols-3 flex flex-rows justify-start items-center pb-1">
                        <div className="col-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border border-gray-300 rounded p-2 flex items-center justify-center">
                            <input
                              type="checkbox"
                              name="salary"
                              checked={searchOptions.sort.salary.status}
                              onChange={(event) =>
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    salary: {
                                      ...searchOptions.sort.salary,
                                      status: event.target.checked,
                                    },
                                  },
                                })
                              }
                              id="salary"
                              className="mr-2"
                            />
                            <label htmlFor="salary" className="cursor-pointer">
                              Salary
                            </label>
                            <button
                              disabled={!searchOptions.sort.salary.status}
                              onClick={() => {
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    salary: {
                                      ...searchOptions.sort.salary,
                                      desc: !searchOptions.sort.salary.desc,
                                    },
                                  },
                                });
                              }}
                              className="ml-1"
                            >
                              {searchOptions.sort.salary.desc ? (
                                <FontAwesomeIcon icon={faArrowDown} />
                              ) : (
                                <FontAwesomeIcon icon={faArrowUp} />
                              )}
                            </button>
                          </div>
                          <div className="border border-gray-300 rounded p-2 flex items-center justify-center">
                            <input
                              type="checkbox"
                              name="duration"
                              checked={searchOptions.sort.duration.status}
                              onChange={(event) =>
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    duration: {
                                      ...searchOptions.sort.duration,
                                      status: event.target.checked,
                                    },
                                  },
                                })
                              }
                              id="duration"
                              className="mr-2"
                            />
                            <label
                              htmlFor="duration"
                              className="cursor-pointer"
                            >
                              Duration
                            </label>
                            <button
                              disabled={!searchOptions.sort.duration.status}
                              onClick={() => {
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    duration: {
                                      ...searchOptions.sort.duration,
                                      desc: !searchOptions.sort.duration.desc,
                                    },
                                  },
                                });
                              }}
                              className="ml-2"
                            >
                              {searchOptions.sort.duration.desc ? (
                                <FontAwesomeIcon icon={faArrowDown} />
                              ) : (
                                <FontAwesomeIcon icon={faArrowUp} />
                              )}
                            </button>
                          </div>
                          <div className="border border-gray-300 rounded p-2 flex items-center justify-center">
                            <input
                              type="checkbox"
                              name="rating"
                              checked={searchOptions.sort.rating.status}
                              onChange={(event) =>
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    rating: {
                                      ...searchOptions.sort.rating,
                                      status: event.target.checked,
                                    },
                                  },
                                })
                              }
                              id="rating"
                              className="mr-2"
                            />
                            <label htmlFor="rating" className="cursor-pointer">
                              Rating
                            </label>
                            <button
                              disabled={!searchOptions.sort.rating.status}
                              onClick={() => {
                                setSearchOptions({
                                  ...searchOptions,
                                  sort: {
                                    ...searchOptions.sort,
                                    rating: {
                                      ...searchOptions.sort.rating,
                                      desc: !searchOptions.sort.rating.desc,
                                    },
                                  },
                                });
                              }}
                              className="ml-1"
                            >
                              {searchOptions.sort.rating.desc ? (
                                <FontAwesomeIcon icon={faArrowDown} />
                              ) : (
                                <FontAwesomeIcon icon={faArrowUp} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between py-2 px-4">
                  <Button
                    onClick={() => {
                      getData();
                      setOpenModal(false);
                    }}
                    className="bg-blue-400 hover:bg-blue-600 mr-5"
                  >
                    I accept
                  </Button>
                  <Button
                    className="bg-gray-300 hover:bg-gray-400 hover:text-white border-none"
                    onClick={() => setOpenModal(false)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
