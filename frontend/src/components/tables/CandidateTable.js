import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Select from "../Select";
import NoReferrals from "components/emptyStates/NoReferrals";
import CandidateStatus from "components/statuses/CandidateStatus";
import axios from "axios";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";

const times = ["Newest first", "Oldest first"];
let th = [];

export default function CandidateTable({ referrals }) {
  const history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const { jobId } = useParams();

  let currentDate = new Date();
  const [applications, setApplications] = useState([]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  let [displayedReferrals, setDisplayedReferrals] = useState([]);
  let [update, setUpdate] = useState([]);
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

  useEffect(() => {
    getData();
  }, []);

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
    let address = `${apiList.applicants}?jobId=${jobId}`;
    if (queryString !== "") {
      address = `${address}&${queryString}`;
    }

    console.log(address);

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // console.log(err.response.data);
        setApplications([]);
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
      });
  };

  useEffect(
    (status) => {
      // Check if applications has an _id property
      if (applications._id) {
        const address = `${apiList.applications}/${applications._id}`;
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
      }
    },
    [applications._id]
  );

  useEffect(() => {
    setDisplayedReferrals(referrals);
  }, [referrals]);

  useEffect(() => {
    setDisplayedReferrals(referrals);
  }, [referrals]);

  const handleSearch = (data) => {
    setDisplayedReferrals(data);
  };

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

  // if (referrals.length === 0) {
  //   return <NoReferrals />;
  // }

  console.log("displayedReferrals: ", referrals);

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

      <div className="mt-12 overflow-x-auto bg-white rounded-xl">
        <div className="py-2 align-middle inline-block min-w-full">
          <table className="min-w-full divide-y divide-gray-500 z-0">
            <thead>
              <tr>
                {th.map((t) => (
                  <th className="px-6 py-3 text-left text-xs text-gray-900 uppercase tracking-wider leading-tight font-semibold">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 divide-dashed">
              {displayedReferrals.map((referral) => (
                <tr key={referral._id} className="hover:bg-light">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                    <div className="h-10 w-10 border border-gray-500 rounded-full mr-3 text-center pt-1 text-lg capitalize float-left ">
                      {referral.name[0]}
                    </div>

                    <div className="float-left">
                      <div class="text-sm font-medium text-gray-900">
                        {referral.name}
                      </div>
                      <div class="text-sm text-gray-500">{referral.title} </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                    <div className="h-10 w-10 border border-gray-500 rounded-full mr-3 text-center pt-1 text-lg capitalize float-left ">
                      {referral.name[0]}
                    </div>

                    <div className="float-left">
                      <div class="text-sm font-medium text-gray-900">
                        {referral.name}
                      </div>
                      <div class="text-sm text-gray-500">{referral.title} </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                    {calculateDays(referral.time.toDate())}
                  </td>
                  <td>
                    <CandidateStatus referral={update} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
