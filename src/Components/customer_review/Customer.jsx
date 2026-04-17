import React from "react";

const Customer = () => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto mt-10 md:mt-22">
        <h1 className="text-center mb-6 md:mb-8 font-bold text-xl md:text-2xl">Customer Review</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        <div className="border rounded-lg md:rounded-xl border-gray-400 p-3 md:p-4 flex flex-col h-full">
          <h1 className="text-xs md:text-sm leading-5 md:leading-6 flex-1">
            Thanks Ghorerbazar for free Honeyraj. Of course, I got it for being
            a regular customer.
          </h1>
          <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-5">
            <img
              className="w-12 md:w-15 h-12 md:h-15 rounded-full object-cover"
              src="/public/Img/customers/download.jpg"
              alt="Jeni"
            />
            <div>
              <h1 className="font-semibold text-sm md:text-base">Jeni</h1>
              <p className="text-xs md:text-sm text-gray-600">Housewife</p>
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-400 p-3">
          <h1>
            I don’t like ghee, but my father really loves it. So I bought some
            ghee for him. He said this ghee is the best he has ever had
          </h1>
          <div className="flex items-center gap-3">
            <img
              className="w-15 h-15 mt-5 rounded-full"
              src="/public/Img/customers/images.jpg"
              alt=""
            />
            <div>
              <h1 className="font-semibold mt-4">Alex</h1>
              <p className="text-sm">Service Holder</p>
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-400 p-3">
          <h1>
            আমি একজন ঘরের বাজারের নিয়মিত কাস্টমার। আমি শুধু ঘরের বাজার থেকে এই
            যে প্রোডাক্ট আনি এমন নয়। আমি অনেক জায়গা থেকে এই প্রোডাক্ট এনেছি।
            তবে আমার মতে এসব পেজ থেকে ঘরের বাজার সেরা।
          </h1>
          <div className="flex items-center gap-3">
            <img
              className="w-15 h-15 mt-5 rounded-full"
              src="/public/Img/customers/download (1).jpg"
              alt=""
            />
            <div>
              <h1 className="font-semibold mt-4">Alom</h1>
              <p className="text-sm">Student</p>
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-400 p-3">
          <h1>এই অবিশ্বাসের জগতে আস্থাশীল একটি প্রতিষ্ঠান ঘরের বাজার।</h1>
          <div className="flex items-center gap-3">
            <img
              className="w-15 h-15 mt-5 rounded-full"
              src="/public/Img/customers/images (2).jpg"
              alt=""
            />
            <div>
              <h1 className="font-semibold mt-4">Pallavi</h1>
              <p className="text-sm">Housewife</p>
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-400 p-3">
          <h1>
            ২য় বার Ghorerbazar থেকে অর্ডার করলাম। আগের মতো এবারও দারুণ কোয়ালিটি
            আর দ্রুত ডেলিভারি পেয়েছি। একদম সন্তুষ্ট।
          </h1>
          <div className="flex items-center gap-3">
            <img
              className="w-15 h-15 mt-5 rounded-full"
              src="/public/Img/customers/images (1).jpg"
              alt=""
            />
            <div>
              <h1 className="font-semibold mt-4">Nila</h1>
              <p className="text-sm">Banker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
