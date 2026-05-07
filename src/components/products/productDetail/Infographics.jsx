import React from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdBatteryCharging80 } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Zap } from "lucide-react";

const Infographics = () => {
  return (
    <div className="bg-[#e5f0e8] rounded-2xl p-5 flex items-center justify-around text-center mb-5">
      <div className="flex items-center flex-col">
        <IoCameraOutline className="text-primary" size={25} />
        <h1 className="font-semibold text-sm">50 Mp Triple</h1>
        <p className="font-semibold text-sm">Camera</p>
      </div>

      <div className="flex items-center flex-col">
        <HiOutlineDevicePhoneMobile className="text-primary" size={25} />
        <h1 className="font-semibold text-sm">6.67" AMOLED</h1>
        <p className="font-semibold text-sm">Display</p>
      </div>

      <div className="flex items-center flex-col">
        <MdBatteryCharging80 className="text-primary" size={25} />
        <h1 className="font-semibold text-sm">5000mAh</h1>
        <p className="font-semibold text-sm">Battery</p>
      </div>

      <div className="flex items-center flex-col">
        <Zap size={25} className="text-primary" />
        <h1 className="font-semibold text-sm">50 Mp Triple</h1>
        <p className="font-semibold text-sm">Camera</p>
      </div>
    </div>
  );
};

export default Infographics;
