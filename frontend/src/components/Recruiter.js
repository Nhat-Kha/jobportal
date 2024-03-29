import axios from "axios";
import apiList from "libs/apiList";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Recruiter(props) {
  const { recruiter } = props;
  const [jobs, setJobs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let address = apiList.jobs;
        const response = await axios.get(`${address}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredReferrals = jobs.filter(
    (obj) => obj.userId === recruiter.userId
  );
  console.log("filteredReferrals: ", filteredReferrals);

  return (
    <>
      {recruiter ? (
        <div
          className="transform ease-in duration-100 hover:-translate-y-2 
                hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
        >
          <div className="flex items-center text-left pb-4">
            <img
              className="w-16 h-16 rounded-2xl mr-4"
              src={recruiter.profile}
              alt="Company logo"
            />
            <div>
              <p className="text-2xl font-bold text-gray-700 leading-none">
                {recruiter.name}
              </p>
            </div>
          </div>
          <p className="pl-1 pb-1">
            {recruiter && recruiter.banner ? (
              <>
                {isExpanded ? (
                  <span className="text-lg text-gray-600 font-semibold">
                    {recruiter.banner}
                  </span>
                ) : (
                  <span className="text-lg text-gray-600 font-semibold">
                    {recruiter.banner.slice(0, 60) + "..."}
                  </span>
                )}
                <span
                  className="text-blue-500 hover:opacity-60 ease-in-out duration-150 cursor-pointer ml-1"
                  onClick={handleReadMoreClick}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </span>
              </>
            ) : (
              <div className="pb-4">
                <span className="font-bold text-lg text-red-500">
                  Banner is not available!
                </span>
              </div>
            )}
          </p>
          <div className="flex items-center pt-6 justify-between w-auto h-auto">
            <Link
              className="hover:opacity-80 flex cursor-pointer items-center 
                    font-semibold text-md justify-center px-8 py-3 bg-primary 
                    rounded-xl text-black"
              to={`/companies/${recruiter.userId}`}
            >
              Read more
            </Link>
            <span className="flex justify-center items-center gap-2">
              <div className="w-6 h-6 bg-green-100 shadow-inner flex justify-center items-center rounded-3xl">
                <div className="w-4 h-4 rounded-3xl bg-green-200 shadow-inner flex justify-center items-center">
                  <div className="w-2 h-2 rounded-3xl bg-green-300 shadow-inner"></div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-400">
                {filteredReferrals.length} Jobs
              </span>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
