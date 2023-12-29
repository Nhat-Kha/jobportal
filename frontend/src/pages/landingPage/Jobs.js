import JobBoard from "components/tesetjob/JobBoard";
import Banner from "components/Banner";

export default function Jobs() {
  return (
    <div className="bg-light pt-20">
      <JobBoard title={true} />
      <Banner
        title="Want to post your own jobs?"
        button="Post a job"
        link="/sign-up/new-company"
      />
    </div>
  );
}
