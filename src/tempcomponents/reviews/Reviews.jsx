import React from "react";
import "./Reviews.css";

const Reviews = () => {
  const reviews = [
    {
      text: "I would like to thank Gurudeb Enterprise for delivering authentic products.",
      img: "/Img/customers/download.jpg",
      name: "Jeni",
      role: "Housewife",
    },
    {
      text: "The phone is very smooth and fast. The display is sharp, and the battery backup is good. The performance is absolutely satisfactory for the price.",
      img: "/Img/customers/images.jpg",
      name: "Alex",
      role: "Service Holder",
    },
    {
      text: "স্মার্টওয়াচের ডিজাইন স্টাইলিশ, হেলথ ট্র্যাকিং ফিচারগুলো একুরেট। ব্যাটারি ৪-৫ দিন সহজেই চলে যায়। Gurudeb Enterprise থেকে পাওয়া এই ঘড়িটি সত্যিই ভরসাযোগ্য।",
      img: "/Img/customers/download (1).jpg",
      name: "Alom",
      role: "Student",
    },
    {
      text: "এই অবিশ্বাসের জগতে আস্থাশীল একটি প্রতিষ্ঠান গুরুদেব এন্টারপ্রাইজ।",
      img: "/Img/customers/images (2).jpg",
      name: "Pallavi",
      role: "Housewife",
    },
    {
      text: "আমি গুরুদেব এন্টারপ্রাইজকে ধন্যবাদ জানাই, তারা সবসময় গ্রাহকদের কাছে আসল ও মানসম্মত পণ্য পৌঁছে দেয়।",
      img: "/Img/customers/my_img.jpg",
      name: "Plabon",
      role: "Businessmen",
    },
    {
      text: "২য় বার Gurudeb Enterprise থেকে অর্ডার করলাম। আগের মতো এবারও দারুণ কোয়ালিটি আর দ্রুত ডেলিভারি পেয়েছি। একদম সন্তুষ্ট।",
      img: "/Img/customers/images (1).jpg",
      name: "Nila",
      role: "Banker",
    },
  ];

  const firstLine = reviews;
  const secondLine = reviews;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-10 md:mt-22">
      <h1 className="text-center mb-6 md:mb-8 font-bold text-xl md:text-2xl">
        Customer Review
      </h1>

      <div className="space-y-3 md:space-y-5">
        <div className="overflow-hidden w-full reviews-row">
          <div className="reviews-track reviews-track-left cursor-pointer">
            {[...firstLine, ...firstLine].map((review, index) => (
              <div
                key={`first-${index}`}
                className="border rounded-xl border-gray-400 p-3 w-[260px] md:w-[320px] lg:w-[360px] shrink-0"
              >
                <h1>{review.text}</h1>
                <div className="flex items-center gap-3 mt-3 md:mt-5">
                  <img
                    className="w-12 md:w-15 h-12 md:h-15 rounded-full object-cover"
                    src={review.img}
                    alt={review.name}
                  />
                  <div>
                    <h1 className="font-semibold text-sm md:text-base">
                      {review.name}
                    </h1>
                    <p className="text-xs md:text-sm text-gray-600">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full reviews-row">
          <div className="reviews-track reviews-track-right cursor-pointer">
            {[...secondLine, ...secondLine].map((review, index) => (
              <div
                key={`second-${index}`}
                className="border rounded-xl border-gray-400 p-3 w-[260px] md:w-[320px] lg:w-[360px] shrink-0"
              >
                <h1>{review.text}</h1>
                <div className="flex items-center gap-3 mt-3 md:mt-5">
                  <img
                    className="w-12 md:w-15 h-12 md:h-15 rounded-full object-cover"
                    src={review.img}
                    alt={review.name}
                  />
                  <div>
                    <h1 className="font-semibold text-sm md:text-base">
                      {review.name}
                    </h1>
                    <p className="text-xs md:text-sm text-gray-600">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
