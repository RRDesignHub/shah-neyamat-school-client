import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth, endOfMonth, subDays } from "date-fns";
import { FaPrint, FaSearch } from "react-icons/fa";
import { useAxiosSec } from "../../../Hooks/useAxiosSec";
import { Loading } from "../../../components/Shared/Loading";
import { Helmet } from "react-helmet";

const printStyles = `
@media print {
  body * {
    visibility: hidden;
  }

  #report-print-area,
  #report-print-area * {
    visibility: visible;
  }

  #report-print-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
     @page {
    size: A4;
    margin: 10mm;
  }
}

`;

const OfficeLedgerStatement = () => {
  const axiosSecure = useAxiosSec();

  const [dateRange, setDateRange] = useState({
    startDate: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  

  const { data: report = {}, isLoading, refetch } = useQuery({
    queryKey: ["ledger-report", dateRange],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/ledger-reports?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      return data;
    },
  });

  const entries = report.entries || [];
  const totals = report.totals || { income: 0, expense: 0, balance: 0 };

  
  const setQuickFilter = (type) => {
    const today = new Date();
    if (type === "week") {
      setDateRange({
        startDate: format(subDays(today, 7), "yyyy-MM-dd"),
        endDate: format(today, "yyyy-MM-dd"),
      });
    }
    if (type === "month") {
      setDateRange({
        startDate: format(startOfMonth(today), "yyyy-MM-dd"),
        endDate: format(endOfMonth(today), "yyyy-MM-dd"),
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
              <title>SN-LedgerSummary</title>
            </Helmet>
      <style>{printStyles}</style>
    <div className="p-3 md:p-8 bg-slate-100 min-h-screen font-serif">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-4xl font-bold text-green-900 border-b-2 border-green-300 pb-2">
          অফিস লেজার রিপোর্ট
        </h2>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800 flex items-center gap-2"
        >
          <FaPrint /> প্রিন্ট
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow border mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            className="input input-bordered"
          />
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            className="input input-bordered"
          />

          {/* Dummy Filters */}
          {/* <select className="input input-bordered">
            <option>সব ধরন</option>
            <option>আয়</option>
            <option>ব্যয়</option>
          </select>

          <select className="input input-bordered">
            <option>সব ক্যাটাগরি</option>
            <option>ভর্তি ফি</option>
            <option>মাসিক ফি</option>
            <option>অফিস খরচ</option>
          </select>

          <select className="input input-bordered">
            <option>পেমেন্ট পদ্ধতি</option>
            <option>ক্যাশ</option>
            <option>ব্যাংক</option>
          </select> */}

          <div className="flex gap-2">
            <button onClick={() => setQuickFilter("week")} className="btn btn-sm">
              ৭ দিন
            </button>
            <button onClick={() => setQuickFilter("month")} className="btn btn-sm">
              এই মাস
            </button>
            <button onClick={refetch} className="btn btn-sm bg-green-600 text-white">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </div>

      {
        isLoading ? <Loading /> : <>
         {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border-l-4 border-green-600">
          <p className="text-sm text-gray-500">মোট আয়</p>
          <h3 className="text-2xl font-bold text-green-700">৳ {totals.income}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-red-500">
          <p className="text-sm text-gray-500">মোট ব্যয়</p>
          <h3 className="text-2xl font-bold text-red-600">৳ {totals.expense}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">ক্যাশ ইন হ্যান্ড</p>
          <h3 className="text-2xl font-bold text-blue-700">৳ {totals.balance}</h3>
        </div>
      </div>

      {/* Ledger Table */}
     <div className="bg-white rounded-xl shadow border overflow-hidden">
  {/* Wrap the table in this div for horizontal scrolling on small screens */}
  <div className="overflow-x-auto">
    <table className="w-full text-[10px] sm:text-xs md:text-sm lg:text-base border-collapse whitespace-nowrap md:whitespace-normal">
      <thead className="bg-slate-200 text-gray-700">
        <tr>
          <th className="p-2 md:p-3 text-left">তারিখ</th>
          <th className="p-2 md:p-3 text-left">ক্যাটাগরি</th>
          <th className="p-2 md:p-3 text-left">বিবরণ</th>
          <th className="p-2 md:p-3 text-right">আয়</th>
          <th className="p-2 md:p-3 text-right">ব্যয়</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {entries.map((item, i) => (
          <tr key={i} className="hover:bg-slate-50 transition-colors">
            <td className="p-2 md:p-3 text-gray-600">{item.date}</td>
            <td className="p-2 md:p-3">
               <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700 uppercase tracking-tight">
                {item.category}
               </span>
            </td>
            <td className="p-2 md:p-3 max-w-[150px] md:max-w-none truncate md:whitespace-normal">
              {item.description}
            </td>
            <td className="p-2 md:p-3 text-right text-green-700 font-medium">
              {item.type === "income" ? `৳${item.amount}` : "-"}
            </td>
            <td className="p-2 md:p-3 text-right text-red-600 font-medium">
              {item.type === "expense" ? `৳${item.amount}` : "-"}
            </td>
          </tr>
        ))}
      </tbody>

      {/* Cash in Hand */}
      <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300">
        <tr>
          <td colSpan="3" className="p-2 md:p-3 text-right">
            ক্যাশ ইন হ্যান্ড
          </td>
          <td colSpan="2" className="p-2 md:p-3 text-right text-blue-700 text-sm md:text-lg">
            ৳ {totals.balance}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
        </>
      }

     
    </div>
    {/* --- PRINT UI FOR REPORTS --- */}
{entries.length > 0 && (
  <div id="report-print-area" className="hidden print:block font-serif text-black p-2">
    {/* School Header */}
    <div className="text-center border-b-2 border-black pb-4 mb-6">
      <h1 className="text-3xl font-bold">শাহ নেয়ামত (রহ:) কেজি এন্ড হাই স্কুল</h1>
      <p className="text-lg">মাসিক/সাপ্তাহিক আয়-ব্যয় প্রতিবেদন</p>
      <div className="flex justify-center gap-1 mt-2 font-sans text-sm">
        <p>তারিখ: <strong></strong> {dateRange.startDate}</p>
        <p>হতে <strong> </strong> {dateRange.endDate}</p>
      </div>
    </div>

    {/* Report Summary Table (Top) */}
    <div className="flex justify-center mb-8">
      <table className="w-1/2 border-collapse border border-black text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black p-2">মোট আয়</th>
            <th className="border border-black p-2">মোট ব্যয়</th>
            <th className="border border-black p-2">ক্যাশ ইন হ্যান্ড</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">৳ {totals.income.toLocaleString()}</td>
            <td className="border border-black p-2 text-red-600">৳ {totals.expense.toLocaleString()}</td>
            <td className="border border-black p-2 font-bold text-blue-700">৳ {totals.balance.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Detailed Ledger Table */}
    <table className="w-full border-collapse border border-black text-[12px]">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-black p-2">তারিখ</th>
          <th className="border border-black p-2">ক্যাটাগরি</th>
          <th className="border border-black p-2">বিস্তারিত বিবরণ</th>
          <th className="border border-black p-2 text-right">আয় (৳)</th>
          <th className="border border-black p-2 text-right">ব্যয় (৳)</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((item, i) => (
          <tr key={i}>
            <td className="border border-black p-2 font-sans">{item.date}</td>
            <td className="border border-black p-2">{item.category}</td>
            <td className="border border-black p-2">{item.description}</td>
            <td className="border border-black p-2 text-right">
              {item.type === "income" ? item.amount.toLocaleString() : "-"}
            </td>
            <td className="border border-black p-2 text-right">
              {item.type === "expense" ? item.amount.toLocaleString() : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Signature Section*/}
    <div className="mt-20 flex justify-between px-10">
      <div className="text-center">
        <div className="border-t border-black w-32 mb-1"></div>
        <p className="text-xs">হিসাব রক্ষক</p>
      </div>
      <div className="text-center">
        <div className="border-t border-black w-32 mb-1"></div>
        <p className="text-xs">প্রধান শিক্ষক</p>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default OfficeLedgerStatement;
