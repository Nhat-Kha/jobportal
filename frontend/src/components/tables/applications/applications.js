// import { SetPopupContext } from "App";
// import axios from "axios";
// import apiList from "../../../libs/apiList";
// import { useContext, useEffect, useState } from "react";
// import { Chip, Rating, Typography } from "@material-tailwind/react";
// import { Modal } from "flowbite-react";
// import { userType } from "libs/isAuth";

// const ApplicationTile = (props) => {
//   const { application } = props;
//   const setPopup = useContext(SetPopupContext);
//   const [open, setOpen] = useState(false);
//   console.log("rating job: ", application);
//   const [rating, setRating] = useState(application?.job?.rating || -1);
//   const type = userType();

//   const appliedOn = new Date(application.dateOfApplication);
//   const joinedOn = new Date(application.dateOfJoining);

//   const fetchRating = () => {
//     axios
//       .get(`${apiList.rating}?id=${application.job._id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         setRating(response.data.rating);
//         console.log(response.data);
//       })
//       .catch((err) => {
//         // console.log(err.response);
//         console.log(err.response.data);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Error",
//         });
//       });
//   };

//   const changeRating = () => {
//     axios
//       .put(
//         apiList.rating,
//         { rating: rating, jobId: application.job._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: "Rating updated successfully",
//         });
//         fetchRating();
//         setOpen(false);
//       })
//       .catch((err) => {
//         // console.log(err.response);
//         console.log(err);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: err.response.data.message,
//         });
//         fetchRating();
//         setOpen(false);
//       });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const colorSet = {
//     applied: "#3454D1",
//     shortlisted: "#DC851F",
//     accepted: "#09BC8A",
//     rejected: "#D1345B",
//     deleted: "#B49A67",
//     cancelled: "#FF8484",
//     finished: "#4EA5D9",
//   };

//   return (
//     <>
//       <div className="p-[30px] m-[20px 0] box-border w-full">
//         <div className="container">
//           <div className="container flex-col">
//             <div>
//               <Typography>{application.job.title}</Typography>
//             </div>
//             <div>
//               Posted By: {application.recruiterId && application.recruiter.name}
//             </div>
//             <div>Role : {application.job.jobType}</div>
//             <div>Salary : &#8377; {application.job.salary} per month</div>
//             <div>
//               Duration :{" "}
//               {application.job.duration !== 0
//                 ? `${application.job.duration} month`
//                 : `Flexible`}
//             </div>
//             <div>
//               {application.job.skillsets &&
//                 application.job.skillsets.length > 0 && (
//                   <div>
//                     {application.job.skillsets.map((skill, index) => (
//                       <Chip
//                         key={index}
//                         label={skill}
//                         style={{ marginRight: "2px" }}
//                       />
//                     ))}
//                   </div>
//                 )}
//             </div>
//             <div item>Applied On: {appliedOn.toLocaleDateString()}</div>
//             {application.status === "accepted" ||
//             application.status === "finished" ? (
//               <div item>Joined On: {joinedOn.toLocaleDateString()}</div>
//             ) : null}
//           </div>
//           <div className="container flex-col">
//             <div>
//               <div
//                 className="w-full h-full flex items-center justify-center uppercase"
//                 style={{
//                   background: colorSet[application.status],
//                   color: "#ffffff",
//                 }}
//               >
//                 {application.status}
//               </div>
//             </div>
//             {application.status === "accepted" ||
//             application.status === "finished" ? (
//               <div item>
//                 <button
//                   variant="contained"
//                   color="primary"
//                   className="w-full h-full flex items-center justify-center uppercase"
//                   onClick={() => {
//                     fetchRating();
//                     setOpen(true);
//                   }}
//                 >
//                   Rate Job
//                 </button>
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <Modal
//         open={open}
//         onClose={handleClose}
//         className="h-full flex items-center justify-center"
//       >
//         <div
//           style={{
//             padding: "20px",
//             outline: "none",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             minWidth: "30%",
//             alignItems: "center",
//           }}
//         >
//           <Rating
//             name="simple-controlled"
//             style={{ marginBottom: "30px" }}
//             value={rating === -1 ? null : rating}
//             onChange={(event, newValue) => {
//               setRating(newValue);
//             }}
//           />
//           <button
//             variant="contained"
//             color="primary"
//             style={{ padding: "10px 50px" }}
//             onClick={() => changeRating()}
//           >
//             Submit
//           </button>
//         </div>
//       </Modal>
//       </div>
//     </>
//   );
// };

// export default ApplicationTile;
