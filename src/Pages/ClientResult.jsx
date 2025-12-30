import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../components/Shared/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const ClientResult = () => {
  const [examName, setExamName] = useState("1st-Semester");
  const [session, setSession] = useState(new Date().getFullYear().toString());
  const [className, setClassName] = useState("Play");
  const [classRoll, setClassRoll] = useState(0);
  const [serverError, setServerError] = useState("");
  const [enabled, setEnabled] = useState(false);

  const {
    data: resultData = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled,
    queryKey: ["result", session, className, classRoll, examName],
    queryFn: async () => {
      const { data } = await axios(
        `${
          import.meta.env.VITE_SERVER_API
        }/result/${session}/${examName}/${className}/${classRoll}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError(null);
      }
      return data || {};
    },
  });

  const handleDisplayStudentResult = (e) => {
    refetch();
    e.preventDefault();
    const form = e.target;
    const session = form.session.value;
    const examName = form.examName.value;
    const className = form.className.value;
    const classRoll = form.classRoll.value;
    setSession(session);
    setExamName(examName);
    setClassName(className);
    setClassRoll(classRoll);
    setEnabled(true);
  };
  return (
    <>
      <Helmet>
        <title>SN-ফলাফল</title>
      </Helmet>
      <div className="bg-blue-50">
        <div className="card-body max-sm:p-3 lg:w-11/12 md:mx-auto">
          <form
            onSubmit={handleDisplayStudentResult}
            className="flex max-sm:flex-wrap md:justify-center md:items-center max-sm:gap-y-2 max-sm:gap-x-4 md:gap-5"
          >
            {/* select year */}
            <div className="form-control flex-col justify-between md:items-start ">
              <label className="block max-sm:text-sm w-full label font-semibold">
                শিক্ষাবর্ষ :
              </label>
              <select
                name="session"
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select a year
                </option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* exam name */}
            <div className="form-control justify-between md:items-start ">
              <label className="block max-sm:text-sm w-full label font-semibold">
                পরীক্ষার নাম :
              </label>
              <select
                name="examName"
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  নির্বাচন করুন...
                </option>
                <option value="1st-Semester">১ম সেমিস্টার</option>
                <option value="2nd-Semester">২য় সেমিস্টার</option>
                <option value="3rd-Semester">৩য় সেমিস্টার</option>
                <option value="Half-Yearly">অর্ধ-বার্ষিক</option>
                <option value="Annual">বার্ষিক</option>
                <option value="1st-Modeltest">১ম-মডেল টেস্ট</option>
                <option value="2nd-Modeltest">২য়-মডেল টেস্ট</option>
                <option value="Pre-Teুt">প্রি-টেস্ট</option>
                <option value="SSC-Test">এস.এস.সি. টেস্ট</option>
              </select>
            </div>
            {/* class name */}
            <div className="form-control justify-between md:items-start ">
              <label className="block max-sm:text-sm w-full label font-semibold">
                শ্রেণী :
              </label>
              <select
                name="className"
                className="select select-bordered"
                required
              >
                <option value="" disabled>
                  Select a class
                </option>
                {[
                  "Play",
                  "Nursery",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                ].map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            {/* class roll */}
            <div className="form-control justify-between md:items-start ">
              <label className="block max-sm:text-sm  w-full label font-semibold">
                রোল নং :
              </label>
              <input
                type="number"
                name="classRoll"
                min={1}
                max={100}
                placeholder="Student roll"
                className="input input-bordered max-sm:w-32"
                required
              />
            </div>
            <div className="form-control mt-auto">
              <button
                type="submit"
                className="btn-sm max-sm:rounded-md py-1 md:btn max-sm:btn-sm bg-green-700  hover:bg-green-600 text-white"
              >
                সার্চ করুন
              </button>
            </div>
          </form>
        </div>
        <div className="w-[95%] md:w-11/12 mx-auto pb-5">
          <div className={`max-sm:mx-2 md:w-11/12 mx-auto`}>
            {isLoading && <Loading />}
            <AnimatePresence>
              {resultData?.studentName && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: "#bbf7d0" }}
                  className=" px-3 rounded-lg py-5 md:py-8"
                >
                  <div className="flex flex-col justify-center items-center">
                    <h2
                      style={{ color: "#052e16" }}
                      className="text-2xl md:text-4xl font-bold text-center"
                    >
                      শাহ্ নেয়ামত (রহঃ) কেজি এন্ড হাই স্কুল
                    </h2>
                    <h3 className="text-lg md:text-xl text-center font-semibold">
                      {resultData?.examName} Exam: {resultData.session}
                    </h3>
                  </div>
                  <div className="divider my-0"></div>
                  <div className="py-5 grid grid-cols-12 gap-y-2 justify-between p-5">
                    <div className="col-span-12 md:col-span-7 max-sm:space-y-2 ">
                      {/* student name */}
                      <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                        <strong className="col-span-6 md:col-span-3">
                          শিক্ষার্থীর নাম
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-8">
                          {resultData?.studentName}
                        </span>
                      </h3>
                      {/* class name */}
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-3">
                          শ্রেণী
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-8">
                          {resultData?.className}
                        </span>
                      </h3>
                      {/* Roll no */}
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-3">
                          রোল
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-8">
                          {resultData?.classRoll}
                        </span>
                      </h3>
                    </div>
                    <div className=" md:ms-auto col-span-12 md:col-span-5">
                      <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                        <strong className="col-span-6 md:col-span-7">
                          মোট প্রাপ্ত নম্বর
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData?.totalMarks}
                        </span>
                      </h3>
                      <h3 className="text-md md:text-lg grid grid-cols-12  gap-1">
                        <strong className="col-span-6 md:col-span-7">
                          GPA
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData?.totalGPA < 1
                            ? 0
                            : resultData?.totalGPA?.toFixed(2)}
                        </span>
                      </h3>
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-7 ">
                          Letter Grade
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData?.totalLG}
                        </span>
                      </h3>
                      {/* Status */}
                      <h3 className="text-md md:text-lg grid grid-cols-12 gap-1">
                        <strong className="col-span-6 md:col-span-7">
                          Status
                        </strong>{" "}
                        <span className="col-span-1">:</span>{" "}
                        <span className="col-span-5 md:col-span-4">
                          {resultData.status === "Pass"
                            ? "পাস"
                            : resultData.status === "Fail"
                            ? "ফেইল"
                            : "N/A"}
                        </span>
                      </h3>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {serverError ? (
              <p className="text-red-500 max-sm:text-xs text-center">
                {serverError}
              </p>
            ) : !resultData?.studentName && !isLoading ? (
              <p className="max-sm:text-xs text-center">
                দয়া করে শিক্ষাবর্ষ, পরীক্ষা, শ্রেণী ও রোল টাইপ করুন এবং ফলাফল
                দেখতে সার্চ এ ক্লিক করুন...
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default ClientResult;
