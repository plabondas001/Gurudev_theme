import React from "react";

const Hero = () => {
  return (
    <div className="">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-8 mt-3 md:mt-5">
        {/* Carousel */}
        <div className="carousel w-full lg:w-2/3">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="/public/Img/o1uH11775363016-light.jpg"
              className="w-full h-40 sm:h-60 md:h-72 lg:h-90 rounded-lg md:rounded-2xl object-cover"
              alt="Hero slide 1"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide4"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero1.png"
              className="w-full h-40 sm:h-60 md:h-72 lg:h-90 rounded-lg md:rounded-2xl object-cover"
              alt="Hero slide 2"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide1"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero3.jpeg"
              className="w-full h-40 sm:h-60 md:h-72 lg:h-90 rounded-lg md:rounded-2xl object-cover"
              alt="Hero slide 3"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide2"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="/public/Img/Wzx451763631917.png"
              className="w-full h-40 sm:h-60 md:h-72 lg:h-90 rounded-lg md:rounded-2xl object-cover bg-cover"
              alt="Hero slide 4"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide3"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-sm sm:btn-md hover:bg-amber-400 border-none btn-circle text-xs sm:text-base"
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
            src="/public/Img/hero4.jpeg"
            alt="Hero banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
