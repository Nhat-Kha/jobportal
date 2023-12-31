import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect, useContext } from "react";

import {
  faCoins,
  faArrowRight,
  faMoneyBillWave,
  faMapMarkerAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import React from "react";
import {
  Chip,
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Button,
  Dialog,
  Rating,
} from "@material-tailwind/react";
import InputField from "../InputField";
import apiList from "../../libs/apiList";
import FilterPopup from "../filterPopup";

const Myjob = (props, index) => {
  let history = useNavigate();
  const { job, getData } = props;
  const title = job && job.title ? job.title : "Default Title";

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    history(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    console.log(job._id);
    axios
      .delete(`${apiList.jobs}/${job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        handleClose();
      });
  };

  const handleJobUpdate = () => {
    axios
      .put(`${apiList.jobs}/${job._id}`, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        getData();
        handleCloseUpdate();
      })
      .catch((err) => {
        console.log(err.response);
        handleCloseUpdate();
      });
  };

  // const postedOn = job?.dateOfPosting ? new Date(job.dateOfPosting) : null;
  const postedOn = new Date(job.dateOfPosting);

  return (
    <>
      <div
        // className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 "
        index={index}
      >
        <div className="transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left">
          <div className="flex items-center text-left pb-4">
            <div>
              <p className="text-xl font-semibold text-gray-900 leading-none">
                {job.title}
              </p>
            </div>
          </div>
          <div className="pl-1 pb-1">
            <Rating value={job.rating !== -1 ? job.rating : null} readonly />
          </div>
          <p className="pl-1 pb-1">
            <FontAwesomeIcon
              icon={faMoneyBillWave}
              className="text-xl text-green-500 mr-2"
            />
            <span className="text-xl font-medium">{job.salary} $</span>
            <span className="text-sm font-semibold tracking-wide">
              {" "}
              / hiring reward
            </span>
          </p>
          <p className="pl-1">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-xl text-red-500 mr-3.5 ml-1"
            />
            <span className="font-medium text-xl">
              Duration: :{" "}
              {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
            </span>
          </p>
          <p className="pl-1">
            <span className="font-medium text-xl">
              Date Of Posting: {postedOn.toLocaleDateString()}
            </span>
          </p>
          <p className="pl-1">
            <span className="font-medium text-xl">
              Number of Applicants: {job.maxApplicants}
            </span>
          </p>
          <p className="pl-1">
            <span className="font-medium text-xl">
              Remaining Number of Positions:{" "}
              {job.maxPositions - job.acceptedCandidates}
            </span>
          </p>
          <div>
            <Chip
              value="react"
              className="bg-gray-300 w-16 rounded-xl mt-3 font-semibold cursor-default"
            />
          </div>
          <div className="flex items-center pt-6">
            <Link className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black">
              Refer
            </Link>

            <Link className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black  hover:bg-light px-3 py-3 rounded-xl border-none">
              About the job
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myjob;
