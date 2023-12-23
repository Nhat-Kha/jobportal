export default function ReferralStatus({ status }) {
  function generateBtn(status) {
    if (status === "Shortlisted") {
      return "bg-pink-100 text-pink-800 border-pink-100";
    } else if (status === "Hired") {
      return "bg-green-100 text-green-800 border-green-100";
    } else if (status === "Not a fit")
      return "bg-red-100 text-red-800 border-red-100";
    else return "bg-yellow-100 text-yellow-800 border-yellow-100";
  }

  return (
    <div
      className={`${generateBtn(status)}
          -mt-4 relative py-1 md:px-5 px-2 inline-flex text-xs leading-5 font-semibold rounded-full border-2 z-0 h-8`}
    >
      <p>{status}</p>
    </div>
  );
}
