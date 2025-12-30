import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import heroImg_1 from "./../../assets/Hero-1.jpg";
import Asembly from "./../../assets/Asembly (1).jpg";
import Teachers from "./../../assets/Teachers_1.jpg";
export const Hero = () => {
  return (
    <>
      <Swiper
        // Swiper options here
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000 }}
      >
        <SwiperSlide>
          <div className="w-full h-full lg:h-[500px]">
            <img
              src={heroImg_1}
              className="w-full h-full object-cover"
              alt="Hero Image 1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full lg:h-[500px]">
            <img
              src={Teachers}
              className="w-full h-full object-cover"
              alt="Teachers"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full lg:h-[500px]">
            <img
              src={Asembly}
              className="w-full h-full object-cover"
              alt="Assembly"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full lg:h-[500px]">
            <img
              src="https://i.ibb.co.com/YBJpkQG/Banner-3.png"
              className="w-full h-full object-cover"
              alt="Banner 3"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
