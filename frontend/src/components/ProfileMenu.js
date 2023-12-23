import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCog,
  faCogs,
  faPoll,
  faSwimmer,
  faSwimmingPool,
  faTrophy,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { userType } from "libs/isAuth";
import icon from "assets/icon.jpg";

export default function ProfileMenu({ user }) {
  const type = userType();
  let history = useNavigate();

  function handleClick(err) {
    history("/logout");
    console.log(err);
  }

  return (
    <div className="text-right ">
      <Menu as="div" className="relative inline-block text-left ">
        <div>
          <Menu.Button className="flex relative">
            {user?.photoURL ? (
              <img
                className="h-10 w-10 rounded-full"
                src={user.photoURL}
                alt=""
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-secondary">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-white absolute bottom-3 left-3"
                />
              </div>
            )}
            {/* <img src={icon} className="h-12 w-12 rounded-full" /> */}
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
              <div className="p-3 ">
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
            ) : (
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
            )}

            <div className="px-3 py-3">
              <Menu.Item>
                <button
                  className="flex items-center text-left p-2 w-full transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 text-lg font-semibold text-gray-900"
                  onClick={() => handleClick("/logout")}
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
