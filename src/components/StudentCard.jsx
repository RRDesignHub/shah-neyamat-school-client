import { motion } from "motion/react";
import { FaUserGraduate } from "react-icons/fa6";
export default function StudentCard({ student, index }) {
  const { studentName, image, className, classRoll, bloodGroup, gender } =
    student;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }} 
    className="group relative bg-white border border-green-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex flex-col items-center p-2 md:p-6">
        {/* Profile Image */}
        <div className="avatar mb-2 md:mb-4">
          <div className="w-20 h-24 md:w-40 md:h-48 overflow-hidden border-2 border-green-500/70 drop-shadow-md">
            {image ? (
              <img
                src={image}
                alt={studentName}
                className="w-full h-full object-cover object-top"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/160")
                }
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-green-100">
                <FaUserGraduate className="text-green-600 text-6xl" />
              </div>
            )}
          </div>
        </div>

        {/* Name and Role */}
        <h3 className="text-sm md:text-xl font-bold text-green-800 text-center md:mb-2">
          {studentName || "N/A"}
        </h3>
        <p className="text-xs md:text-sm font-medium text-gray-600 text-center">
          {gender === "Male" ? "ছাত্র" : "ছাত্রী"}
        </p>

        {/* Details Section */}
        <div className="mt-2 md:mt-4 w-full space-y-1 md:space-y-3">
          <p className="text-gray-700 max-sm:text-xs flex md:items-center gap-2">
            <span className="font-semibold max-sm:text-[10px] text-green-600">
              শ্রেণী:
            </span>
            <span>{className || "N/A"}</span>
          </p>
          <p className="text-gray-700 max-sm:text-xs flex md:items-center gap-2">
            <span className="font-semibold max-sm:text-[10px] text-green-600">
              রক্তের গ্রুপ:
            </span>
            <span>{bloodGroup || "N/A"}</span>
          </p>
          <p className="text-gray-700 max-sm:text-xs flex md:items-center gap-2">
            <span className="font-semibold max-sm:text-[10px] text-green-600">
              রোল নং:
            </span>
            <span>{classRoll || "N/A"}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
