import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";

import {
  faCoins,
  faArrowRight,
  faMoneyBillWave,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import React from "react";

export default function JobBoard({ title }) {
  const [jobs, setJobs] = useState([]);

  if (jobs.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12 pt-20 ">
          {title ? (
            <div className="block pt-4">
              <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
                Trending jobs
              </h1>
            </div>
          ) : null}

          <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 ">
            {jobs.map((job, id) => (
              <div
                key={id}
                className="transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
              >
                <div className="flex items-center text-left pb-4">
                  <img
                    className="w-14 h-14 rounded-2xl mr-4"
                    src={job.data().logo}
                    alt="Company logo"
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-900 leading-none">
                      {job.data().title}
                    </p>
                    <p className="text-md text-gray-600">
                      {job.data().company}
                    </p>
                  </div>
                </div>
                <p className="pl-1 pb-1">
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="text-xl text-green-500 mr-2"
                  />
                  <span className="text-xl font-medium">
                    {job.data().hiring} SEK
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {" "}
                    / hiring reward
                  </span>
                </p>
                <p className="pl-1 pb-1">
                  <FontAwesomeIcon
                    icon={faCoins}
                    className="text-xl ml-0.5 text-yellow-400 mr-1.5"
                  />{" "}
                  <span className="text-xl font-medium">
                    {job.data().interview} SEK
                  </span>
                  <span className="text-sm font-semibold tracking-wide">
                    {" "}
                    / interview reward
                  </span>
                </p>
                <p className="pl-1">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-xl text-red-500 mr-3.5 ml-1"
                  />
                  <span className="font-medium text-xl">
                    {job.data().location}
                  </span>
                </p>

                <div className="flex items-center pt-6">
                  <Link
                    to={`/jobs/${job.id}/refer`}
                    className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
                  >
                    Refer
                  </Link>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black  hover:bg-light px-3 py-3 rounded-xl border-none"
                  >
                    About the job
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {title ? (
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
