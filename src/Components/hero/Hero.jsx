import React, { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const carouselRef = useRef(null);
  const totalSlides = 4;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const targetLeft = (currentSlide - 1) * container.offsetWidth;
    const startLeft = container.scrollLeft;
    const distance = targetLeft - startLeft;
    const duration = 250; // Faster transition so sidebar click feels instant
    let startTime = null;

    // Temporarily disable scroll-snap to prevent fighting with JS animation
    container.style.scrollSnapType = "none";

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Ease-in-out cubic for a very smooth feel
      const ease =
        progress < 0.5
          ? 4 * Math.pow(progress, 3)
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      container.scrollLeft = startLeft + distance * ease;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        container.style.scrollSnapType = ""; // Restore snap after animation
      }
    };

    requestAnimationFrame(animation);
  }, [currentSlide]);

  return (
    <div className="">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-8 mt-3 md:mt-5">
        {/* Carousel */}
        <div className="carousel w-full lg:w-2/3" ref={carouselRef}>
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="/Img/hero/iphone-17-pro-max-05.webp"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-full rounded-lg md:rounded-2xl"
              alt="Hero slide 1"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                onClick={() => setCurrentSlide(4)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </button>
              <button
                onClick={() => setCurrentSlide(2)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </button>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="/Img/hero/Galaxy-S24-Ultra-Price-in-Bangladesh-1423.jpg"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-full rounded-lg md:rounded-2xl"
              alt="Hero slide 2"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                onClick={() => setCurrentSlide(1)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </button>
              <button
                onClick={() => setCurrentSlide(3)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </button>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="/Img/hero/Best-Mobile-Phones-Under-40000-in-Bangladesh.webp"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-full rounded-lg md:rounded-2xl"
              alt="Hero slide 3"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                onClick={() => setCurrentSlide(2)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </button>
              <button
                onClick={() => setCurrentSlide(4)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </button>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="/Img/hero/REF-4969901-sta5-river-hero-sv_DER-ff3939a7-a48d-4c53-b2fb-c6ce6ad14726.avif"
              className="w-full h-40 sm:h-60 md:h-72 lg:min-h-90 rounded-lg md:rounded-2xl"
              alt="Hero slide 4"
            />
            <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                onClick={() => setCurrentSlide(3)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❮
              </button>
              <button
                onClick={() => setCurrentSlide(1)}
                className="btn btn-sm sm:btn-md hover:bg-[#31714f] border-none btn-circle text-xs sm:text-base"
              >
                ❯
              </button>
            </div>
          </div>
        </div>





        {/* Side Image */}
        <div className="hidden lg:block lg:w-1/3">
          <img
            className="w-full rounded-lg md:rounded-2xl h-40 sm:h-60 md:h-72 lg:h-90 object-cover"
            src="/Img/hero/upcoming-phones-2024.webp"
            alt="Hero banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
