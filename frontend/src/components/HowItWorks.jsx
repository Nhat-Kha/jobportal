import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPeace,
  faSearch,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function HowItWorks() {
  return (
    <div className="bg-white md:pt-32 pt-16">
      <h1 className="md:text-6xl text-4xl font-bold text-center text-gray-900 ">
        How Greet works
      </h1>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 md:py-32 py-12  text-center md:w-10/12 w-11/12  mx-auto ">
        <div>
          <FontAwesomeIcon
            className="text-5xl mb-6 text-secondary"
            icon={faSearch}
          />

          <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
            Step 1:
          </div>
          <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
            Find a job
          </h1>
          <p className="text-xl font-light">
            Find exciting tech jobs on the job board.
          </p>
        </div>

        <div>
          <FontAwesomeIcon
            className="text-5xl mb-6 text-yellow-400"
            icon={faHandPeace}
          />
          <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
            Step 2:
          </div>
          <h1 className="text-3xl text-gray-900 pb-3  font-semibold">
            Refer a friend
          </h1>
          <p className="text-xl font-light">
            Refer a friend who is looking for a job.
          </p>
        </div>

        <div>
          <FontAwesomeIcon
            className="text-5xl mb-6 text-green-500"
            icon={faMoneyBillWave}
          />

          <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
            Step 3:
          </div>
          <h1 className="text-3xl  text-gray-900 pb-3 font-semibold">
            Get paid
          </h1>
          <p className="text-xl font-light">
            Get paid if they get interviewed or hired.
          </p>
        </div>
      </div>
    </div>
  );
}
