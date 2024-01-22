import { Link } from "react-router-dom";

export default function Recruiter(props) {
  const { recruiter } = props;
  console.log(recruiter);

  return (
    <>
      {recruiter ? (
        <div
          className="transform ease-in duration-100 hover:-translate-y-2 
                hover:shadow-lg w-full bg-white rounded-2xl p-6 text-left"
        >
          <div className="flex items-center text-left pb-4">
            <img
              className="w-16 h-16 rounded-2xl mr-4"
              src={recruiter.profile}
              alt="Company logo"
            />
            <div>
              <p className="text-2xl font-semibold text-gray-900 leading-none">
                {recruiter.name}
              </p>
            </div>
          </div>
          <p className="pl-1 pb-1">
            <span className="text-lg">{recruiter.banner}</span>
          </p>

          <div className="flex items-center pt-6">
            <Link
              className="hover:opacity-80 flex cursor-pointer items-center 
                    font-semibold text-md justify-center px-8 py-3 bg-primary 
                    rounded-xl text-black"
              to={`/companies/${recruiter.userId}`}
            >
              Read more
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
