import { useState } from "react";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";

export default function CreateUserPage() {
  const axiosSecure = useAxiosSec();
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const validatePassword = (pass) => {
    if (pass.length < 8) {
      setValidationMessage("পাসওয়ার্ড ৮ সংখ্যার হতে হবে।");
    } else if (!/[A-Z]/.test(pass)) {
      setValidationMessage(
        "পাসওয়ার্ডে সর্বনিম্ন একটি ইংরেজি বড় হাতের অক্ষর থাকতে হবে।"
      );
    } else if (!/[a-z]/.test(pass)) {
      setValidationMessage(
        "পাসওয়ার্ডে সর্বনিম্ন একটি ইংরেজি ছোট হাতের অক্ষর থাকতে হবে।"
      );
    } else if (!/[0-9]/.test(pass)) {
      setValidationMessage(
        "পাসওয়ার্ডে সর্বনিম্ন একটি গাণিতিক সংখ্যা থাকতে হবে।"
      );
    } else if (!/[!@#$%^&*]/.test(pass)) {
      setValidationMessage(
        "পাসওয়ার্ডে সর্বনিম্ন একটি বিশেষ চিহ্ন থাকতে হবে। (!@#$%^&*)."
      );
    } else {
      setValidationMessage("");
      setPassword(pass);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const validPassword = password;
    const role = form.role.value;
    const newUser = { name, email, password, role };

    // TODO: Send `newUser` to backend API
    form.reset();
    if (!validPassword || validationMessage) {
      return;
    }
    try {
      // Save user data to the database:
      const { data } = await axiosSecure.post(`/create-user`, newUser);

      // Success message and redirection:
      if (data?.message) {
        return Swal.fire(`${data?.message}`);
      }
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name}’কে সফলভাবে ${role}-এ অনুমতি দেয়া হয়েছে!`,
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-2 md:p-6 min-h-screen">
      {/* Header Section */}
      <div className="bg-primary text-white p-4 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">নতুন ইউজার তৈরি করুন</h2>
        <p className="text-sm md:text-base mt-1">
          শিক্ষক/হিসাবরক্ষক/অ্যাডমিন রেজিস্ট্রেশনের জন্য নিচের ফর্ম পূরণ করুন।
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleCreateUser}
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
            placeholder="example@email.com"
            className="input input-bordered"
            required
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-primary">পাসওয়ার্ড</span>
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => validatePassword(e.target.value)}
            placeholder="********"
            className="input input-bordered"
            required
          />
          {validationMessage && (
            <p className="pt-2 text-sm text-red-500 font-heebo">
              {validationMessage}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-primary">
              ভূমিকা নির্বাচন করুন
            </span>
          </label>
          <select
            name="role"
            className="select select-bordered"
            required
            defaultValue={""}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Teacher">শিক্ষক/শিক্ষিকা</option>
            <option value="Accountant">হিসাবরক্ষক</option>
            <option value="Admin">এডমিন</option>
          </select>
        </div>

        {/* Submit */}
        <div className="form-control mt-6">
          <button className="btn bg-green-600 text-white hover:bg-green-700">
            ইউজার তৈরি করুন
          </button>
        </div>
      </form>
    </div>
  );
}
