import FAQ from "components/FAQ";
import Banner from "components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import icon from "assets/images/help.jpg";

import {
  faHandPeace,
  faSearch,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { userType } from "libs/isAuth";

export default function ForApplicant() {
  return (
    <>
      <div className="bg-white md:pt-32 pt-16">
        <h1 className="max-w-2xl mx-auto text-center md:text-6xl text-4xl font-bold text-gray-900">
          Greet for Applicant
        </h1>
        <div
          className="grid lg:grid-cols-3 grid-cols-1 gap-14 md:py-32 py-12
          md:text-left text-center md:w-10/12 w-11/12 mx-auto "
        >
          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6 text-indigo-500"
              icon={faSearch}
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 1:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
              Find a job
            </h1>
            <p className="text-xl font-light">
              Head over to the job board to find exciting tech jobs.
            </p>
          </div>
          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6 text-yellow-400"
              icon={faHandPeace}
            />
            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 2:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3  font-semibold">
              Apply for job
            </h1>
            <p className="text-xl font-light">Apply for a job you love.</p>
          </div>
          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6 text-green-500"
              icon={faMoneyBillWave}
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 3:
            </div>
            <h1 className="text-3xl  text-gray-900 pb-3 font-semibold">
              Await approval
            </h1>
            <p className="text-xl font-light">
              Waiting for your job application to be approved by the employer.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className="grid lg:grid-cols-12 md:gap-6 gap-24 grid-cols-1 md:mt-20 mt-0 mx-auto">
          <div className="md:col-span-6 col-span-1 mt-0 md:text-left text-center">
            <h1 className="mx-auto md:text-left text-center md:text-6xl text-4xl font-bold text-gray-900">
              We will help you find the job you want
            </h1>
            <p className="text-xl mx-auto md:text-left text-center pt-4 md:pr-16 pr-0 mb-12">
              You need to create an account to apply for jobs. Become part of
              our Job Portal community to keep track of new and exciting job
              opportunities.
            </p>

            {userType() === "" ? (
              <Link
                to="/sign-up/new-applicant"
                className="mx-auto w-46 hover:opacity-80 cursor-pointer items-center font-semibold text-md justify-center px-8 py-4 bg-primary rounded-xl text-black"
              >
                Sign up
              </Link>
            ) : null}
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1 rounded-xl"
            src={icon}
          />
        </div>
      </div>
      <FAQ
        questionOne="Do I have a limitation on the number of job applications?"
        answerOne="You can submit as many applications as you like, but when one is accepted, the others will be canceled."
        questionTwo="When and how much do I get paid?"
        answerTwo="It varies. On each job ad you can find the specified hiring bonus and the interview bonus. You get paid when your candidate get an interview or get hired."
        questionThree="Do I have to sign up for a Greeter account to refer my friends?"
        answerThree=" You do not have to create a Greeter account to refer your friends
        but it makes the referral process smoother. For example you do not have to add your own personal information each time you submit a referral."
      />
      <Banner
        title="Ready to refer someone?"
        button="See available jobs"
        link="/jobs"
      />
    </>
  );
}
