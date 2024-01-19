import { Typography } from "@material-tailwind/react";
import { SetPopupContext } from "App";
import axios from "axios";
import { Modal, Rating } from "flowbite-react";
import apiList from "libs/apiList";
import { server } from "libs/apiList";
import { useContext } from "react";

const ApplicationTile = (props) => {
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const appliedOn = new Date(application.dateOfApplication);

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const getResume = () => {
    if (
      application.jobApplicant.resume &&
      application.jobApplicant.resume !== ""
    ) {
      const address = `${server}${application.jobApplicant.resume}`;
      console.log(address);
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          console.log(error);
          setPopup({
            open: true,
            icon: "error",
            message: "Error",
          });
        });
    } else {
      setPopup({
        open: true,
        icon: "error",
        message: "No resume found",
      });
    }
  };

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  const buttonSet = {
    applied: (
      <>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase"
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("shortlisted")}
          >
            Shortlist
          </button>
        </div>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase"
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("shortlisted")}
          >
            Reject
          </button>
        </div>
      </>
    ),
    shortlisted: (
      <>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase"
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("accepted")}
          >
            Accept
          </button>
        </div>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase"
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </button>
        </div>
      </>
    ),
    rejected: (
      <>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase "
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
          >
            Rejected
          </button>
        </div>
      </>
    ),
    accepted: (
      <>
        <div item xs>
          <button
            className="w-full h-full flex items-center justify-center uppercase "
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
          >
            Accepted
          </button>
        </div>
      </>
    ),
    cancelled: (
      <>
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase "
            style={{
              background: colorSet["cancelled"],
              color: "#ffffff",
            }}
          >
            Cancelled
          </button>
        </div>
      </>
    ),
    finished: (
      <>
        <button>
          <button
            className="w-full h-full flex items-center justify-center uppercase "
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
            }}
          >
            Finished
          </button>
        </button>
      </>
    ),
  };

  return (
    <div>
      <div className="container">
        <div className="flex justify-center items-center">
          <img
            src={`${application.jobApplicant.profile}`}
            alt={`${application.jobApplicant.name}'s profile`}
            className="w-4 h-4"
          />
        </div>
        <div className="container">
          <div>
            <Typography variant="h5">
              {application.jobApplicant.name}
            </Typography>
          </div>
          <div>
            <Rating
              value={
                application.jobApplicant.rating !== -1
                  ? application.jobApplicant.rating
                  : null
              }
              readOnly
            />
          </div>
          <div>Applied On: {appliedOn.toLocaleDateString()}</div>
          <div>
            Education:{" "}
            {application.jobApplicant.education
              .map((edu) => {
                return `${edu.institutionName} (${edu.startYear}-${
                  edu.endYear ? edu.endYear : "Ongoing"
                })`;
              })
              .join(", ")}
          </div>
        </div>
        <div>
          <div>
            <button
              className="w-full h-full flex items-center justify-center uppercase bg-gray-400"
              onClick={() => getResume()}
            >
              Download Resume
            </button>
          </div>
          <div className="flex container">{buttonSet[application.status]}</div>
        </div>
      </div>
      <Modal>
        <div className="p-[20px] outline-none flex flex-col justify-center min-w-[30%] items-center">
          <button className="p-[10px 50px]">Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationTile;
