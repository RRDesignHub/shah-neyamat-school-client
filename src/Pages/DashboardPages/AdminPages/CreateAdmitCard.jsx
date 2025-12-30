import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parse  } from "date-fns";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";
import { bn } from "date-fns/locale";
export default function CreateAdmitCard() {
  const axiosSecure = useAxiosSec();
  const [classFilter, setClassFilter] = useState("Play");
  const [examName, setExamName] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [enabled, setUnabled] = useState(false);
  const [examDate, setExamDate] = useState(new Date());
  const [examFrom, setExamFrom] = useState("");
  const [examTo, setExamTo] = useState("");
  const [examData, setExamData] = useState([]);
  const [error, setError] = useState("");
  const [multipleAdd, setMultipleAdd] = useState("");
  const {
    data: subjectData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subjects", classFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/subjects?className=${classFilter}`
      );
      if (data?.message) {
        setError(data.message);
        return {};
      } else {
        setError("");
      }
      return data || {};
    },
    enabled,
  });

  const handleGetSubjects = (e) => {
    e.preventDefault();
    setUnabled(true);
    refetch();
  };

  const handleSingleExamData = async (e) => {
    e.preventDefault();
    const subjectName = e.target.subjectName.value;
    // Check if subject already exists in examData
    const isAlreadyAdded = examData.some(
      (data) => data.subjectName === subjectName
    );

    if (isAlreadyAdded) {
      setMultipleAdd("প্রদত্ত বিষয়টি যোগ করা হয়েছে!!!");
      return;
    }

    const singleExamData = {
      subjectName,
      examDate,
      examFrom,
      examTo,
    };

    setExamData([...examData, singleExamData]);
    // Optional: Reset form fields after successful addition
    setMultipleAdd("");
    e.target.reset();
    setExamDate(new Date());
    setExamFrom("");
    setExamTo("");
  };


  const handleResetAdmitCard = () =>{
    setExamData([]);
    setMultipleAdd("");
    setExamDate(new Date());
    setExamFrom("");
    setExamTo("");
  }

  //final admit card data post to db
  const handleSubmitAdmitCard = async () => {
    if (examData.length === 0) {
      return setError("দয়া করে পরীক্ষার বিষয় যোগ করুন।");
    }

    const admitCardData = {
      examName,
      session: parseInt(session),
      className: classFilter,
      examData,
    };

    try {
      const { data } = await axiosSecure.post(`/add-admit-card`, admitCardData);
      if (data?.message) {
        return Swal.fire({
          position: "center",
          icon: "info",
          title: `${data.message}`,
        });
      }
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${admitCardData.className} এর এডমিট কার্ড সফলভাবে তৈরি করা হয়েছে!!!`,
        });
        setExamData([]);
      }
    } catch (err) {
      console.log("Add admit cart Error-->", err);
    }
  };
  return (
    <div className="w-full px-2 md:w-11/12 mx-auto my-4 md:my-10">
      <div className="bg-green-200 px-2 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          এডমিট কার্ড তৈরি
        </h1>
        <div className="divider my-0"></div>
        {/* Class Filter */}

        <form
          onSubmit={handleGetSubjects}
          className="card-body pb-0 px-0 w-full mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-center md:items-end gap-2 md:gap-5">
            {/* exam name */}
            <div className="form-control flex-row md:flex-col">
              <label className="label ">পরীক্ষার নাম:</label>
              <select
                onChange={(e) => setExamName(e.target.value)}
                name="subjectName"
                value={examName}
                className={`max-sm:w-1/2 h-12 p-2 border rounded-md ${
                  error === "Exam name select please."
                    ? "border-red-400"
                    : "border-gray-300 "
                }`}
                required
              >
                <option value={""} disabled>
                  Select
                </option>
                <option value="1st-Semester">১ম সেমিস্টার</option>
                <option value="2nd-Semester">২য় সেমিস্টার</option>
                <option value="3rd-Semester">৩য় সেমিস্টার</option>
                <option value="Half-Yearly">অর্ধ-বার্ষিক</option>
                <option value="Annual">বার্ষিক</option>
                <option value="1st-Modeltest">১ম-মডেল টেস্ট</option>
                <option value="2nd-Modeltest">২য়-মডেল টেস্ট</option>
                <option value="Pre-Test">প্রি-টেস্ট</option>
                <option value="SSC-Test">এস.এস.সি. টেস্ট</option>
              </select>
            </div>

            {/* Academic year */}
            <div className="form-control flex-row md:flex-col">
              <label className="label">শিক্ষাবর্ষ:</label>
              <select
                onChange={(e) => setSession(e.target.value)}
                name="session"
                defaultValue={"Select a year"}
                className="select max-sm:w-1/2 select-bordered"
                required
              >
                <option value="" disabled>
                  Select a year
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

            {/* class name */}
            <div className="form-control flex-row md:flex-col">
              <label className="label">শ্রেণী:</label>
              <select
                onChange={(e) => setClassFilter(e.target.value)}
                className="select select-bordered bg-white max-sm:w-1/2 text-gray-700"
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
                    Class {className}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <button className="btn bg-green-600  hover:bg-primary text-white">
                সার্চ করুন
              </button>
            </div>
          </div>
          
        </form>
        <div className="divider mb-0"></div>
              {isLoading ? (
           <Loading />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : subjectData?.subjects?.length ? 
            <form
            onSubmit={handleSingleExamData}
            className="card-body px-0 pt-2 max-sm:px-0"
          >
            <p className="text-xs md:text-sm text-center">বিষয়ের নাম, পরীক্ষার তারিখ, সময় নির্বাচন করুন এবং “Add” বাটনে ক্লিক করুন</p>
            <div className="grid gap-3 grid-cols-12 items-end">
              <div className="form-control col-span-12 md:col-span-3">
                <label className="block label text-gray-700"><span className="label-text">বিষয়ের নাম</span></label>
                <select
                  defaultValue="Select"
                  name="subjectName"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                  required
                >
                  <option disabled>Select</option>
                  {subjectData.subjects &&
                    subjectData?.subjects?.map((singleSubData, index) => (
                      <option value={singleSubData.subjectName} key={index}>
                        {singleSubData.subjectName}
                      </option>
                    ))}
                </select>
              </div>

              {/* exam date choose */}
              <div className="form-control col-span-6 md:col-span-2">
                <label className="label">
                  <span className="label-text">পরীক্ষার তারিখ</span>
                </label>
                <input
                  type="date"
                  selected={examDate}
                  required
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>

              {/* time from */}
              <div className="form-control col-span-6 md:col-span-2">
                <label className="label">
                  <span className="label-text">সময় (হতে)</span>
                </label>
                <input
                  type="time"
                  selected={examFrom}
                  required
                  onChange={(e) => setExamFrom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              {/* time to*/}
              <div className="form-control col-span-6 md:col-span-2">
                <label className="label">
                  <span className="label-text">সময় (পর্যন্ত)</span>
                </label>
                <input
                  type="time"
                  selected={examTo}
                  required
                  onChange={(e) => setExamTo(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>

              <button className="max-sm:col-span-6 md:col-span-3 btn bg-green-100 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                Add
              </button>
              {multipleAdd && (
                <small className="col-span-6 text-red-400">{multipleAdd}</small>
              )}
            </div>

          </form> : <p className="text-center">পরীক্ষার নাম, শিক্ষাবর্ষ ও শ্রেণী নির্বাচন করুন</p>
          }
       

        {examData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th>বিষয়ের নাম</th>
                  <th className="text-center">পরীক্ষার তারিখ</th>
                  <th className="text-center">পরীক্ষার সময়</th>
                </tr>
              </thead>
              <tbody>
                {examData?.length > 0 ? (
                  examData?.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.subjectName}</td>
                      <td className="text-center">
                        {subject?.examDate &&
                          format(
                            new Date(subject?.examDate),
                            "dd-MM-yyyy, EEEE"
                          )}
                      </td>
                      <td className="text-center">
                        {subject?.examFrom} - {subject?.examTo}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500"
                    ></td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div className="w-fit mx-auto mt-3 md:mt-6 space-x-2 md:space-x-4">
              <button
                type="button"
                onClick={handleResetAdmitCard}
                className="btn bg-green-600 px-5 hover:bg-green-700 text-sm md:text-lg text-white"
              >
                রিসেট
              </button>
              <button
                type="button"
                onClick={handleSubmitAdmitCard}
                className="btn bg-green-600 px-5 hover:bg-green-700 text-sm md:text-lg text-white"
              >
                এডমিট কার্ড তৈরি করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
