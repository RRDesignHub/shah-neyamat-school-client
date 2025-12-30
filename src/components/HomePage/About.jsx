import { Link } from "react-router-dom";
import { motion } from "motion/react";
const About = () => {
  return (
    <>
      <div className="bg-gradient-to-tr from-green-800 to-green-500 py-8 lg:py-16 mb-10">
        <div className="w-11/12 mx-auto flex max-sm:flex-col gap-y-6 md:gap-5 items-center justify-between">
          <div className="flex-1 max-sm:items-center">
            <h2 className="text-xl md:text-4xl font-bold text-white mb-2">
              আমাদের সম্পর্কে
            </h2>
            <p className="text-white max-sm:text-xs text-justify mb-4 md:mb-8">
              শাহ নেয়ামত (রহঃ) কেজি অ্যান্ড হাই স্কুল একটি আদর্শ
              শিক্ষাপ্রতিষ্ঠান, যেখানে শিক্ষার্থীদের মানসম্মত শিক্ষা ও নৈতিক
              মূল্যবোধের বিকাশে সর্বোচ্চ গুরুত্ব দেওয়া হয়। আমাদের লক্ষ্য
              শিক্ষার্থীদের জ্ঞান, দক্ষতা, এবং সৃজনশীলতায় পরিপূর্ণ করে
              ভবিষ্যতের চ্যালেঞ্জ মোকাবিলায় সক্ষম করে তোলা। আমাদের স্কুলে
              আধুনিক পাঠদানের পাশাপাশি সহশিক্ষামূলক কার্যক্রম, ক্রীড়া এবং নৈতিক
              শিক্ষার মাধ্যমে শিক্ষার্থীদের সর্বাঙ্গীন উন্নয়নে বিশেষ নজর দেওয়া
              হয়। আমরা বিশ্বাস করি, প্রতিটি শিক্ষার্থীই অনন্য এবং তাদের
              প্রতিভার বিকাশ আমাদের প্রধান দায়িত্ব।
            </p>
            <Link
              to="/management"
              className="px-4 py-2 md:px-6 md:py-4 rounded-md md:rounded-xl max-sm:text-sm bg-green-50 text-green-950 border-green-950 hover:bg-green-200 "
            >
              আরও দেখুন
            </Link>
          </div>
          <div className="flex-1 relative">
            <motion.div
              animate={{
                x: [0, 10, 10, 0, 0],
                y: [0, 0, -10, -10, 0],
              }}
              transition={{
                delay: 1,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="lg:w-[380px] absolute -top-44"
            >
              <img
                src="https://i.ibb.co.com/XVscVds/Banner-1.png"
                alt=""
                className="w-full border-l-[12px] border-l-green-200 rounded-tl-[50px] rounded-br-4xl"
              />
            </motion.div>

            <motion.div
              animate={{
                x: [10, 0, 0, 10, 10],
                y: [0, 0, 10, 10, 0],
              }}
              transition={{
                delay: 1,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="lg:w-[380px] absolute left-44 -top-5"
            >
              <img
                src="https://i.ibb.co.com/YBJpkQG/Banner-3.png"
                className="w-full border-l-[12px] border-l-green-200 rounded-tl-[50px] rounded-br-[50px]"
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;