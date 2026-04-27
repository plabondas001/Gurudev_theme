import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="mt-10 md:mt-20 text-white bg-[#31714f]">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 py-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="py-4 md:py-8">
              <img
                className="w-20 md:w-28 lg:w-30 h-10 md:h-12 lg:h-15 rounded-md bg-white p-2 object-contain"
                src="/public/Img/logo/b_logo.png"
                alt=""
              />
            </div>
            <p className="text-xs md:text-sm leading-5">
              Gurudeb Enterprise is an e-commerce platform dedicated to
              delivering safe and reliable smart gadgets to every home.
            </p>
            <div className="flex items-center gap-2 mt-3 md:mt-4 text-xs md:text-sm">
              <FaLocationDot size={16} className="flex-shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105 text-xs md:text-sm">
              <IoMdCall size={16} className="flex-shrink-0" />
              <span>1234654554545</span>
            </button>
            <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105 text-xs md:text-sm">
              <MdEmail size={16} className="flex-shrink-0" />
              <span>gurudebenterprise@gmail.com</span>
            </button>

            {/* Social Icons */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <a href="#" aria-label="Facebook">
                <FaFacebook
                  className=" p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                  size={38}
                />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter
                  className="p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                  size={38}
                />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram
                  className="p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                  size={38}
                />
              </a>
            </div>
          </div>

          {/* Information */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Information
            </h1>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              About us
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Contact us
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Company Info
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Terms & Conditions
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Privacy Policy
            </a>
          </div>

          {/* Shop By */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Shop By
            </h1>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Smart Phone
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Charger
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Smart Watch
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Power Bank
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Tab
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Earbuds
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Accessories
            </a>
          </div>

          {/* Support */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Support
            </h1>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Support Center
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              How to order
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Order Tracking
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Payment
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Shipping
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              FAQ
            </a>
          </div>

          {/* Consumer Policy */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Consumer Policy
            </h1>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Return Policy
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Cancellation
            </a>
            <a
              className="text-xs md:text-sm hover:text-black transition delay-75"
              href="#"
            >
              Pre-Order
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-black w-11/12 md:w-10/12 mx-auto mb-4 md:mb-5"></div>

      {/* Copyright & Payment Methods */}
      <div className="w-11/12 md:w-10/12 mx-auto py-4 md:py-6">
        <p className="font-semibold opacity-60 text-xs md:text-sm text-black order-2 md:order-1 text-center">
          © 2026 Gurudeb Enterprise. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
