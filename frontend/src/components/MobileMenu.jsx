import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { userType } from "libs/isAuth";

export default function MobileMenu() {
  const buttonRef = useRef();
  const type = userType();

  console.log("type:", type);
  return (
    <div className="px-4">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              className="lg:hidden block text-black group md:py-2 py-1 rounded-md  items-center  text-lg font-semibold hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <FontAwesomeIcon
                className="text-3xl text-black"
                icon={open ? faTimes : faBars}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="lg:hidden block absolute -left-24  z-10 w-60  max-w-sm mt-2 transform -translate-x-1/2  sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-2xl">
                  <div className="relative bg-white p-3">
                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/jobs"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      Job board
                    </Link>

                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/companies"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      Companies
                    </Link>

                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/leaderboard"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      Leaderboard
                    </Link>

                    {type === null ? (
                      <>
                        <Link
                          onClick={() => buttonRef.current?.click()}
                          to="/sign-in"
                          className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                        >
                          Sign in
                        </Link>

                        <Link
                          onClick={() => buttonRef.current?.click()}
                          to="/sign-up"
                          className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                        >
                          Sign up
                        </Link>
                      </>
                    ) : type === "recruiter" ? (
                      <div className="h-12">
                        <Link
                          to="/create-new-job"
                          className="h-full hover:opacity-80 flex cursor-pointer items-center font-semibold text-sm justify-center px-6 bg-black rounded-lg mr-8 text-white"
                        >
                          <FontAwesomeIcon icon={faPlus} className="mr-3" />
                          Create new job
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
