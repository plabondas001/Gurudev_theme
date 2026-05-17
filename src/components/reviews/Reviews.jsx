import React from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa6";
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
  const secondLine = [...reviews].reverse(); // Reverse the second line for variety

  const ReviewCard = ({ review }) => (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 w-[300px] md:w-[360px] lg:w-[420px] shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full mx-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 text-primary">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={16} />
          ))}
        </div>
        <FaQuoteRight className="text-gray-100/80" size={36} />
      </div>
      
      <p className="text-gray-700 italic leading-relaxed text-sm md:text-base flex-1 mb-8">
        "{review.text}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="relative">
          <img
            className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/10"
            src={review.img}
            alt={review.name}
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base md:text-lg">
            {review.name}
          </h3>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mt-0.5">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 md:px-8 py-16 md:py-24 bg-gray-50/50 border-t border-gray-200/50 mt-10 md:mt-16">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-4">
          Testimonials
        </span>
        <h2 className="font-extrabold text-3xl md:text-4xl text-gray-900">
          What Our Customers Say
        </h2>
      </div>

      <div className="space-y-6 md:space-y-8 relative">
        {/* Gradient overlays to smooth out the edges of the marquee */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none"></div>

        <div className="overflow-hidden w-full reviews-row">
          <div className="reviews-track reviews-track-left cursor-pointer items-stretch">
            {[...firstLine, ...firstLine].map((review, index) => (
              <ReviewCard key={`first-${index}`} review={review} />
            ))}
          </div>
        </div>

        <div className="overflow-hidden w-full reviews-row">
          <div className="reviews-track reviews-track-right cursor-pointer items-stretch">
            {[...secondLine, ...secondLine].map((review, index) => (
              <ReviewCard key={`second-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
