import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { format } from "date-fns";
import { Loading } from "../../../components/Shared/Loading";
import { FaPrint, FaArrowLeft, FaUserAlt, FaHistory } from "react-icons/fa";

const StuPaymentHistory = () => {
  const { id: studentID } = useParams();
  const [searchParams] = useSearchParams();
  const session = searchParams.get("session");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSec();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student-statement", studentID, session],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/fees/student-statement/${studentID}?session=${session}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  const { student, payments = [], summary = {} } = data || {};

  // ================= PRINT HANDLER =================
  const handlePrint = () => {
    const printContent = document.getElementById("print-only-area").innerHTML;
    const win = window.open("", "", "width=900,height=700");
    win.document.write(`
      <html>
        <head>
          <title>Student_Statement_${student?.studentID}</title>
          <style>
            @page { size: A4; margin: 10mm; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; }
            .header { text-align: center; border-bottom: 2px solid #16a34a; padding-bottom: 10px; margin-bottom: 15px; }
            .school-name { font-size: 22px; font-weight: bold; color: #166534; margin: 0; }
            .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px; font-size: 12px; background: #f9fafb; padding: 10px; border-radius: 5px; }
            .info-item b { color: #166534; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; }
            th { background: #16a34a; color: white; padding: 8px; border: 1px solid #ddd; }
            td { padding: 6px; border: 1px solid #ddd; text-align: center; }
            .summary { display: flex; justify-content: space-between; margin: 15px 0; padding: 10px; border: 1px dashed #16a34a; border-radius: 5px; font-size: 12px; }
            .signature-row { display: flex; justify-content: space-between; margin-top: 50px; font-size: 12px; }
            .sig-box { border-top: 1px solid #333; width: 150px; text-align: center; padding-top: 5px; }
            .no-print { display: none; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 font-sans">
      {/* HEADER SECTION */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4 no-print">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-2">
            <FaHistory className="text-green-600" /> পেমেন্ট স্টেটমেন্ট
          </h1>
          <p className="text-slate-500">
            শিক্ষার্থীর সকল লেনদেনের বিস্তারিত তালিকা
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost border-slate-300 hover:bg-slate-200"
          >
            <FaArrowLeft /> ফিরে যান
          </button>
          <button
            onClick={handlePrint}
            className="btn bg-[#166534] hover:bg-green-800 text-white shadow-lg"
          >
            <FaPrint /> প্রিন্ট রিপোর্ট
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* STUDENT INFO CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#166534] px-6 py-3 flex items-center gap-2 text-white">
            <FaUserAlt />{" "}
            <span className="font-bold">শিক্ষার্থীর প্রোফাইল</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataBox
              label="শিক্ষার্থীর নাম"
              value={student?.name}
              color="green"
            />
            <DataBox
              label="স্টুডেন্ট আইডি"
              value={student?.studentID}
              color="blue"
            />
            <DataBox
              label="শ্রেণী ও রোল"
              value={`${student?.className} (${student?.classRoll})`}
              color="orange"
            />
            <DataBox
              label="পিতার নাম"
              value={student?.fatherName}
              color="slate"
            />
          </div>
        </div>

        {/* SUMMARY DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="মোট পরিশোধ"
            value={`${summary?.totalPaid || 0} ৳`}
            icon="💰"
            color="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            title="সর্বশেষ পেমেন্ট"
            value={
              summary?.lastPaidAt
                ? format(new Date(summary.lastPaidAt), "dd MMM, yyyy")
                : "N/A"
            }
            icon="📅"
            color="bg-blue-50 text-blue-700"
          />
          <StatCard
            title="লেনদেনের সংখ্যা"
            value={payments.length}
            icon="📊"
            color="bg-purple-50 text-purple-700"
          />
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="py-4">তারিখ</th>
                  <th>ধরণ</th>
                  <th>বিবরণ</th>
                  <th className="text-right">পরিমাণ</th>
                  <th>গ্রহণকারী</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-green-50/50 transition-colors"
                  >
                    <td className="font-medium">
                      {p?.paidAt
                        ? format(new Date(p.paidAt), "dd MMM yyyy")
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${p.type === "Admission" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}
                      >
                        {p?.type}
                      </span>
                    </td>
                    <td className="text-slate-500 italic max-w-xs truncate">
                      {Array.isArray(p?.description)
                        ? p.description.join(", ")
                        : p?.description}
                    </td>
                    <td className="text-right font-bold text-slate-800">
                      {p?.amount} ৳
                    </td>
                    <td className="text-slate-400 text-sm">
                      {p?.paidBy?.split("@")[0] || "Admin"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= HIDDEN PRINT LAYOUT ================= */}
      <div id="print-only-area" className="hidden">
        <div className="header">
          <h1 className="school-name">শাহ নেয়ামত (রহ:) কেজি এন্ড হাই স্কুল</h1>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            শিক্ষার্থী পেমেন্ট বিবরণী (সেশন: {session})
          </p>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <b>নাম:</b> {student?.name}
          </div>
          <div className="info-item">
            <b>আইডি:</b> {student?.studentID}
          </div>
          <div className="info-item">
            <b>শ্রেণী:</b> {student?.className}
          </div>
          <div className="info-item">
            <b>রোল:</b> {student?.classRoll}
          </div>
          <div className="info-item">
            <b>পিতা:</b> {student?.fatherName}
          </div>
          <div className="info-item">
            <b>সেশন:</b> {student?.session}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>তারিখ</th>
              <th>ধরণ</th>
              <th>বিবরণ</th>
              <th>পরিমাণ</th>
              <th>গ্রহণকারী</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i}>
                <td>
                  {p?.paidAt ? format(new Date(p.paidAt), "dd/MM/yyyy") : "—"}
                </td>
                <td>{p?.type}</td>
                <td>
                  {Array.isArray(p?.description)
                    ? p.description[0]
                    : p?.description}
                </td>
                <td>
                  <b>{p?.amount} ৳</b>
                </td>
                <td>{p?.paidBy?.split("@")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary">
          <div>
            মোট লেনদেন সংখ্যা: <b>{payments.length}</b>
          </div>
          <div style={{ fontSize: "16px" }}>
            মোট পরিশোধিত টাকা: <b>{summary?.totalPaid || 0} ৳</b>
          </div>
        </div>

        <div className="signature-row">
          <div className="sig-box">হিসাবরক্ষক</div>
          <div className="sig-box">গ্রহীতার স্বাক্ষর</div>
        </div>
      </div>
    </div>
  );
};

/* ================= COMPONENT HELPER ================= */

const DataBox = ({ label, value, color }) => (
  <div className="space-y-1">
    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
      {label}
    </p>
    <p
      className={`text-slate-700 font-semibold border-l-4 border-${color}-500 pl-3 bg-slate-50 py-1 rounded-r`}
    >
      {value || "—"}
    </p>
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`${color} p-5 rounded-2xl flex items-center justify-between shadow-sm`}
  >
    <div>
      <p className="text-xs font-bold uppercase opacity-70">{title}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
    <span className="text-3xl opacity-30">{icon}</span>
  </div>
);

export default StuPaymentHistory;
