import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdBatteryCharging80 } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Zap } from "lucide-react";
import { GiProcessor } from "react-icons/gi";

const Infographics = () => {
  return (
    <div className="bg-[#e5f0e8] rounded-2xl p-5 gap-5 sm:p-4 sm:gap-4 lg:grid lg:grid-cols-5 text-center mb-5">
      <div className="flex gap-3 lg:gap-1 lg:flex-col items-center justify-start py-2 lg:py-0">
        <IoCameraOutline className="text-primary" size={25} />
        <h1 className="font-semibold text-sm w-fit lg:w-auto">
          50 Mp Triple Camera
        </h1>
      </div>

      <div className="flex gap-3 lg:gap-1 lg:flex-col items-center justify-start py-2 lg:py-0">
        <HiOutlineDevicePhoneMobile className="text-primary" size={25} />
        <h1 className="font-semibold text-sm w-fit lg:w-auto">
          6.67" AMOLED Display
        </h1>
      </div>

      <div className="flex gap-3 lg:gap-1 lg:flex-col items-center justify-start py-2 lg:py-0">
        <MdBatteryCharging80 className="text-primary" size={25} />
        <h1 className="font-semibold text-sm w-fit lg:w-auto">
          5000mAh Battery
        </h1>
      </div>

      <div className="flex gap-3 lg:gap-1 lg:flex-col items-center justify-start py-2 lg:py-0">
        <Zap size={25} className="text-primary" />
        <h1 className="font-semibold text-sm w-fit lg:w-auto">
          50 Mp Triple Camera
        </h1>
      </div>

      <div className="flex gap-3 lg:gap-1 lg:flex-col items-center justify-start py-2 lg:py-0">
        <GiProcessor size={25} className="text-primary" />
        <h1 className="font-semibold text-sm w-fit lg:w-auto">
          Mediatek Helio G92 Max
        </h1>
      </div>
    </div>
  );
};

export default Infographics;
