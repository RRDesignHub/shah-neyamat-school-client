import { useState } from "react";
import { useRole } from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Shared/Loading";
import { format } from "date-fns";
import { Link } from "react-router-dom";
export default function Overview() {
  const [userRole, roleLoading] = useRole();
  const { isTeacher, isAccountant, isAdmin } = userRole;
  const { user } = useAuth();
  const axiosSecure = useAxiosSec();

  const { data: dashboardData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/dashboard/teacher/${user?.email}`
      );
      return data;
    },
  });
  return (
    <>
      {isLoading || roleLoading ? (
        <Loading />
      ) : (
        <div className="p-2 md:p-6 min-h-screen">
          {/* Welcome Section */}
          <div className="bg-primary text-white p-2 md:p-6 rounded-xl shadow-lg">
            <h1 className="text-xs md:text-3xl">
              {" "}
              {dashboardData?.user?.name}(
              {isTeacher ? (
                <span className="font-extrabold">শিক্ষক/শিক্ষিকা</span>
              ) : isAccountant ? (
                <span className="font-extrabold">একাউন্টেন্ট</span>
              ) : (
                <span className="font-extrabold">এডমিন</span>
              )}
              ) ডেসবোর্ডে আপনাকে স্বাগতম
            </h1>
            <p className="text-[7px] md:text-lg mt-2">
              শিক্ষক/শিক্ষিকা এবং শিক্ষার্থীর তথ্য পরিচালনা, এডমিট কার্ড ও
              রেজাল্ট তৈরি...
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mt-6">
            {isAdmin && (
              <>
                {/* Total Users */}
                <Link to="/dashboard/all-user">
                  <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-700">
                    <h2 className="text-xs md:text-xl font-semibold text-primary">
                      মোট ব্যবহারকারী
                    </h2>
                    <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                      {dashboardData?.totalUsers || 0} জন
                    </p>
                  </div>
                </Link>

                {/* Total Students */}
                <Link to="/dashboard/students">
                  <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-600">
                    <h2 className="text-xs md:text-xl font-semibold text-primary">
                      মোট শিক্ষার্থী
                    </h2>
                    <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                      {dashboardData?.totalStudents || 0} জন
                    </p>
                  </div>
                </Link>

                {/* Total Teachers */}
                <Link to="/dashboard/all-teacher">
                  <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-500">
                    <h2 className="text-xs md:text-xl font-semibold text-primary">
                      শিক্ষক/শিক্ষিকা
                    </h2>
                    <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                      {dashboardData?.allTeachers || 0} জন
                    </p>
                  </div>
                </Link>

                {/* Ongoing Exams */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-400">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    চলমান পরীক্ষা
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.ongoingExams || 0} টি
                  </p>
                </div>
              </>
            )}

            {isAccountant && (
              <>
                {/* Today Cash In */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-700">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    আজকের নগদ প্রাপ্তি
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.todayCashIn} টাকা
                  </p>
                </div>

                {/* Today Cost */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-600">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    আজকের ব্যয়
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.todayCost} টাকা
                  </p>
                </div>

                {/* Total Students Due */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-500">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    শিক্ষার্থীদের বকেয়া
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.totalStudentsDue} টাকা
                  </p>
                </div>

                {/* This Month Cash In */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-400">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    এ মাসের নগদ প্রাপ্তি
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.thisMonthCashIn} টাকা
                  </p>
                </div>
              </>
            )}

            {isTeacher && (
              <>
                {/* Total Students */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-700">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    মোট শিক্ষার্থী
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.totalStudents} জন
                  </p>
                </div>

                {/* Total Classrooms */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-600">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    মোট শ্রেণীকক্ষ
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.totalClassrooms || 12} টি
                  </p>
                </div>

                {/* Ongoing Exams */}
                <div className="bg-card p-2 md:p-6 rounded-xl shadow-md border-l-8 border-green-500">
                  <h2 className="text-xs md:text-xl font-semibold text-primary">
                    চলমান পরীক্ষা
                  </h2>
                  <p className="text-lg md:text-4xl font-bold mt-2 text-green-700">
                    {dashboardData.ongoingExams || 0} টি
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Recent Activities */}
          <div className="bg-card p-2 md:p-6 rounded-xl shadow-md mt-6">
            <h2 className="text-xl font-semibold text-primary">
              সর্বশেষ কার্যক্রম
            </h2>
            <div className="flex items-start gap-3">
              <div>
                <p className="text-gray-800">
                  {dashboardData?.recentActivities?.details}
                </p>
                <p className="text-sm text-gray-500">
                  {dashboardData?.recentActivities &&
                    format(
                      new Date(dashboardData?.recentActivities?.createdAt),
                      "MMMM dd, yyyy"
                    )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
