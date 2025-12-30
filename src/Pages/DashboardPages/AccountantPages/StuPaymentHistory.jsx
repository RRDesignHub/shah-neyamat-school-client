import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { format } from "date-fns";
import { useState } from "react";

const StuPaymentHistory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSec();
  const [serverError, setServerError] = useState("");

  // all students data for accountant from studentsFeesCollection
  const {
    data: paymentHistory = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment-history", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/students-payment-history/${id}`);
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError("");
      }
      return data || {};
    },
  });
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          পেমেন্ট বিবরণী
        </h1>

        {/* Student Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Student Name
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.studentName || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Student ID
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.studentID || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Class
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.className || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Roll
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.classRoll || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Due Amount
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.dueAmount || 0}tk
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Paid Amount
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.paidAmount || 0}tk
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Paid Date
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.paidAt && format(new Date(paymentHistory?.paidAt), "MMMM dd, yyyy")}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Monthly Fee
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.amount || 0}tk
              </p>
            </div>
          </div>
          
        </div>

        {/* Payment History */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Payment History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Due Months
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.dueMonths?.length > 0
                  ? paymentHistory.dueMonths.join(", ")
                  : "None"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Paid Months
              </label>
              <p className="mt-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                {paymentHistory?.paidMonths?.length > 0
                  ? paymentHistory.paidMonths.join(", ")
                  : "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StuPaymentHistory;
