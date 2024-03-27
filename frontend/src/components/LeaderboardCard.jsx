import { faAward, faMedal, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "@material-tailwind/react";

export default function LeaderboardCard({ user }) {
  function generateIcon(index) {
    if (index === 1) {
      return (
        <FontAwesomeIcon icon={faTrophy} className="text-primary text-4xl" />
      );
    } else if (index === 2) {
      return (
        <FontAwesomeIcon icon={faMedal} className="text-gray-400 text-4xl" />
      );
    } else if (index === 3) {
      return (
        <FontAwesomeIcon icon={faAward} className="text-yellow-600 text-4xl" />
      );
    } else return <>{index}.</>;
  }

  const sortedJobs =
    user && user.length > 0
      ? user.sort(
          (a, b) => new Date(a.dateOfPosting) - new Date(b.dateOfPosting)
        )
      : [];

  console.log(user);

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mt-10">
        Leaderboard
      </h2>
      <p className="text-md text-gray-600 pb-8 text-center pt-2 px-4">
        Helping your friends land their dream job deserves recognition 🎉
      </p>

      {sortedJobs.length > 0 ? (
        sortedJobs.map((User, id) => (
          <div
            key={id}
            className="px-3 py-5 relative border-b border-gray items-center text-left"
          >
            <div className="flex items-center text-left">
              <h1 className="text-4xl font-bold mt-2">
                {generateIcon(id + 1)}
              </h1>
              <div className="ml-5">
                <div className="text-lg font-medium text-gray-900">
                  {User.title}
                </div>
                <div className="text-sm text-gray-500">
                  <Rating
                    className="cursor-default"
                    value={User.rating !== -1 ? User.rating : null}
                    readonly
                  />
                </div>
              </div>
              <div className="ml-auto">
                <span className="text-base text-blue-600">
                  {User.recruiter.name}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}

      <p className="text-sm text-center mt-10 mb-3">
        * The leaderboard table only displays currently available jobs.{" "}
      </p>
    </div>
  );
}
