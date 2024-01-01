import InputField from "components/InputField";

export default function Referrer({ referrer, addReferrer }) {
  return (
    <>
      <h2 className="mt-8 mb-4 text-4xl font-semibold text-gray-900 leading-none">
        Who are you?
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
    </>
  );
}
