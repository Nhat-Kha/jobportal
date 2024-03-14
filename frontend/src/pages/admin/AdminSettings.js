import AccountSettings from "components/settings/AccountSettings";
import PasswordSettings from "components/settings/PasswordSettings";
import RecruiterSettings from "components/settings/RecruiterSettings";
import { useState } from "react";

export default function AdminSettings({ user }) {
  let [active, setActive] = useState(0);
  let [profile, setProfile] = useState();

  return (
    <>
      <div className="bg-gray-100">
        <div className="grid grid-cols-12 py-32  w-11/12 mx-auto min-h-screen gap-16">
          <div className="col-span-3">
            <button
              className={`${
                active === 0 ? "bg-white" : "bg-gray-100 text-gray-600"
              } w-full text-left font-semibold cursor-pointer px-8 py-3 rounded-xl block`}
              onClick={() => setActive(0)}
            >
              Edit public profile
            </button>

            <button
              className={`${
                active === 1 ? "bg-white" : "bg-gray-100 text-gray-600"
              } w-full text-left font-semibold cursor-pointer px-8 py-3 rounded-xl block`}
              onClick={() => setActive(1)}
            >
              Account settings
            </button>

            <button
              className={`${
                active === 2 ? "bg-white" : "bg-gray-100 text-gray-600"
              } w-full text-left font-semibold cursor-pointer px-8 py-3 rounded-xl block`}
              onClick={() => setActive(2)}
            >
              Password
            </button>
          </div>
          <div className="col-span-7">
            {active === 0 ? (
              <RecruiterSettings user={user} profile={profile} />
            ) : active === 1 ? (
              <AccountSettings user={user} />
            ) : (
              <PasswordSettings user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
