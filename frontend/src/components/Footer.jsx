import { Link, useLocation } from "react-router-dom";
import logo from "assets/images/logo.png";
import LinkedIn from "assets/LinkedIn.png";
import instagram from "assets/Instagram.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

export default function Footer() {
  const linkUrl = useLocation();
  return (
    <div className="bg-[#FFF5EC] text-whblackite text-left">
      {!linkUrl.pathname.startsWith("/blog") && (
        <div className="w-10/12 mx-auto pt-20 pb-8 flex flex-col md:flex-row sm:flex-row space-y-2 justify-start">
          <div className="w-full sm:w-2/5 md:w-3/5 pr-6 flex flex-col space-y-2 pb-6 cursor-default">
            <Link className="flex pt-1" to="/">
              <img className="h-12 pb-2 " src={logo} alt="logo" />
              <h1 className="md:pl-2 pl-2 text-4xl text-black font-medium hover:opacity-60">
                JobPortal
              </h1>
            </Link>
            <p className="md:w-80 w-full text-lg font-medium -mt-2 ">
              Quality over quantity.
            </p>

            <a
              className="w-[220px] text-lg font-medium border-b-2 border-black hover:opacity-60"
              href="mailto:nhatkha06299@gmail.com"
            >
              nhatkha06299@gmail.com
            </a>
            <span className="font-light">
              Copyright © 2023 <span className="font-normal"> Nhat kha</span>{" "}
              Design.
            </span>
          </div>
          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6 cursor-default">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/for-applicant"
            >
              How it works
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/jobs"
            >
              Find jobs
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/companies"
            >
              Find companies
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-in"
            >
              Sign in
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-applicant"
            >
              Sign up
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Companies</h1>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/for-recruiter"
            >
              How it works
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/create-new-job"
            >
              Create job
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-in"
            >
              Sign in
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-recruiter"
            >
              Sign up
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">JobPortal</h1>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/about"
            >
              About us
            </Link>

            <Link
              className="opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/privacy-policy"
            >
              Privacy policy
            </Link>

            <Link
              className="opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/cookie-policy"
            >
              Cookie policy
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Follow us</h1>
            <a
              className="w-28 font-semibold text-lg"
              href="https://www.instagram.com/kha_martin/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="Instagram logo" className="w-12 h-12" />
            </a>
            <a
              className="w-28 opacity-80 hover:opacity-100 font-semibold text-lg"
              href="https://github.com/Nhat-Kha"
              target="_blank"
              rel="noreferrer"
            >
              <img src={LinkedIn} alt="LinkedIn logo" className="w-12 h-12" />
            </a>
          </div>
        </div>
      )}
      {linkUrl.pathname.startsWith("/blog") && (
        <div className="w-10/12 mx-auto pt-20 pb-8 flex flex-col md:flex-row sm:flex-row space-y-2 justify-start">
          <div className="w-full sm:w-2/5 md:w-3/5 pr-6 flex flex-col space-y-2 pb-6 cursor-default">
            <Link className="flex pt-1" to="/">
              <img className="h-12 pb-2 " src={logo} alt="logo" />
              <h1 className="md:pl-2 pl-2 text-4xl text-black font-medium hover:opacity-60">
                JobPortal
              </h1>
              <FontAwesomeIcon icon={faBlog} />
            </Link>
            <div className="w-full md:w-2/4 lg:w-1/3 h-16 flex items-center justify-center md:justify-start ">
              <input
                placeholder="Email Address"
                className="p-4 rounded outline-none bg-gray-50 focus:bg-white transition duration-200"
              />
            </div>
            <div>
              <button
                className="text-center transform hover:bg-yellow-400 transition duration-200
              cursor-pointer font-bold text-md px-8 py-3 bg-yellow-300 rounded-xl text-black"
              >
                Send mail
              </button>
            </div>
            <span className="break-all w-3/4">
              By providing your email address, you agree to the{" "}
              <strong>Terms of Service</strong> and{" "}
              <strong>Privacy Policy</strong> of JobPortal regarding your
              privacy information.
            </span>
            <div className="flex gap-4">
              <div className="w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 
                    0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3
                    4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 
                    .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 
                    8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 
                    0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 
                    27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 
                    2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 
                    67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 
                    4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9
                    2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 
                    .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 
                    .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 
                    0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </svg>
              </div>
              <div className="w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6 cursor-default">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/for-applicant"
            >
              How it works
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/jobs"
            >
              Find jobs
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/companies"
            >
              Find companies
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-in"
            >
              Sign in
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-applicant"
            >
              Sign up
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Companies</h1>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/for-recruiter"
            >
              How it works
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/create-new-job"
            >
              Create job
            </Link>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-in"
            >
              Sign in
            </Link>

            <Link
              className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/sign-up/new-recruiter"
            >
              Sign up
            </Link>
          </div>

          <div className="w-full sm:w-1/5 md:w-2/5 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">JobPortal</h1>

            <Link
              className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/about"
            >
              About us
            </Link>

            <Link
              className="opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/privacy-policy"
            >
              Privacy policy
            </Link>

            <Link
              className="opacity-60 hover:opacity-100 font-semibold text-lg"
              to="/cookie-policy"
            >
              Cookie policy
            </Link>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
