import { Typography } from "@material-tailwind/react";
import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import { userType } from "libs/isAuth";
import React, { useContext, useEffect, useState } from "react";

export default function Applicant() {
  const type = userType();
  const setPopup = useContext(SetPopupContext);
  const [all, setAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const user = apiList.allApplicants;
    axios
      .get(user)
      .then((response) => {
        console.log(response.data.allUser);
        setAll(response.data.allUser);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = all.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <>
        {currentItems.map((applicant, index) => (
          <div key={index} className="flex items-center">
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
              <img
                src={`${applicant.profile}`}
                alt={`${applicant.name}'s profile`}
                className="w-[10rem] h-[10rem] rounded-xl"
              />
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
              <div>
                <Typography variant="h5">{applicant.name}</Typography>
              </div>
              <div>
                Education:{" "}
                <span className="font-semibold">
                  {applicant.education
                    .map(
                      (edu) =>
                        `${edu.institutionName} (${edu.startYear}-${
                          edu.endYear ? edu.endYear : "Ongoing"
                        })`
                    )
                    .join(", ")}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-bold">Skills:</div>
                <div className="text-right">
                  <div className="flex flex-row-reverse gap-1">
                    {applicant?.skills.map((tag, index) => (
                      <div
                        key={index}
                        className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                              bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                      >
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(all.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className="mx-1 px-3 py-1 bg-blue-500 text-white rounded"
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </>
    </div>
  );
}
