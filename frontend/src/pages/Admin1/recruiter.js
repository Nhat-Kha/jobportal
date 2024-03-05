import { Typography } from "@material-tailwind/react";
import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import { userType } from "libs/isAuth";
import React, { useContext, useEffect, useState } from "react";

export default function Recruiter() {
  const type = userType();
  const setPopup = useContext(SetPopupContext);
  const [all, setAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const user = apiList.allRecruiter;
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
        {currentItems.map((recruiter, index) => (
          <div key={index} className="flex items-center">
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
              <img
                src={`${recruiter.profile}`}
                alt={`${recruiter.name}'s profile`}
                className="w-[10rem] h-[10rem] rounded-xl"
              />
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
              <div>
                <Typography variant="h5">{recruiter.name}</Typography>
              </div>
              <div>
                bio :{" "}
                <span className="font-semibold whitespace-pre-wrap">
                  {recruiter.bio}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-bold">Number phone:</div>
              <span className="font-semibold">{recruiter.contactNumber}</span>
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
