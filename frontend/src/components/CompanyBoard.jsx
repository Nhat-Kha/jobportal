import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import icon from "assets/icon.jpg";
import Loader from "./Loader";
import axios from "axios";
import apiList from "../libs/apiList";

export default function CompanyBoard() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    let recruiter = apiList.allRecruiter;
    axios
      .get(recruiter)
      .then((response) => {
        console.log(response?.data.allUser);
        setCompanies(response?.data.allUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (companies.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12 ">
          <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
            Recruiter
          </h1>
          <div className="grid lg:grid-cols-3 md:gap-6 gap-10 grid-cols-1 ">
            {companies.map((company, id) => (
              <div
                key={id}
                className="transform ease-in duration-100 hover:-translate-y-2 
                hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
              >
                <div className="flex items-center text-left pb-4">
                  <img
                    className="w-16 h-16 rounded-2xl mr-4"
                    src={icon}
                    alt="Company logo"
                  />
                  <div>
                    <p className="text-2xl font-semibold text-gray-900 leading-none">
                      {company.name}
                    </p>
                  </div>
                </div>
                <p className="pl-1 pb-1">
                  <span className="text-lg">{company.bio}</span>
                </p>

                <div className="flex items-center pt-6">
                  <Link
                    className="hover:opacity-80 flex cursor-pointer items-center 
                    font-semibold text-md justify-center px-8 py-3 bg-primary 
                    rounded-xl text-black"
                    to={`/companies/${company._id}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
