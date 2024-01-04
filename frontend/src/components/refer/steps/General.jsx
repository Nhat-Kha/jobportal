import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function General({ addGeneral, general }) {
  return (
    <>
      <h2 className="mt-8 mb-4 text-4xl font-semibold text-gray-900 leading-none">
        General information
      </h2>

      <label className="block text-black text-sm font-semibold mb-2">
        How open are they to a new job?
      </label>
      <div className="relative mb-4">
        <select
          className="block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
          onChange={(e) =>
            addGeneral({
              ...general,
              open: e.target.value,
            })
          }
        >
          <option>I don't know.</option>
          <option>Average.</option>
          <option>Looking actively.</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>

      <label className="block text-black text-sm font-semibold mb-2">
        Do you want to split the hiring bonus if they get hired?
      </label>
      <div className="relative mb-10">
        <select
          className="block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
          onChange={(e) =>
            addGeneral({
              ...general,
              share: e.target.value,
            })
          }
        >
          <option>No, I will get 100%.</option>
          <option>Yes, we will get 50% each.</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </>
  );
}
