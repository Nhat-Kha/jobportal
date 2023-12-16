import { Link } from "react-router-dom";
import { useState } from "react";
import Loader from "./Loader";

export default function CompanyBoard() {
  const [companies, setCompanies] = useState([]);

  if (companies.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12 ">
          <div className="grid lg:grid-cols-3 md:gap-6 gap-10 grid-cols-1 ">
            {companies.map((company, id) => (
              <div
                key={id}
                className="transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
              >
                <div className="flex items-center text-left pb-4">
                  <img
                    className="w-16 h-16 rounded-2xl mr-4"
                    src={company.data().logo}
                    alt="Company logo"
                  />
                  <div>
                    <p className="text-2xl font-semibold text-gray-900 leading-none">
                      {company.data().company}
                    </p>
                  </div>
                </div>
                <p className="pl-1 pb-1">
                  <span className="text-lg">{company.data().bio}</span>
                </p>

                <div className="flex items-center pt-6">
                  <Link
                    to={`/companies/${company.id}`}
                    className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
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
