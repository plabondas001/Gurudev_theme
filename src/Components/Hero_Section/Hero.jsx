import React from "react";

const Hero = () => {
  return (
    <div className="">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-8 mt-3 md:mt-5">
        {/* Carousel */}
        <div className="carousel w-full lg:w-2/3">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero/iphone-17-pro-max-05.webp"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-full rounded-lg md:rounded-2xl"
              alt="Hero slide 1"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide4"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero/Galaxy-S24-Ultra-Price-in-Bangladesh-1423.jpg"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-full rounded-lg md:rounded-2xl"
              alt="Hero slide 2"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide1"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero/Best-Mobile-Phones-Under-40000-in-Bangladesh.webp"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-full rounded-lg md:rounded-2xl"
              alt="Hero slide 3"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide2"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero/REF-4969901-sta5-river-hero-sv_DER-ff3939a7-a48d-4c53-b2fb-c6ce6ad14726.avif"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-90 rounded-lg md:rounded-2xl"
              alt="Hero slide 4"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide3"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
        </div>

        {/* Side Image */}
        <div className="hidden lg:block lg:w-1/3">
          <img
            className="w-full rounded-lg md:rounded-2xl h-40 sm:h-60 md:h-72 lg:h-90 object-cover"
            src="/public/Img/hero/upcoming-phones-2024.webp"
            alt="Hero banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
