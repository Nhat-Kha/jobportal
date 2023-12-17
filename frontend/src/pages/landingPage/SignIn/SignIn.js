import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import useRole from "hooks/useRole";

export default function SignIn({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const role = useRole();

  return (
    <div class="min-h-screen bg-[#f8e5d4] md:pt-24 pt-12">
      <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none">
          Sign in
        </h2>
        <p className="text-md text-gray-600 pb-8">
          Please enter your details below to sign in.
        </p>

        <InputField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname@example.com"
        />

        <InputField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="**********"
        />

        <p className="text-xs text-center mt-6 mb-3 text-red-500">
          {errorMessage}
        </p>

        <button
          type="submit"
          className="mt-2 w-full bg-primary text-gray-500 hover:bg-[#F2994A] hover:text-black border-yellow-100 font-semibold cursor-pointer px-4 py-3 rounded-lg text-sm"
          onClick={() => login(email, password)}
        >
          Sign in
        </button>
        <Link
          className="block text-xs text-center mt-6 hover:underline text-semibold cursor-pointer
          hover:text-[#91b4bd]"
          to="/sign-in/reset-password"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
