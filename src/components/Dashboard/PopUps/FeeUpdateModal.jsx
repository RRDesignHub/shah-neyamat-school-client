import { useState, useEffect } from "react";

const FeeUpdateModal = ({ isOpen, onClose, student }) => {
  const [monthlyFee, setMonthlyFee] = useState("");
  const [previousDue, setPreviousDue] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (student) {
      setMonthlyFee(student.monthlyFee || "");
      setPreviousDue("");
      setNote("");
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      studentId: student._id,
      newMonthlyFee: Number(monthlyFee),
      previousDueAmount: Number(previousDue || 0),
      note,
    };

    console.log("Fee Update Payload:", payload);

    // API call will be added next step
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

          {/* Previous Due */}
          <div>
            <label className="label-text">পূর্বের বকেয়া (৳)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="যদি থাকে"
              value={previousDue}
              onChange={(e) => setPreviousDue(e.target.value)}
            />
          </div>

          {/* Note */}
          <div>
            <label className="label-text">নোট (ঐচ্ছিক)</label>
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
              সংরক্ষণ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeUpdateModal;
