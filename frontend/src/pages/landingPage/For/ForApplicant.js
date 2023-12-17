import FAQ from "components/FAQ";
import Banner from "components/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import greeters from "assets/images/greeters.png";

import {
  faHandPeace,
  faArrowRight,
  faSearch,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

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
              Refer someone
            </h1>
            <p className="text-xl font-light">
              Refer a friend that fits the job description and who is looking
              for new challenges.
            </p>
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
              Get paid
            </h1>
            <p className="text-xl font-light">
              Get paid if the friend you referred gets interviewed or hired.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className="grid lg:grid-cols-12 md:gap-6 gap-24 grid-cols-1 md:mt-20 mt-0 mx-auto">
          <div className="md:col-span-6 col-span-1 mt-0 md:text-left text-center">
            <h1 className="mx-auto md:text-left text-center md:text-6xl text-4xl font-bold text-gray-900">
              We help you help your friends
            </h1>
            <p className="text-xl mx-auto md:text-left text-center pt-4 md:pr-16 pr-0 mb-12">
              You do not have to create a Greeter account to refer your friends
              but it makes the referral process smoother. Become a part of our
              Greeter community to keep track of your referrals and to get
              exclusive updates when new jobs are posted.
            </p>

            <Link
              to="new-applicant"
              className="mx-auto w-46 hover:opacity-80 cursor-pointer items-center font-semibold text-md justify-center px-8 py-4 bg-primary rounded-xl text-black"
            >
              Sign up
            </Link>
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1"
            src={greeters}
          />
        </div>
      </div>
      <FAQ
        questionOne="How many can I refer?"
        answerOne="You can refer how many friends you want. What are you waiting for?"
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
