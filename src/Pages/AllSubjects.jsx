import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Loading } from "../components/Shared/Loading";
import { useState } from "react";
import { motion } from "motion/react";
const ClientAllSubjects = () => {
  const [className, setClassName] = useState("Play");
  const [serverError, setServerError] = useState("");
  const [enabled, setEnabled] = useState(false);
  const {
    data: allSubjects = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled,
    queryKey: ["subjects", className],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_SERVER_API}/all-subjects/${className}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError(null);
      }
      return data || {};
    },
  });

  const handleAllSubjects = (e) => {
    e.preventDefault();
    const className = e.target.className.value;
    setClassName(className);
    setEnabled(true);
    refetch();
  };
  return (
    <>
      <Helmet>
        <title>SN-পাঠ্যপুস্তক</title>
      </Helmet>
      <div className="w-11/12 mx-auto py-5 md:py-10">
        <div className="flex max-sm:flex-col justify-between items-center gap-3">
          <form
            onSubmit={handleAllSubjects}
            className="flex justify-center items-center gap-4"
          >
            {/* class name */}
            <div className="form-control flex-row  items-center gap-3">
              <label className="block max-sm:text-sm label font-semibold">
                শ্রেণী :
              </label>
              <select
                defaultValue={""}
                name="className"
                className="select select-bordered max-sm:p-1"
                required
              >
                <option value="">শ্রেণী নির্বাচন করুন</option>
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
            <div className="form-control">
              <button
                type="submit"
                className="btn-sm max-sm:rounded-md py-1 md:btn max-sm:btn-sm bg-green-700  hover:bg-green-600 text-white"
              >
                সার্চ করুন
              </button>
            </div>
          </form>
          {allSubjects?.className && (
            <h2 className="text-sm md:text-2xl font-semibold text-center">
              শ্রেণী: {allSubjects?.className} এর পাঠ্যপুস্তক (
              {allSubjects?.subjects?.length} টি)
            </h2>
          )}
        </div>
        <div className="divider my-2"></div>
        {isLoading ? (
          <Loading />
        ) : allSubjects?.className ? (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
              {allSubjects?.subjects?.map((subject, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  href={subject?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-100 hover:bg-opacity-70 border border-green-200 p-4 rounded-xl shadow-md transition-all duration-300 block cursor-pointer"
                >
                  <div className="text-lg font-medium">
                    {subject?.subjectName}
                  </div>
                  <div className="text-sm text-green-800/80 flex justify-between">
                    <span>
                      {subject?.subjectType} | Code: {subject.subjectCode}
                    </span>
                    <span>মোট নম্বর: {subject?.totalMarks}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
        ) : serverError ? (
          <h2 className="text-red-400 text-center py-4">{serverError}</h2>
        ) : (
          "দয়া করে শ্রেণী নির্বাচন করুন..."
        )}
      </div>
    </>
  );
};
export default ClientAllSubjects;
