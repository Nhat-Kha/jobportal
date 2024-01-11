import axios from "axios";
import apiList from "../libs/apiList";
import { useEffect, useState } from "react";

export default function useLeaderboard() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const validJobs = Array.isArray(user) ? user : [];

    setUser(validJobs);

    let address = apiList.jobs;

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return user;
}
