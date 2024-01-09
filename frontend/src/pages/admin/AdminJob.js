import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import JobEditor from "components/JobEditor";
import JobSettings from "components/JobSettings";
import CandidateTable from "components/tables/CandidateTable";
import apiList from "../../libs/apiList";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminJob() {
  let [active, setActive] = useState(0);
  let [referrals, setReferrals] = useState([]);
  const [job, setJob] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    let address = apiList.jobs;

    axios
      .get(`${address}/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setJob(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("referrals", job);

  return (
    <div className="bg-white">
      <div className="pt-32 pb-56 w-10/12 mx-auto min-h-screen">
        <Link to="/admin" className="text-4xl">
          <FontAwesomeIcon icon={faChevronLeft} className="mr-3 text-xl mb-1" />
          {job.title}
        </Link>
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
          <JobEditor jobToEdit={job} id={id} />
        ) : (
          <JobSettings job={job} id={id} />
        )}
      </div>
    </div>
  );
}
