import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import ApplicationTile from "./jobapplication/Application";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function CandidateTable() {
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [existingIds, setExistingIds] = useState([]);
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
        console.log(response.data);
        setApplications(response.data);
        let newIdsArray = []; // Khai báo biến ở đây

        if (response.data && response.data.length > 0) {
          const newIds = response.data.map((app) => app._id);
          const newIdsSet = new Set(newIds);

          // Sử dụng prevState để đảm bảo rằng bạn đang cập nhật từ trạng thái trước đó
          setExistingIds((prevIds) => {
            const existingIdsSet = new Set(prevIds);
            newIdsArray = [...newIdsSet].filter(
              (id) => !existingIdsSet.has(id)
            );

            // Kiểm tra xem có sự thay đổi không trước khi cập nhật
            if (newIdsArray.length > 0) {
              console.log(newIdsArray);
            }

            // Cập nhật danh sách id đã có chỉ với các id mới
            return [...prevIds, ...newIdsArray];
          });

          // Toast ở đây, sau khi cập nhật existingIds
          if (newIdsArray.length > 0) {
            toast.success(
              `Có người apply công việc mới! IDs: ${newIdsArray.join(", ")}`
            );
          }
        }
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
      <tbody className="divide-y divide-gray-300 divide-dashed w-full">
        {applications.length > 0 ? (
          applications.map((obj, index) => (
            <ApplicationTile key={index} application={obj} getData={getData} />
          ))
        ) : (
          <Typography style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </tbody>
    </>
  );
}
