import JobBoard from "components/JobBoard";
import Banner from "components/Banner";
import { useEffect } from "react";

export default function Jobs() {
  return (
    <div className="bg-light pt-20">
      <JobBoard title={false} />
      <Banner
        title="Want to post your own jobs?"
        button="Post a job"
        link="/sign-up/new-company"
      />
    </div>
  );
}
