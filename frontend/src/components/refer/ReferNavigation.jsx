import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function ReferNavigation({ changeIndex, index, isComplete }) {
  function BackBtn() {
    if (index === 0) return null;
    else
      return (
        <div
          className="mr-2 text-center font-bold cursor-pointer border-b-2 border-black  hover:bg-gray-200 px-3 py-3 rounded-xl border-none"
          onClick={() => changeIndex(index - 1)}
        >
          <FontAwesomeIcon className="mr-3 text-sm" icon={faChevronLeft} /> Go
          back
        </div>
      );
  }

  function NextBtn() {
    if (index === 4) return null;
    if (isComplete(index) === false)
      return (
        <div className="w-32 ml-2 cursor-not-allowed flex items-center font-bold text-md justify-center px-8 py-3 bg-gray-200 rounded-xl text-black">
          Next{" "}
          <FontAwesomeIcon className="ml-3 text-sm" icon={faChevronRight} />
        </div>
      );
    else
      return (
        <div
          className="ml-2 text-center transform hover:-translate-y-1 hover:shadow-lg cursor-pointer font-bold text-md px-8 py-3 bg-primary rounded-xl text-black"
          onClick={() => changeIndex(index + 1)}
        >
          Next{" "}
          <FontAwesomeIcon className="ml-3 text-sm" icon={faChevronRight} />
        </div>
      );
  }

  return (
    <div className="w-70 mt-16 mx-auto flex justify-center">
      <BackBtn />
      <NextBtn />
    </div>
  );
}
