import React, { useContext, useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import { userType } from "libs/isAuth";
import Applicant from "./applicant";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Recruiter from "./recruiter";

export function Dashboard() {
  const type = userType();
  let [active, setActive] = useState(0);
  const { id } = useParams();

  return (
    <div className="bg-white">
      <div className="pt-32 pb-56 w-10/12 mx-auto min-h-screen">
        <div className="flex mt-6 gap-4 border-b border-gray-300 ">
          <button
            className={`${
              active === 0 ? "border-b-2 border-money text-money" : ""
            } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
            onClick={() => setActive(0)}
          >
            Applicant
          </button>

          <button
            className={`${
              active === 1 ? "border-b-2 border-money text-money" : ""
            } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
            onClick={() => setActive(1)}
          >
            Recruiter
          </button>
        </div>

        {active === 0 ? (
          <Applicant id={id} />
        ) : active === 1 ? (
          <Recruiter id={id} />
        ) : null}
      </div>
    </div>
  );
}
