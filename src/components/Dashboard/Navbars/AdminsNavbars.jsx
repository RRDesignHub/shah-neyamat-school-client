import { NavLink, useLocation } from "react-router-dom";
import { RiBookShelfFill } from "react-icons/ri";
import { PiUsersFourFill, PiBookOpenTextFill } from "react-icons/pi";
import {FaIdCard, FaRegIdCard, FaTasks } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard} from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { GiPapers, GiTeacher } from "react-icons/gi";
import { FaUsersGear } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";

const AdminsNavbars = ({openCloseMenu}) => {
  const location = useLocation();
  return (
    <>
      {/* overview */}
      <NavLink
        to="/dashboard"
        className={`${
          location.pathname == "/dashboard"
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white"
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition"
        }`}
      >
        <MdDashboard className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "ডেসবোর্ড" : ""}</span>
      </NavLink>

      {/* create user*/}
      <NavLink
        to="/dashboard/create-user"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <IoMdPersonAdd className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "Create User" : ""}</span>
      </NavLink>

      {/* all user*/}
      <NavLink
        to="/dashboard/all-user"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <FaUsersGear className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "All User" : ""}</span>
      </NavLink>

      {/* add notice */}
      <NavLink
        to="/dashboard/add-notice"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <HiSpeakerphone className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "নোটিশ যোগ" : ""}</span>
      </NavLink>

      {/* add subject */}
      <NavLink
        to="/dashboard/add-subjects"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <PiBookOpenTextFill className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "বিষয় যোগ" : ""}</span>
      </NavLink>

      {/* create admit card */}
      <NavLink
        to="/dashboard/add-admit-card"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <FaIdCard className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "এডমিট কার্ড তৈরি" : ""}
        </span>
      </NavLink>

{/* create teacher*/}
      <NavLink
        to="/dashboard/add-teacher"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <TiUserAdd className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "শিক্ষক/শিক্ষিকা যোগ" : ""}
        </span>
      </NavLink>
      {/* all students */}
      <NavLink
        to="/dashboard/students"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <PiUsersFourFill className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "সকল শিক্ষার্থী" : ""}
        </span>
      </NavLink>

      {/* subjects */}
      <NavLink
        to="/dashboard/subjects"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <RiBookShelfFill className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "বিষয়সমূহ" : ""}</span>
      </NavLink>

      {/*  এডমিট কার্ড */}
      <NavLink
        to="/dashboard/class-admit-cards"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <FaRegIdCard className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "এডমিট কার্ড" : ""}</span>
      </NavLink>

      {/* ফলাফল */}
      <NavLink
        to="/dashboard/dashboard-results"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <GiPapers className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "ফলাফল" : ""}</span>
      </NavLink>

        {/* all teachers */}
      <NavLink
        to="/dashboard/all-teacher"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <GiTeacher className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "সকল শিক্ষক/শিক্ষিকা" : ""}
        </span>
      </NavLink>
        {/* special task */}
      <NavLink
        to="/dashboard/special-task"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <FaTasks className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "বিশেষ কাজ" : ""}
        </span>
      </NavLink>
    </>
  );
};
export default AdminsNavbars;
