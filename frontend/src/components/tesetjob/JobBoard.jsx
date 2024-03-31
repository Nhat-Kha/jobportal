import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState, useEffect, useRef } from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import apiList from "../../libs/apiList";
import FilterPopup from "../filterPopup";
import Myjob from "./Myjob";
import unorm from "unorm";

export default function JobBoard({ title, props }) {
  const searchRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type (/) search");
  const [maxJobsToShow, setMaxJobsToShow] = useState(6);
  const [searchValue, setSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
      if (event.key === "Escape") {
        setSearchValue("");
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

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setSearchOptions({
      ...searchOptions,
      query: event.target.value,
    });
  };

  const sortedJob = [...jobs].sort((a, b) => {
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }

    return new Date(b.dateOfPosting) - new Date(a.dateOfPosting);
  });

  const currentDate = new Date();

  const limitedJobs = sortedJob
    .filter((job) => {
      const postingDate = new Date(job.dateOfPosting);
      const differenceInDays =
        (currentDate - postingDate) / (1000 * 60 * 60 * 24);
      return differenceInDays <= 7;
    })
    .slice(0, maxJobsToShow);

  useEffect(() => {
    getData();
  }, [searchOptions]);

  const normalizeText = (text) => {
    return unorm
      .nfkd(text)
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [
        ...searchParams,
        `jobType=Full%20Time` || `jobType=Full%20time`,
      ];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [
        ...searchParams,
        `jobType=Part%20Time` || `jobType=Part%20time`,
      ];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] !== 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] !== 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration !== "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");

    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const newData = response.data.filter((job) => {
          const normalizedTitle = normalizeText(job.title);
          const normalizedQuery = normalizeText(searchOptions.query);
          return normalizedTitle.includes(normalizedQuery);
        });
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJobTypeChange = (type) => {
    setSearchOptions({
      ...searchOptions,
      jobType: {
        ...searchOptions.jobType,
        [type]: !searchOptions.jobType[type],
      },
    });
  };

  return (
    <>
      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12">
          {title === false ? (
            <div className="block pt-4">
              <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12 pt-10">
                Trending jobs ({limitedJobs.length})
              </h1>
            </div>
          ) : (
            <div className="mb-10">
              <div>
                <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
                  Jobs
                </h1>
              </div>
              <div className="flex justify-center text-center">
                <div className="relative bottom-10 w-3/6 bg-slate-50">
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
                    className="block w-full p-4 ps-10 text-sm text-black border border-gray-300 bg-gray-100
                    rounded-lg focus:ring-blue-500 focus:bg-white outline-none transition-all duration-75 ease-out hover:ease-in
                    hover:border-blue-500"
                    placeholder={placeholderText}
                    value={searchOptions.query}
                    onChange={handleChange}
                    onFocus={() => setPlaceholderText("Search name job")}
                    onBlur={() => setPlaceholderText("Type (/) search")}
                    ref={searchRef}
                  />
                </div>
              </div>

              <span></span>

              <div className="flex justify-between items-center gap-4">
                <div className="pl-4">
                  <span className="font-semibold text-slate-600 text-2xl">
                    {jobs.length} IT Jobs in Here
                  </span>
                </div>

                <div className="flex justify-center items-center pr-4">
                  <FilterPopup
                    open={filterOpen}
                    searchOptions={searchOptions}
                    setSearchOptions={(newSearchOptions) => {
                      setSearchOptions(newSearchOptions);
                      setSearchOptions({
                        ...newSearchOptions,
                        salary: newSearchOptions.salary,
                      });
                    }}
                    handleClose={() => setFilterOpen(false)}
                    getData={() => {
                      getData();
                      setFilterOpen(false);
                    }}
                    handleJobTypeChange={handleJobTypeChange}
                  />
                </div>
              </div>
            </div>
          )}
          {title === false ? (
            <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 ">
              {limitedJobs.length > 0 ? (
                limitedJobs.map((job, index) => {
                  return (
                    <Myjob
                      className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2"
                      job={job}
                      key={index}
                    />
                  );
                })
              ) : (
                <h5 style={{ textAlign: "center" }}>No jobs found</h5>
              )}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 sm:w-full mx-2 ">
              {jobs.length > 0 ? (
                jobs.map((job, index) => {
                  return (
                    <Myjob
                      className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 "
                      job={job}
                      key={index}
                    />
                  );
                })
              ) : (
                <h5 style={{ textAlign: "center" }}>No jobs found</h5>
              )}
            </div>
          )}

          {title === false ? (
            <div className="w-48 mt-16 mx-auto">
              <Link
                to="jobs"
                className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-black rounded-xl text-light"
              >
                View all jobs
                <FontAwesomeIcon
                  className="ml-3 mb-0.5 text-sm"
                  icon={faArrowRight}
                />
              </Link>
            </div>
          ) : null}

          <div className="mt-20 col-span-3 transform ease-in duration-100 w-full bg-primary rounded-2xl p-6 text-left relative">
            <div className="grid grid-cols-2 md:p-10 p-4 gap-6">
              <h1 className="text-black lg:text-6xl text-4xl font-bold  sm:mx-auto lg:mx-0 mb-4 md:col-span-1 col-span-2">
                Let’s find your IT Talents
              </h1>

              <div className="md:col-span-1 col-span-2">
                <p className="text-xl text-black md:mb-8 mb-16 md:pt-4">
                  Leave your contact so our Customer Love team can support you
                </p>
                <Link
                  to={`/jobs/talent-pool/refer`}
                  className="hover:opacity-80  cursor-pointer font-semibold text-md justify-center px-8 py-4 bg-black rounded-xl text-white"
                >
                  Contact for me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
