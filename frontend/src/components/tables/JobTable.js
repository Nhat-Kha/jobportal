import ReferralCount from "../ReferralCount";
import { useEffect, useState } from "react";
import Select from "components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import apiList from "../../libs/apiList";
import axios from "axios";

const times = ["Newest first", "Oldest first"];
const th = ["Job", "Location", "Referrals", "Posted"];

export default function JobTable({ jobs }) {
  let [displayedJobs, setDisplayedJobs] = useState([]);

  let [selectedTime, setSelectedTime] = useState(times[0]);

  const history = useNavigate();

  useEffect(() => {
    const validJobs = Array.isArray(jobs) ? jobs : [];

    setDisplayedJobs(validJobs);
  }, [jobs]);

  function handleClick(id) {
    history(`/admin/${id}`);
  }

  function calculateDays(date) {
    let daysAgo = Math.floor((new Date() - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) {
      return daysAgo + " day ago";
    } else return daysAgo + " days ago";
  }

  function search(input) {
    var tmp = [];
    const filter = input.toUpperCase();
    jobs.forEach((job) => {
      if (job.data().title.toUpperCase().indexOf(filter) > -1) tmp.push(job);
    });

    setDisplayedJobs(tmp);
  }

  async function findNumberOfReferrals(id) {
    const q = apiList.jobsId;
    let count = 0;
    const querySnapshot = await axios.get(q);

    querySnapshot.forEach((doc) => {
      count++;
    });

    console.log(count);

    return count;
  }

  function time(input) {
    setSelectedTime(input);

    if (input === "Oldest first") {
      displayedJobs.sort(
        (a, b) => a.data().time.toMillis() - b.data().time.toMillis()
      );
    } else {
      displayedJobs.sort(
        (a, b) => b.data().time.toMillis() - a.data().time.toMillis()
      );
    }
  }

  return (
    <>
      <div className="mt-8 flex justify-between gap-3">
        <div className="relative w-full">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-4 left-4 text-gray-600 "
          />

          <input
            className="bg-light h-12 w-2/3 text-lg block text-gray-700 rounded-lg py-3 pl-12 px-4 leading-tight focus:outline-none"
            placeholder="Search job . . ."
            onChange={(e) => search(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Select
            className="w-40"
            selected={selectedTime}
            statuses={times}
            changeStatus={time}
          />
        </div>
      </div>
      <div className="mt-12 overflow-x-auto bg-white">
        <table className="min-w-full z-0">
          <thead className="border-b border-gray-500">
            <tr>
              {th.map((t) => (
                <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold">
                  {t}
                </th>
              ))}
            </tr>
          </thead>

          {displayedJobs.length !== 0 ? (
            <tbody className="divide-y divide-gray-300 divide-dashed">
              {displayedJobs.map((currentJob, index) => (
                <tr key={index} className="hover:bg-light">
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                    onClick={() => handleClick(currentJob.id)}
                  >
                    {currentJob.data().title}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                    onClick={() => handleClick(currentJob.id)}
                  >
                    {currentJob.data().location}
                  </td>
                  <ReferralCount id={currentJob.id} handleClick={handleClick} />
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                    onClick={() => handleClick(currentJob.id)}
                  >
                    {calculateDays(currentJob.data().time.toDate())}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            ""
          )}
        </table>

        {displayedJobs.length === 0 ? (
          <h3 className="mt-20 text-center">No jobs matched your search...</h3>
        ) : (
          " "
        )}
      </div>
    </>
  );
}
