import { useState } from "react";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import Swal from "sweetalert2";

const AddTeacher = () => {
  const axiosSecure = useAxiosSec();
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    profileImage: "", // URL for profile image
    role: "",
    category: "",
    specialization: "",
    qualification: "", // Stored as a string, will be split into an array
    mobileNo: "",
    joinedAt: new Date(),
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission, splitting qualification string into an array
    const teacherData = {
      ...formData,
      qualification: formData.qualification
        .split("\n") // Split by new line
        .map((q) => q.trim()) // Trim whitespace from each line
        .filter((q) => q !== ""), // Remove empty lines
    };

    const { data } = await axiosSecure.post("/add-teacher", teacherData);
    if (data?.message) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data?.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (data?.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `সফলভাবে ${teacherData.name} এর তথ্য যোগ করা হয়েছে!!!`,
        showConfirmButton: false,
        timer: 1500,
      });
      // Optionally reset the form after submission
      setFormData({
        name: "",
        profileImage: "",
        role: "",
        category: "",
        specialization: "",
        qualification: "",
        mobileNo: "",
      });
    }
  };

  return (
    <div className="w-full md:w-11/12 max-sm:px-2 p-4 mx-auto my-2 md:my-10 bg-gradient-to-br from-green-50 to-white border-2 border-green-400 shadow-xl rounded-xl">
      <h2 className="text-xl md:text-3xl font-bold text-center text-green-700 mb-4">
        নতুন শিক্ষক যোগ করুন
      </h2>{" "}
      {/* Translated title */}
      <div className="divider my-0"></div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 gap-2 md:gap-5"
      >
        {/* Name Input */}
        <div className="col-span-12 md:col-span-6">
          <label
            htmlFor="name"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            শিক্ষকের নাম:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="যেমন: জন ডো"
            required
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
          />
        </div>

        {/* Profile Image URL Input */}
        <div className="col-span-6 md:col-span-3">
          <label
            htmlFor="profileImage"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            প্রোফাইল ছবির URL:
          </label>
          <input
            type="url"
            id="profileImage"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="যেমন: https://example.com/profile.jpg"
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
          />
        </div>

        {/* Role Input */}
        <div className="col-span-6 md:col-span-3">
          <label
            htmlFor="role"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            পদবি:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="যেমন: সিনিয়র লেকচারার"
            required
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
          />
        </div>

        {/* Qualification Textarea */}
        <div className="col-span-12">
          <label
            htmlFor="qualification"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            যোগ্যতা (প্রতি লাইনে একটি):
          </label>
          <textarea
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="যেমন: শিক্ষায় পিএইচডি, ইংরেজিতে এম.এ, গণিতে বি.এসসি"
            rows="3"
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 resize-y"
          ></textarea>
        </div>

        {/* category */}
        <div className="col-span-6 md:col-span-4">
          <label
            htmlFor="category"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            শিক্ষকের বিভাগ:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 
     border-green-300`}
            required
          >
            <option value="" disabled>
              নির্বাচন করুন
            </option>
            <option value="Primary">প্রাথমিক</option>
            <option value="Higher">মাধ্যমিক</option>
            <option value="Primary & Higher">উভয়</option>
          </select>
        </div>
        {/* Specialization Input */}
        <div className="col-span-6 md:col-span-4">
          <label
            htmlFor="specialization"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            বিশেষীকরণ:
          </label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="যেমন: গণিত, ইংরেজি সাহিত্য"
            required
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
          />
        </div>

        {/* mobile no */}
        <div className="col-span-12 md:col-span-4">
          <label
            htmlFor="name"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            মোবাইল নম্বর :
          </label>
          <input
            type="number"
            min={0}
            id="name"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="যেমন: 01812-345678"
            required
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
          />
        </div>

        {/* mobile no */}
        <div className="col-span-12 md:col-span-4">
          <label
            htmlFor="name"
            className="block text-xs md:text-lg font-semibold text-green-700 mb-2"
          >
            যোগদানের তারিখ:
          </label>
          <input
            type="date"
            id="name"
            name="joinedAt"
            value={formData.joinedAt}
            onChange={handleChange}
            required
            className="w-full px-2 md:px-4 py-2 md:py-3 max-sm:text-[7px] border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-12 w-fit mx-auto max-sm:text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          শিক্ষক যোগ করুন
        </button>
      </form>
    </div>
  );
};
export default AddTeacher;
