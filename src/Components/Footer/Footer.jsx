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
                src="/Img/logo/logo.png"
                alt=""
              />
            </div>
            <p className="text-xs md:text-sm leading-5">
              Gurudev Enterprise is an e-commerce platform dedicated to providing safe
              and reliable food to every home.
            </p>
            <div className="flex items-center gap-2 mt-3 md:mt-4 text-xs md:text-sm">
              <FaLocationDot size={16} className="flex-shrink-0" />
              <span>Kishoreganj, Dhaka, Bangladesh</span>
            </div>
            <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105 text-xs md:text-sm">
              <IoMdCall size={16} className="flex-shrink-0" />
              <span>1234654554545</span>
            </button>
            <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105 text-xs md:text-sm">
              <MdEmail size={16} className="flex-shrink-0" />
              <span>amarbazar@gmail.com</span>
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

            {/* App Download */}
            <p className="font-semibold mt-6 md:mt-8 text-xs md:text-sm">
              Download App:
            </p>
            <div className="flex items-center gap-2 mt-3">
              <a href="#" aria-label="Google Play">
                <img
                  className="cursor-pointer h-8 md:h-10"
                  src="/Img/customers/google-play.svg"
                  alt="Google Play"
                />
              </a>
              <a href="#" aria-label="App Store">
                <img
                  className="cursor-pointer h-8 md:h-10"
                  src="/Img/customers/app-store.svg"
                  alt="App Store"
                />
              </a>
            </div>
          </div>

          {/* Information */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">Information</h1>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              About us
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Contact us
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Company Info
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Amar Stories
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Terms & Conditions
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Privacy Policy
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Careers
            </a>
          </div>

          {/* Shop By */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">Shop By</h1>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Oil & Ghee
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Honey
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Dates
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Spices
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Nuts & Seeds
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Beverage
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Functional Foods
            </a>
          </div>

          {/* Support */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">Support</h1>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Support Center
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              How to order
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Order Tracking
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Payment
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Shipping
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              FAQ
            </a>
          </div>

          {/* Consumer Policy */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">Consumer Policy</h1>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Happy Return
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Refund Policy
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Exchange
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Cancellation
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Pre-Order
            </a>
            <a className="text-xs md:text-sm hover:text-black transition delay-75" href="#">
              Extra Discount
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-black w-11/12 md:w-10/12 mx-auto mb-4 md:mb-5"></div>

      {/* Copyright & Payment Methods */}
      <div className="w-11/12 md:w-10/12 mx-auto py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-semibold opacity-60 text-xs md:text-sm text-black order-2 md:order-1">
          © 2026 Gurudeb Enterprise. All rights reserved.
        </p>
        <img
          className="w-64 sm:w-96 md:w-full md:max-w-2xl h-auto order-1 md:order-2"
          src="/Img/customers/faysy1756641916.png"
          alt="Payment methods"
        />
      </div>
    </div>
  );
};

export default Footer;
