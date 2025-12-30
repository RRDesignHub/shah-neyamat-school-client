import { NavLink, useLocation } from "react-router-dom";
import { PiUsersFourFill, PiBookOpenTextFill } from "react-icons/pi";
import { FaRegIdCard, FaTasks } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard, MdOutlineAddchart } from "react-icons/md";
import { GiPapers } from "react-icons/gi";
const TeacherNavbars = ({ openCloseMenu }) => {
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

      {/* add student */}
      <NavLink
        to="/dashboard/add-student"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <IoMdPersonAdd className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "শিক্ষার্থী যোগ" : ""}
        </span>
      </NavLink>

      {/* add result */}
      <NavLink
        to="/dashboard/add-result"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <MdOutlineAddchart className="w-4 h-4" />
        <span className="text-xs ">{openCloseMenu ? "ফলাফল তৈরি" : ""}</span>
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
export default TeacherNavbars;
