import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaFilePdf, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { useRole } from "../../Hooks/useRole";
import { Loading } from "../../components/Shared/Loading";
import TabularStudentInfoPDF from "../../components/Dashboard/TabularStudentsPDF/TabularStudentsPDF";
export default function AllStudents() {
  const axiosSecure = useAxiosSec();
  const [userRole] = useRole();
  const [serverError, setServerError] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [filterStudentsID, setFilterStudentsID] = useState("");
  const [filterBySection, setFilterBySection] = useState("");
  const [enabled, setUnabled] = useState(false);
  const { isTeacher, isAccountant, isAdmin } = userRole;
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  // all students data fro admin and teachers dashboard
  const {
    data: students = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "students",
      filterByClass,
      session,
      filterBySection,
      filterStudentsID,
    ],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students?session=${session}&className=${filterByClass}&sectionName=${filterBySection}&studentID=${filterStudentsID}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError("");
      }
      return data || [];
    },
  });

  // filter all students from db
  const handleFilter = (e) => {
    e.preventDefault();
    const form = e.target;
    const className = form.className.value;
    const session = form.session.value;
    const sectionName = form.sectionName.value;
    const studentID = form.studentID.value;
    setFilterByClass(className);
    setSession(session);
    setFilterBySection(sectionName);
    setFilterStudentsID(studentID);
    refetch();
  };

  // Delete Student Function
  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "আপনি কি নিশ্চিত?",
        text: "পুনরায় তার তথ্য যোগ করতে হবে!",
        icon: "warning",
        color: "#064E3B",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "হ্যা, ডিলিট করুন!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/delete-student/${id}`);
          if (data?.deletedCount) {
            Swal.fire({
              title: "ডিলিট হয়েছে!",
              text: "শিক্ষার্থীর তথ্য ডিলিট করা হয়েছে।",
              icon: "success",
            });
            refetch();
          }
        }
      });
    } catch (err) {
      console.log("Delete student Error--->", err);
    }
  };

  // whole class pdf open modal:
  const openTablePdfModal = () => {
    setIsTableModalOpen(true);
  };

  // whole class pdf open modal:
  const closeTablePdfModal = () => {
    setIsTableModalOpen(false);
  };

  return (
    <>
      <div className="p-6 min-h-screen">
        <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          সকল শিক্ষার্থী
        </h2>
        <div className="divider"></div>

        {/* Filter Inputs */}
        <form
          className="grid grid-cols-12 md:grid-cols-10 gap-4 mb-5"
          onSubmit={handleFilter}
        >
          {/* choose class */}
          <div className="form-control col-span-12 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-lg">শ্রেণী:</span>
            </label>
            <select
              defaultValue={""}
              name="className"
              className="select select-bordered w-full"
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
                  Class-{className}
                </option>
              ))}
            </select>
          </div>
          {/* select year */}
          <div className="form-control col-span-12 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-lg">শিক্ষাবর্ষ:</span>
            </label>
            <select
              name="session"
              defaultValue={""}
              className="select select-bordered"
              required
            >
              <option value="">শিক্ষাবর্ষ নির্বাচন করুন</option>
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

          {/* section name */}

          <div className="form-control col-span-12 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-lg">শাখা:</span>
            </label>
            <select
              defaultValue={""}
              name="sectionName"
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                শাখা নির্বাচন করুন...
              </option>
              {["A", "B", "C", "D", "E"].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* students ID */}
          <div className="form-control col-span-12 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-lg">
                শিক্ষার্থী আইডি:
              </span>
            </label>
            <input
              type="text"
              placeholder="যেমন: 'SN-20251234'"
              name="studentID"
              value={filterStudentsID}
              onChange={(e) => setFilterStudentsID(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="col-span-6 md:col-span-2 flex items-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              সার্চ করুন
            </button>
          </div>
        </form>
        <div className="divider my-0"></div>
        {students.length > 0 && (
          <div className="pb-2 flex justify-evenly items-center text-sm md:text-lg text-green-950 font-semibold">
            <h2>শ্রেণী : {filterByClass}</h2>
            <button
              onClick={openTablePdfModal}
              className="btn btn-md bg-green-600 text-green-50 hover:bg-green-500"
            >
              সকল শিক্ষার্থী <FaFilePdf />
            </button>
            <h2>মোট শিক্ষার্থী: {students.length} জন</h2>
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : students.length > 0 ? (
          <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
            <table className="table w-full">
              {/* Table Header */}
              <thead className="bg-green-600 text-white">
                <tr>
                  <th>Student ID</th>
                  <th>শিক্ষার্থীর ছবি</th>
                  <th>নাম</th>
                  <th>রোল</th>
                  <th>জন্ম তারিখ</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {students.length > 0 &&
                  students
                    .sort((a, b) => a.classRoll - b.classRoll)
                    .map((student) => (
                      <tr key={student._id}>
                        <td>{student.studentID}</td>
                        <td className="text-center">
                          <img
                            src={student?.image}
                            className="w-10 h-10 border border-green-600 rounded-full"
                            alt=""
                          />
                        </td>
                        <td>{student.studentName}</td>
                        <td>{student.classRoll}</td>
                        <td>
                          {student?.dateOfBirth &&
                            format(
                              new Date(student?.dateOfBirth),
                              "MMMM dd, yyyy"
                            )}
                        </td>

                        {isAdmin || isTeacher ? (
                          <td className="flex flex-row items-center gap-2 md:gap-4">
                            <Link
                              to={`/dashboard/update-student/${student?._id}`}
                              className="btn btn-sm text-xs md:text-lg bg-secondary text-white hover:bg-primary mr-2"
                            >
                              <FaUserEdit />
                            </Link>
                            <Link
                              to={`/dashboard/student-details/${student._id}`}
                              className="btn btn-sm text-xs md:text-lg bg-secondary text-white hover:bg-primary mr-2 "
                            >
                              Details
                            </Link>
                            <button
                              className="btn btn-sm text-xs md:text-lg btn-error text-white"
                              onClick={() => handleDelete(student._id)}
                            >
                              <MdDelete />
                            </button>
                          </td>
                        ) : (
                          <td>
                            <Link
                              to={`/dashboard/student-details/${student._id}`}
                              className="btn btn-sm bg-secondary text-white hover:bg-primary mr-2"
                            >
                              Details
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        ) : serverError ? (
          <p className="text-center py-4 text-red-400">{serverError}</p>
        ) : (
          <p className="text-center py-4">শ্রেণী ও শিক্ষাবর্ষ নির্বাচন করুন.</p>
        )}
      </div>

      {/* table modal for all students result marksheet pdf */}
      {/* pdf popup */}
      {isTableModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative">
            <button
              onClick={closeTablePdfModal}
              className="absolute bottom-2 right-8 text-lg bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <TabularStudentInfoPDF students={students} />
          </div>
        </div>
      )}
    </>
  );
}
