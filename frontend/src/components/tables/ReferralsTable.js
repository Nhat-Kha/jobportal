import ReferralStatus from "components/statuses/ReferralStatus";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const th = ["Candidate", "Job", "Company", "Status", "Referred"];

export default function ReferralsTable({ referrals }) {
  const history = useNavigate();
  let currentDate = new Date();

  function calculateDays(date) {
    let daysAgo = Math.floor((currentDate - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) return daysAgo + " day ago";
    else return daysAgo + " days ago";
  }

  return (
    <>
      <div className="mt-6 overflow-x-auto bg-white rounded-xl px-6 py-3">
        <div className="py-2 align-middle inline-block min-w-full">
          <table className="min-w-full divide-y divide-gray-500 z-0">
            <thead>
              <tr>
                {th.map((t) => (
                  <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300 divide-dashed">
              {referrals?.map((r, id) => (
                <tr key={id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {r.referral.data().candidate.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {r.referral.data().job === "talent-pool" ? (
                      "Talent Pool"
                    ) : (
                      <Link
                        to={`/jobs/${r.referral.data().job}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-money hover:underline"
                      >
                        {r.job.data().title}
                      </Link>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {r.referral.data().job === "talent-pool" ? (
                      "-"
                    ) : (
                      <Link
                        to={`/companies/${r.job.data().companyId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-money hover:underline "
                      >
                        {r.job.data().company}
                      </Link>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <ReferralStatus status={r.referral.data().general.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calculateDays(r.referral.data().time.toDate())}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    <Link
                      to={`/referrals/${r.referral.id}`}
                      className="text-money hover:underline"
                    >
                      Preview
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
