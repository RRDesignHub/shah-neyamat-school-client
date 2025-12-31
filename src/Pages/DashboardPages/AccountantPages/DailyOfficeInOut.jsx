import { useForm } from "react-hook-form";
import { FaSave, FaHistory, FaCalculator, FaFilePdf } from "react-icons/fa";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loading } from "../../../components/Shared/Loading";
import { Helmet } from "react-helmet";
const printStyles = `
  @media print {
    /* Hide everything on the page */
    body * {
      visibility: hidden;
    }
    /* Only show the element with id 'printable-ledger' */
    #printable-ledger, #printable-ledger * {
      visibility: visible;
    }
    #printable-ledger {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px;
      visibility: visible !important;
    }
    /* Clean up the print look */
    .no-print {
      display: none !important;
    }
    @page {
      size: A4;
      margin: 15mm;
    }
  }
`;
const DailyOfficeInOut = () => {
    const axiosSecure = useAxiosSec();
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "income",
      date: new Date().toISOString().split("T")[0], // Defaults to today
    },
  });

//   get the existig current ledger data from DB:

const today = new Date().toISOString().split("T")[0];

const { data: ledgerResponse = {}, isLoading, refetch } = useQuery({
    
    queryKey: ["ledger", today], 
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/get-daily-ledger?date=${today}`
      );
      return data;
    },
});

// Extract data from the response object 
const dailyEntries = ledgerResponse.entries || [];
const summary = {
    totalIncome: ledgerResponse.totalIncome || 0,
    totalExpense: ledgerResponse.totalExpense || 0,
    netBalance: ledgerResponse.netBalance || 0
};


  // Watch the "type" field to dynamically update categories
  const watchType = watch("type");

  const categories = {
    income: [
      "মাসিক বেতন",
      "পরীক্ষার ফি",
      "ভর্তি ফি",
      "বকেয়া ফি",
      "ক্রীড়া ও মার্কশিট",
      "পণ্য বিক্রি",
      "অন্যান্য আয়",
    ],
    expense: [
      "শিক্ষকের সম্মানি",
      "আপ্যায়ন বাবদ",
      "মনিহারি ও কালি",
      "মেরামত ও উন্নয়ন",
      "বিদ্যুৎ ও ওয়াইফাই",
      "অন্যান্য খরচ",
    ],
  };

  // Function to handle form submission
  const onSubmit = async (data) => {
  // Formatting the data for your Central Ledger
  const dailyLedgerData = {
    ...data,
    amount: parseFloat(data.amount),
    timestamp: new Date().toISOString(),
  };

  try {
    const { data: res } = await axiosSecure.post(`/add-daily-ledger`, dailyLedgerData);

    if (res.insertedId) {
      // Success Alert in Bangla
      Swal.fire({
        position: "center",
        icon: "success",
        title: "হিসাবটি সফলভাবে সংরক্ষণ করা হয়েছে!",
        text: `${data.type === 'income' ? 'আয়' : 'ব্যয়'}: ${data.category} - ${data.amount} টাকা`,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: 'font-serif', // Matching your school theme
        }
      });
      refetch();
      reset(); // Clear form after success
    }
  } catch (err) {
    console.log("Ledger adding error -->", err);
    
    // Error Alert in Bangla
    Swal.fire({
      icon: "error",
      title: "দুঃখিত!",
      text: "তথ্যটি সংরক্ষণ করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#166534",
    });
  }
};

// print daily ladger data
const handlePrint = () => {
    window.print();
  };
  return (
      <>
       <Helmet>
              <title>SN-DailyLedger</title>
            </Helmet>
        <style>{printStyles}</style>
    <div className="p-4 md:p-8 bg-green-50 min-h-screen font-serif">
      <h2 className="text-center text-2xl md:text-4xl font-bold text-green-900 mb-6 border-b-2 border-green-200 pb-2">
        দৈনিক আয়-ব্যয় হিসাব
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-800">
            <FaCalculator /> নতুন হিসাব যুক্ত করুন
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">তারিখ</label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">হিসাবের ধরণ</label>
              <select
                {...register("type", { required: true })}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
              >
                <option value="income">আয় (Income +)</option>
                <option value="expense">ব্যয় (Expense -)</option>
              </select>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ক্যাটাগরি</label>
              <select
                {...register("category", { required: "ক্যাটাগরি সিলেক্ট করুন" })}
                className={`w-full p-2.5 border rounded-lg focus:ring-2 outline-none bg-white ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">বাছাই করুন</option>
                {categories[watchType]?.map((cat, index) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">বিস্তারিত বিবরণ</label>
              <textarea
                {...register("description", { required: "বিবরণ আবশ্যক" })}
                rows="2"
                placeholder="যেমন: ৩য় শ্রেণীর মাসিক বেতন"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">টাকার পরিমাণ (৳)</label>
              <input
                type="number"
                {...register("amount", { 
                    required: "টাকার পরিমাণ লিখুন", 
                    min: { value: 1, message: "পরিমাণ ১ এর বেশি হতে হবে" } 
                })}
                placeholder="0.00"
                className={`w-full p-2.5 border rounded-lg focus:ring-2 outline-none font-sans ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#166534] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition shadow-lg"
            >
              <FaSave /> সেভ করুন
            </button>
          </form>
        </div>

        {/* Preview/Summary Table Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-green-500">
              <p className="text-xs text-gray-500 uppercase">মোট আয়</p>
              <p className="text-xl font-bold text-green-700">৳ {summary?.totalIncome}</p> {/* Example from Ledger */}
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-red-500">
              <p className="text-xs text-gray-500 uppercase">মোট ব্যয়</p>
              <p className="text-xl font-bold text-red-600">৳ {summary?.totalExpense}</p> {/* Example from Ledger */}
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-blue-500 col-span-2 md:col-span-1">
              <p className="text-xs text-gray-500 uppercase">ক্যাশ ইন হ্যান্ড</p>
              <p className="text-xl font-bold text-blue-700">৳ {summary?.netBalance}</p>
            </div>
          </div>

          {/* Table */}
          {
            isLoading ? <Loading /> : <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex flex-col md:flex-row justify-between items-center">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <FaHistory /> আজকের লেনদেন
              <span className="text-sm text-gray-500">({format(new Date(today), "MMMM dd, yyyy")})</span>
              </h3>
              <button
                           onClick={handlePrint}
                              className="btn btn-md bg-green-600 text-green-50 hover:bg-green-500"
                            >
                              প্রিন্ট করুন <FaFilePdf />
                            </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="p-4">ক্যাটাগরি</th>
                    <th className="p-4">বিবরণ</th>
                    <th className="p-4 text-right">আয় (In)</th>
                    <th className="p-4 text-right">ব্যয় (Out)</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                   {dailyEntries.length > 0 ? (
                dailyEntries.map((logs, idx) => (
                  <tr>
                    <td className="p-4">{logs?.category}</td>
                    <td className="p-4">{logs?.description}</td>
                    <td className="p-4 sm:text-[8px] md:text-sm text-right text-green-700">৳ {logs?.type === "income" ? logs?.amount : "--"}</td>
                    <td className="p-4 sm:text-[8px] md:text-sm text-right text-red-600 font-bold">৳ {logs?.type === "expense" ? logs?.amount : "--"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-600">
                    Add todays transactions...
                  </td>
                </tr>
              )}
                  
                </tbody>
              </table>
            </div>
          </div>
          }

          </div>
      </div>

    
      
    </div>

  
      {/* --- PRINT UI (Hidden on screen, Visible in Print) --- */}
              
    {dailyEntries.length > 0 && (
  
  <div id="printable-ledger" className="hidden print:block">
    <div className="text-center border-b-2 pb-4 mb-4">
      <h1 className="text-2xl font-bold">শাহ নেয়ামত (রহ:) কেজি এন্ড হাই স্কুল</h1>
      <p>দৈনিক আয়-ব্যয় বিবরণী</p>
      <p className="font-sans font-semibold">তারিখ: {format(new Date(today), "MMMM dd, yyyy")}</p>
    </div>

    <table className="w-full border-collapse border border-black text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-black p-2">ক্যাটাগরি</th>
          <th className="border border-black p-2">বিবরণ</th>
          <th className="border border-black p-2 text-right">আয়</th>
          <th className="border border-black p-2 text-right">ব্যয়</th>
        </tr>
      </thead>
      <tbody>
        {/* Changed from dailyLedgerData?.entries to dailyEntries */}
        {dailyEntries.map((item, i) => (
          <tr key={item._id}>
            <td className="border border-black p-2">{item.category}</td>
            <td className="border border-black p-2">{item.description}</td>
            <td className="border border-black p-2 text-right">
              {item.type === 'income' ? `৳ ${item.amount}` : '-'}
            </td>
            <td className="border border-black p-2 text-right">
              {item.type === 'expense' ? `৳ ${item.amount}` : '-'}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
          <tr className="font-bold bg-gray-50">
            <td colSpan="2" className="border border-black p-2 text-right">মোট:</td>
            <td className="border border-black p-2 text-right">৳ {summary.totalIncome}</td>
            <td className="border border-black p-2 text-right">৳ {summary.totalExpense}</td>
          </tr>
      </tfoot>
    </table>

    <div className="mt-4 text-right">
        <p className="text-lg font-bold">অবশিষ্ট ক্যাশ: ৳ {summary.netBalance}</p>
    </div>
    
    <div className="mt-20 flex justify-between">
      <span className="border-t border-black px-8">হিসাব রক্ষক</span>
      <span className="border-t border-black px-8">প্রধান শিক্ষক</span>
    </div>
  </div>
)}
    </>
  );
};
export default DailyOfficeInOut;

 