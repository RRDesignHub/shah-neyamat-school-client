import { Link} from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>পেজটি খুঁজে পাওয়া যায়নি</title>
      </Helmet>
      <div className="h-screen flex flex-col justify-center items-center bg-green-50 text-green-900 px-4 text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5,
          }}
          className="text-8xl md:text-9xl text-green-600 mb-6"
        >
          <FaExclamationTriangle />
        </motion.div>

        {/* Error Code and Message */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold mb-4"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-2xl font-semibold mb-2 text-green-800"
        >
          পেজটি খুঁজে পাওয়া যায়নি
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm md:text-lg mb-8 max-w-md"
        >
          দুঃখিত, আপনি যে পেজটি খুঁজছেন তা খুঁজে পাওয়া যায়নি। এটি সরানো, নাম পরিবর্তন করা বা সাময়িকভাবে অনুপলব্ধ হতে পারে।
        </motion.p>

        {/* Navigational Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            className="btn btn-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 shadow-md"
            to="/"
          >
            হোমপেজে ফিরে যান
          </Link>
          <Link
            className="btn btn-lg btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-md"
            to={-1}
          >
            পূর্বের পেইজে ফিরে যান
          </Link>
        </motion.div>
      </div>
    </>
  );
};