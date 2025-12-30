import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";

const AllSubjects = () => {
  const axiosSecure = useAxiosSec();
  const [classFilter, setClassFilter] = useState("Play");
  const [error, setError] = useState("");
  const {
    data: subjectsData = {},
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!classFilter,
    queryKey: ["subjectsData", classFilter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/subjects?className=${classFilter}`
      );
      if(data?.message){
        setError(data.message)
        return {}
      }else{setError(null)}
      return data || {};
    },
  });
  
  // Handle delete subject
  const handleDelete = async (className) => {
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
            `/delete-subject/${className}`
          );
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Subject has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting subject:", error);
        }
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="bg-green-200 px-3 rounded-lg py-5 md:py-8">
        <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          শ্রেণী ভিত্তিক বিষয়সমূহ
        </h1>
        <div className="divider my-0"></div>
        {/* Class Filter */}
        <div className="flex justify-end mb-4">
          <select
            onChange={(e) => setClassFilter(e.target.value)}
            className="select select-bordered bg-white w-64 text-gray-700"
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

        {isLoading && <Loading />}

        {/* Subjects Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th>বিষয়ের নাম</th>
                <th>বিষয় কোড</th>
                <th>বিষয়ের ধরণ</th>
                <th>মোট নম্বর</th>
                <th>শিক্ষক/ শিক্ষিকা</th>
              </tr>
            </thead>
            <tbody>
              {subjectsData?.subjects?.length > 0 ? (
                subjectsData?.subjects?.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectName}</td>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectType}</td>
                    <td>{subject.totalMarks}</td>
                    <td>{subject.assignedTeacher}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    {error}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {subjectsData.subjects && (
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => handleDelete(subjectsData?.className)}
            className="btn btn-md text-center bg-red-500 text-white hover:bg-red-600"
          >
            সকল বিষয় ডিলিট করুন
          </button>
        </div>
      )}
    </div>
  );
};

export default AllSubjects;
