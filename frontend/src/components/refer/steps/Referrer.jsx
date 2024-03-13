import InputField from "components/InputField";

export default function Referrer({ referrer, addReferrer }) {
  return (
    <>
      <h2 className="mt-8 mb-4 text-4xl font-semibold text-gray-900 leading-none">
        Your contact information
      </h2>

      <InputField
        type="text"
        label="Your name"
        value={referrer.name}
        onChange={(e) => addReferrer({ ...referrer, name: e.target.value })}
        placeholder="Firstname Lastname"
      />

      <InputField
        type="text"
        label="Your current job title"
        value={referrer.title}
        onChange={(e) => addReferrer({ ...referrer, title: e.target.value })}
        placeholder="Developer at X"
      />

      <InputField
        type="email"
        label="Your email"
        value={referrer.email}
        onChange={(e) => addReferrer({ ...referrer, email: e.target.value })}
        placeholder="firstname@company.com"
      />

      <InputField
        type="text"
        label="Your LinkedIn profile url"
        value={referrer.linkedin}
        onChange={(e) => addReferrer({ ...referrer, linkedin: e.target.value })}
        placeholder="https://www.linkedin.com/in/firstname-lastname"
      />

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 bg-white">
          How did you know Job Portal?
        </label>
        <select className="block border border-grey-light w-full p-3 rounded mb-4">
          <option value="applicant" className="rounded mb-4 text-gray-950">
            Through friends
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Internet search(Google, Facebook,...)
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Online advertising
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Attended an event
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Received information from school or community organization
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Recommended by career advisor
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Saw it on a blog or news website
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Mentioned in online forums
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            TV or radio commercials
          </option>
          <option value="recruiter" className="rounded mb-4 text-gray-950">
            Received email or message advertisement
          </option>
        </select>
      </div>

      <label className="block text-black text-sm font-medium mt-8 focus:outline-none outline-none">
        <input className="mr-2 leading-tight text-primary" type="checkbox" />
        <span className="text-sm">
          I have read and agree to ITviec’s Terms & Conditions and Privacy
          Policy in relation to my privacy information.
        </span>
      </label>
    </>
  );
}
