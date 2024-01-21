// import axios from "axios";
// import apiList from "libs/apiList";
// import { useEffect, useState } from "react";

// export default function RecruiterAdd(company) {
//   const [recruiters, setRecruiters] = useState([]);

//   useEffect(() => {
//     if (company) {
//       const userID = company.userId;
//       axios.get(`${apiList.allRecruiter}`).then((response) => {
//         const filteredRecruiters = response.data.allUser.filter(
//           (recruiter) => recruiter.userId === userID
//         );
//         setRecruiters(filteredRecruiters);
//       });
//     }
//   }, [company]);

//   console.log(company);

//   return (
//     <>
//       <div className="md:pt-32 pt-12 pb-20">
//         {company &&
//           recruiters.map((recruiter, index) => (
//             <div className="lg:w-9/12 w-11/12 mx-auto rounded-xl" key={index}>
//               <div className="flex">
//                 <img
//                   alt="company logo"
//                   className="md:h-24 md:w-24 w-16 h-16 md:mr-6 mr-4 rounded-md"
//                   src={recruiter.profile}
//                 />

//                 <div>
//                   <h1 className="font-semibold lg:text-4xl text-2xl md:pt-6 pt-3">
//                     {recruiter.name}
//                   </h1>
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 lg:gap-14 gap-3">
//                 <div className="lg:col-span-2 col-span-3">
//                   <h1 className="text-3xl font-medium md:mt-12 mt-6 mb-3">
//                     About {recruiter.name}
//                   </h1>
//                   <p className="md:text-xl text-md">{recruiter.bio}</p>
//                 </div>
//                 <div className="lg:col-span-1 col-span-3">
//                   <h1 className="text-3xl font-medium md:mt-12 mt-4 mb-3">
//                     Company facts
//                   </h1>
//                   {/* <table class="table-auto w-full md:text-xl text-md lg:mb-0 mb-6">
//                     <tbody>
//                       <tr>
//                         <td className="text-bold">Website</td>
//                         <td className="text-right">{company?.data().website}</td>
//                       </tr>
//                       <tr class="bg-emerald-200">
//                         <td className="text-bold">Founded</td>
//                         <td className="text-right">{company?.data().founded}</td>
//                       </tr>
//                       <tr>
//                         <td className="text-bold">Employees</td>
//                         <td className="text-right">{company?.data().employees}</td>
//                       </tr>
//                     </tbody>
//                   </table> */}
//                 </div>
//                 <div className="col-span-3">
//                   {/* <img src={icon} alt="company" /> */}
//                   {/* <p className="pt-2 text-gray-500">{company?.data().caption}</p> */}
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* <div className="bg-light">
//             <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12 pt-20 ">
//               <div className="block pt-4">
//                 <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
//                   Jobs at {company?.name}
//                 </h1>
//               </div>

//               <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 ">
//                 {jobs.map((job) => (
//                   <div
//                     key={job.userId}
//                     className="transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
//                   >
//                     <div className="flex items-center text-left pb-4">
//                       <img
//                         className="w-14 h-14 rounded-2xl mr-4"
//                         src={icon}
//                         alt="Company logo"
//                       />
//                       <div>
//                         <p className="text-2xl font-bold text-gray-900 leading-none">
//                           {job.title}
//                         </p>
//                         <p className="text-md text-gray-600">
//                           Posted By : {job.recruiter.name}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="pl-1 pb-1">
//                       <Rating
//                         value={job.rating !== -1 ? job.rating : null}
//                         readonly
//                       />
//                     </div>
//                     <p className="pl-1 pb-1">
//                       <FontAwesomeIcon
//                         icon={faMoneyBillWave}
//                         className="text-xl text-green-500 mr-2"
//                       />
//                       <span className="text-xl font-medium">{job.salary} $</span>
//                       <span className="text-sm font-semibold tracking-wide">
//                         {" "}
//                         / hiring reward
//                       </span>
//                     </p>
//                     <p className="pl-1">
//                       <FontAwesomeIcon
//                         icon={faMapMarkerAlt}
//                         className="text-xl text-red-500 mr-3.5 ml-1"
//                       />
//                       <span className="text-base font-semibold tracking-wide">
//                         Duration:{" "}
//                         <span className="font-medium text-xl">
//                           {job.duration !== 0
//                             ? `${job.duration} month`
//                             : `Flexible`}
//                         </span>
//                       </span>
//                     </p>
//                     <p className="pl-1">
//                       <FontAwesomeIcon
//                         icon={faCalendarDays}
//                         className="text-xl text-red-500 mr-3 ml-1"
//                       />
//                       <span className="text-base font-semibold tracking-wide">
//                         Date Of Posting:{" "}
//                         <span className="font-medium text-xl">{deadline}</span>
//                       </span>
//                     </p>
//                     <p className="pl-1">
//                       <FontAwesomeIcon
//                         icon={faUsers}
//                         className="text-xl text-red-500 mr-2"
//                       />
//                       <span className="text-base font-semibold tracking-wide">
//                         Number of Applicants:
//                         <span className="font-medium text-xl">
//                           {" "}
//                           {job.maxApplicants}
//                         </span>
//                       </span>
//                     </p>
//                     <p className="pl-1">
//                       <FontAwesomeIcon
//                         icon={faHand}
//                         className="text-xl text-red-500 mr-2"
//                       />
//                       <span className="text-base font-semibold tracking-wide">
//                         Remaining Number of Positions:{" "}
//                         <span className="font-medium text-xl">
//                           {job.maxPositions - job.acceptedCandidates}
//                         </span>
//                       </span>
//                     </p>
//                     <div className="flex items-baseline">
//                       {job.skillsets && job.skillsets.length > 0 ? (
//                         <>
//                           <FontAwesomeIcon
//                             icon={faAward}
//                             className="text-xl text-red-500 mr-3 ml-2"
//                           />
//                           <span className="text-base font-semibold tracking-wide">
//                             Skill:{" "}
//                           </span>
//                           <div className="pl-1 flex mt-3 gap-2">
//                             {job.skillsets
//                               ? job.skillsets.map((skill, index) => (
//                                   <div
//                                     key={index}
//                                     className="whitespace-nowrap rounded-lg bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
//                                   >
//                                     <span>{skill}</span>
//                                   </div>
//                                 ))
//                               : null}
//                           </div>
//                         </>
//                       ) : null}
//                     </div>

//                     <div className="flex items-center pt-6">
//                       <Link
//                         to={`/jobs/${job.id}/refer`}
//                         className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
//                       >
//                         Refer
//                       </Link>

//                       <Link
//                         to={`/jobs/${job.id}`}
//                         className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black  hover:bg-light px-3 py-3 rounded-xl border-none"
//                       >
//                         About the job
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div> */}
//     </>
//   );
// }
