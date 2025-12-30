import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useQuery } from "@tanstack/react-query";
export const AddSubject = () => {
  const axiosSecure = useAxiosSec();
  const [className, setClassName] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectType, setSubjectType] = useState("Compulsory");

  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/teachers`
      );
      return data;
    },
  });
  const handleAddSubject = (e) => {
    e.preventDefault();

    const form = e.target;
    const subjectName = form.subject.value;
    const subjectID = `SUB_${subjectName.slice(0, 3)}`;
    const totalMarks = parseInt(form.totalMarks.value, 10);
    const subjectCode = form.subjectCode.value;
    const assignedTeacher = form.teacher.value;
    const pdfUrl = form.subjectUrl.value;

    const subjectData = {
      subjectID,
      subjectName,
      subjectType,
      totalMarks,
      subjectCode,
      assignedTeacher,
      pdfUrl,
    };
    setSubjects([...subjects, subjectData]);
    form.reset();
  };

  const handleReset = () =>{
    setSubjects([]);
  }

  const handleSubjectsDataSubmit = async () => {
    if (!className && !classTeacher) {
      return setError("দয়া করে বিষয়, শ্রেণী শিক্ষক যুক্ত করুন!!!");
    } else if (!className) {
      return setError("দয়া করে বিষয় যুক্ত করুন!!!");
    } else if (!classTeacher) {
      return setError("দয়া করে শ্রেণী শিক্ষক নির্বাচন করুন!!!");
    } else {
      setError("");
    }

    const subjectData = {
      className,
      classTeacher,
      subjects: subjects,
    };

    try {
      const { data } = await axiosSecure.post(`/add-subjects`, subjectData);
      if (data?.message) {
        return Swal.fire({
          position: "center",
          icon: "info",
          title: `${data?.message}!`,
        });
      }
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Class ${className}'s subjects added successfully!!!`,
        });
        setSubjects([]);
        setError("");
      }
    } catch (err) {
      console.log("Add subject Error-->", err);
    }
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-6 py-8 rounded-lg">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          বিষয় সংযুক্তি
        </h1>
        <div className="divider my-0"></div>

        {/* class choose */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <label className="label text-xl font-semibold">শ্রেণী:</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className={`select select-bordered max-w-xl ${
              error ? "border-red-400" : ""
            }`}
          >
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

        {/* class teacher choose */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <label className="label text-xl font-semibold">
            শ্রেণী শিক্ষক/ শিক্ষিকা:
          </label>
          <select
            value={classTeacher}
            onChange={(e) => setClassTeacher(e.target.value)}
            className={`select select-bordered max-w-xl ${
              error ? "border-red-400" : ""
            }`}
          >
            {teachers.length > 0 &&
              teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher?.name}>
                  {teacher?.name}
                </option>
              ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-center mb-1">{error}</p>}

        <form
          onSubmit={handleAddSubject}
          className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4"
        >
          {/* subject name */}
          <div className="md:col-span-6 flex flex-col">
            <label className="label font-semibold">বিষয়ের নাম:</label>
            <input
              type="text"
              name="subject"
              placeholder="ইংরেজিতে বিষয়ের নাম..."
              className="input input-bordered w-full max-sm:text-xs max-sm:p-2"
              required
            />
          </div>

          {/*subjectCode*/}
          <div className="md:col-span-3 flex flex-col">
            <label className="label font-semibold">বিষয় কোড:</label>
            <input
              type="text"
              name="subjectCode"
              placeholder="ইংরেজিতে বিষয় কোড..."
              className="input input-bordered w-full max-sm:text-xs max-sm:p-2"
              required
            />
          </div>

          {/*subject type*/}
          <div className="md:col-span-3 flex flex-col">
            <label className="label font-semibold">বিষয়ের ধরণ:</label>
            <select
              name="subjectType"
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              className="select select-bordered w-full max-sm:text-xs max-sm:p-2"
            >
              <option value="Compulsory">Compulsory</option>
              <option value="Optional">Optional</option>
            </select>
          </div>

          {/*totalMarks*/}
          <div className="md:col-span-3 flex flex-col">
            <label className="label font-semibold">মোট নম্বর:</label>
            <input
              type="number"
              name="totalMarks"
              placeholder="কত নম্বরে পরীক্ষা?"
              className="input input-bordered w-full max-sm:text-xs max-sm:p-2"
              required
            />
          </div>

          {/*assigned teacher*/}
          <div className="md:col-span-4 flex flex-col">
            <label className="label font-semibold">শিক্ষক/শিক্ষিকা:</label>
            <input
              type="text"
              name="teacher"
              placeholder="শিক্ষক/শিক্ষিকা যিনি পড়ান (Optional)"
              className="input input-bordered w-full max-sm:text-xs max-sm:p-2"
            />
          </div>

           {/*subject pdf url*/}
          <div className="md:col-span-5 flex flex-col">
            <label className="label font-semibold">বইয়ের লিংক:</label>
            <input
              type="url"
              name="subjectUrl"
              placeholder="বইয়ের PDF লিংক..."
              className="input input-bordered w-full max-sm:text-xs max-sm:p-2"
            />
          </div>


            <button type="submit" className="md:col-span-4  btn btn-outline w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              বিষয় যোগ করুন
            </button>
            <button type="button" onClick={handleReset} className="md:col-span-4  btn btn-outline w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
              রিসেট করুন
            </button>
        </form>

        {subjects.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-5">
            <h2 className="text-lg text-center font-semibold mb-3">
              সংযুক্ত বিষয়ের তালিকা : {subjects.length} টি
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>বিষয়ের নাম</th>
                    <th>বিষয় কোড</th>
                    <th>বিষয়ের ধরণ</th>
                    <th>মোট নম্বর</th>
                    <th>শিক্ষক/শিক্ষিকা</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subj, index) => (
                    <tr key={index}>
                      <td>{subj.subjectName}</td>
                      <td>{subj.subjectCode}</td>
                      <td>{subj.subjectType}</td>
                      <td>{subj.totalMarks}</td>
                      <td>{subj.assignedTeacher || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {subjects.length > 0 && classTeacher && className && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubjectsDataSubmit}
              className="btn bg-green-600 hover:bg-green-700 text-white px-6 text-lg"
            >
              বিষয়সমূহ যোগ করুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
