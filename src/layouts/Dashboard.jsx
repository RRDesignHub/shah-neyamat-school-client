import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "./../assets/logo.png";
import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";
import { FaHome} from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../Hooks/useAuth";
import { useRole } from "../Hooks/useRole";
import AdminsNavbars from "../components/Dashboard/Navbars/AdminsNavbars";
import TeacherNavbars from "../components/Dashboard/Navbars/TeacherNavbars";
import AdminsNavbarLg from "../components/Dashboard/Navbars/AdminNavLg";
import TeacherNavbarLg from "../components/Dashboard/Navbars/TeacherNavbarsLg";
import { Loading } from "../components/Shared/Loading";
import AccountantNavbarLg from "../components/Dashboard/Navbars/AccountantNavbarsLg";
import AccountantNavbars from "../components/Dashboard/Navbars/AccountantNavbarsSm";
export const Dashboard = () => {
  const [userRole, roleLoading] = useRole();
    const { isTeacher, isAccountant, isAdmin } = userRole;
  const { logoutUser } = useAuth();
  const [openCloseMenu, setOpenCloseMenu] = useState(true);
  
  const handleOpenCloseMenu = () => {
    setOpenCloseMenu(!openCloseMenu);
  };
  return (
    <>
    {roleLoading && <Loading />}
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <aside
        className={`fixed shadow ${
          openCloseMenu ? "max-sm:w-[140px]" : "max-sm:w-8"
        } transform ease-in-out duration-700 md:w-64 relative bg-green-50 text-sand `}
      >
        <div className="md:hidden py-3 text-center">
          {openCloseMenu ? (
            <>
              <div className="mx-2 flex justify-between items-center gap-2">
                <img src={logo} alt="" className={`max-sm:w-8`} />
                <IoArrowBackCircle
                  className={`text-3xl text-green-800`}
                  onClick={handleOpenCloseMenu}
                />
              </div>
            </>
          ) : (
            <IoArrowForwardCircle
              className={`mx-auto text-3xl text-green-800`}
              onClick={handleOpenCloseMenu}
            />
          )}

          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          {/* links for small screen */}
          <nav className="space-y-2 md:space-y-4">
            {/* Admin-Specific Links for small screen*/}
            {isAdmin && (
              <AdminsNavbars openCloseMenu={openCloseMenu}/>
            )}
            {isTeacher && <>
             <TeacherNavbars openCloseMenu={openCloseMenu} />
              </>}

              {isAccountant && <>
            <AccountantNavbars openCloseMenu={openCloseMenu} />
              </>}
          </nav>
        </div>

        {/* footer btn for small screen */}
        <div className="md:hidden divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
        <div className="absolute bottom-5 md:hidden mx-auto text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "flex items-center ps-2 gap-2 py-2 bg-green-100 text-white "
                : "flex items-center ps-2 gap-2 py-2 hover:bg-green-100 hover:text-white transition "
            }
          >
            <FaHome className="w-4 h-4" />
            <span className="text-xs ">{openCloseMenu ? "Home" : ""}</span>
          </NavLink>
          <button
            onClick={() => logoutUser()}
            className="w-full flex items-center ps-2 gap-2 py-2 bg-[#166534] hover:bg-[#166534] text-white "
          >
            <LuLogOut className="w-4 h-4" />
            <span className="text-xs ">{openCloseMenu ? "Logout" : ""}</span>
          </button>
          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          <p className="max-sm:hidden text-xs pt-2 text-terracotta text-center">
            @Shah Neyamat School
          </p>
        </div>

        {/* aside for md/lg screen */}
        <div className="max-sm:hidden  w-full py-4 h-full flex flex-col shadow">
          <div className="flex flex-col items-center justify-center">
            <img src={logo} className="w-16" alt="" />
            <h3 className="text-green-950 text-xl font-semibold text-center">
              Dashboard
            </h3>
          </div>
          <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
          <nav className="space-y-4 px-4">
            {/* Admin-Specific Links */}
            {isAdmin && (
              <>
                <AdminsNavbarLg />
              </>
            )}
            {isTeacher && <>
            <TeacherNavbarLg />
              </>}
              {isAccountant && <>
            <AccountantNavbarLg />
              </>}
          </nav>

          {/* footer for md and lg */}
          <div className="mt-auto">
            <div className="px-4">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-white transition rounded-lg"
              >
                <FaHome className="w-5 h-5" />
                Home
              </Link>
              <button
                onClick={() => logoutUser()}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#166534] hover:text-white transition rounded-lg"
              >
                <LuLogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
            <div className="divider my-2 h-[2px] bg-[rgba(244,241,222,0.59)]"></div>
            <p className="text-xs pt-2 text-terracotta text-center">
              @Shah Neyamat School
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-green-50 ">
        {/* Dynamic Section */}
        <section className="">
          <Outlet />
        </section>
      </main>
    </div>
    </>
  );
};
