import React from "react";

const Hero = () => {
  return (
    <div className="">
      <div className="w-10/12 mx-auto flex gap-8 mt-5">
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="/public/Img/o1uH11775363016-light.jpg"
              className="w-full h-90 rounded-2xl"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide4"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero1.png"
              className="w-full h-90 rounded-2xl"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide1"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="/public/Img/hero3.jpeg"
              className="w-full h-90 rounded-2xl"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide2"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="/public/Img/Wzx451763631917.png"
              className="w-full h-90 rounded-2xl bg-cover"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href="#slide3"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn hover:bg-amber-400 border-none btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
        <div>
          <img
            className="w-full rounded-2xl h-90"
            src="/public/Img/hero4.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
