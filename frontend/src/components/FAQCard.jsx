import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function FAQCard({ question, answer }) {
  return (
    <div className="w-full mt-4 transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg rounded-2xl">
      <div className="w-full p-2 mx-auto bg-white rounded-2xl text-left">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full p-5 text-xl align-middle font-semibold focus:outline-none">
                <span>{question}</span>

                <FontAwesomeIcon
                  className="w-5 h-5"
                  icon={open ? faMinus : faPlus}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-5 pb-3 text-lg text-gray-500">
                {answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
