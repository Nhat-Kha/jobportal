import { Fragment, useState, useEffect } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const statuses = ["In progress", "Shortlisted", "Not a fit", "Hired"];

export default function CandidateStatus({ referral }) {
  const [selected, setSelected] = useState(referral.statuses);

  console.log("CandidateStatus props:", referral);

  function generateBtn(status) {
    if (status === "Shortlisted") {
      return "bg-pink-100 text-pink-800 border-pink-100";
    } else if (status === "Hired") {
      return "bg-green-100 text-green-800 border-green-100";
    } else if (status === "Not a fit")
      return "bg-red-100 text-red-800 border-red-100";
    else return "bg-yellow-100 text-yellow-800 border-yellow-100";
  }

  console.log("status: ", setSelected);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="absolute w-32 -mt-4">
        <Listbox.Button
          className={`${generateBtn(selected)}
            relative w-full py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full border-2 z-0`}
        >
          <span className="">{selected}</span>
          <span className="absolute inset-y-0 right-3 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 relative w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {statuses.map((status) => {
              return (
                <Listbox.Option
                  key={status}
                  value={status}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-4 text-gray-900"
                >
                  <span className="font-normal block truncate">{status}</span>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
