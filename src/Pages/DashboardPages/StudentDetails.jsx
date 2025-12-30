import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { Loading } from "../../components/Shared/Loading";
import { format } from "date-fns";
const StudentDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSec();
  const { data: studentDetails = {}, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/student/${id}`);
      return data;
    },
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-1 p-4 max-sm:p-2 overflow-auto">
          <div className="bg-green-800 w-full max-sm:px-2 md:w-11/12 mx-auto my-5 rounded-lg shadow-lg p-6 max-sm:p-4 text-white">
            <h1 className="text-lg md:text-2xl font-bold text-green-100 mb-6 text-center">
              শিক্ষার্থীর বিবরণী
            </h1>
            <div className="flex flex-col md:flex-row gap-6 max-sm:gap-4">
              {/* <!-- Student Image --> */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  id="studentImage"
                  src={studentDetails?.image}
                  alt={studentDetails?.studentName}
                  className="w-32 h-32 max-sm:w-24 max-sm:h-24 rounded-full object-cover border-4 border-green-300"
                />
              </div>
              {/* <!-- Student Details --> */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-sm:gap-2 max-sm:text-sm">
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">
                      শিক্ষার্থীর আইডি :
                    </p>
                    <p id="studentID" className="text-green-100">
                      {studentDetails?.studentID}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">নাম :</p>
                    <p id="studentName" className="text-green-100">
                      {studentDetails?.studentName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">শ্রেণী :</p>
                    <p id="className" className="text-green-100">
                      {studentDetails?.className}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">শাখা :</p>
                    <p id="sectionName" className="text-green-100">
                      {studentDetails?.sectionName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">শ্রেণী রোল :</p>
                    <p id="classRoll" className="text-green-100">
                      {studentDetails?.classRoll}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">বিভাগ :</p>
                    <p id="groupName" className="text-green-100">
                      {studentDetails?.groupName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">
                      জন্ম নিবন্ধন নম্বর :
                    </p>
                    <p id="birthRegNo" className="text-green-100">
                      {studentDetails?.birthRegNo}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">জন্ম তারিখ :</p>
                    <p id="dateOfBirth" className="text-green-100">
                       {studentDetails?.birthRegNo &&
                        format(new Date(studentDetails?.dateOfBirth), "dd/MM/yyyy, EEEE")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">শিক্ষাবর্ষ :</p>
                    <p id="session" className="text-green-100">
                      {studentDetails?.session}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">রক্তের গ্রুপ :</p>
                    <p id="bloodGroup" className="text-green-100">
                      {studentDetails?.bloodGroup}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">লিঙ্গ :</p>
                    <p id="gender" className="text-green-100">
                      {studentDetails?.gender}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">ধর্ম :</p>
                    <p id="religion" className="text-green-100">
                      {studentDetails?.religion}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">পিতার নাম :</p>
                    <p id="fatherName" className="text-green-100">
                      {studentDetails?.fatherName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">মাতার নাম :</p>
                    <p id="motherName" className="text-green-100">
                      {studentDetails?.motherName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-green-200 font-semibold">মোবাইল নং :</p>
                    <p id="motherName" className="text-green-100">
                      +880{studentDetails?.mobileNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Back Button --> */}
            <div className="mt-6 text-center">
              <Link
                to="/dashboard/students"
                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                আগের পেইজে ফিরে যান
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default StudentDetails;
