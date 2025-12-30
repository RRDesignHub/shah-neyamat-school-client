import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
export const BooksOverview = () => {
  const { data: allSubjects = {}, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-subjects`
      );
      return data || {};
    },
  });
  return (
    <div className="bg-gradient-to-r from-green-50 via-green-200 to-green-100 mb-10">
      <div className="w-11/12 mx-auto py-8 lg:py-16">
        <div className="flex max-sm:flex-col gap-3 items-center justify-between">
          <h2 className="text-xl md:text-4xl font-bold text-green-800 text-center ">
            প্রাথমিক ও মাধ্যমিক স্তরের পাঠ্যপুস্তক
          </h2>
          <Link
            className="px-4 py-2 md:px-6 md:py-4 rounded-md md:rounded-xl max-sm:text-sm bg-green-600 text-green-50  hover:bg-green-800"
            to="/subjects"
          >
            আরও দেখুন
          </Link>
        </div>
        <div className="divider my-2"></div>
        {isLoading ? (
          "লোড করা হচ্ছে..."
        ) : allSubjects?.subjects ? (
          <section>
            <h2 className="text-sm md:text-xl text-gray-950/80 font-semibold mb-6 text-center">
              শ্রেণী: {allSubjects?.className} এর পাঠ্যপুস্তক (
              {allSubjects?.subjects?.length} টি)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
              {allSubjects?.subjects?.slice(0, 6).map((subject, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  href={subject?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-opacity-70 border border-green-300 p-4 rounded-xl shadow-md transition-all duration-300 block cursor-pointer"
                >
                  <div className="text-sm md:text-lg text-green-950 font-medium">
                    {subject?.subjectName}
                  </div>
                  <div className="text-[8px] md:text-sm text-green-800/80 flex justify-between">
                    <span>
                      {subject?.subjectType} | Code: {subject.subjectCode}
                    </span>
                    <span>মোট নম্বর: {subject?.totalMarks}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
        ) : (
          "সার্ভার ডাউন..."
        )}
      </div>
    </div>
  );
};
