import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPeace,
  faSearch,
  faMoneyBillWave,
  faHandsHelping,
  faEnvelopeOpenText,
  faIdCard,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { userType } from "libs/isAuth";

export default function HowItWorks() {
  const type = userType();
  return (
    <div className="bg-white md:pt-32 pt-16">
      {type === "recruiter" ? (
        <>
          <h1 className="md:text-6xl text-4xl font-bold text-center text-gray-900 ">
            How <strong>JobPortal</strong> works for <strong>Recruiter</strong>
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
                Write a job description, set a hiring reward and interview
                reward.
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
        </>
      ) : type === "applicant" ? (
        <>
          <h1 className="md:text-6xl text-4xl font-bold text-center text-gray-900 ">
            How <strong>JobPortal</strong> works for <strong>Applicants</strong>
          </h1>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 md:py-32 py-12  text-center md:w-10/12 w-11/12  mx-auto ">
            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-secondary"
                icon={faSearch}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Step 1:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Find a job
              </h1>
              <p className="text-xl font-light">
                Find exciting tech jobs on the job board.
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
        </>
      ) : (
        <>
          <h1 className="md:text-6xl text-4xl font-bold text-center text-gray-900 ">
            How <strong>JobPortal</strong> works
          </h1>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-12 md:py-32 py-12  text-center md:w-10/12 w-11/12  mx-auto ">
            <div>
              <FontAwesomeIcon
                className="text-5xl mb-6 text-secondary"
                icon={faSearch}
              />

              <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
                Step 1:
              </div>
              <h1 className="text-3xl text-gray-900 pb-3 font-semibold">
                Create account
              </h1>
              <p className="text-xl font-light">
                Create a user account for applicants or recruiters.
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
                Log in
              </h1>
              <p className="text-xl font-light">
                Log in with the account you've created.
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
                Let the experience begin
              </h1>
              <p className="text-xl font-light">
                Create a job posting or find the job you desire.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
