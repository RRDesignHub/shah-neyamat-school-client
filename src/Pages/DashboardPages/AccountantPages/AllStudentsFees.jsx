import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Shared/Loading";
import { Link } from "react-router-dom";
import { FaSearch, FaMoneyBillWave, FaFilePdf } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import FeeUpdateModal from "../../../components/Dashboard/PopUps/FeeUpdateModal";
const AllStudentsFees = () => {
  const axiosSec = useAxiosSec();

  const [classFilter, setClassFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [studentID, setStudentID] = useState("");

  // states for update fee or add previous due popups
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const {
    data: dues = [],
    isLoading,
    refetch,
  } = useQuery({
    enabled: Boolean(classFilter || sessionFilter || studentID),
    queryKey: ["student-monthly-dues", classFilter, sessionFilter, studentID],

    queryFn: async () => {
      const res = await axiosSec.get("/fees/due-summary", {
        params: {
          className: classFilter,
          session: sessionFilter,
          studentID: studentID,
        },
      });
      return res.data;
    },
  });

  // fetching the overall due data from db func
  const handleFilter = async (e) => {
    e.preventDefault(); // Prevents page reload

    const form = e.target;
    const selectedClass = form.className.value;
    const selectedSession = form.session.value;
    const studentID = form.studentID.value;

    // Update your states (assuming you have these useState hooks defined)
    // This will trigger the useQuery because they are in the queryKey
    setClassFilter(selectedClass);
    setSessionFilter(selectedSession);
    setStudentID(studentID);
  };

  // update fee and add previous dues func
  const handleFeeEdit = (student) => {
    setSelectedStudent(student);
    setIsFeeModalOpen(true);
  };
  return (
    <>
      <div className="p-4">
        {/* Page Title */}
        <h2 className="text-xl font-semibold mb-4">মাসিক বেতন গ্রহণ</h2>

        {/* Filter Inputs */}
        <form
          className="grid grid-cols-12 md:grid-cols-10 gap-4 mb-5"
          onSubmit={handleFilter}
        >
          {/* choose class */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">শ্রেণী:</span>
            </label>
            <select
              defaultValue={""}
              name="className"
              className="select select-bordered w-full"
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

          {/* select year */}
          <div className="form-control col-span-12 md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-lg">শিক্ষাবর্ষ:</span>
            </label>
            <select
              name="session"
              defaultValue={""}
              className="select select-bordered"
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

          {/* student ID */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">
                শিক্ষার্থী আইডি:
              </span>
            </label>
            <input
              type="text"
              placeholder="যেমন: 'SN-20251234'"
              name="studentID"
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

        {/* Table */}
        <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
          {isLoading ? (
            <Loading />
          ) : dues.length > 0 ? (
            <table className="table w-full bg-white rounded shadow">
              <thead className="bg-gradient-to-r from-green-100 to-green-300 text-green-950">
                <tr>
                  <th className="py-2 px-4 text-center">রোল</th>
                  <th className="py-2 px-4 text-left">নাম</th>
                  <th className="py-2 px-4 text-center">মাসিক বেতন</th>
                  <th className="py-2 px-4 text-center">বকেয়া মাস</th>
                  <th className="py-2 px-4 text-center">মোট বকেয়া(৳)</th>
                  <th className="py-2 px-4 text-center">সর্বশেষ পরিশোধ</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dues &&
                  dues.length > 0 &&
                  dues
                    .sort(
                      (a, b) => parseInt(a.classRoll) - parseInt(b.classRoll)
                    )
                    .map((stu) => (
                      <tr
                        key={stu.studentID}
                        className="border-b hover:bg-gray-50"
                      >
                        {/* Roll */}
                        <td className="py-2 px-4 text-center font-semibold">
                          {stu.classRoll}
                        </td>

                        {/* Name & ID */}
                        <td className="py-2 px-4">
                          <div className="font-bold">{stu.name}</div>
                          <div className="text-xs text-gray-500">
                            {stu.studentID}
                          </div>
                        </td>

                        {/* monthly fees */}
                        <td className="py-2 px-4 text-center">
                          <span className="badge badge-ghost font-mono">
                            {stu?.monthlyFee}৳
                          </span>
                        </td>

                        {/* Due Months Count */}
                        <td className="py-2 px-4 text-center">
                          <span className="badge badge-ghost font-mono">
                            {stu.dueMonths.length} মাস
                          </span>
                        </td>

                        {/* Total Due Amount */}
                        <td className="py-2 px-4 text-center text-red-600 font-bold">
                          {stu.totalDue}৳
                        </td>

                        {/* Session */}
                        <td className="py-2 px-4 text-center">
                          {stu?.lastPaidAt ? (
                            <span className="text-gray-400 text-xs">
                              {stu?.lastPaidAt}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">
                              কোন রেকর্ড নেই
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-2 px-4 flex justify-center items-center gap-2">
                          <button
                            onClick={() => openPaymentModal(stu)}
                            className="btn btn-xs bg-green-500 hover:bg-green-700 text-white border-none"
                          >
                            পরিশোধ
                          </button>

                          <Link
                            to={`/dashboard/student-payment-history/${stu._id}`}
                          >
                            <button className="btn btn-xs bg-gray-600 text-white hover:bg-gray-700 border-none">
                              বিবরণী
                            </button>
                          </Link>

                          <button
                            onClick={() => handleFeeEdit(stu)}
                            className="btn btn-xs btn-outline btn-success text-[10px]"
                          >
                            বেতন পরিবর্তন
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-700 py-3">
              শ্রেণী, রোল অথবা studentID দিয়ে সার্চ করুন
            </p>
          )}
        </div>
      </div>

      <FeeUpdateModal
        isOpen={isFeeModalOpen}
        onClose={() => setIsFeeModalOpen(false)}
        student={selectedStudent}
        refetch={refetch}
      />
    </>
  );
};
export default AllStudentsFees;
