import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import Swal from "sweetalert2";
const AddExamFee = () => {
  const axiosSecure = useAxiosSec();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const className = form.className.value;
    const session = form.session.value;
    const examName = form.examName.value;
    const deadline = form.deadline.value;
    const amount = parseInt(form.examFee.value);

    const examFeeData = {
      className,
      session,
      examName,
      deadline,
      amount,
      status: "Due",
    };
    try {
      const { data } = await axiosSecure.patch("/add-exam-fee", examFeeData);
      if (data?.message) {
        Swal.fire({
          title: "???",
          text: `${data?.message}`,
          icon: "info",
        });
      }
      if (data.modifiedCount) {
        Swal.fire({
          title: "সফল হয়েছে!",
          text: `${className}-এর ${examName} পরীক্ষার ফি যুক্ত হয়েছে!!!`,
          icon: "success",
        });
        
      }
    } catch (err) {
      console.log("Add exam fees Error--->", err);
    }
  };
  return (
    <>
      <div className="p-6 min-h-screen">
        <h2 className="text-2xl md:text-4xl text-green-950 font-bold text-center">
          পরীক্ষার ফি যোগ
        </h2>
        <div className="divider"></div>

        {/* Filter Inputs */}
        <form
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
          onSubmit={handleSubmit}
        >
          {/* choose class */}
          <div className="form-control md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">শ্রেণী:</span>
            </label>
            <select
              defaultValue={""}
              name="className"
              className="select select-bordered w-full max-sm:text-xs"
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
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-xs">শিক্ষাবর্ষ:</span>
            </label>
            <select
              name="session"
              defaultValue={""}
              className="select select-bordered w-full max-sm:text-xs"
              required
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

          {/* choose exam */}
          <div className="form-control md:col-span-3">
            <label className="label">
              <span className="label-text max-sm:text-xs">পরীক্ষার নাম:</span>
            </label>
            <select
              name="examName"
              defaultValue={""}
              className={`select select-bordered w-full max-sm:text-xs`}
              required
            >
              <option value={""}>পরীক্ষা নির্বাচন করুন</option>
              <option value="1st-Semester">1st Semester</option>
              <option value="2nd-Semester">2nd Semester</option>
              <option value="3rd-Semester">3rd Semester</option>
              <option value="Half-Yearly">Half Yearly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          {/* last payment Date */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-xs">
                পরিশোধের শেষ সময়
              </span>
            </label>
            <input
              type="date"
              name="deadline"
              defaultValue={new Date()}
              className="select select-bordered w-full max-sm:text-xs"
            />
          </div>

          {/* exam fee */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text max-sm:text-xs">পরীক্ষার ফি:</span>
            </label>
            <input
              className="select select-bordered w-full max-sm:text-xs"
              type="number"
              name="examFee"
              min={0}
              required
              placeholder="পরিমাণ (টাকায়)"
            />
          </div>

          <div className="md:col-span-12 w-fit mx-auto flex items-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              যোগ করুন
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddExamFee;
