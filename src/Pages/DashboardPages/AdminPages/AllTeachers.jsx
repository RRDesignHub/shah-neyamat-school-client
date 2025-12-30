import React from 'react'
import { useAxiosSec } from '../../../Hooks/useAxiosSec';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../../components/Shared/Loading';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { format } from "date-fns";

export const AllTeachers = () => {
  const axiosSecure = useAxiosSec();
      const {
        data: teachers = [],
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
          const { data } = await axiosSecure.get('/teachers');
          return data || [];
        },
      });

      const handleDelete = async (id) => {
        try {
          const result = await Swal.fire({
            title: 'আপনি কি নিশ্চিত?',
            text: 'শিক্ষকের তথ্য স্থায়ীভাবে মুছে যাবে!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#16A34A',
            confirmButtonText: 'হ্যাঁ, মুছুন!',
            cancelButtonText: 'বাতিল',
          });

          if (result.isConfirmed) {
            const { data } = await axiosSecure.delete(`/delete-teacher/${id}`);
            if (data?.deletedCount) {
              Swal.fire({
                title: 'মুছে ফেলা হয়েছে!',
                text: 'শিক্ষকের তথ্য সফলভাবে মুছে ফেলা হয়েছে।',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
              });
              refetch();
            }
          }
        } catch (err) {
          console.error('Delete teacher error:', err);
          Swal.fire({
            title: 'ত্রুটি!',
            text: 'শিক্ষক মুছতে সমস্যা হয়েছে।',
            icon: 'error',
          });
        }
      };
  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 lg:p-8">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-6">
            সকল শিক্ষক
          </h2>
          <div className="w-full h-1 bg-green-300 rounded mb-6"></div>
          
          {teachers.length > 0 && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-900">
                মোট শিক্ষক: <span className="font-bold">{teachers.length}</span> জন
              </h3>
              <Link
                to="/dashboard/add-teacher"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                নতুন শিক্ষক যোগ করুন
              </Link>
            </div>
          )}

          {isLoading ? (
            <Loading />
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="w-full table-auto">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">ছবি</th>
                    <th className="px-4 py-3 text-left">নাম</th>
                    <th className="px-4 py-3 text-left">পদবি</th>
                    <th className="px-4 py-3 text-left">বিশেষীকরণ</th>
                    <th className="px-4 py-3 text-left">যোগদানের তারিখ</th>
                    <th className="px-4 py-3 text-left">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length > 0 ? (
                    teachers.map((teacher, idx) => (
                      <tr key={teacher._id} className="border-b hover:bg-green-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">
                          {teacher.profileImage ? (
                            <img
                              src={teacher.profileImage}
                              alt={teacher.name}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500">N/A</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">{teacher.name || 'N/A'}</td>
                        <td className="px-4 py-3">{teacher.role || 'N/A'}</td>
                        <td className="px-4 py-3">{teacher.category || 'N/A'}</td>
                        
                        <td className="px-4 py-3">
                          {teacher.joinedAt
                            ? format(new Date(teacher.joinedAt), 'MMMM dd, yyyy')
                            : 'N/A'}
                        </td>
                        <td className="px-4 py-3 flex space-x-2">
                          
                          <button
                            onClick={() => handleDelete(teacher._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition duration-200"
                            title="মুছুন"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-6 text-gray-600">
                        কোনো শিক্ষক পাওয়া যায়নি। নতুন শিক্ষক যোগ করুন।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
  )
}
export default AllTeachers;