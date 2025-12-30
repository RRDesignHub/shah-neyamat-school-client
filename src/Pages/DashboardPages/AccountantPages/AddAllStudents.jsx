import { useState } from "react";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../../components/Shared/Loading";
import Swal from "sweetalert2";

const AddAllStudents = () => {
  const axiosSecure = useAxiosSec();
  const [filterStudentsID, setFilterStudentsID] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [session, setSession] = useState(new Date().getFullYear());
  const [serverError, setServerError] = useState("");
  const [enabled, setUnabled] = useState(false);

  // temporary fetch
  const { data: allStudents = [], isLoading, refetch } = useQuery({
    queryKey: ["students", filterByClass, session],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/students?session=${session}&&className=${filterByClass}`
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

  // temporaty add stu to stuFeesColl
  const handleAddStu = async (stu) => {
    const studentData = {
      studentID: stu?.studentID,
      studentName: stu?.studentName,
      className: stu?.className,
      classRoll: stu?.classRoll,
      session: stu?.session,
    };
    try {
      const { data } = await axiosSecure.post("/add-student-fees", studentData);

      if (data?.message) {
        return Swal.fire({
          position: "center",
          icon: "info",
          title: `${data?.message}`,
        });
      }
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `সফলভাবে ${stu?.studentName} এর তথ্য যোগ করা হয়েছে!!!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log("Adjust fees Error--->", err);
    }
  };

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

        {/* all student for add to stuFeesColl */}
        {isLoading ? <Loading /> : serverError ? <h2>{serverError}</h2> : allStudents && (
          <table className="table w-full bg-white rounded shadow">
            <thead className="bg-gradient-to-r from-green-100 to-green-300 text-green-950">
              <tr>
                <th className="py-2 px-4 text-center">রোল</th>
                <th className="py-2 px-4 text-left">নাম</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allStudents
                .sort((a, b) => a.classRoll - b.classRoll)
                .map((stu, index) => (
                  <tr key={stu._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-center">{stu.classRoll}</td>
                    <td className="py-2 px-4">{stu.studentName}</td>

                    <td className="py-2 px-4 mx-auto flex justify-center items-center gap-2 *:rounded-md">
                      <button
                        onClick={() => handleAddStu(stu)}
                        className="btn-sm bg-green-500 hover:bg-green-700 text-white"
                      >
                        Add to FeesColl
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default AddAllStudents;
