import { Link } from "react-router-dom";
import billOne from "assets/images/billOne.png";
import billTwo from "assets/images/billTwo.png";
import billThree from "assets/images/billThree.png";
import billFour from "assets/images/billFour.png";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faRocket,
  faSwimmer,
  faTh,
} from "@fortawesome/free-solid-svg-icons";

import { Dialog, Transition } from "@headlessui/react";

export default function Jumbotron() {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <main className="bg-[#f8e5d4]">
        <div className="text-center lg:w-7/12 w-12/12 ld:pt-52 md:pt-40 pt-32 pb-52 mx-auto h-2/3">
          <div className="relative w-full bg-light h-2/3 md:block hidden ">
            <img
              src={billThree}
              className="w-32 absolute -top-12 -right-20 md:block hidden"
            />
            <img
              src={billOne}
              className="w-32 absolute md:-top-20 md:-left-20 left-4 top-96"
            />
            <img
              src={billTwo}
              className="w-32 absolute bottom-0 top-52 -left-20 md:block hidden"
            />
            <img
              src={billFour}
              className="w-32 absolute md:bottom-0 md:top-40 md:-right-20 top-96 right-6"
            />
          </div>
          <h1 className="text-black text-6xl md:w-11/12 w-12/12 mx-auto sm:mt-5 font-bold md:mt-5 px-5">
            The best tools for your job application journey
          </h1>
          <p className="mt-3 text-2xl text-black sm:mt-5 md:mt-5 w-10/12 mx-auto">
            Assert yourself through a "quality" profile with valuable tools and
            knowledge from the Job Portal.
          </p>
          <div className="mt-8 sm:mt-12 mx-auto flex gap-3 justify-center">
            <button
              onClick={() => openModal()}
              className="transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg md:mx-0  text-white shadow font-semibold rounded-full items-center justify-center py-3 border border-transparent text-base  bg-[#F2994A] md:py-4 md:text-lg px-8"
            >
              Search for a favorite job
            </button>

            <Link
              to="/sign-up"
              className="transform ease-in duration-100 md:mx-0 text-black  font-semibold rounded-full items-center justify-center py-3 border-2 border-black hover:bg-black hover:text-primary  text-base  bg-primary md:py-4 md:text-lg px-8"
            >
              Sign up for free
            </Link>
          </div>

          <div className="relative w-full md:hidden block mt-12">
            <img src={billOne} className="w-32 absolute left-4" />

            <img src={billFour} className="w-32 absolute right-6" />
          </div>
        </div>
      </main>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child>
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <h1 className="text-center text-3xl font-semibold">
                  Search for a favorite job
                </h1>
                <div className="relative bg-white p-2 mt-6">
                  <Link
                    to="/jobs"
                    className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                      <FontAwesomeIcon icon={faTh} />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-900">
                        Browse the job board
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/jobs/talent-pool/refer"
                    className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                  >
                    <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                      <FontAwesomeIcon icon={faSwimmer} />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-900">
                        Refer to the talent pool
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
