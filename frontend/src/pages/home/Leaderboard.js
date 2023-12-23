import useLeaderboard from "hooks/useLeaderboard";
import LeaderboardTable from "components/tables/LeaderboardTable";
import LeaderboardCard from "components/LeaderboardCard";
import useRole from "hooks/useRole";

export default function Leaderboard() {
  const role = useRole();
  const home = useLeaderboard();

  if (!home) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="md:block hidden bg-light py-28">
        <LeaderboardTable home={home} />
      </div>

      <div className="block md:hidden pt-8">
        <LeaderboardCard home={home} />
      </div>
    </>
  );
}
