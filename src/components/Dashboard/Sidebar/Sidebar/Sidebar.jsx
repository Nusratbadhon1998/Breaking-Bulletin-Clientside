import { HiNewspaper } from "react-icons/hi";
import { VscGraph } from "react-icons/vsc";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiArticleNyTimes } from "react-icons/pi";

import MenuItem from "../Menu/MenuItem";
import useAuth from "../../../../hooks/useAuth";
import { FaRoute, FaWheelchairMove } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { FcSettings } from "react-icons/fc";
import { GiSettingsKnobs } from "react-icons/gi";

function Sidebar() {
  const { logOut } = useAuth();
  return (
    <div className="hidden lg:flex lg:flex-col text-stone-200">
      <div >
        <div className="flex items-center gap-3 text-3xl">
          <HiNewspaper />
          <h1 className="">Breaking Bulletin</h1>
        </div>
        <div className="divider divider-neutral"></div>
        <div className="flex flex-col flex-1 ">
          <MenuItem icon={VscGraph} label="Statistics" address="/dashboard" />
          <MenuItem icon={FaUsers} label="All Users" address="all-users" />
          <MenuItem
            icon={PiArticleNyTimes}
            label="All Articles"
            address="all-articles"
          />
          <MenuItem
            icon={IoNewspaperOutline}
            label="Add Publisher"
            address="add-publisher"
          />
        </div>
      </div>
      <div className="divider divider-neutral"></div>

      <div>
        <MenuItem icon={FaHome} label="Home" address="/" />
        <div className="flex items-center px-4 py-2 gap-4  transition-colors duration-300 transform  hover:bg-stone-300   hover:text-stone-700">
          <CiSettings />
          <button  onClick={() => logOut()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
