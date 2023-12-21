import { Link } from "react-router-dom";
import { useState } from "react";
import icon from "assets/icon.jpg";
import Loader from "./Loader";

export default function CompanyBoard() {
  const [companies, setCompanies] = useState([]);

  const Companies = [
    {
      logo: icon,
      name: "valtech",
      text: "A global digital agency focused on business transformation.",
    },
    {
      logo: icon,
      name: "Curb Food",
      text: "Creating high quality food experiences fully tailored for home delivery.",
    },
    {
      logo: icon,
      name: "Volta Greentech",
      text: "Battling global warming by reducing methane emissions from cows.",
    },
    {
      logo: icon,
      name: "Bemlo",
      text: "A service where you easily compare staffing companies in health care.",
    },
    {
      logo: icon,
      name: "Team Together",
      text: "Impact driven shopping app that let's you donate without paying extra.",
    },
    {
      logo: icon,
      name: "Depict",
      text: "AI-driven product recommendations that help customers find products they love.",
    },
  ];

  // if (companies.length === 0) {
  //   return <Loader />;
  // }
  return (
    <>
      <div className="bg-light">
        <div className="md:w-10/12 w-11/12 mx-auto h-full pt-8 md:pb-28 pb-12 ">
          <div className="grid lg:grid-cols-3 md:gap-6 gap-10 grid-cols-1 ">
            {Companies.map((company, id) => (
              <div
                key={id}
                className="transform ease-in duration-100 hover:-translate-y-2 
                hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
              >
                <div className="flex items-center text-left pb-4">
                  <img
                    className="w-16 h-16 rounded-2xl mr-4"
                    src={company.logo}
                    alt="Company logo"
                  />
                  <div>
                    <p className="text-2xl font-semibold text-gray-900 leading-none">
                      {company.name}
                    </p>
                  </div>
                </div>
                <p className="pl-1 pb-1">
                  <span className="text-lg">{company.text}</span>
                </p>

                <div className="flex items-center pt-6">
                  <Link
                    className="hover:opacity-80 flex cursor-pointer items-center 
                    font-semibold text-md justify-center px-8 py-3 bg-primary 
                    rounded-xl text-black"
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
