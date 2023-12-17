import { useState } from "react";
import { useHistory } from "react-router-dom";
import InputField from "components/InputField";

export default function SignUpApplicant({ handleLogin }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [password, setPassword] = useState("");
  const [news, setNews] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  let allFieldsChecked =
    name.length > 0 &&
    title.length > 0 &&
    email.length > 0 &&
    linkedin.length > 0 &&
    password.length > 0;

  async function getReferrals(email) {
    let referrals = [];
    // const referralsRef = collection(db, "referrals");
    // const q = query(referralsRef, where("referrer.email", "==", email));
    // await getDocs(q).then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //     referrals.push(doc.id);
    //     console.log(doc.id);
    //     });
    // });

    return referrals;
  }

  return (
    <div class="min-h-screen bg-[#f8e5d4] md:py-24">
      <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none">
          Welcome to applicant
        </h2>
        <p className="text-md text-gray-600 pb-8">
          The information you add below is used to make your referrals more
          credible and it can be edited later.
        </p>
        <InputField
          type="text"
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Firstname Lastname"
        />
        <InputField
          type="text"
          label="Current job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Developer at Greet"
        />
        <InputField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname@company.com"
        />

        <InputField
          type="text"
          label="LinkedIn profile url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="https://www.linkedin.com/in/firstname-lastname"
        />

        <InputField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*********"
        />

        <label class="block text-black text-sm font-medium mt-8 focus:outline-none outline-none">
          <input
            class="mr-2 leading-tight text-primary"
            type="checkbox"
            checked={news}
            onChange={() => setNews(!news)}
          />
          <span class="text-sm">
            Keep me up-to-date on exclusive Greet updates and new job posts! You
            can opt-out at any time.
          </span>
        </label>

        <p className="text-xs text-center mt-6 mb-3 text-red-500">
          {errorMessage}
        </p>

        {allFieldsChecked ? (
          <button
            className="mt-8 w-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-100 font-semibold cursor-pointer px-4 py-3 rounded-lg text-sm"
            onClick={() => handleLogin()}
          >
            Create your account
          </button>
        ) : (
          <button className="cursor-not-allowed mt-8 w-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-100 font-semibold px-4 py-3 rounded-lg text-sm">
            Create your account
          </button>
        )}

        <p className="text-xs text-center mt-6">
          By creating an account you agree to Greet's Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
