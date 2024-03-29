import { faAward, faMedal, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function LeaderboardTable({ user }) {
  if (!user) {
    return <h1>Loading...</h1>;
  }

  function generateIcon(index) {
    if (index === 1) {
      return (
        <FontAwesomeIcon icon={faTrophy} className="text-primary text-2xl" />
      );
    } else if (index === 2) {
      return (
        <FontAwesomeIcon icon={faMedal} className="text-gray-400 text-2xl" />
      );
    } else if (index === 3) {
      return (
        <FontAwesomeIcon icon={faAward} className="text-yellow-600 text-2xl" />
      );
    } else return index;
  }

  console.log("recruiter: ", user);

  return (
    <div className="bg-white rounded-xl p-5 overflow-x-auto mx-auto md:w-6/12 w-11/12">
      <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mt-4">
        Leaderboard
      </h2>
      <p className="text-md text-gray-600 pb-8 text-center pt-2">
        Categorized list of highly esteemed job positions based on performance
        and evaluations 🎉
      </p>
      <table className="w-full mt-12">
        <thead className="border-b border-gray-500">
          <tr>
            <th className="px-6 py-3 text-center text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold">
              Jobs
            </th>
            <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold">
              Start
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300 divide-dashed">
          {user && Object.keys(user) && user.length > 0 ? (
            user
              .sort((a, b) => b.rating - a.rating)
              .map((User, id) => (
                <tr key={id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                    <strong>{generateIcon(id + 1)}</strong>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/jobs/${User._id}`}>
                      <div className="flex items-center ">
                        <div>
                          <div className="text-sm font-bold cursor-default text-gray-900">
                            {User.title}
                          </div>
                        </div>
                      </div>

                      <span className="text-base text-blue-600">
                        {User.recruiter.name}
                      </span>
                    </Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap cursor-default text-sm text-gray-500">
                    <Rating
                      className="cursor-default"
                      value={User.rating !== -1 ? User.rating : null}
                      readonly
                    />{" "}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td>
                <span>No data available</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="text-sm text-center mt-10 mb-3">
        * The leaderboard table only displays currently available jobs.{" "}
      </p>
    </div>
  );
}
