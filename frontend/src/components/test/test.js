// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCoins,
//   faArrowRight,
//   faMoneyBillWave,
//   faMapMarkerAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import axiosInstance from "./axiosInstance";
// import Loader from "../Loader";
// import apiList from "libs/apiList";

// export const JobBoard = (Title) => {
//   const [jobs, setJobs] = useState([]);
//   const [title, setTitle] = useState(false);

//   useEffect(() => {
//     setTitle(Title);
//   }, [Title]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(apiList.jobs);
//         console.log(response.data);
//         const data = response.data;

//         const items = data.map((job) => ({ data: () => job }));

//         if (title) {
//           setJobs(items.slice(0, 6));
//         } else {
//           setJobs(items);
//         }
//       } catch (error) {
//         console.log("message error is: " + error);
//       }
//     };

//     fetchData();
//   }, [title]);

//   //   if (jobs.length === 0) {
//   //     return <Loader />;
//   //   }

//   return (
//     <div className="bg-light">
//       <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12 pt-20">
//         {title ? (
//           <div className="block pt-4">
//             <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
//               Trending jobs
//             </h1>
//           </div>
//         ) : null}

//         <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2">
//           {jobs.map((job, id) => (
//             <div
//               key={id}
//               className="transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
//             >
//               <div className="flex items-center text-left pb-4">
//                 <img
//                   className="w-14 h-14 rounded-2xl mr-4"
//                   src={job.data.logo}
//                   alt="Company logo"
//                 />
//                 <div>
//                   <p className="text-xl font-semibold text-gray-900 leading-none">
//                     {job.data.title}
//                   </p>
//                   <p className="text-md text-gray-600">{job.data.company}</p>
//                 </div>
//               </div>
//               <p className="pl-1 pb-1">
//                 <FontAwesomeIcon
//                   icon={faMoneyBillWave}
//                   className="text-xl text-green-500 mr-2"
//                 />
//                 <span className="text-xl font-medium">
//                   {job.data.hiring} SEK
//                 </span>
//                 <span className="text-sm font-semibold tracking-wide">
//                   {" "}
//                   / hiring reward
//                 </span>
//               </p>
//               <p className="pl-1 pb-1">
//                 <FontAwesomeIcon
//                   icon={faCoins}
//                   className="text-xl ml-0.5 text-yellow-400 mr-1.5"
//                 />{" "}
//                 <span className="text-xl font-medium">
//                   {job.data.interview} SEK
//                 </span>
//                 <span className="text-sm font-semibold tracking-wide">
//                   {" "}
//                   / interview reward
//                 </span>
//               </p>
//               <p className="pl-1">
//                 <FontAwesomeIcon
//                   icon={faMapMarkerAlt}
//                   className="text-xl text-red-500 mr-3.5 ml-1"
//                 />
//                 <span className="font-medium text-xl">{job.data.location}</span>
//               </p>

//               <div className="flex items-center pt-6">
//                 <Link
//                   to={`/jobs/${job.id}/refer`}
//                   className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
//                 >
//                   Refer
//                 </Link>

//                 <Link
//                   to={`/jobs/${job.id}`}
//                   className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black  hover:bg-light px-3 py-3 rounded-xl border-none"
//                 >
//                   About the job
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {title ? (
//           <div className="w-48 mt-16 mx-auto">
//             <Link
//               to="jobs"
//               className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-black rounded-xl text-light"
//             >
//               View all jobs
//               <FontAwesomeIcon
//                 className="ml-3 mb-0.5 text-sm"
//                 icon={faArrowRight}
//               />
//             </Link>
//           </div>
//         ) : null}

//         <div className="mt-20 col-span-3 transform ease-in duration-100 w-full bg-primary rounded-2xl p-6 text-left relative">
//           <div className="grid grid-cols-2 md:p-10 p-4 mx-auto">
//             <h1 className="text-black lg:text-6xl text-4xl font-bold  sm:mx-auto lg:mx-0 mb-4 md:col-span-1 col-span-2">
//               Share your unique referral link and get hired together!
//             </h1>
//             <Link
//               to={`/jobs/talent-pool/refer`}
//               className="hover:opacity-80  cursor-pointer font-semibold text-md justify-center px-8 py-4 bg-black rounded-xl text-white"
//             >
//               Learn more
//               <FontAwesomeIcon
//                 className="ml-3 mb-0.5 text-sm"
//                 icon={faArrowRight}
//               />
//             </Link>
//           </div>
//           {/* <div className="text-right">
//               <img
//                 src="images/undraw_Referral_link_re_kqfj.svg"
//                 className="md:w-96 w-64 mx-auto mt-0"
//                 alt="Referral link"
//               />
//             </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };
