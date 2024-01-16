import { useState, useEffect } from "react";

import CandidateTable from "components/tables/CandidateTable";
import { userType } from "libs/isAuth";
import Loader from "components/Loader";

export default function TalentPool() {
  const [referrals, setReferrals] = useState([]);
  const type = userType();

  // if (referrals.length === 0) {
  //   return <Loader />;
  // }

  return (
    <div className="">
      <div className="md:w-10/12 w-12/12 mx-auto md:py-28 py-10">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mt-10 mb-4">
          Talent Pool
        </h2>
        <p className="text-center text-lg md:w-1/2 w-full mx-auto">
          These talents are available for all companies. <strong>15 000</strong>{" "}
          SEK if you hire someone from the talent pool, <strong>500</strong> SEK
          for an interview.
        </p>

        <div className="md:block hidden">
          <CandidateTable referrals={referrals} />
        </div>
      </div>
    </div>
  );
}
