const Management = () => {
  const members = [
    {
      name: "প্রতিষ্ঠাতা-১",
      role: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
      qualification: "এম.এ. (ইসলামিক স্টাডিজ)",
      image: "/images/chairman.jpg",
      bio: "জ্ঞান ও ইসলামিক মূল্যবোধে সমৃদ্ধ একটি প্রজন্ম গড়ে তুলতে নিবেদিত প্রাণ।",
    },
    {
      name: "প্রতিষ্ঠাতা-২",
      role: "প্রতিষ্ঠাতা",
      qualification: "এম.এস.সি, বি.এড",
      image: "/images/principal.jpg",
      bio: "আধুনিক শিক্ষার সাথে নৈতিক মূল্যবোধের সমন্বয় সাধনের লক্ষ্যে স্কুল পরিচালনা করছেন।",
    },
    {
      name: "প্রতিষ্ঠাতা-৩",
      role: "প্রতিষ্ঠাতা",
      qualification: "এম.এ. (ইংরেজি)",
      image: "/images/vice-principal.jpg",
      bio: "শিক্ষার্থীদের সেরা ফলাফলের জন্য একাডেমিক মান নিশ্চিতকরণ ও শিক্ষকদের নির্দেশনা প্রদান করছেন।",
    },
    {
      name: "পরিচালক-১",
      role: "পরিচালক",
      qualification: "এম.এ. (ইংরেজি)",
      image: "/images/vice-principal.jpg",
      bio: "শিক্ষার্থীদের সেরা ফলাফলের জন্য একাডেমিক মান নিশ্চিতকরণ ও শিক্ষকদের নির্দেশনা প্রদান করছেন।",
    },
    {
      name: "পরিচালক-২",
      role: "পরিচালক",
      qualification: "এম.এ. (ইংরেজি)",
      image: "/images/vice-principal.jpg",
      bio: "শিক্ষার্থীদের সেরা ফলাফলের জন্য একাডেমিক মান নিশ্চিতকরণ ও শিক্ষকদের নির্দেশনা প্রদান করছেন।",
    },
  ];
  return (
    <section className="py-12 bg-green-100">
      <div className="w-11/12 mx-auto md:px-4 text-center">
        <h2 className="text-xl md:text-4xl font-extrabold text-green-900">
          আমাদের সম্মানিত পরিচালকমন্ডলী
        </h2>
        <p className="text-gray-600 mb-2 max-sm:text-xs">
          দৃষ্টি, মূল্যবোধ এবং নিবেদনের সাথে আমাদের শিক্ষার্থীদের ভবিষ্যৎকে পথ
          দেখানো।
        </p>
 <div className="divider my-0"></div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-5 mt-2">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-3 md:p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-green-200"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 md:w-32 md:h-32 mx-auto rounded-full object-cover shadow-md border-2 border-green-500"
              />
              <h3 className="mt-4 md:text-xl font-bold text-emerald-800">
                {member.name}
              </h3>
              <p className="text-xs md:text-sm text-emerald-600">{member.role}</p>
              <p className="text-xs text-gray-500 italic">
                {member.qualification}
              </p>
              <p className="mt-3 text-xs md:text-base text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Management;
