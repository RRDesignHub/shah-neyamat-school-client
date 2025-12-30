import { Helmet } from "react-helmet-async";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const AddUpdateRemoveData = () => {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>{
          location.pathname == '/admin_access' ? "SN-Admin Access" : location.pathname == '/admin_access/add_student' ? "SN-Add Student" : location.pathname == '/admin_access/students' ? "SN-Students" : location.pathname == '/admin_access/add_subject' ? "SN-Add Subjects" : location.pathname == '/admin_access/display_subject' ? "SN-Subjects" : location.pathname == '/admin_access/add_result' ? "SN-Add Result" : ""
          }</title>
      </Helmet>
      <div className="w-[98%] md:w-11/12 mx-auto grid grid-cols-12 gap-2 pb-5">
        <div className="mt-10 col-span-12 md:col-span-2  flex flex-row max-sm:flex-wrap max-sm:justify-center md:flex-col gap-2 md:gap-1">
          <NavLink
            to="/admin_access/add_student"
            className={({ isActive }) =>
              isActive
                ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700"
                : "btn bg-green-50 hover:bg-green-100"
            }
          >
            Add Student
          </NavLink>
          <NavLink
            to="/admin_access/students"
            className={({ isActive }) =>
              isActive
                ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700"
                : "btn bg-green-50 hover:bg-green-100"
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/admin_access/add_subject"
            className={({ isActive }) =>
              isActive
                ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700"
                : "btn bg-green-50 hover:bg-green-100"
            }
          >
            Add Subject
          </NavLink>
          <NavLink
            to="/admin_access/display_subject"
            className={({ isActive }) =>
              isActive
                ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700"
                : "btn bg-green-50 hover:bg-green-100"
            }
          >
            Subjects
          </NavLink>
          <NavLink
            to="/admin_access/add_result"
            className={({ isActive }) =>
              isActive
                ? "btn text-white bg-green-700 hover:bg-green-800 focus:text-white focus:bg-green-700"
                : "btn bg-green-50 hover:bg-green-100"
            }
          >
            Add Result
          </NavLink>
        </div>
        {/* Dynamic sec */}
        <div className="col-span-12 md:col-span-10 ">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
