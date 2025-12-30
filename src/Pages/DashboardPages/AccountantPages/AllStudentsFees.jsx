import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Shared/Loading";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
const AllStudentsFees = () => {
  const axiosSecure = useAxiosSec();
  const [filterStudentsID, setFilterStudentsID] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [serverError, setServerError] = useState("");
  const [enabled, setUnabled] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [toMonth, setToMonth] = useState("");
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [dueExamFees, setDueExamFees] = useState(0);
  const [monthsToPay, setMonthsToPay] = useState([]);

  // all students data for accountant from studentsFeesCollection
  const {
    data: studentsFees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["studentsFees", filterByClass, session],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students-fees?session=${session}&&className=${filterByClass}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError("");
      }
      return data || [];
    },
    enabled,
  });

  // filter all students from db
  const handleFilter = (e) => {
    e.preventDefault();
    const form = e.target;
    const className = form.className.value;
    const session = form.session.value;
    setFilterByClass(className);
    setSession(session);
    setUnabled(true);
    refetch();
  };

  useEffect(() => {
    setDueExamFees(0);
    const dueExam =
      selectedStudent?.examFees?.filter((fee) => fee.status === "Due") || [];
    const totalExamFeesAmount = dueExam.reduce((sum, fee) => {
      return sum + (fee.amount || 0);
    }, 0);
    if (totalExamFeesAmount) {
      setDueExamFees(totalExamFeesAmount);
    }
    if (toMonth) {
      const endIndex = selectedStudent?.dueMonths?.indexOf(toMonth);
      const selected = selectedStudent?.dueMonths?.slice(0, endIndex + 1);
      setMonthsToPay(selected);
      setTotalPaidAmount(selected?.length * selectedStudent?.monthlyFee);
    }
  }, [selectedStudent, toMonth]);

  // adjust fees and add due amount for specipic student
  const handleUpdateFees = async (e) => {
    e.preventDefault();
    const newFee = parseInt(e.target.newFee.value);
    const previousDues = parseInt(e.target.previousDues.value);
    const previousDuesDescription = parseInt(e.target.previousDuesDescription.value);
    try {
      const { data } = await axiosSecure.patch("/update-fee", {
        studentID: selectedStudent.studentID,
        newFee,
        previousDues,
        previousDuesDescription
      });

      if (data.modifiedCount) {
        setIsAdjustModalOpen(false);
        Swal.fire({
          title: "পরিবর্তিত!",
          text: `${selectedStudent.studentName}-এর বেতন পরিবর্তন হয়েছে!!!`,
          icon: "success",
        });
        setSelectedStudent({});
      }
    } catch (err) {
      console.log("Adjust fees Error--->", err);
    }
  };

  // paymnt func
  const handlePayment = async (e) => {
    e.preventDefault();
    const paymentData = {
      studentID: selectedStudent.studentID,
      session: selectedStudent.session,
      className: selectedStudent.className,
      classRoll: selectedStudent.classRoll,
      totalPaidMonths: monthsToPay,
      paidMonthlyFees: totalPaidAmount,
      paidExamFee: dueExamFees,
    };
    try {
      const { data } = await axiosSecure.patch("/fee-payment", paymentData);
      if (data?.message) {
        Swal.fire({
          title: "!!!!",
          text: `${data?.message}`,
          icon: "success",
        });
      }
      if (data.modifiedCount) {
        setIsPaymentModalOpen(false);
        Swal.fire({
          title: "পরিশোধিত!",
          text: `${selectedStudent.studentName}-এর বেতন পরিশোধ হয়েছে!!!`,
          icon: "success",
        });
        refetch();
        setSelectedStudent({});
        setTotalPaidAmount(0);
        setMonthsToPay([]);
        setToMonth("");
      }
    } catch (err) {
      console.log("Pay fees Error--->", err);
    }
  };

  // open payment popup
  const openPaymentModal = (student) => {
    setIsPaymentModalOpen(true);
    setSelectedStudent(student);
  };

  // whole class pdf open modal:
  const openAdjustModal = (student) => {
    setIsAdjustModalOpen(true);
    setSelectedStudent(student);
  };

  // close all modal:
  const closeAdjustModal = () => {
    setIsAdjustModalOpen(false);
    setIsPaymentModalOpen(false);
    setSelectedStudent({});
    setTotalPaidAmount(0);
    setMonthsToPay([]);
    setToMonth("");
  };

  // temporary button for delete all data from studentsFeesColl
  const deleteAllData = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#16A34A",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(
            `/delete-fees-data/${filterByClass}/${session}`
          );
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "All data has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting subject:", error);
        }
      }
    });
  };

  return (
    <>
      <div className="p-6 min-h-screen">
        <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          মাসিক বেতন ও পরীক্ষার ফি গ্রহণ
        </h2>
        <div className="divider"></div>

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

          {/* choose exam */}
          <div className="form-control col-span-12 md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-lg">
                শিক্ষার্থী আইডি:
              </span>
            </label>
            <input
              type="text"
              placeholder="যেমন: 'SN-20251234'"
              name="classRoll"
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

        {studentsFees.length > 0 && (
          <div className="pb-2 flex justify-evenly items-center text-sm md:text-lg text-green-950 font-semibold">
            <h2>শ্রেণী : {filterByClass}</h2>
            <button
              onClick={deleteAllData}
              className="btn btn-md bg-green-600 text-green-50 hover:bg-green-500"
            >
              Delete All Data
            </button>
            <h2>মোট শিক্ষার্থী: {studentsFees.length} জন</h2>
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : studentsFees.length > 0 ? (
          <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
            <table className="table w-full bg-white rounded shadow">
              <thead className="bg-gradient-to-r from-green-100 to-green-300 text-green-950">
                <tr>
                  <th className="py-2 px-4 text-center">রোল</th>
                  <th className="py-2 px-4 text-left">নাম</th>
                  <th className="py-2 px-4 text-center">মাসিক বেতন(৳)</th>
                  <th className="py-2 px-4 text-center">বকেয়া(৳)</th>
                  <th className="py-2 px-4 text-center">সর্বশেষ পরিশোধ</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsFees
                  .sort((a, b) => a.classRoll - b.classRoll)
                  .map((stu, index) => (
                    <tr key={stu._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 text-center">{stu.classRoll}</td>
                      <td className="py-2 px-4">{stu.studentName}</td>
                      <td className="py-2 px-4 text-center">
                        {stu.monthlyFee ? `${stu?.monthlyFee}৳` : `300৳`}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {stu.dueAmount}৳
                      </td>
                      <td>
                        {stu?.paidAt &&
                          format(new Date(stu?.paidAt), "MMMM dd, yyyy")}
                      </td>
                      <td className="py-2 px-4 mx-auto flex justify-center items-center gap-2 *:rounded-md">
                        <button
                          onClick={() => openPaymentModal(stu)}
                          className="btn-sm bg-green-500 hover:bg-green-700 text-white"
                        >
                          পরিশোধ
                        </button>
                        <Link
                          to={`/dashboard/student-payment-history/${stu?.studentID}`}
                        >
                          <button className="btn-sm rounded-md bg-gray-600 text-green-50 hover:bg-gray-700">
                            বিবরণী
                          </button>
                        </Link>
                        <button
                          onClick={() => openAdjustModal(stu)}
                          className="btn-sm bg-transparent border border-green-500 hover:bg-green-500 text-green-600 hover:text-white"
                        >
                          বেতন পরিবর্তন
                        </button>
                      </td>
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

      {/* payment modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-[70%] h-fit md:h-[90%] rounded shadow-lg relative p-10">
            <form onSubmit={handlePayment} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                বেতন পরিশোধ
              </h2>

              {/* Student Details (Read-only) */}
              <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
                <div className="col-span-2 md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষার্থীর নাম
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.studentName || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষার্থীর ID
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.studentID || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    শ্রেণী
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.className || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    রোল
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.classRoll || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    মাসিক বেতন
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.monthlyFee || 0} ৳
                  </p>
                </div>
                <div className="md:col-span-8">
                  <label className="block text-sm font-medium text-gray-700">
                    বকেয়া মাস
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {(selectedStudent?.dueMonths &&
                      selectedStudent?.dueMonths.length) ||
                      "0"} ৳
                    মাস
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    পরীক্ষার ফি:
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {dueExamFees} ৳
                  </p>
                </div>
              </div>

              {/* Editable Fee Field */}
              <div className="grid grid-cols-2 md:grid-cols-12 gap-3">
                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    মাসিক বেতন বকেয়া
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedStudent?.dueAmount}
                    name="dueAmount"
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="পূর্বের বকেয়া..."
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    পরিশোধ মাস (পর্যন্ত)
                  </label>
                  <select
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={(e) => setToMonth(e.target.value)}
                    defaultValue={""}
                  >
                    <option value="">মাস নির্বাচন করুন</option>
                    {selectedStudent?.dueMonths?.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    পরিশোধের পরিমাণ
                  </label>
                    <input
                      type="number"
                      value={monthsToPay?.length > 0 && totalPaidAmount > 0 ? (dueExamFees + totalPaidAmount) : dueExamFees ? dueExamFees : 0}
                      name="newFee"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter new fee amount"
                      readOnly
                    />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAdjustModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  পরিশোধ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* adjust fees and due amount modal popup */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-[70%]  h-fit rounded shadow-lg relative p-10">
            <form onSubmit={handleUpdateFees} className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                বেতন পরিবর্তন
              </h2>

              {/* Student Details (Read-only) */}
              <div className="grid grid-cols-3 md:grid-cols-12 gap-2">
                <div className="col-span-3 md:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষার্থীর নাম
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.studentName || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    শিক্ষার্থীর ID
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.studentID || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    শ্রেণী
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.className || "N/A"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    রোল
                  </label>
                  <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                    {selectedStudent?.classRoll || "N/A"}
                  </p>
                </div>
              </div>

              {/* Editable Fee Field */}
              <div className="grid grid-cols-4 md:grid-cols-12 gap-3">
                <div className="col-span-2 md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">পূর্বের বকেয়া</label>
                  <input
                    type="number"
                    name="previousDues"
                    value={selectedStudent?.previousDues}
                    min="0"
                    step="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="পূর্বের বকেয়া লিখুন"
                  />
                </div>
                <div className="col-span-4 md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">বকেয়ার বিবরণ</label>
                  <input
                    type="text"
                    name="previousDuesDescription"
                    value={selectedStudent?.previousDuesDescription}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="যেমন: ২০২৪ সালের বকেয়া"
                    required={selectedStudent?.previousDues > 0}
                  />
                </div>
                <div className="col-span-2 md:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    মাসিক বেতন পরিবর্তন
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedStudent?.monthlyFee}
                    name="newFee"
                    min="0"
                    step="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter new fee amount"
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAdjustModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  পরিবর্তন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AllStudentsFees;
