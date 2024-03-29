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
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPage, setSelectedPage] = useState(1);

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };

  return (
    <div className="min-h-screen pt-10">
      <div className="pb-4">
        <span className="font-semibold text-slate-500">ALL RECRUITER</span>
        <span className="font-bold">({all.length})</span>
      </div>
      <>
        {currentItems.map((recruiter, index) => (
          <div key={index} className="flex items-center bg-white rounded-md">
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
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
              <div className="text-bold">Number phone:</div>
              <span className="font-semibold">{recruiter.contactNumber}</span>
            </div>
            <hr className="my-8 border-gray-300" />
          </div>
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
