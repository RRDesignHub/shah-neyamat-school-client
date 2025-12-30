import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/logo.png";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";

export const Navbar = () => {
  const [openCloseMenu, setOpenCloseMenu] = useState(true);
  const handleOpenCloseMenu = (status) => {
    setOpenCloseMenu(!status);
  };

  const links = (
    <>
      <li>
        <NavLink
        onClick={()=>setOpenCloseMenu(true)}
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600  focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/"
        >
          হোম
        </NavLink>
      </li>
      <li>
        <NavLink
        onClick={()=>setOpenCloseMenu(true)}
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/teachers"
        >
          শিক্ষক/শিক্ষিকা
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/students"
          onClick={()=>setOpenCloseMenu(true)}
        >
          শিক্ষার্থী
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/management"
          onClick={()=>setOpenCloseMenu(true)}
        >
          পরিচালকমন্ডলী
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/subjects"
          onClick={()=>setOpenCloseMenu(true)}
        >
          পাঠ্যপুস্তক
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/all-notice"
          onClick={()=>setOpenCloseMenu(true)}
        >
          নোটিশ
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-green-950 lg:text-white  py-1 border-b-4 border-b-green-950 lg:border-b-green-50 bg-transparent focus:text-white max-sm:focus:text-green-600 focus:bg-transparent"
              : "text-green-950 lg:text-white"
          }
          to="/client-result"
          onClick={()=>setOpenCloseMenu(true)}
        >
          ফলাফল
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar w-full max-sm:px-2 md:w-11/12 mx-auto text-white justify-between max-sm:items-center">
      <div className="navbar-start w-fit">
        <Link to="/" className=" text-xl">
          <div className="flex items-center gap-3">
            <img className="w-10 md:w-16 drop-shadow-[0_5px_15px_#02160b]" src={logo} alt="" />
            <h3 className="text-base md:text-xl lg:text-2xl font-bold ">
              শাহ্ নেয়ামত (রহঃ) <br className="lg:hidden" /> কেজি এন্ড হাই স্কুল
            </h3>
          </div>
        </Link>
      </div>

      <div className="flex-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="flex-end lg:hidden mx-2">
        <div className="py-2 px-3 rounded-lg bg-green-200 text-green-950 ">
          {openCloseMenu ? (
            <TiThMenu
              onClick={() => handleOpenCloseMenu(true)}
              className="text-2xl flex  "
            />
          ) : (
            <FaWindowClose
              onClick={() => handleOpenCloseMenu(false)}
              className="text-2xl flex  "
            />
          )}
        </div>

      
      </div>

      {/* mobile/tab links */}
      <div
        className={`absolute z-40 w-full lg:hidden transition-all duration-700 ease-in-out shadow-[0_2px_15px_#16a34a] overflow-hidden top-[70px] ${
          openCloseMenu ? "-left-[500px] md:-left-[1000px]" : "left-0"
        }`}
      >
        <ul className="w-full flex flex-col bg-gradient-to-b from-green-50/95 via-green-200/95 to-green-100/95 text-left py-4 px-8 space-y-4">
          {links}
        </ul>
      </div>
    </div>
  );
};
