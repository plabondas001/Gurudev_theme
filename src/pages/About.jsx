import React from "react";
import { FcShop } from "react-icons/fc";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa6";

const About = () => {
  return (
    <section>
      <div className="bg-[#F0F7F4]">
        <div className="w-11/12 md:w-10/12 mx-auto py-10">
          <h1 className="font-bold text-4xl md:text-6xl text-primary py-5 text-center">
            About Us
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
            <p className="w-full md:w-[700px] font-semibold text-lg md:text-2xl text-primary text-center md:text-left">
              Gurudeb Enterprise is a trusted smartphones & gadget shop in
              Bangladesh. We are committed to delivering the highest quality
              products directly to your doorstep.
            </p>
            <FcShop className="text-[80px] md:text-[150px]" />
          </div>
        </div>
      </div>

      {/* Number */}
      <div className="w-11/12 md:w-7/12 mx-auto">
        <h1 className="border-b-2 text-2xl font-serif text-primary border-primary w-fit mt-2">
        Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center justify-center mt-5">
          <div className="border text-center h-30 flex justify-center items-center flex-col rounded-2xl shadow-lg hover:shadow-gray-400 bg-[#F0F7F4] py-6">
            <p className="font-semibold text-3xl text-primary">500+</p>
            <p className="font-semibold text-xl text-primary font-serif">
              Total Products
            </p>
          </div>
          <div className="border text-center h-30 flex justify-center items-center flex-col rounded-2xl shadow-lg hover:shadow-gray-400 bg-[#F0F7F4] py-6">
            <p className="font-semibold text-3xl text-primary">10,000+</p>
            <p className="font-semibold text-xl text-primary font-serif">
              Happy Customers
            </p>
          </div>
          <div className="border text-center h-30 flex justify-center items-center flex-col rounded-2xl shadow-lg hover:shadow-gray-400 bg-[#F0F7F4] py-6">
            <p className="font-semibold text-3xl text-primary">5★</p>
            <p className="font-semibold text-xl text-primary font-serif">
              Average Rating
            </p>
          </div>
        </div>
      </div>

      {/* Choose */}
      <div className="w-11/12 md:w-7/12 mx-auto mt-12">
        <h1 className="border-b-2 text-2xl font-serif text-primary border-primary w-fit mt-2">
          Why Choose Us
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center justify-center mt-5">
          <div className="border p-5 rounded-2xl shadow-lg hover:shadow-gray-400 bg-[#F0F7F4]">
            <IoShieldCheckmarkSharp
              size={55}
              className="text-primary p-2 rounded-md"
            />
            <p className="font-semibold text-md pt-2 text-primary">
              100% Original Products
            </p>
            <p className="font-semibold text-sm pt-1 text-primary">
              All products are sourced directly from authorized distributors.
            </p>
          </div>
          <div className="border p-5 rounded-2xl shadow-lg hover:shadow-gray-400 bg-[#F0F7F4]">
            <TbTruckDelivery
              size={55}
              className="text-primary p-2 rounded-md"
            />
            <p className="font-semibold text-md pt-2 text-primary">
              Fast Delivery
            </p>
            <p className="font-semibold text-sm pt-1 text-primary">
              Within 24 hours inside Dhaka, 3–5 days delivery nationwide.
            </p>
          </div>
          <div className="border p-5 rounded-2xl shadow-lg hover:shadow-gray-400 bg-[#F0F7F4]">
            <FaHeadset size={55} className="text-primary p-2 rounded-md" />
            <p className="font-semibold text-md pt-2 text-primary">
              24/7 Support
            </p>
            <p className="font-semibold text-sm pt-1 text-primary">
              Our team is always ready to assist you with any issue.
            </p>
          </div>
        </div>
        <h1 className="text-center mt-12 font-bold text-3xl md:text-4xl text-primary">
          Our Mission
        </h1>
        <p className="text-base md:text-xl bg-[#F0F7F4] p-5 text-primary rounded-2xl mt-3 text-center">
          Our mission is to bring the touch of technology into every life.
          Gurudeb Enterprise promises a simple, smart, and joyful lifestyle
          through modern smartphones and gadgets.
        </p>
      </div>
    </section>
  );
};

export default About;
