import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faHandSparkles,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function HowIt() {
  const buttonRef = useRef();
  return (
    <div className="px-4">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              className="
                
              hidden  text-[#F2994A] group md:py-2 py-1 rounded-md lg:inline-flex items-center  text-lg font-semibold hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span>How it works</span>
              <FontAwesomeIcon
                className={`${open ? "transform rotate-180" : ""} ml-2`}
                icon={faChevronDown}
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
              <Popover.Panel className="absolute z-10 w-60  max-w-sm mt-2 transform -translate-x-1/2 md:left-1/2 left-0 sm:px-0 lg:max-w-3xl">
                <div className="lg:block hidden overflow-hidden rounded-lg shadow-lg">
                  <div className="relative bg-white p-3">
                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/for-applicant"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faHandSparkles} />
                      </div>
                      <div className="ml-4">
                        <p className="text-md font-semibold text-gray-900">
                          For Applicant
                        </p>
                      </div>
                    </Link>
                    <Link
                      onClick={() => buttonRef.current?.click()}
                      to="/for-recruiter"
                      className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faRocket} />
                      </div>
                      <div className="ml-4">
                        <p className="text-md font-semibold text-gray-900">
                          For Recruiter
                        </p>
                      </div>
                    </Link>
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
