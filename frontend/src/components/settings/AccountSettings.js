import { useEffect, useState } from "react";
import InputField from "components/InputField";
import apiList from "../../libs/apiList";
import apiUploadImages from "../../libs/uploadImage";
import { userType } from "libs/isAuth";

export default function AccountSettings({ user, profile }) {
  const type = userType();
  const [email, setEmail] = useState(user?.email);

  async function handleEmailUpdate() {
    if (type === "greeter") {
      return;
    }
  }

  return (
    <div className="md:mt-0 mt-16 p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-medium leading-6 text-gray-900">
        Account settings
      </h3>
      <p className="mt-1 text-sm text-gray-600">Change to a new email.</p>

      <InputField
        className="md:w-1/2 w-full mt-6"
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="firstname@company.com"
      />

      <div className="flex items-center pt-6">
        <div
          className="hover:opacity-80 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-primary rounded-xl text-black"
          onClick={() => handleEmailUpdate()}
        >
          Save
        </div>

        <div
          className="ml-2 font-semibold mr-2 cursor-pointer border-b-2 border-black bg-light px-8 py-3 rounded-xl border-none"
          onClick={() => setEmail(user?.email)}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}
