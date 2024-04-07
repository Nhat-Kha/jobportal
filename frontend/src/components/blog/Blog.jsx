import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCode,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Blog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4">
      <Popover className="relative">
        <>
          <Popover.Button
            className="relative text-[#F2994A] group md:py-2 py-1 rounded-md lg:inline-flex items-center text-lg font-semibold hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Link to="/blog">
              <span>Blog</span>
            </Link>
            <FontAwesomeIcon
              className={`${isOpen ? "transform rotate-180" : ""} ml-2`}
              icon={faChevronDown}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute z-10 w-60 max-w-sm mt-2 transform -translate-x-1/2 md:left-1/2 left-0 sm:px-0 lg:max-w-3xl"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="lg:block hidden overflow-hidden rounded-lg shadow-lg">
                <div className="relative bg-white p-3">
                  <Link
                    to="/blog/news"
                    className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                      <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                    <div className="ml-4">
                      <p className="text-md font-semibold text-gray-900">
                        News
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/blog/programming-language"
                    className="flex items-center text-left p-2 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                      <FontAwesomeIcon icon={faCode} />
                    </div>
                    <div className="ml-4">
                      <p className="text-md font-semibold text-gray-900">
                        Programming Language
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
}
