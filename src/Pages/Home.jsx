import { motion } from "motion/react";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { BooksOverview } from "../components/HomePage/BooksOverview";
import TeachersOverview from "../components/HomePage/TeachersOverview";
import StudentsOverview from "../components/HomePage/StudentsOverview";
import PrincipalSaying from "../components/HomePage/PrincipalSaying";
import ContactSection from "../components/HomePage/Contact";
import About from "../components/HomePage/About";
import { Hero } from "../components/HomePage/Hero";
export const Home = () => {
  const { data: notices = [], isLoading } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/notices`
      );
      return data || [];
    },
  });
  return (
    <>
      <Helmet>
        <title>SN-Home</title>
      </Helmet>
      <div className="relative max-sm:mb-[250px] md:mb-40 lg:mb-10 w-[100%]">
        <Hero />
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
          className="absolute z-30 -bottom-[230px] md:-bottom-[140px] lg:-bottom-5 left-[4%] transform -translate-x-1/2 w-11/12 mx-auto bg-gradient-to-br from-green-800 via-green-500 to-green-800 rounded-lg p-5 flex max-sm:flex-col items-center justify-between border-[2px] border-green-200 drop-shadow-[0_5px_15px_#bbf7d0]"
        >
          <div className="flex max-sm:flex-col items-center gap-2 md:gap-5">
            <img className="w-20 drop-shadow-[0_5px_15px_#02160b]" src={logo} alt="" />
            <div className="flex max-sm:flex-col gap-2 items-center">
              <h3 className="md:w-fit text-lg font-bold py-2 max-sm:text-center md:text-left underline text-blue-50">
                নোটিশ :
              </h3>
              {isLoading ? (
                "লোড করা হচ্ছে..."
              ) : notices?.length > 0 ? (
                <Link className="md:w-10/12" to="/all-notice">
                  <div className="max-sm:w-[300px] w-full bg-green-50 rounded-lg p-3">
                    <Marquee
                      pauseOnHover={true}
                      className="text-md font-medium text-blue-950"
                    >
                      {notices.map((notice, index) => (
                        <p key={notice._id} className="mx-6">
                          {index + 1}. {notice.title}।
                        </p>
                      ))}
                    </Marquee>
                  </div>
                </Link>
              ) : (
                "সার্ভার ডাউন..."
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <PrincipalSaying />
      <About />
      <BooksOverview />
      <TeachersOverview />
      <StudentsOverview />
      <ContactSection />
    </>
  );
};
