import React from "react";
import { useQuery } from "@tanstack/react-query";;
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSec();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users`);
      return data || [];
    },
  });

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "আপনি কি নিশ্চিত?",
        text: "ইউজারটিকে পুনরায় তৈরি করতে হবে!!!",
        icon: "warning",
        color: "#064E3B",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosSecure.delete(`/delete-user/${id}`);
          if (data?.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "ইউজার ডিলিট হয়েছে!!!",
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
  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
        সকল ইউজার
      </h2>
      <div className="divider"></div>
      {users.length > 0 && (
        <h3 className="text-xl text-green-950 font-semibold mb-2">
          মোট ইউজার: <span className="font-bold">{users.length}</span> জন
        </h3>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-green-200 shadow-md rounded-lg">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="bg-green-600 text-white">
              <tr>
                <th>#</th>
                <th>নাম</th>
                <th>ইমেইল</th>
                <th>ইউজার রোল</th>
                <th>তারিখ</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.role}</td>
                    <td>
                      {user?.joinedAt &&
                        format(new Date(user?.joinedAt), "MMMM dd, yyyy")}
                    </td>
                    <td>
                      <Link
                        to={`/dashboard/update-user/${user?._id}`}
                        className="btn btn-sm bg-secondary hover:bg-primary mr-2"
                      >
                        <FaUserEdit />
                      </Link>
                      <button
                        className="btn btn-sm text-lg btn-error text-white"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-600">
                    ইউজার যুক্ত করুন...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default AllUsers;
