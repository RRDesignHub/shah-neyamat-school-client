import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function TeachersOverview() {
  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/teachers`
      );
      return data || [];
    },
  });
  return (
    <div className="w-11/12 mx-auto pb-16 ">
      <div className="flex max-sm:flex-col gap-3 items-center justify-between">
        <h2 className="text-xl md:text-4xl font-bold text-green-700 text-center ">
          আমাদের শিক্ষক/শিক্ষিকা বৃন্দ
        </h2>
        <Link
          className="px-4 py-2 md:px-6 md:py-4 rounded-md md:rounded-xl max-sm:text-sm bg-green-600 text-green-50  hover:bg-green-800"
          to="/teachers"
        >
          আরও দেখুন
        </Link>
      </div>
      <div className="divider my-2"></div>
      {isLoading ? (
        "লোড করা হচ্ছে..."
      ) : teachers?.length > 0 ? (
        <Swiper
          loop={true}
          speed={800}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {teachers?.map((teacher, idx) => (
            <SwiperSlide key={idx} className="pb-8 px-2">
              <Link to={`/teacher-details/${teacher?._id}`}>
                <div
                  key={teacher.name}
                  className="bg-gradient-to-b from-green-200 via-green-100 to-green-50 drop-shadow-xl rounded-lg p-4 flex flex-col items-center"
                >
                  <div className="text-green-700 w-[200px] h-[265px] flex items-center justify-center">
                    {teacher.profileImage ? (
                      <img
                        src={teacher.profileImage}
                        className="w-full object-cover object-top mt-5 rounded-lg"
                        alt={teacher.name}
                      />
                    ) : (
                      <FaCircleUser className="text-green-700 text-[180px]" />
                    )}
                  </div>
                  <h3 className="text-lg text-green-950 font-semibold mt-2">
                    {teacher.name}
                  </h3>
                  <p className="text-green-950/80">{teacher.role}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : "সার্ভার ডাউন..."}
    </div>
  );
}
