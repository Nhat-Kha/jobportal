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
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPage, setSelectedPage] = useState(1);

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };

  return (
    <div className="min-h-screen pt-10">
      <div className="pb-4">
        <span className="font-semibold text-slate-500">ALL APPLICANT</span>
        <span className="font-bold">({all.length})</span>
      </div>
      <>
        {currentItems.map((applicant, index) => (
          <>
            <div
              key={index}
              className="flex items-center bg-white rounded-md hover:bg-slate-100"
            >
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
                    {applicant.education && applicant.education.length > 0 ? (
                      applicant.education
                        .map(
                          (edu) =>
                            `${edu.institutionName} (${edu.startYear}-${
                              edu.endYear ? edu.endYear : "Ongoing"
                            })`
                        )
                        .join(", ")
                    ) : (
                      <span className="font-semibold text-red-500">
                        Not updated
                      </span>
                    )}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  <div className="text-bold">Skills:</div>
                  <div className="text-right">
                    <div className="flex flex-row gap-1">
                      {applicant?.skills && applicant?.skills.length > 0 ? (
                        applicant?.skills.map((tag, index) => (
                          <div
                            key={index}
                            className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                          >
                            <span>{tag}</span>
                          </div>
                        ))
                      ) : (
                        <span className="font-semibold text-red-500">
                          Not updated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span>Date of birth: </span>
                  {applicant.dateOfBirth ? (
                    <span className="font-semibold">
                      {new Date(applicant.dateOfBirth).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Not updated
                    </span>
                  )}
                </div>
                <hr className="my-8 border-gray-300" />
              </div>
            </div>
          </>
        ))}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(all.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 bg-${
                  selectedPage === i + 1 ? "yellow" : "white"
                } text-black border hover:border-yellow-300 rounded ${
                  selectedPage === i + 1 ? "bg-yellow-200" : ""
                }`}
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
