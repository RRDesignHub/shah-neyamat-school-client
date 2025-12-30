import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { useAxiosSec } from "../../Hooks/useAxiosSec";
import { useRole } from "../../Hooks/useRole";
import { Loading } from "../../components/Shared/Loading";
import ResultPDF from "../../components/Dashboard/ResultPDF/ResultPDF";
import TabularResultPDF from "../../components/Dashboard/TablularResultPDF/TabularResult";
const Results = () => {
  const axiosSecure = useAxiosSec();
  const [userRole, roleLoading] = useRole();
  const { isTeacher, isAccountant, isAdmin } = userRole;
  const [className, setClassName] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [examName, setExamName] = useState("");
  const [enabled, setUnabled] = useState(false);
  const [error, setError] = useState(
    "শ্রেণী, শিক্ষাবর্ষ ও পরীক্ষা নির্বাচন করুন!"
  );
  const [selectedResult, setSelectedResult] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const {
    data: resultData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["resultData", className, session, examName],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/results?className=${className}&&session=${session}&&examName=${examName}`
      );
      if (data?.message) {
        setError(data.message);
      } else {
        setError(null);
      }
      return data;
    },
    enabled,
  });

  const handleFilter = (e) => {
    e.preventDefault();
    const form = e.target;
    const className = form.className.value;
    const session = form.session.value;
    const examName = form.examName.value;
    if (className === "" && examName === "") {
      setError("শ্রেণী, শিক্ষাবর্ষ ও পরীক্ষা নির্বাচন করুন!");
      return;
    }
    setClassName(className);
    setSession(session);
    setExamName(examName);
    setUnabled(true);
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "আপনি কি নিশ্চিত?",
        text: "পুনরায় তৈরি করতে হবে!",
        icon: "warning",
        color: "#064E3B",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "হ্যাঁ, ডিলিট!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/result/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              title: "ডিলিট হয়েছে!",
              text: "Result has been deleted.",
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

  // single pdf open modal:
  const openPdfModal = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  // whole class pdf open modal:
  const openTablePdfModal = () => {
    setIsTableModalOpen(true);
  };

  // whole class pdf open modal:
  const closeTablePdfModal = () => {
    setIsTableModalOpen(false);
  };

  const closePdfModal = () => {
    setSelectedResult(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-sm:ml-1 max-sm:mt-1 md:w-11/12 mx-auto md:my-10">
        <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
          <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
            শ্রেণী/ বিষয় ভিত্তিক ফলাফল
          </h2>
          <div className="divider my-0"></div>
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
                className="select select-bordered bg-white  text-gray-700"
              >
                <option value="">শ্রেণী নির্বাচন করুন...</option>
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
                    Class {className}
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
                <option value="" disabled>
                  শিক্ষাবর্ষ নির্বাচন করুন
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

            {/* choose exam */}
            <div className="form-control col-span-12 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-lg">পরীক্ষার নাম:</span>
              </label>
              <select
                name="examName"
                defaultValue={""}
                className={`select select-bordered`}
                required
              >
                <option value={""} disabled>
                  পরীক্ষা নির্বাচন করুন
                </option>
                <option value="1st-Semester">১ম সেমিস্টার</option>
                <option value="2nd-Semester">২য় সেমিস্টার</option>
                <option value="3rd-Semester">৩য় সেমিস্টার</option>
                <option value="Half-Yearly">অর্ধ-বার্ষিক</option>
                <option value="Annual">বার্ষিক</option>
                <option value="1st-Modeltest">১ম-মডেল টেস্ট</option>
                <option value="2nd-Modeltest">২য়-মডেল টেস্ট</option>
                <option value="Pre-Teুt">প্রি-টেস্ট</option>
              </select>
            </div>

            <div className="col-span-6 md:col-span-2 flex items-end">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                সার্চ করুন
              </button>
            </div>
          </form>
          <div className="divider my-0"></div>
          {resultData.length > 0 && (
            <div className="pb-2 flex justify-between items-center text-sm md:text-lg text-green-950 font-semibold">
              <h2>শ্রেণী : {resultData[0]?.className}</h2>
              <button
                onClick={openTablePdfModal}
                className="btn btn-md bg-green-600 text-green-50 hover:bg-green-500"
              >
                সম্পূর্ণ শ্রেণীর নম্বরফর্দ <FaFilePdf />
              </button>
              <h2>মোট ফলাফল : {resultData.length} টি</h2>
            </div>
          )}
          {/* Display Results */}
          {isLoading || roleLoading ? (
            <Loading />
          ) : resultData.length > 0 ? (
            <table className="w-full table">
              <thead>
                <tr className="bg-green-600 text-green-50 ">
                  <th>রোল</th>
                  <th>শিক্ষার্থীর নাম</th>
                  <th>মোট নম্বর</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!error &&
                  resultData.length > 0 &&
                  resultData
                    ?.sort((a, b) => a.classRoll - b.classRoll)
                    ?.map((result) => (
                      <tr key={result._id} className="">
                        <td>{result.classRoll}</td>
                        <td>{result.studentName}</td>
                        <td>{result.totalMarks}</td>
                        <td>{result.totalLG}</td>
                        <td>{result.status}</td>
                        <td className="flex justify-center gap-1 items-center">
                          <button
                            onClick={() => openPdfModal(result)}
                            className="btn btn-sm bg-green-50 text-primary"
                          >
                            Print <FaFilePdf />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(result._id)}
                              className="btn btn-sm text-lg bg-red-500 hover:bg-red-600 text-white"
                            >
                              <MdDelete />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          ) : error ? (
            <p className="py-2 text-center text-red-500">{error}</p>
          ) : (
            <p className="text-center text-gray-500">{error}</p>
          )}
        </div>
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
            <TabularResultPDF resultData={resultData} />
          </div>
        </div>
      )}

      {/* pdf popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative">
            <button
              onClick={closePdfModal}
              className="absolute bottom-2 right-8 text-lg bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <ResultPDF result={selectedResult} />
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
