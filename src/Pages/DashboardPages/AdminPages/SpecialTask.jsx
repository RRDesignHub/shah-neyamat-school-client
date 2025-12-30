import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useState } from "react";
import { Loading } from "../../../components/Shared/Loading";
import SeatCardPDF from "../../../components/Dashboard/ExamSeatCardPDF/SeatCardPDF";
import { FaFilePdf } from "react-icons/fa";
import ExamAttendancePDF from "../../../components/Dashboard/ExamAttendanceSheetPDF/ExamAttandenceSheetPDF";
import SmallAdmitCardsPDF from "../../../components/Dashboard/SmallAdmitCardsPDF/SmallAdmitCardsPDF";

const SpecialTask = () => {
  const axiosSecure = useAxiosSec();
  // Form filters
  const [examName, setExamName] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());

  // General states
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Task state (instead of multiple booleans)
  const [seatCards, setSeatCards] = useState(false); // "seatCard" | "examSheet" | "admitCard"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmitCardOpen, setIsAdmitCardOpen] = useState(false);
  const [sheetEnabled, setSheetUnabled] = useState(false);
  const [taskResult, setTaskResult] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students", filterByClass, session, examName],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students?session=${session}&&className=${filterByClass}`
      );
      if (data?.message) setServerError(data.message);
      else setServerError("");
      return data || [];
    },
  });

  const tasks = [
    {
      id: 1,
      type: "seatCard",
      name: "পরীক্ষার সিট কার্ড তৈরি",
      action: "প্রিন্ট করুন",
    },
    {
      id: 2,
      type: "examSheet",
      name: "পরীক্ষার উপস্থিতি শীট",
      action: "Generate",
    },
    {
      id: 3,
      type: "admitcardPrint",
      name: "এডমিট কার্ড প্রিন্ট",
      action: "প্রিন্ট করুন",
    },
  ];

  // general handler
  const handleTask = async (taskType) => {
    if (!filterByClass || !examName) {
      return setServerError("শ্রেণী ও পরীক্ষার নাম নির্বাচন করুন");
    }
    setSheetUnabled(false);
    setServerError("");
    setTaskResult(null);
    try {
      if (taskType === "seatCard") {
        setSeatCards(true);
      }

      if (taskType === "examSheet") {
        setLoading(true);
        const { data: subjects } = await axiosSecure.get(
          `/subjects?className=${filterByClass}`
        );
        setSheetUnabled(true);
        setTaskResult(subjects);
        setLoading(false);
      }

      if (taskType === "admitcardPrint") {
        setIsAdmitCardOpen(true);
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  // for exam attendance sheet popup open func:
  const openPdfModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // close pdf modal:
  const closeSeatCards = () => {
    setSeatCards(false);
    setIsModalOpen(false);
    setIsAdmitCardOpen(false);
  };

  return (
    <>
      <div className="p-6 min-h-screen">
        {/* Filter Inputs */}

        <form className="grid grid-cols-12 gap-4 mb-5 bg-green-100 p-4 rounded-lg">
          {/* class select */}
          <div className="form-control col-span-12 md:col-span-4">
            <label className="label">শ্রেণী:</label>
            <select
              defaultValue={filterByClass}
              onChange={(e) => setFilterByClass(e.target.value)}
              name="className"
              className="select select-bordered"
            >
              <option value="">শ্রেণী নির্বাচন করুন</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                <option key={c} value={c}>
                  শ্রেণী-{c}
                </option>
              ))}
            </select>
          </div>

          {/* select year */}
          <div className="form-control col-span-12 md:col-span-4">
            <label className="label">
              <span className="label-text max-sm:text-lg">শিক্ষাবর্ষ:</span>
            </label>
            <select
              name="session"
              defaultValue={""}
              onChange={(e) => setSession(e.target.value)}
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

          {/* exam select */}
          <div className="form-control col-span-12 md:col-span-4">
            <label className="label">পরীক্ষার নাম:</label>
            <select
              defaultValue={examName}
              onChange={(e) => setExamName(e.target.value)}
              name="examName"
              className="select select-bordered"
              required
            >
              <option value="">পরীক্ষা নির্বাচন করুন</option>
              <option value="1st Semester">১ম সেমিস্টার</option>
              <option value="2nd Semester">২য় সেমিস্টার</option>
              <option value="3rd Semester">৩য় সেমিস্টার</option>
              <option value="Half-Yearly">অর্ধ-বার্ষিক</option>
              <option value="Annual">বার্ষিক</option>
              <option value="1st Model Test">১ম-মডেল টেস্ট</option>
              <option value="2nd Model Test">২য়-মডেল টেস্ট</option>
              <option value="Pre Test">প্রি-টেস্ট</option>
              <option value="SSC-Test">এস.এস.সি. টেস্ট</option>
            </select>
          </div>

          <div className="col-span-12 ">
            {students.length > 0 && (
              <div className="flex justify-between text-sm md:text-lg text-green-950 font-semibold">
                <h2>শ্রেণী : {filterByClass}</h2>
                <h2>মোট শিক্ষার্থী: {students.length} জন</h2>
              </div>
            )}
          </div>
        </form>
        <p className="text-red-500 text-sm text-center">
          {serverError && serverError}
        </p>

        {/* table for the diffrent task */}

        {students.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">টাস্কের নাম</th>
                  <th className="py-3 px-4 text-center">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-green-50">
                    <td className="py-3 px-4">{task.name}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTask(task.type)}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2"
                      >
                        {task.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isLoading || loading && <Loading />}
        {students && sheetEnabled && (
          <div className="overflow-x-auto my-4 bg-green-200 shadow-md rounded-lg">
            <h3 className="text-center text-green-950/70 text-lg py-2">
              পরীক্ষায় উপস্থিতি রেকর্ড শীট প্রিন্ট টেবল
            </h3>
            <table className="table w-full">
              {/* Table Header */}
              <thead className="bg-green-600 text-white">
                <tr>
                  <th>Student ID</th>
                  <th>শিক্ষার্থীর ছবি</th>
                  <th>নাম</th>
                  <th>রোল</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {students
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

                      <td className="flex flex-row items-center gap-2 md:gap-4">
                        <button
                          onClick={() => openPdfModal(student)}
                          className="btn btn-sm bg-green-50 text-primary"
                        >
                          Print <FaFilePdf />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* creating exam sit card popup */}
        {students && seatCards && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative">
              <button
                onClick={closeSeatCards}
                className="absolute bottom-2 right-8 text-lg bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <SeatCardPDF
                students={students}
                subjects={taskResult?.subjects}
                examName={examName}
              />
            </div>
          </div>
        )}

        {/* pdf popup for exam attendance sheet */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative">
              <button
                onClick={closeSeatCards}
                className="absolute bottom-2 right-8 text-lg bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <ExamAttendancePDF
                studentData={selectedStudent}
                subjects={taskResult?.subjects}
                examName={examName}
              />
            </div>
          </div>
        )}

        {/* admit card generate pdf popup */}
         {students && isAdmitCardOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white w-[90%] h-[90%] rounded shadow-lg relative">
              <button
                onClick={closeSeatCards}
                className="absolute bottom-2 right-8 text-lg bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <SmallAdmitCardsPDF
                students={students}
                examName={examName}
                session={session}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SpecialTask;
