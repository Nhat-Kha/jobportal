import axios from "axios";
import JobAd from "components/JobAd";
import apiList from "../../libs/apiList";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "components/Banner";

export default function Job(props) {
  const { id } = useParams();
  const [job, setJob] = useState();

  useEffect(() => {
    axios
      .get(`${apiList.jobs}/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="lg:w-6/12 w-11/12 mx-auto md:mt-20 mt-10 pb-10">
        <JobAd about={job} />
        <div className="text-center mx-auto mt-12 mb-10">
          <Link
            to="refer"
            className="px-8 py-3 border border-transparent font-medium rounded-md text-black bg-primary md:py-4 text-xl md:px-10 transform ease-in duration-100 hover:-translate-y-2 hover:shadow-lg"
          >
            Refer someone
          </Link>
        </div>
      </div>

      <Banner
        title="Looking for something else?"
        button="Explore the job board"
        link="/jobs"
      />
    </>
  );
}
