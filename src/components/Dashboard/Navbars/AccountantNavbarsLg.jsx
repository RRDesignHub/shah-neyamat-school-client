import { NavLink, useLocation } from "react-router-dom";
import { ImCalculator } from "react-icons/im";
import { TbCoinTakaFilled } from "react-icons/tb";
import { MdDashboard,  MdAddChart } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
const AccountantNavbarLg = () => {
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

      {/* বেতন ও ফি গ্রহণ */}
      <NavLink
        to="/dashboard/daily-inout"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <ImCalculator className="w-5 h-5" />
        দৈনিক হিসাব
      </NavLink>

      {/* বেতন ও ফি গ্রহণ */}
      <NavLink
        to="/dashboard/students-fees"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <TbCoinTakaFilled className="w-5 h-5" />
        মাসিক বেতন গ্রহণ
      </NavLink>
      {/* পরীক্ষার ফি যোগ */}
      <NavLink
        to="/dashboard/add-exam-fee"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        < MdAddChart className="w-5 h-5" />
        পরীক্ষার ফি যোগ
      </NavLink>
      {/* পণ্য বিক্রি */}
      <NavLink
        to="/dashboard/add-exam-fee"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        < FaSitemap className="w-5 h-5" />
        বিক্রি (খাতা, টাই...)
      </NavLink>

      {/* all students data fetch for add them into students fees collections */}
      <NavLink
        to="/dashboard/all-students-fees"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-3 px-4 py-2 bg-[#166534] text-white rounded-lg"
            : "flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-green-950 transition rounded-lg"
        }
      >
        <TbCoinTakaFilled className="w-5 h-5" />
        সকল শিক্ষার্থী
      </NavLink>
    </>
  );
};
export default AccountantNavbarLg;
