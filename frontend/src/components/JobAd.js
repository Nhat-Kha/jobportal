import "editor.css";
import icon from "assets/icon.jpg";
export default function JobAd({ job, tags, about }) {
  console.log(about);
  return (
    <>
      {job && (
        <div className="w-11/12 mx-auto mt-20 pb-8">
          <div className="flex">
            <img
              alt="company logo"
              className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
              src={icon}
            />

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
                {job?.title || "Job title"}
              </h1>
              <h6 className="md:text-xl text-lg ">{"Company"}</h6>
            </div>
          </div>
          <div className="flex justify-between md:mt-12 mt-12 mb-3">
            <h1 className="text-3xl font-medium ">Summary</h1>
          </div>
          <table className="table-auto w-full mb-3">
            <tbody className="text-xl">
              <tr>
                <td className="text-bold">Salary reward</td>
                <td className="text-right">{job.salary || ""} $</td>
              </tr>

              <tr>
                <td className="text-bold">Skills</td>
                <td className="text-right">
                  <div className="flex flex-row-reverse	">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white p-2 m-1 rounded-full flex justify-start"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-bold">duration</td>
                <td className="text-right">{job.duration || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">deadline</td>
                <td className="text-right">{job.deadline || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxApplicants</td>
                <td className="text-right">{job.maxApplicants || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxPositions</td>
                <td className="text-right">{job.maxPositions || ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {about && (
        <div className="w-11/12 mx-auto mt-20 pb-8">
          <div className="flex">
            <img
              alt="company logo"
              className="md:h-24 md:w-24 w-20 h-20 md:mr-6 mr-4 rounded-md"
              src={icon}
            />

            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl mt-3">
                {about?.title || "Job title"}
              </h1>
              <h6 className="md:text-xl text-lg ">{"Company"}</h6>
            </div>
          </div>
          <div className="flex justify-between md:mt-12 mt-12 mb-3">
            <h1 className="text-3xl font-medium ">Summary</h1>
          </div>
          <table className="table-auto w-full mb-3">
            <tbody className="text-xl">
              <tr>
                <td className="text-bold">Salary reward</td>
                <td className="text-right">{about.salary || ""} $</td>
              </tr>
              <tr>
                <td className="text-bold">duration</td>
                <td className="text-right">{about.duration || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">deadline</td>
                <td className="text-right">{about.deadline || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxApplicants</td>
                <td className="text-right">{about.maxApplicants || ""}</td>
              </tr>
              <tr>
                <td className="text-bold">maxPositions</td>
                <td className="text-right">{about.maxPositions || ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
