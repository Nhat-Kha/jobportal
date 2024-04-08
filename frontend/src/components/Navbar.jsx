import { Disclosure } from "@headlessui/react";
import logo from "assets/images/logo.png";
import HowIt from "./HowIt";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileMenu from "./ProfileMenu";
import { userType } from "libs/isAuth";
import isAuth from "libs/isAuth";
import Blog from "./blog/Blog";
// import { useEffect, useState } from "react";

export default function Navbar() {
  const linkUrl = useLocation();
  // const [themeToggleDarkIcon, setThemeToggleDarkIcon] = useState(null);
  // const [themeToggleLightIcon, setThemeToggleLightIcon] = useState(null);

  // useEffect(() => {
  //   setThemeToggleDarkIcon(document.getElementById("theme-toggle-dark-icon"));
  //   setThemeToggleLightIcon(document.getElementById("theme-toggle-light-icon"));
  // }, []);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("color-theme") === "dark" ||
  //     (!("color-theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     themeToggleLightIcon?.classList?.remove("hidden");
  //   } else {
  //     themeToggleDarkIcon?.classList?.remove("hidden");
  //   }
  // }, [themeToggleDarkIcon, themeToggleLightIcon]);

  // const handleThemeToggle = () => {
  //   // Toggle icons inside button
  //   themeToggleDarkIcon?.classList?.toggle("hidden");
  //   themeToggleLightIcon?.classList?.toggle("hidden");

  //   // Toggle theme
  //   const currentTheme = localStorage.getItem("color-theme") || "light";
  //   const newTheme = currentTheme === "light" ? "dark" : "light";
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  //   localStorage.setItem("color-theme", newTheme);
  // };

  console.log(linkUrl);

  return (
    <Disclosure as="nav" className="bg-[#FFF5EC] w-full">
      <>
        <div className="flex justify-between h-24 py-6 md:w-10/12 w-11/12 mx-auto">
          {linkUrl.pathname.startsWith("/blog") && (
            <div className="flex">
              <Link className="flex pt-1" to="/blog">
                <img className="md:pl-5 pl-2" src={logo} alt="logo" />
                <h1 className="md:pl-2 pl-2 text-2xl sm:text-2xl md:text-3xl text-[#F2994A] font-medium hover:opacity-60">
                  JobPortal
                </h1>
                <FontAwesomeIcon icon={faBlog} />
              </Link>
              <div className="flex pt-0.5 pl-8 ">
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/blog/news"
                >
                  News
                </Link>
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/blog/programming-language"
                >
                  Programming Language
                </Link>
              </div>
            </div>
          )}

          {!linkUrl.pathname.startsWith("/blog") && (
            <div className="flex">
              <Link className="flex pt-1" to="/">
                <img className="md:pl-5 pl-2" src={logo} alt="logo" />
                <h1 className="md:pl-2 pl-2 text-2xl sm:text-2xl md:text-3xl text-[#F2994A] font-medium hover:opacity-60">
                  JobPortal
                </h1>
              </Link>

              <div className="flex pt-0.5 pl-8">
                <HowIt />
                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/jobs"
                >
                  Jobs
                </Link>

                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/companies"
                >
                  Companies
                </Link>

                <Link
                  className="lg:block hidden text-[#333333] text-lg font-semibold pl-3 pr-6 py-2 hover:opacity-60"
                  to="/leaderboard"
                >
                  Leaderboard
                </Link>
                <Blog />
              </div>
            </div>
          )}

          <div className="flex">
            {!linkUrl.pathname.startsWith("/blog") && (
              <>
                <MobileMenu />
                {isAuth() ? (
                  <>
                    {userType() === "recruiter" ? (
                      <Link
                        to="/create-new-job"
                        className="hidden sm:flex md:flex lg:flex xl:flex 2xl:flex  hover:opacity-80 cursor-pointer items-center font-semibold text-sm justify-center px-6 bg-black rounded-lg mr-8 text-white"
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-3" />
                        Create new job
                      </Link>
                    ) : (
                      ""
                    )}

                    <ProfileMenu type={userType} />
                  </>
                ) : (
                  <>
                    <Link
                      className="lg:block hidden text-black text-lg font-semibold pr-6 py-2 hover:opacity-60"
                      to="/sign-in"
                    >
                      Sign in
                    </Link>
                    <Link
                      className="lg:block hidden text-center transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg w-32 justify-center px-8 py-2 mb-1 bg-[#F2994A] text-white rounded-full text-lg font-semibold"
                      to="/sign-up"
                    >
                      Sign up
                    </Link>
                  </>
                )}
                {/* <button
                  type="button"
                  onClick={handleThemeToggle}
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                >
                  <svg
                    id="theme-toggle-dark-icon"
                    className="w-5 h-5 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                  <svg
                    id="theme-toggle-light-icon"
                    className="w-5 h-5 hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button> */}
              </>
            )}
          </div>
        </div>
      </>
    </Disclosure>
  );
}
