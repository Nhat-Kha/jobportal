import { faFolderPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NoJobs() {
  return (
    <div className="text-center w-5/12 mx-auto my-56">
      <FontAwesomeIcon icon={faFolderPlus} className="text-6xl text-gray-300" />
      <h1 className="text-2xl mt-4">No jobs</h1>
      <p className="mb-8">Get started by creating a new job.</p>
      <Link
        to="/create-new-job"
        className="hover:opacity-80  w-44 cursor-pointer font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-3" />
        Create job
      </Link>
    </div>
  );
}
