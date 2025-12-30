import { motion } from "motion/react";
const PrincipalSaying = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 via-green-100 to-green-50 py-8 lg:py-16">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-2 md:mb-5">
          <h1 className="text-2xl md:text-4xl font-extrabold text-green-800 tracking-tight leading-tight">
            অধ্যক্ষের বাণী
          </h1>
          <div className="divider my-2"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center lg:items-start text-center"
          >
            <img
              src="https://i.ibb.co.com/3ySTt4gN/Hasan-Sir.jpg" // replace with actual image
              alt="Principal"
              className="w-52 h-64 mx-auto object-cover rounded-lg md:rounded-2xl shadow-lg border-2 border-green-600"
            />
            <div className="mt-1">
              <h2 className="text-md md:text-xl font-bold text-green-800 mb-1">
                — মোঃ আবুল হাসান
              </h2>
              <p className="text-xs md:text-lg text-green-950/70 font-semibold mb-6">
                অধ্যক্ষ, শাহ নেয়ামত রহ: কেজি এন্ড হাই স্কুল
              </p>
              <p className="text-gray-700 text-justify max-sm:text-sm leading-relaxed">
                আসসালামু আলাইকুম ওয়ারাহমাতুল্লাহ। আমাদের বিদ্যালয় "শাহ নেয়ামত
                রহ: কেজি এন্ড হাই স্কুল" নার্সারী থেকে শুরু করে উচ্চ শ্রেণি
                পর্যন্ত শিক্ষার্থীদের নৈতিকতা, জ্ঞান ও আদর্শ শিক্ষা দেওয়ার জন্য
                কাজ করে যাচ্ছে। আধুনিক শিক্ষার সাথে সাথে ইসলামী আদর্শ ও
                চারিত্রিক গঠনের প্রতি আমরা বিশেষ গুরুত্ব দিচ্ছি।
              </p>
            </div>
          </motion.div>

          <div className="space-y-6"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-green-600 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <h3 className="flex items-center text-md md:text-2xl font-bold text-green-700 mb-2">
                <span className="mr-2 text-xl">🎯</span> মিশন
              </h3>
              <p className="text-gray-700 text-sm md:text-lg">
                মানসম্মত শিক্ষা, শৃঙ্খলাপূর্ণ পরিবেশ ও নৈতিক উন্নতির মাধ্যমে
                আগামী প্রজন্মকে গড়ে তোলা।
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.6, // Staggered delay
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-green-600 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <h3 className="flex items-center text-md md:text-2xl font-bold text-green-700 mb-2">
                <span className="mr-2 text-3xl">🔭</span> ভিশন
              </h3>
              <p className="text-gray-700 text-sm md:text-lg">
                প্রত্যেক শিক্ষার্থীকে জ্ঞান, প্রযুক্তিগত, আদর্শ ও ইসলামী চেতনায়
                সমৃদ্ধ করা।
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1,
                delay: 1, // Staggered delay
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-green-600 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <h3 className="flex items-center text-md md:text-2xl font-bold text-green-700 mb-2">
                <span className="mr-2 text-3xl">💡</span> পরিকল্পনা
              </h3>
              <p className="text-gray-700 text-sm md:text-lg">
                শিক্ষার্থীদেরকে শুধু পরীক্ষার জন্য নয়, জীবনের জন্য প্রস্তুত
                করা।
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PrincipalSaying;
