import "editor.css";
export default function JobAd({ job, description }) {
  return (
    <>
      <div className="w-11/12 mx-auto mt-20 pb-8">
        <div className="flex">
          <img
            alt="company logo"
            className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
            src={job?.logo}
          />

          <div>
            <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
              {job?.title || "Job title"}
            </h1>
            <h6 className="md:text-xl text-lg ">{job.company || "Company"}</h6>
          </div>
        </div>
        <div className="flex justify-between md:mt-12 mt-12 mb-3">
          <h1 className="text-3xl font-medium ">Summary</h1>
        </div>
        <table class="table-auto w-full mb-3">
          <tbody className="text-xl">
            <tr>
              <td className="text-bold">Hiring reward</td>
              <td className="text-right">{job.hiring || "25 000"} SEK</td>
            </tr>

            <tr>
              <td className="text-bold">Interview reward</td>
              <td className="text-right">{job.interview || "1000"} SEK</td>
            </tr>

            <tr>
              <td className="text-bold">Location</td>
              <td className="text-right">{job.location || "Stockholm"} </td>
            </tr>
            <tr>
              <td className="text-bold">Employment</td>
              <td className="text-right">{job.employment || "Full time"}</td>
            </tr>
          </tbody>
        </table>

        <div className="my-8">
          <h1 className="text-3xl font-medium mb-2">About the job</h1>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </>
  );
}
