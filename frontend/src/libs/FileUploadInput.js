// import Axios from "axios";
// import React, { useContext, useState } from "react";
// import { SetPopupContext } from "../App";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpload } from "@fortawesome/free-solid-svg-icons";
// import InputField from "components/InputField";
// import { apiUploadImages } from "../libs/uploadImage";

// export default function FileUploadInput(props) {
//   const [ImagesePreview, setImagesPreview] = useState([]);
//   const [payload, setPayload] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

  

//   return (
//     <div className={props.className}>
//       <div className="flex flex-row items-center gap-6">
//         <div className="grow-0 basis-1/4 max-w-[25%]">
//           <button className="bg-blue-400 w-[100%] h-[100%]" component="label">
//             {props.icon}
//             <input type="file" onChange={uploadFile} id="file" />
//           </button>
//         </div>
//         <div className="grow-0 basis-1/2 max-w-[50%]">
//           <InputField
//             label={props.label}
//             // value={file ? file.name || "" : ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             style={{ width: "100%" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
