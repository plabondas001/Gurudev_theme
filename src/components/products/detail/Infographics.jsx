import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdBatteryCharging80 } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Zap } from "lucide-react";
import { GiProcessor } from "react-icons/gi";

const Infographics = () => {
  return (
    <div className="bg-[#e5f0e8] rounded-2xl p-5 gap-5 sm:p-4 sm:gap-4 grid lg:grid-cols-5 text-center mb-5">
      <div className="flex flex-col items-center justify-start min-h-[90px] sm:min-h-[96px]">
        <IoCameraOutline className="text-primary" size={25} />
        <h1 className="font-semibold text-sm">50 Mp Triple</h1>
        <p className="font-semibold text-sm">Camera</p>
      </div>

      <div className="flex flex-col items-center justify-start min-h-[90px] sm:min-h-[96px]">
        <HiOutlineDevicePhoneMobile className="text-primary" size={25} />
        <h1 className="font-semibold text-sm">6.67" AMOLED</h1>
        <p className="font-semibold text-sm">Display</p>
      </div>

      <div className="flex flex-col items-center justify-start min-h-[90px] sm:min-h-[96px]">
        <MdBatteryCharging80 className="text-primary" size={25} />
        <h1 className="font-semibold text-sm">5000mAh</h1>
        <p className="font-semibold text-sm">Battery</p>
      </div>

      <div className="flex flex-col items-center justify-start min-h-[90px] sm:min-h-[96px]">
        <Zap size={25} className="text-primary" />
        <h1 className="font-semibold text-sm">50 Mp Triple</h1>
        <p className="font-semibold text-sm">Camera</p>
      </div>

      <div className="flex flex-col items-center justify-start min-h-[90px] sm:min-h-[96px]">
       <GiProcessor size={25} className="text-primary"/>
        <h1 className="font-semibold text-sm">Mediatek Helio</h1>
        <p className="font-semibold text-sm">G92 Max</p>
      </div>
    </div>
  );
};

export default Infographics;
