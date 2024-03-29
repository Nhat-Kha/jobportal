import "editor.css";
import icon from "assets/icon.jpg";
import { Rating } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import apiList from "libs/apiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getId } from "libs/isAuth";
export default function JobAd({ job, tags, about, edit }) {
  const [recruiters, setRecruiters] = useState([]);
  const [recruiter, setRecruiter] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (about) {
      const userID = about.userId;
      console.log("user id: ", userID);
      axios.get(`${apiList.allRecruiter}`).then((response) => {
        const filteredRecruiters = response.data.allUser.filter(
          (recruiter) => recruiter.userId === userID
        );
        setRecruiters(filteredRecruiters);
      });
    }
  }, [about]);
  console.log("recruiter: ", recruiters);

  useEffect(() => {
    if (job) {
      const userID = getId();
      console.log("user ID :", userID);
      axios.get(`${apiList.allRecruiter}`).then((response) => {
        const filteredRecruiters = response.data.allUser.filter(
          (recruiter) => recruiter.userId === userID
        );
        setRecruiter(filteredRecruiters);
      });
    }
  }, [job]);

  console.log("recruiter:", recruiter);

  const handleReadMoreClick = () => {
    setIsExpanded(!isExpanded);
  };

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

  return (
    <>
      {job && (
        <div className="w-11/12 mx-auto mt-20 pb-8">
          <div className="flex">
            {recruiter.map((recruiter, index) => (
              <img
                alt="company logo"
                className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
                src={recruiter.profile}
                key={index}
              />
            ))}

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
                {job?.title || "Job title"}
              </h1>
              <h6 className="md:text-xl text-lg ">{"Company"}</h6>
            </div>
          </div>
          <div className="flex justify-between md:mt-12 mt-12 mb-3">
            <h1 className="text-3xl font-medium ">Summary</h1>
          </div>
          <table className="table-auto w-full mb-3">
            <tbody className="text-xl">
              <tr>
                <td className="text-bold">Salary reward</td>
                <td className="text-right">{job.salary || ""} $</td>
              </tr>

              <tr>
                <td className="text-bold">Skills</td>
                <td className="text-right">
                  <div className="flex flex-row-reverse gap-1">
                    {tags.map((tag, index) => (
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
              </tr>
              <tr>
                <td className="text-bold">duration</td>
                <td className="text-right">{job.duration || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">deadline</td>
                <td className="text-right">{job.deadline || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxApplicants</td>
                <td className="text-right">{job.maxApplicants || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxPositions</td>
                <td className="text-right">{job.maxPositions || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">Location: </td>
                <td className="text-right">{job.location || ""}</td>
              </tr>
            </tbody>
          </table>
          <div className="my-8">
            <h1 className="text-3xl font-medium mb-2">About the job</h1>
            <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
          </div>
        </div>
      )}
      {edit && (
        <div className="w-11/12 mx-auto mt-20 pb-8">
          <div className="flex">
            <img
              alt="company logo"
              className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
              src={icon}
            />

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
                {edit?.title || "Job title"}
              </h1>
              <h6 className="md:text-xl text-lg ">{"Company"}</h6>
            </div>
          </div>
          <div className="flex justify-between md:mt-12 mt-12 mb-3">
            <h1 className="text-3xl font-medium ">Summary</h1>
          </div>
          <table className="table-auto w-full mb-3">
            <tbody className="text-xl">
              <tr>
                <td className="text-bold">Salary reward</td>
                <td className="text-right">{edit.salary || ""} $</td>
              </tr>

              <tr>
                <td className="text-bold">Skills</td>
                <td className="text-right">
                  {edit.skillsets && (
                    <div className="flex flex-row-reverse gap-1">
                      {edit.skillsets.map((tag, index) => (
                        <div
                          key={index}
                          className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                        >
                          <span className="">{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-bold">duration</td>
                <td className="text-right">{edit.duration || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">deadline</td>
                <td className="text-right">{edit.deadline || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxApplicants</td>
                <td className="text-right">{edit.maxApplicants || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxPositions</td>
                <td className="text-right">{edit.maxPositions || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">Location: </td>
                <td className="text-right">{edit.location || ""}</td>
              </tr>
            </tbody>
          </table>
          <div className="my-8">
            <h1 className="text-3xl font-medium mb-2">About the job</h1>
            <div dangerouslySetInnerHTML={{ __html: edit.description }}></div>
          </div>
        </div>
      )}
      {about && (
        <div>
          {/* LEFT */}
          <div className="rounded-xl bg-slate-50 pd:pt-1 pt-1 shadow-sm">
            <div className="w-11/12 mx-auto mt-10 pb-4">
              <div className="w-full flex items-center justify-between">
                <div className="w-3/4 flex gap-2">
                  {recruiters.map((recruiter, index) => (
                    <img
                      alt="company logo"
                      className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
                      src={recruiter.profile}
                      key={index}
                    />
                  ))}

                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-gray-600">
                      {about?.title}
                    </p>
                    <span className="text-base">{about?.location}</span>
                    {recruiters.map((recruiter) => (
                      <Link to={`/companies/${recruiter.userId}`}>
                        <span className="text-base text-blue-600">
                          Posted By :{" "}
                          {recruiters.length > 0 && recruiters[0].name}
                        </span>
                      </Link>
                    ))}
                    <span className="text-gray-500 text-sm">
                      {calculateDays(new Date(about.dateOfPosting))}{" "}
                    </span>
                    <span className="text-gray-500 text-sm"></span>
                  </div>
                </div>
                <span>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="w-8 h-8 text-green-300"
                  />
                </span>
              </div>
              <div className="flex justify-start md:mt-10 mt-10 mb-3 gap-2">
                {" "}
                <Rating
                  value={about.rating !== -1 ? about.rating : null}
                  className="text-yellow-300"
                  readonly
                />
                <span className="font-semibold">-</span>
                <h6 className="md:text-xl text-lg font-bold text-gray-500">
                  {about.rating}
                </h6>
              </div>
              <div className="flex gap-3">
                <div className="text-bold font-semibold text-gray-500">
                  Skill:{" "}
                </div>
                <div className="flex flex-row-reverse gap-1">
                  {about.skillsets.map((tag, index) => (
                    <div
                      key={index}
                      className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                    >
                      <span className="">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10">
                <div className="bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm">Salary</span>
                  <p className="text-lg font-semibold text-gray-700">
                    $ {about?.salary}
                  </p>
                </div>

                <div className="bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm">Job Type</span>
                  <p className="text-lg font-semibold text-gray-700">
                    {about.jobType}
                  </p>
                </div>

                <div className="bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm">No. of Applicants</span>
                  <p className="text-lg font-semibold text-gray-700">
                    {about.maxApplicants}
                  </p>
                </div>

                <div className="bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm">No. of Vacancies</span>
                  <p className="text-lg font-semibold text-gray-700">
                    {about.maxPositions}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className={`bg-${
                    about.maxPositions - about.acceptedCandidates > 0
                      ? "yellow-100"
                      : "gray-400"
                  } w-42 h-16 px-6 rounded-lg flex flex-col items-center justify-center`}
                >
                  <span className="text-sm">Remaining Positions</span>
                  <p className="text-lg font-semibold text-gray-700">
                    {about.maxPositions - about.acceptedCandidates}
                  </p>
                </div>
              </div>

              <div className="w-full gap-4 py-5">
                <hr className="my-8 border-gray-300" />
              </div>

              <div className="my-6">
                <>
                  <p className="text-xl font-semibold">About the job</p>
                  <div className="text-base">
                    {isExpanded ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: about.description }}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: about.description.slice(0, 600) + "... ",
                        }}
                      />
                    )}
                    <span
                      className="text-blue-500 hover:opacity-60 ease-in-out duration-150 cursor-pointer"
                      onClick={handleReadMoreClick}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </span>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
