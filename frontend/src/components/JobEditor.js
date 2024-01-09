import isAuth from "libs/isAuth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

function WaitingBtn() {
  return (
    <div className="cursor-not-allowed transform ease-in duration-100 hover:-translate-y-1 hover:shadow-lg flex ml-2 mr-2 items-center font-semibold text-md justify-center px-8 py-3 bg-gray-300 rounded-xl text-black">
      Waiting for responses
    </div>
  );
}
export default function JobEditor({ jobToEdit, _id }) {
  let history = useNavigate();
  const [editing, setEditing] = useState(true);

  const { user } = isAuth();
  const [job, setJob] = useState(
    jobToEdit || {
      company: user.displayName,
      companyId: user.uid,
      logo: user.photoURL,
      title: "",
      employment: "",
      hiring: "",
      interview: "",
      location: "",
      description: "",
      status: "Open",
      time: Date.now(),
    }
  );
  const [description, setDescription] = useState(job?.description);

  useEffect(() => {
    setJob({ ...job, description: description });
  }, [description]);

  const addToDatabase = useCallback(async () => {
    if (jobToEdit && _id) {
      return;
    }
  });
}
