import {
  faAward,
  faCrown,
  faMedal,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function LeaderboardCard({ home }) {
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
    } else return <h1>{index}.</h1>;
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-900 leading-none text-center mt-10">
        Leaderboard
      </h2>
      <p className="text-md text-gray-600 pb-8 text-center pt-2 px-4">
        Helping your friends land their dream job deserves recognition 🎉
      </p>

      {home.map((greeter, id) => (
        <div
          key={id}
          className="px-3 py-5 relative border-b border-gray items-center text-left "
        >
          <div className="flex items-center text-left">
            <h1 className="text-4xl font-bold mt-2">{generateIcon(id + 1)}</h1>
            <div className="ml-5">
              <div className="text-lg font-medium text-gray-900">
                {greeter?.name}
              </div>

              <div className="text-sm text-gray-500">
                {greeter?.referrals?.length} referrals
              </div>
            </div>
          </div>
        </div>
      ))}

      <p className="text-sm text-center mt-10 mb-3">
        * The leaderboard only shows users who have signed up for a Greeter
        account.{" "}
        <Link to="/sign-up/new-greeter" className="text-money hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
