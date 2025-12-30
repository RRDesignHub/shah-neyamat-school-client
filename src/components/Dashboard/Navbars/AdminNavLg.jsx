import { NavLink, useLocation } from "react-router-dom";
import { RiBookShelfFill } from "react-icons/ri";
import { PiUsersFourFill, PiBookOpenTextFill } from "react-icons/pi";
import {  FaIdCard, FaRegIdCard, FaTasks } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { GiPapers, GiTeacher } from "react-icons/gi";
import { TiUserAdd } from "react-icons/ti";
import { FaUsersGear } from "react-icons/fa6";
const AdminsNavbarLg = () => {
  const location = useLocation();
  return (
    <>
      {/* overview */}
      <NavLink
        to="/dashboard"
        className={`${
          location.pathname == "/dashboard"
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }`}
      >
        <MdDashboard className="w-5 h-5" />
        ডেসবোর্ড
      </NavLink>

      {/* create user */}
      <NavLink
        to="/dashboard/create-user"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <IoMdPersonAdd className="w-5 h-5" />
        Create User
      </NavLink>

      {/* সকল ইউজার */}
      <NavLink
        to="/dashboard/all-user"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <FaUsersGear className="w-5 h-5" />
        All User
      </NavLink>

      {/* add notice */}
      <NavLink
        to="/dashboard/add-notice"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <HiSpeakerphone className="w-5 h-5" />
        নোটিশ যোগ
      </NavLink>

      {/* add subject */}
      <NavLink
        to="/dashboard/add-subjects"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <PiBookOpenTextFill className="w-5 h-5" />
        বিষয় যোগ
      </NavLink>

      {/* add admit card */}
      <NavLink
        to="/dashboard/add-admit-card"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <FaIdCard className="w-5 h-5" />
        এডমিট কার্ড তৈরি
      </NavLink>
{/* add teacher */}
      <NavLink
        to="/dashboard/add-teacher"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <TiUserAdd className="w-5 h-5" />
        শিক্ষক/শিক্ষিকা যোগ
      </NavLink>

      {/* all students */}
      <NavLink
        to="/dashboard/students"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <PiUsersFourFill className="w-5 h-5" />
        সকল শিক্ষার্থী
      </NavLink>

      {/* all subjects */}
      <NavLink
        to="/dashboard/subjects"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <RiBookShelfFill className="w-5 h-5" />
        বিষয়সমূহ
      </NavLink>

      {/* all classbased admit cards */}
      <NavLink
        to="/dashboard/class-admit-cards"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <FaRegIdCard className="w-5 h-5" />
        এডমিট কার্ড
      </NavLink>

      {/* all results */}
      <NavLink
        to="/dashboard/dashboard-results"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <GiPapers className="w-5 h-5" />
        ফলাফল
      </NavLink>

      {/* all teachers */}
      <NavLink
        to="/dashboard/all-teacher"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <GiTeacher className="w-5 h-5" />
        সকল শিক্ষক/শিক্ষিকা
      </NavLink>
      {/* special task */}
      <NavLink
        to="/dashboard/special-task"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <FaTasks className="w-5 h-5" />
        বিশেষ কাজ
      </NavLink>
    </>
  );
};
export default AdminsNavbarLg;
