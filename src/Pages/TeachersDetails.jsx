import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "../components/Shared/Loading";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaCircleUser } from "react-icons/fa6";
import { FaEnvelope, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { format } from "date-fns";

const TeachersDetails = () => {
  // Mock teacher ID (replace with actual routing logic to get teacherId)
      const {id} = useParams(); // Example ID, replace with dynamic routing (e.g., useParams)

      const { data: teacher = {}, isLoading, error } = useQuery({
        queryKey: ['teacher', id],
        queryFn: async () => {
          const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API}/teacher/${id}`);
          return data || {};
        },
      });
      const {
        name = 'N/A',
        profileImage,
        role = 'N/A',
        category = 'N/A',
        specialization = 'N/A',
        qualification = [],
        joinedAt,
        socialLinks = {
          facebook: '',
          twitter: '',
          linkedin: '',
          email: '',
        },
      } = teacher;

      if (isLoading) return <Loading />;
      if (error) return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
          <p className="text-red-500 text-lg">শিক্ষকের তথ্য লোড করতে ব্যর্থ।</p>
        </div>
      );
  return (
    <>
     <Helmet>
            <title>{name ? `${name} - শিক্ষকের বিস্তারিত` : 'শিক্ষকের বিস্তারিত'}</title>
          </Helmet>
          <div className="min-h-screen bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-50"></div>
                <div className="relative flex flex-col md:flex-row">
                  {/* Profile Image and Social Links */}
                  <div className="md:w-1/3 flex flex-col items-center p-6">
                    <div className="avatar mb-6">
                      <div className="w-24 h-32 md:w-44 md:h-56 rounded-md md:rounded-lg overflow-hidden border-4 border-green-500 shadow-md">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/192')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-green-100">
                            <FaCircleUser className="text-green-600 text-8xl" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      {socialLinks.facebook && (
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-green-200 rounded-xl p-3 text-green-600 hover:text-green-800 flex justify-center items-center drop-shadow-md transition-colors">
                          <FaFacebook className="p-0 m-0 text-2xl" />
                        </a>
                      )}
                      {socialLinks.twitter && (
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-green-200 rounded-xl p-3 text-green-600 hover:text-green-800 flex justify-center items-center drop-shadow-md transition-colors">
                          <FaTwitter className="text-2xl" />
                        </a>
                      )}
                      {socialLinks.linkedin && (
                        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-green-200 rounded-xl p-3 text-green-600 hover:text-green-800 flex justify-center items-center drop-shadow-md transition-colors">
                          <FaLinkedin className="text-2xl" />
                        </a>
                      )}
                      {socialLinks.email && (
                        <a href={`mailto:${socialLinks.email}`} className="bg-green-200 rounded-xl p-3 text-green-600 hover:text-green-800 flex justify-center items-center drop-shadow-md transition-colors">
                          <FaEnvelope className="text-2xl" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Teacher Details */}
                  <div className="md:w-2/3 p-4 space-y-3 md:space-y-6">
                    <div>
                      <h2 className="text-xl md:text-3xl font-bold text-green-800">{name}</h2>
                      <p className="text-sm md:text-lg text-gray-600 font-medium">{role}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-green-600">ক্যাটেগরি:</span>
                        <span className="text-gray-700">{category == "Primary" ? "প্রাথমিক" : category == "Higher" ? "মাধ্যমিক" : category == "Primary & Higher" ? "প্রাথমিক ও মাধ্যমিক" : "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-green-600">বিশেষত্ব:</span>
                        <span className="text-gray-700">{specialization}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-green-600 block mb-1">যোগ্যতা:</span>
                        {qualification.length > 0 ? (
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {qualification.map((qal, index) => (
                              <li key={index}>{qal}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700">N/A</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-green-600 ">যোগদানের তারিখ:</span>
                        <span className="text-gray-700">
                          {joinedAt ? format(new Date(joinedAt), 'MMMM dd, yyyy') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
export default TeachersDetails;
  