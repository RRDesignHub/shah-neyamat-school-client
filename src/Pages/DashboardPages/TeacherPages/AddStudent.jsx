import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import imageUpload from "../../../Api/Utils";
import useAuth from "../../../Hooks/useAuth";
export const AddStudent = () => {
  const axiosSecure = useAxiosSec();
  const [imageFile, setImageFile] = useState(null);
  const [largeFile, setLargeFile] = useState(null);
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      className: "Play",
      classRoll: "",
      sectionName: "",
      groupName: "",
      birthRegNo: "",
      dateOfBirth: "",
      session: new Date().getFullYear().toString(),
      studentName: "",
      fatherName: "",
      motherName: "",
      bloodGroup: "A+",
      gender: "Male",
      religion: "Islam",
      mobileNo: "",
      admissionFee: 700,
      previousDue: 0,
    },
  });
  useEffect(() => {
    if (imageFile && imageFile?.size >= 40000) {
      return setLargeFile("ছবি অবশ্যই 40kb এর সমান বা ছোট হতে হবে!");
    } else {
      setLargeFile(null);
    }
  }, [imageFile]);

  const handleStudentData = async (data) => {
    if (imageFile && imageFile?.size >= 40000) {
      return;
    }

    try {
      // image file upload to imageBB:
      let photoURL;
      if (imageFile) {
        photoURL = await imageUpload(imageFile);
      }
      const studentData = {
        ...data,
        studentID: `SN-${data.session}${data.birthRegNo.toString().slice(-4)}`,
        image: photoURL || "https://i.ibb.co.com/V0jk4tCT/images.png",
        classRoll: data.classRoll.toString(),
        mobileNo: parseInt(data.mobileNo),
        admissionFee: parseInt(data?.admissionFee),
        previousDue: parseInt(data?.previousDue),
      };

      const { data: response } = await axiosSecure.post(
        `/add-student`,
        studentData
      );

      if (response?.message) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: `${response.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (response.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `সফলভাবে ${data.studentName} এর তথ্য Add করা হয়েছে!!!`,
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
      }
    } catch (err) {
      console.log("Student data adding Error-->", err);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-10">
        <form
          onSubmit={handleSubmit(handleStudentData)}
          className="card-body max-sm:px-3 bg-green-200 rounded-2xl py-5 md:py-8 "
        >
          <h1 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
            শিক্ষার্থীর তথ্য সংযুক্তি
          </h1>
          <div className="divider my-0"></div>
          <div className="grid gap-2 grid-cols-12">
            {/* Class Name */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">শ্রেণী: (*)</span>
              </label>
              <select
                {...register("className", { required: true })}
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
                <span className="label-text max-sm:text-xs">রোল: (*)</span>
              </label>
              <input
                type="number"
                min={1}
                {...register("classRoll", { required: true, min: 1 })}
                placeholder="শ্রেণী রোল..."
                className="input input-bordered"
              />
            </div>
            {/* Section */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">শাখা:</span>
              </label>
              <select
                {...register("sectionName")}
                className="select select-bordered"
              >
                <option value="" disabled>
                  শাখা নির্বাচন করুন...
                </option>
                {["A", "B", "C", "D", "E"].map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            {/* Group */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">বিভাগ:</span>
              </label>
              <select
                {...register("groupName")}
                className="select select-bordered"
              >
                <option value="" disabled>
                  বিভাগ নির্বাচন করুন...
                </option>
                {["Science", "Commerce", "Arts", "Vocational"].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            {/* Birth Registration No */}
            <div className="form-control col-span-12 md:col-span-8">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  জন্মনিবন্ধন নম্বর: (*)
                </span>
              </label>
              <input
                type="number"
                {...register("birthRegNo", { required: true })}
                min={0}
                placeholder="জন্মনিবন্ধন নম্বর লিখুন..."
                className="input input-bordered"
              />
            </div>
            {/* Date of Birth */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  জন্ম তারিখ: (*)
                </span>
              </label>
              <input
                type="date"
                {...register("dateOfBirth", { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            {/* Session */}
            <div className="form-control col-span-6 md:col-span-2">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  শিক্ষাবর্ষ: (*)
                </span>
              </label>
              <select
                {...register("session", { required: true })}
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
                  শিক্ষার্থীর নাম: (*)
                </span>
              </label>
              <input
                type="text"
                {...register("studentName", { required: true })}
                placeholder="ইংরেজিতে শিক্ষার্থীর নাম..."
                className="input input-bordered"
              />
            </div>
            {/* Father's Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  বাবার নাম: (*)
                </span>
              </label>
              <input
                type="text"
                {...register("fatherName", { required: true })}
                placeholder="ইংরেজিতে বাবার নাম..."
                className="input input-bordered"
              />
            </div>
            {/* Mother's Name */}
            <div className="form-control col-span-12 md:col-span-6">
              <label className="label">
                <span className="label-text max-sm:text-xs">
                  মায়ের নাম: (*)
                </span>
              </label>
              <input
                type="text"
                {...register("motherName", { required: true })}
                placeholder="ইংরেজিতে মায়ের নাম..."
                className="input input-bordered"
              />
            </div>
            {/* Blood Group */}
            <div className="form-control col-span-6 md:col-span-3">
              <label className="label">
                <span className="label-text max-sm:text-xs">রক্তের গ্রুপ:</span>
              </label>
              <select
                {...register("bloodGroup", { required: true })}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a blood group
                </option>
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
                <span className="label-text max-sm:text-xs">লিঙ্গ: (*)</span>
              </label>
              <select
                {...register("gender", { required: true })}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select your gender
                </option>
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
                {...register("religion", { required: true })}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select religion
                </option>
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
                  শিক্ষার্থীর ছবি (jpg, jpeg, png)
                </span>
              </label>
              <input
                type="file"
                name="imageFile"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className="select mb-2 px-4 py-2 select-bordered"
              />
              {largeFile && (
                <small className="text-[7px] md:text-sm text-red-500">
                  {largeFile}
                </small>
              )}
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
                {...register("mobileNo", { required: true })}
                min={0}
                placeholder="+880123-4567890"
                className="input input-bordered"
              />
            </div>

            {/* fees data */}
            {/* Admission Fee */}
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
                placeholder="ভর্তি ফি লিখুন"
                className="input input-bordered"
              />
              <label className="label">
                <span className="label-text-alt text-[10px] text-gray-500">
                  নোট: শিক্ষার্থীর ভর্তি ফি। না থাকলে খালি রাখুন।
                </span>
              </label>
            </div>

            {/* Previous Due */}
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
                placeholder="পূর্ববর্তী বকেয়া লিখুন (যদি থাকে)..."
                className="input input-bordered"
              />
              <label className="label">
                <span className="label-text-alt text-[10px] text-gray-500">
                  নোট: পূর্বের কোনো বকেয়া থাকলে এখানে লিখুন।
                </span>
              </label>
            </div>
          </div>

          <div className="form-control w-fit flex-row gap-2 md:gap-4 ms-auto mt-6">
            <button
              type="submit"
              className="btn bg-green-600 px-5 hover:bg-green-700 md:text-lg text-white"
            >
              শিক্ষার্থীর তথ্য যোগ করুন
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
