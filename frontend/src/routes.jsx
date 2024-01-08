import {
  faCircleInfo,
  faCircleUser,
  faHouse,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Home from "pages/dashboard/home";
import Profile from "pages/dashboard/profile";
import Tables from "pages/dashboard/tables";
import Notifications from "pages/dashboard/notifications";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <FontAwesomeIcon icon={faHouse} {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <FontAwesomeIcon icon={faCircleUser} {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <FontAwesomeIcon icon={faTableCellsLarge} {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <FontAwesomeIcon icon={faCircleInfo} {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
];

export default routes;
