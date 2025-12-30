import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
export const AddResult = () => {
  const axiosSecure = useAxiosSec();
  const [studentData, setStudentData] = useState({});
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const [examName, setExamName] = useState("");
  const [className, setClassName] = useState("Play");
  const [totalMarks, setTotalMarks] = useState(0);
  const [status, setStatus] = useState("");
  const [gpaAverage, setGpaAverage] = useState(0);
  const [averageLetterGrade, setAverageLetterGrade] = useState("");
  const [serverError, setServerError] = useState("");
  const [multipleAdd, setMultipleAdd] = useState("");
  // bring student and subject data from db:
  const handleDisplayStudentInfo = async (e) => {
    e.preventDefault();
    const classRoll = e.target.classRoll.value;
    setError(null);
    setStudentData({});
    try {
      const { data } = await axiosSecure.get(
        `/student?className=${className}&&classRoll=${classRoll}`
      );
      if (data?.message) {
        setServerError(data.message);
      } else {
        setServerError("");
      }
      setStudentData(data);
    } catch (err) {
      setError(err.response.data.message);
      console.log("Bring student data Error-->", err);
    }
  };

  const handleSingleSubjectResult = (e) => {
    e.preventDefault();

    const form = e.target;
    const subjectName = form.subjectName.value;
    const marks = parseInt(form.marks.value);

    // Check if subject already exists in resultData
    const isAlreadyAdded = result.some(
      (data) => data.subjectName === subjectName
    );
    if (isAlreadyAdded) {
      setMultipleAdd("প্রদত্ত বিষয়টি যোগ করা হয়েছে!!!");
      return;
    } else {
      setMultipleAdd("");
    }

    // Find the subject from studentData.subjects to get totalMarks
    const subject = studentData.subjects.find(
      (sub) => sub.subjectName === subjectName
    );
    if (!subject) {
      Swal.fire("বিষয় পাওয়া যায়নি!!!");
      return;
    }

    const totalMarksForSubject = subject.totalMarks; // 100 or 50

    // Validate marks based on totalMarks
    if (marks < 0 || marks > totalMarksForSubject) {
      Swal.fire(`0 এবং ${totalMarksForSubject} এর মধ্যে নম্বর বসান`);
      return;
    }

    // Calculate percentage to standardize grading
    const percentage = (marks / totalMarksForSubject) * 100;
    let GPA, letterGrade;

    // Assign GPA and Letter Grade based on percentage
    if (percentage >= 80) {
      GPA = 5.0;
      letterGrade = "A+";
    } else if (percentage >= 70) {
      GPA = 4.0;
      letterGrade = "A";
    } else if (percentage >= 60) {
      GPA = 3.5;
      letterGrade = "A-";
    } else if (percentage >= 50) {
      GPA = 3.0;
      letterGrade = "B";
    } else if (percentage >= 40) {
      GPA = 2.0;
      letterGrade = "C";
    } else if (percentage >= 33) {
      GPA = 1.0;
      letterGrade = "D";
    } else {
      GPA = 0.0;
      letterGrade = "F";
    }

    const singleSubjectResult = {
      subjectName,
      marks,
      totalMarks: totalMarksForSubject, // Include totalMarks in result
      GPA,
      letterGrade,
    };
    const updatedResult = [...result, singleSubjectResult];
    setResult(updatedResult);

    // Calculate total marks achieved
    const totalMarksAchieved = updatedResult.reduce(
      (total, subject) => total + subject.marks,
      0
    );

    // ✅ Check if any subject is failed
    const hasFail = updatedResult.some(
      (subject) => subject.letterGrade === "F"
    );

    // Calculate GPA Average
    const totalGPA = updatedResult.reduce(
      (total, subject) => total + subject.GPA,
      0
    );
    const gpaAverage = hasFail ? 0 : totalGPA / updatedResult.length;

    // Determine Average Letter Grade
    let averageLetterGrade = "";
    if (hasFail) averageLetterGrade = "F";
    else if (gpaAverage >= 5) averageLetterGrade = "A+";
    else if (gpaAverage >= 4) averageLetterGrade = "A";
    else if (gpaAverage >= 3.5) averageLetterGrade = "A-";
    else if (gpaAverage >= 3) averageLetterGrade = "B";
    else if (gpaAverage >= 2) averageLetterGrade = "C";
    else if (gpaAverage >= 1) averageLetterGrade = "D";

    setStatus(hasFail ? "Fail" : "Pass");

    //update states
    setTotalMarks(totalMarksAchieved);
    setGpaAverage(gpaAverage);
    setAverageLetterGrade(averageLetterGrade);
    form.reset();
  };

  const handleResetResult = () => {
    setResult([]);
    setServerError("");
  };

  const handleSubmitResult = async () => {
    if (!examName) {
      return setServerError("পরীক্ষার নাম নির্বাচন করুন.");
    }
    const resultInfo = {
      studentID: studentData?.studentID,
      studentName: studentData?.studentName,
      fatherName: studentData.fatherName,
      motherName: studentData.motherName,
      image: studentData.image,
      className: studentData?.className,
      classRoll: studentData?.classRoll,
      examName: examName,
      session: studentData?.session,
      resultData: result,
      totalMarks: totalMarks,
      totalGPA: gpaAverage,
      totalLG: averageLetterGrade,
      status,
    };

    try {
      const { data } = await axiosSecure.post(`/add-result`, resultInfo);
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${resultInfo?.studentName} এর ফলাফল সফলভাবে তৈরি হয়েছে!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        setResult([]);
        setError(null);
        setTotalMarks(0);
        setGpaAverage(0);
        setAverageLetterGrade("");
        setStatus("");
      }
    } catch (err) {
      console.log("Add subject Error-->", err);
    }
  };

  return (
    <>
      <div className="w-full md:w-11/12 mx-auto my-4 md:my-10">
        <div className="bg-green-200 px-1 py-4 md:px-6 md:py-8 rounded-lg">
          <form
            onSubmit={handleDisplayStudentInfo}
            className="card-body max-sm:p-0 max-sm:mb-2 lg:w-3/4 mx-auto"
          >
            {!studentData?.studentName && (
              <h3 className="text-center text-sm md:text-md text-red-500">
                প্রথমে শ্রেণী ও রোল দিয়ে শিক্ষার্থী নির্বাচন করুন
              </h3>
            )}
            {error && (
              <h3 className="text-center text-sm md:text-md text-red-500">
                {error}
              </h3>
            )}
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5">
              {/* class name */}
              <div className="form-control flex-row items-center gap-1">
                <label className="label">
                  <span className="label-text text-sm md:text-xl font-semibold">
                    শ্রেণী:
                  </span>
                </label>
                <select
                  defaultValue={className}
                  name="className"
                  onChange={(e) => setClassName(e.target.value)}
                  className="select select-bordered"
                  required
                >
                  <option value="" disabled>
                    একটি শ্রেণী নির্বাচন করুন
                  </option>
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

              {/* class roll */}
              <div className="form-control flex-row items-center gap-1">
                <label className="label">
                  <span className="label-text text-sm md:text-xl font-semibold">
                    রোল:
                  </span>
                </label>
                <input
                  type="number"
                  name="classRoll"
                  placeholder="শ্রেণী রোল"
                  className="input input-bordered "
                  required
                />
              </div>
              <div className="form-control">
                <button className="btn bg-green-600  hover:bg-primary text-white">
                  সার্চ করুন
                </button>
              </div>
            </div>
            {serverError && (
              <p className="text-red-500 text-md text-center pt-3">
                {serverError}
              </p>
            )}
          </form>
          {studentData?.studentName && (
            <div className="bg-green-100 px-3 rounded-lg py-5 md:py-8">
              <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
                ফলাফল তৈরি করুন
              </h1>
              <div className="divider my-0"></div>

              <div className="flex max-sm:flex-wrap justify-around md:justify-center items-center gap-2 md:gap-8 pt-2">
                <h3 className="text-sm md:text-lg">
                  শিক্ষার্থীর নাম:
                  <span className="ms-1 font-semibold">
                    {studentData?.studentName || ""}
                  </span>
                </h3>
                <h3 className="text-sm md:text-lg">
                  শ্রেণী :
                  <span className="ms-1 font-semibold">
                    {studentData?.className || ""}
                  </span>
                </h3>
                <h3 className="text-sm md:text-lg">
                  রোল:
                  <span className="ms-1 font-semibold">
                    {studentData?.classRoll || ""}
                  </span>
                </h3>

                {/* exam name */}
                <div className="form-control flex-row justify-center items-center">
                  <label className="block w-full label text-sm md:text-lg">
                    পরীক্ষার নাম :
                  </label>
                  <select
                    onChange={(e) => setExamName(e.target.value)}
                    name="subjectName"
                    value={examName}
                    className={`w-full h-10 md:h-12 p-2 border rounded-md ${
                      serverError === "পরীক্ষার নাম নির্বাচন করুন."
                        ? "border-red-400"
                        : "border-gray-300 "
                    }`}
                    required
                  >
                    <option value="" disabled>
                      নির্বাচন করুন...
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
              </div>

              <form
                onSubmit={handleSingleSubjectResult}
                className="card-body max-sm:px-0"
              >
                <p className="text-xs md:text-sm text-center text-green-950/60">
                  বিষয়ের নাম, পরীক্ষার তারিখ, সময় নির্বাচন করুন এবং “Add” বাটনে
                  ক্লিক করুন
                </p>
                <div className="grid gap-3 grid-cols-12 items-end">
                  <div className="form-control col-span-6">
                    <label className="block label max-sm:text-sm text-gray-700">
                      বিষয়ের নাম
                    </label>
                    <select
                      defaultValue="Select"
                      name="subjectName"
                      className="w-full h-10 md:h-12 p-1 md:p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option disabled>Select</option>
                      {studentData.subjects &&
                        studentData?.subjects?.map((singleSubData, index) => (
                          <option value={singleSubData.subjectName} key={index}>
                            {singleSubData.subjectName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-control col-span-6 md:col-span-3">
                    <label className="block label max-sm:text-sm text-gray-700">
                      প্রাপ্ত নম্বর
                    </label>
                    <input
                      type="number"
                      name="marks"
                      placeholder="Marks"
                      className="input h-10 md:h-12 p-1 md:p-2 input-bordered"
                      required
                    />
                  </div>

                  <button className="max-sm:col-span-12 md:col-span-3 btn  bg-green-100 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                    Add
                  </button>
                  {multipleAdd && (
                    <small className="col-span-12 text-red-400">
                      {multipleAdd}
                    </small>
                  )}
                </div>
              </form>
              {result.length > 0 ? (
                <div className="bg-green-50 p-2 md:p-5 rounded-xl mt-1 md:mt-5 mx-2 md:mx-8">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>বিষয়ের নাম</th>
                          <th>প্রাপ্ত নম্বর</th>
                          <th>Grade Point</th>
                          <th>Latter Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.map((singleSubject, index) => (
                          <tr key={index}>
                            <td>{singleSubject?.subjectName}</td>
                            <td>{singleSubject?.marks}</td>
                            <td>{singleSubject?.GPA}</td>
                            <td>{singleSubject?.letterGrade}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="font-bold">মোট</td>
                          <td className="font-bold">{totalMarks}</td>
                          <td className="font-bold">{gpaAverage.toFixed(2)}</td>
                          <td className="font-bold">{averageLetterGrade}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ) : (
                ""
              )}
              {result.length > 0 && (
                <div className="w-fit mx-auto mt-6 space-x-2 md:space-x-4">
                  <button
                    type="button"
                    onClick={handleResetResult}
                    className="btn bg-green-600 px-5 hover:bg-green-700 text-sm md:text-lg text-white"
                  >
                    রিসেট
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitResult}
                    className="btn bg-green-600 px-5 hover:bg-green-700 text-sm md:text-lg text-white"
                  >
                    ফলাফল আপলোড
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
