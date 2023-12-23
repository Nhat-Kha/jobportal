import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NoReferrals() {
  return (
    <div className="text-center md:w-5/12 w-11/12 mx-auto md:my-56 my-32 ">
      <FontAwesomeIcon icon={faUsers} className="text-6xl text-gray-300" />
      <h1 className="text-2xl mt-4">Keep track of your referrals!</h1>
      <p className="mb-8">
        Become a Greeter to keep track of your referrals and much (much) more.
      </p>
      <div className="pt-3">
        <Link
          to="/sign-in"
          className="hover:opacity-80 cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
        >
          Sign in
        </Link>

        <Link
          to="/sign-up/new-greeter"
          className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black  hover:bg-light px-3 py-3 rounded-xl border-none"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
