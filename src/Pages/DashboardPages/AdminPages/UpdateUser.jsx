import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";

const UpdateUser = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const axiosSecure = useAxiosSec();
  const {
        data: user = {},
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["user", id],
        queryFn: async () => {
          const { data } = await axiosSecure.get(
            `/user/${id}`
          );
          return data || {};
        },
      });
  const handleUpdateUser = async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const role = form.role.value;
      const newUser = { name, email: user?.email, role };
     
      try {
        // Save user data to the database:
        const { data } = await axiosSecure.patch(`/update-user/${id}`, newUser);
        if (data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${name} এর তথ্য পরিবর্তন হয়েছে!`,
            showConfirmButton: true,
            timer: 1500,
          });
          navigate("/dashboard/all-user")
        }
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <div className="p-2 md:p-6 min-h-screen">
      {/* Header Section */}
      <div className="bg-primary text-white p-4 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">ইউজার আপডেট করুন</h2>
        <p className="text-sm md:text-base mt-1">
          শিক্ষক/হিসাবরক্ষক/অ্যাডমিন এর তথ্য পরিবর্তনের জন্য নিচের ফর্ম পূরণ করুন।
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleUpdateUser}
        className="bg-card p-4 md:p-6 rounded-xl shadow-md max-w-xl space-y-4 mx-auto"
      >
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-primary">পূর্ণ নাম</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="নাম লিখুন"
            defaultValue={user?.name}
            className="input input-bordered"
            required
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-primary">ইমেইল</span>
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered"
            required
          />
        </div>

        {/* Role */}
        {user.role && <div className="form-control">
          <label className="label">
            <span className="label-text text-primary">
              ভূমিকা নির্বাচন করুন
            </span>
          </label>
          <select
            name="role"
            className="select select-bordered"
            required
            defaultValue={user?.role}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Teacher">শিক্ষক</option>
            <option value="Accountant">হিসাবরক্ষক</option>
            <option value="Admin">অ্যাডমিন</option>
            <option value="Block">ব্লক</option>
          </select>
        </div>}
        

        {/* Role */}
        {user.status && <div className="form-control">
          <label className="label">
            <span className="label-text text-primary">
              স্টেটাস
            </span>
          </label>
          <select
            name="status"
            className="select select-bordered"
            required
            defaultValue={user?.status}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="block">Block</option>
          </select>
        </div>}

        {/* Submit */}
        <div className="form-control mt-6">
          <button className="btn bg-green-600 text-white hover:bg-green-700">
            ইউজার আপডেট করুন
          </button>
        </div>
      </form>
    </div>
  )
}
export default UpdateUser;