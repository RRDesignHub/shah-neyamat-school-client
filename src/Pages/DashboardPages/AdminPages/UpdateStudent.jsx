import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";
import imageUpload from "../../../Api/Utils";
export default function UpdateStudent() {
  const { id } = useParams();
  const axiosSecure = useAxiosSec();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imgErr, setImgErr] = useState("");

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: async () => {
      const res = await axiosSecure.get(`/student/${id}`);
      const student = res.data;
      return {
        ...student,
        dateOfBirth: new Date(student.dateOfBirth),
      };
    },
  });

  useEffect(() => {
    if (imageFile && imageFile?.size >= 40000) {
      return setImgErr("ছবি অবশ্যই 40kb এর সমান বা ছোট হতে হবে!");
    } else {
      setImgErr(null);
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    if (imageFile && imageFile?.size >= 40000) return;

    try {
      let photoURL = data.image;
      if (imageFile) {
        photoURL = await imageUpload(imageFile);
      }

      // studentID এবং birthRegNo বাদে বাকি সব আপডেট হবে
      const { studentID, birthRegNo, _id, ...restOfData } = data;

      const finalData = {
        ...restOfData,
        image: photoURL,
        classRoll: data.classRoll.toString(),
        mobileNo: data.mobileNo.toString(),
        // ডাটা টাইপ ঠিক করা হচ্ছে
        admissionFee: Number(data.admissionFee || 0),
        previousDue: Number(data.previousDue || 0),
      };

      const { data: response } = await axiosSecure.patch(
        `/update-student/${id}`,
        finalData
      );

      if (response.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "তথ্য আপডেট সফল হয়েছে!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/students");
      }
    } catch (err) {
      console.error("Update Error:", err);
      Swal.fire({
        icon: "error",
        title: "আপডেট ব্যর্থ হয়েছে",
        text: err.response?.data?.message || "সার্ভারে সমস্যা হয়েছে",
      });
    }
  };

  return (
    <div className="w-full md:w-11/12 max-sm:px-2 mx-auto my-10">
      {!register ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body max-sm:px-2 bg-green-200 rounded-2xl py-5 md:py-8 "
        >
          <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
            শিক্ষার্থীর তথ্য পরিবর্তন
          </h1>
          <div className="divider my-0"></div>
          <div className="grid gap-2 grid-cols-12">
            {/* Class Name */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">শ্রেণি:</span>
              </label>
              <select
                {...register("className")}
                className="select select-bordered"
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
                ].map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Roll Number */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">রোল নম্বর:</span>
              </label>
              <input
                type="number"
                {...register("classRoll", { required: true })}
                placeholder="Type class roll..."
                className="input input-bordered"
              />
            </div>

            {/* Section */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">শাখা:</span>
              </label>
              <input
                type="text"
                {...register("sectionName")}
                placeholder="Type branch name..."
                className="input input-bordered"
              />
            </div>

            {/* Group */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">বিভাগ:</span>
              </label>
              <input
                type="text"
                {...register("groupName")}
                placeholder="Type department..."
                className="input input-bordered"
              />
            </div>

            {/* Birth Registration No (Read Only) */}
            <div className="form-control col-span-12 md:col-span-8">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  জন্ম নিবন্ধন নম্বর: (অপরিবর্তনযোগ্য)
                </span>
              </label>
              <input
                type="text"
                {...register("birthRegNo")}
                readOnly
                className="input input-bordered bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Date of Birth */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text max-sm:text-xs">জন্ম তারিখ:</span>
              </label>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                )}
              />
            </div>

            {/* Session */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text max-sm:text-xs">শিক্ষাবর্ষ:</span>
              </label>
              <select
                {...register("session")}
                className="select select-bordered"
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

            {/* Student Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  শিক্ষার্থীর নাম:
                </span>
              </label>
              <input
                type="text"
                {...register("studentName", { required: true })}
                placeholder="Type student name..."
                className="input input-bordered"
              />
            </div>

            {/* Father's Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">বাবার নাম:</span>
              </label>
              <input
                type="text"
                {...register("fatherName")}
                placeholder="Father's name..."
                className="input input-bordered"
              />
            </div>

            {/* Mother's Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">মায়ের নাম:</span>
              </label>
              <input
                type="text"
                {...register("motherName")}
                placeholder="Mother's name..."
                className="input input-bordered"
              />
            </div>

            {/* Blood Group */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">রক্তের গ্রুপ:</span>
              </label>
              <select
                {...register("bloodGroup")}
                className="select select-bordered"
              >
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Gender */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">লিঙ্গ:</span>
              </label>
              <select
                {...register("gender")}
                className="select select-bordered"
              >
                {["Male", "Female"].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Religion */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">ধর্ম:</span>
              </label>
              <select
                {...register("religion")}
                className="select select-bordered"
              >
                {["Islam", "Hindu", "Cristian"].map((religion) => (
                  <option key={religion} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  ছবি (jpg, jpeg, png):
                </span>
              </label>
              <input
                type="file"
                name="imageFile"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className={`select mb-2 px-4 py-2 select-bordered ${
                  imgErr ? "border-red-500" : ""
                }`}
              />

              <small className="text-red-500">{imgErr && imgErr}</small>
            </div>

            {/* Mobile Number */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  মা/বাবার মোবাইল নম্বর: (*)
                </span>
              </label>
              <input
                type="number"
                min={0}
                {...register("mobileNo", { required: true })}
                placeholder="+880123-4567890"
                className="input input-bordered"
              />
            </div>
          </div>

          {/* Admission Fee - Editable */}
          <div className="form-control col-span-12 md:col-span-6">
            <label className="label">
              <span className="label-text max-sm:text-xs">
                ভর্তি ফি (Admission Fee):
              </span>
            </label>
            <input
              type="number"
              min={0}
              {...register("admissionFee")}
              className="input input-bordered focus:border-green-500"
            />
          </div>

          {/* Previous Due - Editable */}
          <div className="form-control col-span-12 md:col-span-6">
            <label className="label">
              <span className="label-text max-sm:text-xs">
                পূর্ববর্তী বকেয়া (Previous Due):
              </span>
            </label>
            <input
              type="number"
              min={0}
              {...register("previousDue")}
              className="input input-bordered focus:border-green-500"
            />
          </div>

          <div className="form-control w-fit ms-auto mt-6">
            <button className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white">
              Update Student's Data
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
