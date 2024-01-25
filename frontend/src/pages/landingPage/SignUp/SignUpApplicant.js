// import { useState, useContext } from "react";
// import InputField from "components/InputField";
// import { SetPopupContext } from "App";
// import axios from "axios";
// import isAuth from "libs/isAuth";
// import apiList from "../../../libs/apiList";

// export default function SignUpApplicant() {
//   const setPopup = useContext(SetPopupContext);
//   const [loggedin, setLoggedin] = useState(isAuth());

//   const [signupDetails, setSignupDetails] = useState({
//     email: "",
//     password: "",
//     name: "",
//     education: [
//       {
//         institutionName: "",
//         startYear: "",
//         endYear: "",
//       },
//     ],
//     skills: [],
//     news: false,
//   });

//   const [inputErrorHandler, setInputErrorHandler] = useState({
//     email: {
//       untouched: true,
//       required: true,
//       error: false,
//       message: "",
//     },
//     password: {
//       untouched: true,
//       required: true,
//       error: false,
//       message: "",
//     },
//     name: {
//       untouched: true,
//       required: true,
//       error: false,
//       message: "",
//     },
//   });

//   let allFieldsChecked =
//     signupDetails.name.length > 0 &&
//     signupDetails.email.length > 0 &&
//     signupDetails.password.length > 0 &&
//     signupDetails.skill.some((item) => item.trim() !== "") &&
//     signupDetails.education.some(
//       (item) => item.institutionName.trim() !== ""
//     ) &&
//     typeof signupDetails.news === "boolean";

//   const handleInput = (key, value) => {
//     setSignupDetails((prevDetails) => ({
//       ...prevDetails,
//       [key]: value,
//     }));
//     console.log(`Input ${key} value:`, value);
//   };

//   const handleEducationInput = (index, key, value) => {
//     setSignupDetails((prevDetails) => {
//       const updatedEducation = [...prevDetails.education];
//       updatedEducation[index] = {
//         ...updatedEducation[index],
//         [key]: value,
//       };
//       return {
//         ...prevDetails,
//         education: updatedEducation,
//       };
//     });
//   };

//   const handleLogin = () => {
//     const tmpErrorHandler = {};
//     Object.keys(inputErrorHandler).forEach((obj) => {
//       if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
//         tmpErrorHandler[obj] = {
//           required: true,
//           untouched: false,
//           error: true,
//           message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
//         };
//       } else {
//         tmpErrorHandler[obj] = inputErrorHandler[obj];
//       }
//     });

//     let updatedDetails = {
//       ...signupDetails,
//       education: signupDetails.education
//         .filter((obj) => obj.institutionName.trim() !== "")
//         .map((obj) => {
//           if (obj["endYear"] === "") {
//             delete obj["endYear"];
//           }
//           return obj;
//         }),
//     };

//     const verified = !Object.keys(tmpErrorHandler).some((obj) => {
//       return tmpErrorHandler[obj].error;
//     });

//     if (!verified) {
//       axios
//         .post(apiList.signup, updatedDetails)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("type", response.data.type);
//           setLoggedin(isAuth());
//           setPopup({
//             open: true,
//             severity: "success",
//             message: "Logged in successfully",
//           });
//           console.log(response);
//         })
//         .catch((err) => {
//           setPopup({
//             open: true,
//             severity: "error",
//             message: err.response.data.message,
//           });
//           console.log(err.response);
//         });
//     } else {
//       setInputErrorHandler(tmpErrorHandler);
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "Incorrect Input",
//       });
//     }
//   };

//   const handleInputError = (key, status, message) => {
//     setInputErrorHandler({
//       ...inputErrorHandler,
//       [key]: {
//         required: true,
//         untouched: false,
//         error: status,
//         message: message,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#f8e5d4] md:py-24">
//       <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
//         <h2 className="text-4xl font-semibold text-gray-900 leading-none">
//           Welcome to applicant
//         </h2>
//         <p className="text-md text-gray-600 pb-8">
//           The information you add below is used to make your referrals more
//           credible and it can be edited later.
//         </p>
//         <InputField
//           type="text"
//           label="Name"
//           value={signupDetails.name}
//           error={inputErrorHandler.name.error}
//           helperText={inputErrorHandler.name.message}
//           onChange={(e) => handleInput("name", e.target.value)}
//           placeholder="Firstname Lastname"
//         />
//         <InputField
//           type="email"
//           label="Email"
//           value={signupDetails.email}
//           onChange={(e) => handleInput("email", e.target.value)}
//           inputErrorHandler={inputErrorHandler}
//           handleInputError={handleInputError}
//           placeholder="email@example.com"
//         />
//         <InputField
//           type="password"
//           label="Password"
//           value={signupDetails.password}
//           error={inputErrorHandler.password.error}
//           helperText={inputErrorHandler.password.message}
//           onChange={(e) => handleInput("password", e.target.value)}
//           placeholder="Your password"
//         />
//         {signupDetails.education.map((edu, index) => (
//           <div className="flex justify-between" key={index}>
//             <InputField
//               type="text"
//               label={`Institution Name ${index + 1}`}
//               value={edu.institutionName}
//               onChange={(e) =>
//                 handleEducationInput(index, "institutionName", e.target.value)
//               }
//               placeholder="Institution name"
//             />
//             <InputField
//               type="number"
//               label={`Start Year ${index + 1}`}
//               value={edu.startYear}
//               onChange={(e) =>
//                 handleEducationInput(index, "startYear", e.target.value)
//               }
//               placeholder="Start year"
//             />
//             <InputField
//               type="number"
//               label={`End Year ${index + 1}`}
//               value={edu.endYear}
//               onChange={(e) =>
//                 handleEducationInput(index, "endYear", e.target.value)
//               }
//               placeholder="End year"
//             />
//           </div>
//         ))}
//         <InputField
//           label="Skill"
//           helperText="Please enter to add skills"
//           value={signupDetails.skills}
//           onChange={(chips) =>
//             setSignupDetails({ ...signupDetails, skills: chips })
//           }
//         />

//         <label className="block text-black text-sm font-medium mt-8 focus:outline-none outline-none">
//           <input
//             className="mr-2 leading-tight text-primary"
//             type="checkbox"
//             checked={signupDetails.news}
//             onChange={() =>
//               setSignupDetails((prevDetails) => ({
//                 ...prevDetails,
//                 news: !prevDetails.news,
//               }))
//             }
//           />
//           <span className="text-sm">
//             Keep me up-to-date on exclusive Greet updates and new job posts! You
//             can opt-out at any time.
//           </span>
//         </label>

//         <button
//           className={`mt-8 w-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-100 font-semibold cursor-pointer px-4 py-3 rounded-lg text-sm ${
//             allFieldsChecked ? "" : "cursor-not-allowed"
//           }`}
//           onClick={() => {
//             if (allFieldsChecked) {
//               handleLogin();
//               console.log("Input values on button click:", signupDetails);
//             }
//           }}
//           disabled={!allFieldsChecked}
//         >
//           Create your account
//         </button>

//         <p className="text-xs text-center mt-6">
//           By creating an account you agree to Greet's Terms and Conditions.
//         </p>
//       </div>
//     </div>
//   );
// }
