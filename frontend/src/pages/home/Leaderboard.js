import LeaderboardCard from "components/LeaderboardCard";
import LeaderboardTable from "components/tables/LeaderboardTable";
import useLeaderboard from "hooks/useLeaderboard";

export default function Leaderboard() {
  const user = useLeaderboard();

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="md:block hidden bg-light py-28">
        <LeaderboardTable user={user} />
      </div>

      <div className="block md:hidden pt-8">
        <LeaderboardCard user={user} />
      </div>
    </>
  );
}
