import { useEffect, useState } from "react";
import Select from "components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import apiList from "../../libs/apiList";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import unorm from "unorm";

const times = ["Newest first", "Oldest first"];
const th = ["Job", "Job type", "Skill", "Date upload", "Headcount"];

export default function JobTable({ jobs }) {
  let history = useNavigate();
  let [displayedJobs, setDisplayedJobs] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [applicantsCount, setApplicantsCount] = useState({});
  const { id } = useParams();

  const userId = id || localStorage.getItem("id");

  let [selectedTime, setSelectedTime] = useState(times[0]);

  // const someDate = new Date("2024-01-09");
  // console.log("Some date: ", calculateDays(someDate));

  useEffect(() => {
    const validJobs = Array.isArray(jobs) ? jobs : [];

    setDisplayedJobs(validJobs);
    setOriginalData(validJobs);

    const fetchData = async () => {
      try {
        let address = apiList.jobs;

        const response = await axios.get(address, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // const ApplicantCount = response.data.map((job) => ({...job, }))

        setOriginalData(response.data);
        setDisplayedJobs(response.data);

        const counts = {};
        for (const job of response.data) {
          let countAddress = `${apiList.applicants}?jobId=${job._id}`;
          let countResponse;

          try {
            countResponse = await axios.get(countAddress, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            counts[job._id] = countResponse.data.length;
          } catch (error) {
            console.error(`Error fetching count for job ${job._id}`, error);
            counts[job._id] = 0;
          }
        }

        setApplicantsCount(counts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [jobs]);

  function handleClick(_id) {
    history(`/admin/${_id}`);
  }

  function calculateDays(date) {
    let daysAgo = Math.floor((new Date() - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) {
      return daysAgo + " day ago";
    } else if (daysAgo < 7) {
      return daysAgo + " days ago";
    } else if (daysAgo < 14) {
      return "1 week ago";
    } else if (daysAgo < 30) {
      return Math.floor(daysAgo / 7) + " weeks ago";
    } else if (daysAgo < 60) {
      return "1 month ago";
    } else {
      return Math.floor(daysAgo / 30) + " months ago";
    }
  }

  function time(input) {
    setSelectedTime(input);

    setDisplayedJobs((prevDisplayedJobs) => {
      const sortedJobs = [...prevDisplayedJobs];

      if (input === "Newest first") {
        sortedJobs.sort(
          (a, b) =>
            new Date(b.dateOfPosting).getTime() -
            new Date(a.dateOfPosting).getTime()
        );
      } else {
        sortedJobs.sort(
          (a, b) =>
            new Date(a.dateOfPosting).getTime() -
            new Date(b.dateOfPosting).getTime()
        );
      }

      return [...sortedJobs];
    });
  }

  useEffect(() => {
    time(selectedTime);
  }, [selectedTime, originalData]);

  const normalizeText = (text) => {
    return unorm
      .nfkd(text)
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  function search(input) {
    const filter = normalizeText(input);

    if (filter) {
      const newData = originalData.filter((job) => {
        return normalizeText(job.title).includes(filter);
      });

      setDisplayedJobs(newData);
    } else {
      setDisplayedJobs(originalData);
    }
    setCurrentInput(filter);
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
            onChange={(e) => {
              setCurrentInput(e.target.value);
              search(e.target.value);
            }}
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
                <th
                  key={t}
                  className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold"
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>

          {displayedJobs.length !== 0 ? (
            <tbody className="divide-y divide-gray-300 divide-dashed">
              {displayedJobs
                .filter((currentJob) => currentJob.userId === userId)
                .map((currentJob, index) => (
                  <tr key={index} className="hover:bg-light">
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleClick(currentJob._id)}
                    >
                      {currentJob.title}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleClick(currentJob._id)}
                    >
                      {currentJob.jobType}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleClick(currentJob._id)}
                    >
                      <div className="flex gap-1">
                        {currentJob.skillsets.map((tag, index) => (
                          <div
                            key={index}
                            className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                          >
                            <span className="">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    {/* <ReferralCount
                    id={currentJob._id}
                    handleClick={handleClick}
                  /> */}
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                      onClick={() => handleClick(currentJob._id)}
                    >
                      {calculateDays(new Date(currentJob.dateOfPosting))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                      <div className="ml-3 ">
                        {applicantsCount[currentJob._id]} people
                      </div>
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
