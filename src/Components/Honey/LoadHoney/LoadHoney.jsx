// import React, { use} from 'react';
// import Honey from '../ProductHoney/Honey';
// import Header from '../../Header/Header';
// import { ArrowRight } from 'lucide-react';

// const LoadHoney = ({promiseHoney,handleCart}) => {
//     const data = use(promiseHoney)

//     return (
//         <div className='w-11/12 md:w-10/12 mx-auto'>
//             <div className='flex items-center justify-between border-b mb-4 md:mb-5 py-3'>
//                 <h1 className='font-bold text-lg md:text-2xl'>Featured Products</h1>
//                 <button className='flex items-center gap-1 md:gap-2 font-bold text-xs md:text-sm text-[#31714f] cursor-pointer underline underline-offset-4 hover:text-black transition'>VIEW ALL
//                     <ArrowRight size={16} className='hidden sm:block' />
//                 </button>
//             </div>
//                 <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5'>
//                     {
//                         data.map((allHoney,i) => <Honey handleCart={handleCart} key={i} honey={allHoney}></Honey>)
//                     }
//                 </div>
//         </div>
//     );
// };

// export default LoadHoney;



import React, { use, useRef, useEffect } from "react";
import Honey from "../ProductHoney/Honey";
import { ArrowRight } from "lucide-react";
import './LoadHoney'

const LoadHoney = ({ promiseHoney, handleCart }) => {
  const data = use(promiseHoney);
  const sliderRef = useRef(null);

  // 👉 Auto scroll (smooth)
  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (!slider) return;

      slider.scrollBy({
        left: 240, // 👉 1 item width
        behavior: "smooth",
      });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 5
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      
      {/* ✅ HEADER BACK */}
      <div className="flex items-center justify-between border-b mb-4 md:mb-5 py-3">
        <h1 className="font-bold text-lg md:text-2xl">
          Featured Products
        </h1>
      </div>

      {/* ✅ SLIDER */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab no-scrollbar"
      >
        {data.map((item, i) => (
          <div
            key={i}
            className="min-w-[220px] snap-start"
          >
            <Honey honey={item} handleCart={handleCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadHoney;