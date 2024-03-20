import FAQ from "components/FAQ";
import Banner from "components/Banner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import companies from "assets/images/companies1.png";

import {
  faCopy,
  faEnvelopeOpenText,
  faIdCard,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";
import { userType } from "libs/isAuth";

export default function ForRecruiter() {
  const type = userType();

  return (
    <>
      <div className="bg-light pt-40 pb-8">
        <div className="md:pt-0 mb-20 md:w-10/12 w-11/12 mx-auto text-center">
          <h1 className="mx-auto md:text-7xl text-5xl font-bold text-gray-900">
            Forget expensive headhunters
          </h1>
          <p className="text-xl mx-auto md:w-8/12 w-12/12 pt-4 mb-12">
            Post jobs for free and only pay when you interview or hire someone.
            Make your recruitment process crowdsourced and remove expensive
            headhunters from the equation.
          </p>

          {userType() === "" ? (
            <Link
              to="new-recruiter"
              className="mx-auto w-46 hover:opacity-80 cursor-pointer items-center font-semibold text-md justify-center px-8 py-4 bg-primary rounded-xl text-black"
            >
              Sign up
            </Link>
          ) : null}

          <img
            alt="pricing example chart"
            className="mt-20 w-11/12 mx-auto bg-light"
            src={companies}
          />
        </div>
      </div>
      <div className="pt-28">
        <h1 className="max-w-2xl mx-auto text-center md:text-6xl text-4xl font-bold text-gray-900">
          How it works
        </h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-14 md:py-40 md:pb-12 py-12   md:text-left text-center md:w-10/12 w-11/12  mx-auto ">
          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6  text-green-500"
              icon={faCopy}
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 1:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
              Create a profile
            </h1>
            <p className="text-xl font-light">
              Promote your company to our community of tech people.
            </p>
          </div>

          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6 text-indigo-500 "
              icon={faIdCard}
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 2:
            </div>
            <h1 className="text-3xl text-gray-900 pb-3  font-semibold">
              Post a job
            </h1>
            <p className="text-xl font-light">
              Write a job description, set a hiring reward and interview reward.
            </p>
          </div>

          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6  text-primary"
              icon={faEnvelopeOpenText}
            />
            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 3:
            </div>
            <h1 className="text-3xl  text-gray-900 pb-3 font-semibold">
              Applicant apply
            </h1>
            <p className="text-xl font-light">
              Our JOBPORTAL community allows users to discover and apply for
              jobs.
            </p>
          </div>

          <div>
            <FontAwesomeIcon
              className="text-5xl mb-6  text-yellow-400"
              icon={faHandsHelping}
            />
            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 4:
            </div>
            <h1 className="text-3xl  text-gray-900 pb-3 font-semibold">
              Interview and hire
            </h1>
            <p className="text-xl font-light">
              If you find an interesting candidate you can interview and hire
              them.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="bg-white md:pt-0 mt-32 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className="grid lg:grid-cols-5 md:gap-6 gap-24 grid-cols-1 md:mt-20 mt-0 mx-auto">
          <div className="md:col-span-3 col-span-1 md:mt-14 mt-0">
            <h1 className=" mx-auto md:text-left text-center md:text-6xl text-4xl font-bold text-gray-900">
              Pricing example
            </h1>
            <p className="text-xl mx-auto md:text-left text-center pt-4 md:pr-16 pr-0">
              You post a job with a hiring reward of 10 000 SEK and an interview
              bonus of 1000 SEK. You get 17 referrals. After interviewing 3
              candidates you decide to hire one of them. You would now owe 15
              000 SEK in total. 10 000 for the hiring reward, 3 x 1000 for the
              interviews and 2000 for the Greet Fee (20% of the hiring reward).
              <br />
              <br />
              Out of these 15 000 SEK. 10 000 will be given to the one who
              referred the candidate you hired. 1000 SEK will be given to each
              Greeter who referred someone who got an interview. 2000 will be
              given to Greet.
            </p>
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-2 col-span-1"
            src={chart}
          />
        </div>
      </div> */}

      <FAQ
        questionOne="What is the hiring reward, interview reward and Greet Fee?"
        answerOne="The hiring reward is what the Greeters will see on the job board and get paid if their referral results in a hiring. The interview reward is what is paid if a referral ends up with an interview. You decide what the hiring- and interview reward should be. The Greet Fee is equal to 20% of your hiring reward."
        questionTwo="When and how much do I pay?"
        answerTwo="Greet was recently launched and we are offering early adopters to start using the service for free (for a limited time), i.e no monthly pricing plan. Instead, you only pay for the interview reward and hiring reward when you interview or hire someone. So until then, you get free promotion."
        questionThree="How do I get my company on JobPortal?"
        answerThree="Contact nhatkha06299@gmail.com"
      />
      {type === "recruiter" ? (
        <Banner
          title="Ready to hire your next star?"
          button="Post a job"
          link="new-recruiter"
        />
      ) : null}
    </>
  );
}
