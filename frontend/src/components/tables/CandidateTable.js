import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Select from "../Select";
import NoReferrals from "components/emptyStates/NoReferrals";
import CandidateStatus from "components/statuses/CandidateStatus";
import axios from "axios";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import ApplicationTile from "./jobapplication/Application";
import { Typography } from "@material-tailwind/react";
import unorm from "unorm";

const times = ["Newest first", "Oldest first"];
let th = [];

export default function CandidateTable({ referrals }) {
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();

  let currentDate = new Date();
  const [applications, setApplications] = useState([]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  let [displayedReferrals, setDisplayedReferrals] = useState([]);
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

  function calculateDays(date) {
    let daysAgo = Math.floor((currentDate - date) / (1000 * 3600 * 24));

    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) return daysAgo + " day ago";
    else return daysAgo + " days ago";
  }

  function time(input) {
    setSelectedTime(input);

    if (input === "Oldest first") {
      displayedReferrals.sort(
        (a, b) => a.data().time.toMillis() - b.data().time.toMillis()
      );
    } else {
      displayedReferrals.sort(
        (a, b) => b.data().time.toMillis() - a.data().time.toMillis()
      );
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const normalizeText = (text) => {
    return unorm
      .nfkd(text)
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };
  const getData = () => {
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

    console.log("address: ", address);
    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const newData = response.data.filter((job) => {
          const normalizedTitle = normalizeText(job.title);
          const normalizedQuery = normalizeText(searchOptions.query);
          return normalizedTitle.includes(normalizedQuery);
        });
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
  };

  // if (referrals.length === 0) {
  //   return <NoReferrals />;
  // }

  console.log("displayedReferrals: ", applications);

  return (
    <>
      <div className="mt-14 flex gap-3">
        <div class="w-52">
          <Select
            selected={selectedTime}
            statuses={times}
            changeStatus={time}
          />
        </div>
      </div>

      <div className="flex container flex-col	w-full items-stretch">
        {applications.length > 0 ? (
          applications.map((obj) => (
            <div>
              {/* {console.log(obj)} */}
              <ApplicationTile application={obj} getData={getData} />
            </div>
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </div>
    </>
  );
}
