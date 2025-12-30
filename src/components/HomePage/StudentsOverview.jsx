import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa6";
import { Link } from "react-router-dom";
import StudentCard from "../StudentCard";
export default function StudentsOverview() {
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["stedents"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/random-students`
      );
      return data || [];
    },
  });
  return (
    <section className="bg-green-100">
      <div className="w-11/12 mx-auto py-8 lg:py-16">
        <div className="flex max-sm:flex-col gap-3 items-center justify-between">
          <h2 className="text-xl md:text-4xl font-bold text-green-700 text-center ">
            আমাদের শিক্ষার্থীরা
          </h2>
          <Link
            className="px-4 py-2 md:px-6 md:py-4 rounded-md md:rounded-xl max-sm:text-sm bg-green-600 text-green-50  hover:bg-green-800"
            to="/students"
          >
            আরও দেখুন
          </Link>
        </div>
        <div className="divider my-2"></div>

        {isLoading ? "লোড করা হচ্ছে..." : 
        students?.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
          {students.map((student, index) => (
            <StudentCard key={student._id} student={student} index={index} />
          ))}
        </div> : "সার্ভার ডাউন..."}
        
      </div>
    </section>
  );
}
{/* <div
              key={student._id}
              className="bg-white border-2 border-green-300 shadow-lg rounded-lg p-2 md:px-4 md:py-2 md:pb-5 flex flex-col items-center"
            >
              <div className="text-green-700 w-fit md:w-[200px] h-[180px] md:h-[265px] flex items-center justify-center">
                {
                  student?.image ? <img src={student?.image} className="w-full object-cover object-top md:mt-2"
                  alt={student.studentName} /> : 
                  <FaUserGraduate className="text-green-400 text-[100px] md:text-[180px]" />
                }
              </div>
              <h3 className="text-lg text-green-950 text-center max-sm:text-xs max-sm:mt-1 font-semibold">{student.studentName}</h3>
              <p className="text-green-800/90 max-sm:text-xs ">শ্রেণী : {student.className}</p>
              <p className="text-green-800/90 max-sm:text-xs ">রোল : {student.classRoll}</p>
              <p className="text-green-800/80 max-sm:text-xs ">রক্তের গ্রুপ: {student?.bloodGroup}</p>
            </div> */}