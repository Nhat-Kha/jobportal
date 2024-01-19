import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import ApplicationTile from "./jobapplication/Application";
import { Typography } from "@material-tailwind/react";

export default function CandidateTable() {
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

  // const normalizeText = (text) => {
  //   return unorm
  //     .nfkd(text)
  //     .replace(/[\u0300-\u036f]/g, "")
  //     .toUpperCase();
  // };

  const getData = useCallback(() => {
    let searchParams = [];

    if (searchOptions.status.rejected) {
      searchParams = [...searchParams, `status=rejected`];
    }
    if (searchOptions.status.applied) {
      searchParams = [...searchParams, `status=applied`];
    }
    if (searchOptions.status.shortlisted) {
      searchParams = [...searchParams, `status=shortlisted`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    console.log(queryString);
    let address = `${apiList.applicants}?jobId=${id}`;
    if (queryString !== "") {
      address = `${address}&${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // const newData = response.data.filter((job) => {
        //   const normalizedTitle = normalizeText(job.title);
        //   const normalizedQuery = normalizeText(searchOptions.query);
        //   return normalizedTitle.includes(normalizedQuery);
        // });
        setApplications(response.data);
      })
      .catch((err) => {
        setApplications([]);
        setPopup({
          open: true,
          icon: "error",
          message: err,
        });
      });
  }, [searchOptions, setApplications, id, setPopup]);

  useEffect(() => {
    getData();
  }, [getData]);

  // if (referrals.length === 0) {
  //   return <NoReferrals />;
  // }

  console.log("displayedReferrals: ", applications);

  return (
    <>
      <div className="flex container flex-col	w-full items-stretch">
        {applications.length > 0 ? (
          applications.map((obj, index) => (
            <div key={index}>
              <ApplicationTile application={obj} getData={getData} />
            </div>
          ))
        ) : (
          <Typography style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </div>
    </>
  );
}
