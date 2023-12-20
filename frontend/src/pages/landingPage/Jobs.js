import JobBoard from "components/JobBoard";
import Banner from "components/Banner";

export default function Jobs() {
  return (
    <div className="bg-light pt-20">
      <JobBoard Title={false} />
      <Banner
        title="Want to post your own jobs?"
        button="Post a job"
        link="/sign-up/new-company"
      />
    </div>
  );
}
