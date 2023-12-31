import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { useState, useEffect } from "react";

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

export default function JobBoard({ title, props }) {
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [maxJobsToShow, setMaxJobsToShow] = useState(6);
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

  const limitedJobs = jobs.slice(0, maxJobsToShow);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration != "0") {
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
        console.log(response.data);
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12">
          {title === false ? (
            <div className="block pt-4">
              <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12 pt-10">
                Trending jobs
              </h1>
            </div>
          ) : (
            <div className="mb-10">
              <div>
                <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
                  Jobs
                </h1>
              </div>
              <div className="flex justify-center text-center ">
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
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    value={searchOptions.query}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        query: event.target.value,
                      })
                    }
                    onKeyPress={(ev) => {
                      if (ev.key === "Enter") {
                        getData();
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-200 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                    px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => getData()}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <FilterPopup
                  open={filterOpen}
                  searchOptions={searchOptions}
                  setSearchOptions={setSearchOptions}
                  handleClose={() => setFilterOpen(false)}
                  getData={() => {
                    getData();
                    setFilterOpen(false);
                  }}
                />
              </div>
            </div>
          )}
          {title === false ? (
            <div className="flex flex-row	flex-wrap	justify-between	gap-10">
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
            <div className="flex flex-row	flex-wrap	justify-between	gap-10 cursor-auto">
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
                Not sure where to refer your friends? Don't worry.
              </h1>

              <div className="md:col-span-1 col-span-2">
                <p className="text-xl text-black md:mb-8 mb-16 md:pt-4">
                  By referring your friend to the talent pool, you submit your
                  friend to a pool of talents that companies can pick from. And
                  yes, of course you get paid. <strong>15 000 SEK</strong> for a
                  hire, <strong>500 SEK </strong>for an interview.
                </p>
                <Link
                  to={`/jobs/talent-pool/refer`}
                  className="hover:opacity-80  cursor-pointer font-semibold text-md justify-center px-8 py-4 bg-black rounded-xl text-white"
                >
                  Refer to the pool
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const filterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <div
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-20 bg-overlay-70"
    >
      <div className="grid grid-cols-4 bg-white rounded-xl gap-4 auto-cols-max">
        <div className=" flex items-center col-span-4">
          <p className="p-2">Job Type</p>
          <Card className="w-full max-w-[24rem]">
            <List className="flex-row">
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="horizontal-list-react"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    React.js
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-vue"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="horizontal-list-vue"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Vue.js
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-svelte"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Checkbox
                      id="horizontal-list-svelte"
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Svelte.js
                  </Typography>
                </label>
              </ListItem>
            </List>
          </Card>
        </div>
        <div>salary</div>
        <div>skill</div>
      </div>
    </div>
  );
};
