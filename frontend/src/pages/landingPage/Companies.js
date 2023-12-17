import CompanyBoard from "components/CompanyBoard";
import Banner from "components/Banner";

function Companies() {
  return (
    <div className="pt-32 bg-light">
      <CompanyBoard />
      <Banner
        title="Want to post your own jobs?"
        button="Post a job"
        link="/sign-up/new-recruiter"
      />
    </div>
  );
}

export default Companies;
