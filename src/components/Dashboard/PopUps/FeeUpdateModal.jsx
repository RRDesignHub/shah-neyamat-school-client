import { useState, useEffect } from "react";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import Swal from "sweetalert2";

const FeeUpdateModal = ({ isOpen, onClose, student, refetch }) => {
  const axiosSec = useAxiosSec();
  const [monthlyFee, setMonthlyFee] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (student) {
      setMonthlyFee(student.monthlyFee || "");
      setNote("");
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        studentID: student.studentID,
        newMonthlyFee: Number(monthlyFee),
        note,
      };

      const { data } = await axiosSec.patch(`/update-fee`, payload);

      if (data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "মাসিক বেতন আপডেট করা হয়েছে!",
          showConfirmButton: false,
          timer: 1500,
        });

        // ১. মডাল বন্ধ করা
        onClose();

        refetch();
      }
    } catch (err) {
      console.error("Fee Update Error:", err);
      Swal.fire({
        icon: "error",
        title: "দুঃখিত...",
        text: err.response?.data?.message || "বেতন পরিবর্তন করা সম্ভব হয়নি!",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-green-100 rounded-lg w-full max-w-lg p-6">
        <h2 className="md:text-xl text-center font-semibold mb-1">
          বেতন পরিবর্তন
        </h2>
        <div className="divider my-1"></div>
        {/* Student Info */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <p>
            <b>নাম:</b> {student.name}
          </p>
          <p>
            <b>শ্রেণী:</b> {student.className}
          </p>
          <p>
            <b>রোল:</b> {student.classRoll}
          </p>
          <p>
            <b>ID:</b> {student.studentID}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Monthly Fee */}
          <div>
            <label className="label-text">মাসিক বেতন</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(e.target.value)}
              required
            />
          </div>

          {/* Note */}
          <div>
            <label className="label-text">পরিবর্তনের কারণ (ঐচ্ছিক)</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="কারণ / মন্তব্য"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="btn btn-sm">
              বাতিল
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              পরিবর্তন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeUpdateModal;
