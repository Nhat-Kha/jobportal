import { Link } from "react-router-dom";
import logo from "assets/images/logo.png";

export default function Footer() {
  return (
    <div className="bg-[#FFF5EC] text-whblackite text-left">
      <div className="w-10/12 mx-auto pt-20 pb-8 flex flex-col sm:flex-row space-y-2 justify-start">
        <div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-2 pb-6">
          <Link className="flex pt-1" to="/">
            <img className="h-12 pb-2 " src={logo} alt="logo" />
            <h1 className="md:pl-2 pl-2 text-4xl text-black font-medium hover:opacity-60">
              JobPortal
            </h1>
          </Link>
          <p className="md:w-80 w-full text-lg font-medium -mt-2 ">
            Quality over quantity.
          </p>

          <a
            className="w-44 text-lg font-medium border-b-2 border-black hover:opacity-60"
            href="mailto:nhatkha06299@gmail.com"
          >
            nhatkha06299@gmail.com
          </a>
        </div>
        <div className="w-full sm:w-1/5 flex flex-col space-y-2 pb-6">
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <Link
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/for-applicant"
          >
            How it works
          </Link>

          <Link
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/jobs"
          >
            Find jobs
          </Link>

          <Link
            className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/companies"
          >
            Find companies
          </Link>

          <Link
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/sign-in"
          >
            Sign in
          </Link>

          <Link
            className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/sign-up/new-applicant"
          >
            Sign up
          </Link>
        </div>

        <div className="w-full sm:w-1/5 flex flex-col space-y-2 pb-6">
          <h1 className="text-2xl font-semibold">Companies</h1>

          <Link
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/for-recruiter"
          >
            How it works
          </Link>

          <Link
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/sign-in"
          >
            Sign in
          </Link>

          <Link
            className="w-40 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/sign-up/new-recruiter"
          >
            Sign up
          </Link>
        </div>

        <div className="w-full sm:w-1/5 flex flex-col space-y-2 pb-6">
          <h1 className="text-2xl font-semibold">JobPortal</h1>

          <Link
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/about"
          >
            About us
          </Link>

          <Link
            className="opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/privacy-policy"
          >
            Privacy policy
          </Link>

          <Link
            className="opacity-60 hover:opacity-100 font-semibold text-lg"
            to="/cookie-policy"
          >
            Cookie policy
          </Link>
        </div>

        <div className="w-full sm:w-1/5 flex flex-col space-y-2 pb-6">
          <h1 className="text-2xl font-semibold">Follow us</h1>
          <a
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            href="https://www.instagram.com/kha_martin/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="w-28 opacity-60 hover:opacity-100 font-semibold text-lg"
            href="https://github.com/Nhat-Kha"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
