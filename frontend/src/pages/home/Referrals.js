import ReferralsTable from "components/tables/ReferralsTable";
import ReferralCard from "components/ReferralCard";
import { useState, useEffect } from "react";
import NoReferrals from "components/emptyStates/NoReferrals";
import isAuth from "libs/isAuth";
import { userType } from "libs/isAuth";
import axios from "axios";

export default function Referrals() {
  let [referrals, setReferrals] = useState([]);
  const { user } = isAuth();
  const type = userType();

  //   useEffect(() => {
  //     if (user) {
  //         axios.get("applicant", user._id).then((applicant) => {
  //             applicant.data.referrals?.forEach((referral) => {
  //                 const referralRef =
  //             })
  //         })
  //     }
  //   });

  if (type === "none") {
    return <NoReferrals />;
  }

  if (!referrals) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="md:bg-light  ">
      <div className="md:w-11/12 w-12/12 mx-auto md:py-28 py-10">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mt-10 mb-20">
          My referrals ({referrals.length})
        </h2>

        <div className="md:block hidden">
          <ReferralsTable referrals={referrals} />
        </div>

        <div className="block md:hidden pt-8">
          <ReferralCard referrals={referrals} />
        </div>
      </div>
    </div>
  );
}
