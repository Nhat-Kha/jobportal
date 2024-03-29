import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import JobEditor from "components/JobEditor";
import JobSettings from "components/JobSettings";
import CandidateTable from "components/tables/CandidateTable";
import apiList from "../../libs/apiList";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SetPopupContext } from "App";

export default function AdminJob() {
  const { id } = useParams();
  const setPopup = useContext(SetPopupContext);

  let [active, setActive] = useState(0);
  let [referrals, setReferrals] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
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
    console.log(queryString);
    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    console.log(address);
    axios
      .get(`${address}/${id}`, {
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
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };

  console.log("name job: ", jobs);

  return (
    <div className="bg-white">
      <div className="pt-32 pb-56 w-10/12 mx-auto min-h-screen">
        {jobs
          ? jobs
              .filter((job) => job._id === id)
              .map((job, index) => (
                <Link to="/admin" className="text-2xl" key={index}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="mr-3 text-sm mb-[0.20rem] text-slate-600"
                  />
                  <span className="font-normal text-slate-600">
                    {job.title}
                  </span>
                </Link>
              ))
          : null}
        <div className="flex mt-6 gap-4 border-b border-gray-300 ">
          <button
            className={`${
              active === 0 ? "border-b-2 border-money text-money" : ""
            } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
            onClick={() => setActive(0)}
          >
            Referrals
          </button>

          <button
            className={`${
              active === 1 ? "border-b-2 border-money text-money" : ""
            } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
            onClick={() => setActive(1)}
          >
            Job description
          </button>

          <button
            className={`${
              active === 2 ? "border-b-2 border-money text-money" : ""
            } font-medium cursor-pointer px-4 py-4 text-sm text-gray-400`}
            onClick={() => setActive(2)}
          >
            Job settings
          </button>
        </div>

        {active === 0 ? (
          <CandidateTable id={id} referrals={referrals} />
        ) : active === 1 ? (
          <JobEditor
            jobToEdit={jobs}
            props={{ job: jobs, getData: getData }}
            id={id}
          />
        ) : (
          <JobSettings props={{ jobs: jobs, getData: getData }} id={id} />
        )}
      </div>
    </div>
  );
}
