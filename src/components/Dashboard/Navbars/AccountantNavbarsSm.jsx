import { NavLink, useLocation } from "react-router-dom";
import { ImCalculator } from "react-icons/im";
import { TbCoinTakaFilled } from "react-icons/tb";
import { MdDashboard, MdAddChart} from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
const AccountantNavbars = ({ openCloseMenu }) => {
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

     <NavLink
        to="/dashboard/daily-inout"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
              
              
            <ImCalculator className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "দৈনিক হিসাব" : ""}
        </span>
      </NavLink>
      
       {/* হিসাব বিবরণী / রিপোর্ট */}
            <NavLink
              to="/dashboard/ledger-statement"
            className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
            >
              <HiDocumentReport className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "হিসাব বিবরণী" : ""}
        </span>
              
              
            </NavLink>

      {/* fees receive */}
      <NavLink
        to="/dashboard/students-fees"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <TbCoinTakaFilled className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "মাসিক বেতন গ্রহণ" : ""}
        </span>
      </NavLink>
      {/* exam fees add */}
      <NavLink
        to="/dashboard/add-exam-fee"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <MdAddChart className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "পরীক্ষার ফি যোগ" : ""}
        </span>
      </NavLink>
      {/* items sell */}
      <NavLink
        to="/dashboard/add-exam-fee"
        className={({ isActive }) =>
          isActive
            ? "flex items-center ps-2 gap-2 py-2 bg-[#166534] text-white "
            : "flex items-center ps-2 gap-2 py-2 hover:bg-[#166534] hover:text-white transition "
        }
      >
        <FaSitemap className="w-4 h-4" />
        <span className="text-xs ">
          {openCloseMenu ? "বিক্রি(খাতা, টাই...)" : ""}
        </span>
      </NavLink>
    </>
  );
};
export default AccountantNavbars;
