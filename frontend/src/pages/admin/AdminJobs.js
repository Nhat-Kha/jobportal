import React from "react";
import JobTable from "components/tables/JobTable";
import NoJobs from "components/emptyStates/NoJobs";
import apiList from "../../libs/apiList";

export default function AdminJobs() {
  const jobs = apiList.jobs;

  if (!jobs) {
    return <NoJobs />;
  }

  console.log(jobs);

  return (
    <>
      <div className="bg-white pb-3 ">
        <div className="w-10/12 mx-auto mt-32 mb-56">
          <h3 className="text-4xl mt-8" to="/admin">
            Jobs
          </h3>

          <JobTable jobs={jobs} />
        </div>
      </div>
    </>
  );
}
