import axios from "axios";
import apiList from "../libs/apiList";
import { useEffect, useState } from "react";

export default function ReferralCount({ _id, handleClick }) {
  const [value, setValue] = useState("");

  useEffect(async () => {
    const q = apiList.jobsId;
    let count = 0;
    const idJob = await axios.get(q);

    idJob.forEach(() => {
      count++;
    });

    setValue(count);
  }, [_id]);

  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold cursor-pointer"
      onClick={() => handleClick(_id)}
    >
      <span className="bg-light  py-1 px-2 rounded-lg ">{value}</span>
    </td>
  );
}
