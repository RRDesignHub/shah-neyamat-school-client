import { NavLink, useLocation } from "react-router-dom";
import { PiUsersFourFill, PiBookOpenTextFill } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDashboard, MdOutlineAddchart } from "react-icons/md";
import { GiPapers } from "react-icons/gi";
import { FaRegIdCard, FaTasks } from "react-icons/fa";
const TeacherNavbarLg = () => {
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

      {/* add student */}
      <NavLink
        to="/dashboard/add-student"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <IoMdPersonAdd className="w-5 h-5" />
        শিক্ষার্থী যোগ
      </NavLink>


      {/* // add result */}
      <NavLink
        to="/dashboard/add-result"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <MdOutlineAddchart className="w-5 h-5" />
        ফলাফল তৈরি
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
export default TeacherNavbarLg;
