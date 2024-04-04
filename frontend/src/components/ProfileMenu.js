import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCog,
  faCogs,
  faPoll,
  faSwimmingPool,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { userType } from "libs/isAuth";
import axios from "axios";
import { getId } from "libs/isAuth";
import apiList from "libs/apiList";
import logoadmin from "assets/logo_admin.jpg";

export default function ProfileMenu() {
  const type = userType();
  const getUser = getId();
  let history = useNavigate();
  const [user, setUser] = useState("");

  function handleClick() {
    history("/logout");
  }

  useEffect(() => {
    axios
      .get(`${apiList.user}/${getUser}`)
      .then((response) => {
        console.log("type", response);
        setUser(response.data);
      })
      .catch((err) => {
        console.log("err: ", err.message);
      });
  }, [getUser, setUser]);

  return (
    <div className="text-right ">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="flex relative">
            {user?.profile ? (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={user.profile}
                alt=""
              />
            ) : type === "admin" ? (
              <div className="h-10 w-10 rounded-full bg-secondary">
                <img
                  className="h-10 w-10 rounded-full"
                  src={logoadmin}
                  alt=""
                />
              </div>
            ) : (
              ""
            )}
            <FontAwesomeIcon
              icon={faCaretDown}
              className="ml-1 bottom-0 mt-5"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-8 z-50 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {type === "applicant" ? (
              <>
                <div className="p-3 flex bg-slate-200">
                  <Menu.Item>
                    <span className="flex items-center justify-center text-left p-2  text-lg font-normal text-gray-900">
                      {user.name}
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex items-center justify-center gap-1">
                      <div
                        className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                      >
                        <span>Applicant</span>
                      </div>
                    </div>
                  </Menu.Item>
                </div>
                <div className="p-3">
                  <Menu.Item>
                    <Link
                      to="/referrals"
                      className="flex items-center text-left p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      <FontAwesomeIcon icon={faUsers} className="mr-3" />
                      My referrals
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      to="/applicant/settings"
                      className="flex items-center text-left p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      <FontAwesomeIcon icon={faCogs} className="mr-3" />
                      Settings
                    </Link>
                  </Menu.Item>
                </div>
              </>
            ) : type === "recruiter" ? (
              <>
                <div className="p-3 flex bg-slate-200">
                  <Menu.Item>
                    <span className="flex items-center justify-center text-left p-2  text-lg font-normal text-gray-900">
                      {user.name}
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex items-center justify-center gap-1">
                      <div
                        className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                      >
                        <span>Recruiter</span>
                      </div>
                    </div>
                  </Menu.Item>
                </div>
                <div className="p-3">
                  <Menu.Item>
                    <Link
                      to="/admin"
                      className="flex items-center text-left p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      <FontAwesomeIcon icon={faPoll} className="mr-3" />
                      My jobs
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      to="/talent-pool"
                      className="flex items-center text-left p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      <FontAwesomeIcon
                        icon={faSwimmingPool}
                        className="mr-1.5 -ml-0.5"
                      />
                      Talent pool
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      to="/admin/settings"
                      className="flex items-center text-left p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      <FontAwesomeIcon icon={faCog} className="mr-3" />
                      Settings
                    </Link>
                  </Menu.Item>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 flex bg-slate-200">
                  <Menu.Item>
                    <span className="flex items-center justify-center text-left p-2  text-lg font-normal text-gray-900">
                      Admin
                    </span>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex items-center justify-center gap-1">
                      <div
                        className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                          bg-gray-900 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                      >
                        <span>Admin</span>
                      </div>
                    </div>
                  </Menu.Item>
                </div>
                <div className="p-3">
                  <Menu.Item>
                    <Link
                      to="/dashboard"
                      className="flex items-center text-left p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                    >
                      <FontAwesomeIcon
                        icon={faSwimmingPool}
                        className="mr-1.5 -ml-0.5"
                      />
                      Dashboard
                    </Link>
                  </Menu.Item>
                </div>
              </>
            )}

            <div className="px-3 py-3">
              <Menu.Item>
                <button
                  className="flex items-center text-left p-2 w-full transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                  onClick={() => handleClick()}
                >
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
