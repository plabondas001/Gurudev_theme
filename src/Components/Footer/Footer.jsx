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
    <div className="mt-20 text-white bg-orange-400">
      <div className="w-10/12 mx-auto flex flex-col justify-between md:flex-row">
        <div className="mb-30">
          <div className="py-8">
            <img
              className="w-30 h-15 rounded-md bg-white p-2"
              src="/public/Img/logo.png"
              alt=""
            />
          </div>
          <p>
            Ghorer Bazar is an e-commerce platform dedicated to providing safe
            and reliable food to every home.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <FaLocationDot />
            Kishoreganj,Dhaka,Bangladesh
          </div>
          <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105">
            <IoMdCall />
            1234654554545
          </button>
          <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105">
            <MdEmail />
            ghorerbazar@gmail.com
          </button>
          <div className="mt-8 flex flex-col items-center gap-5 md:flex-row">
            <a href="#">
              <FaFacebook
                className="bg-orange-300 text-black p-1 rounded-full hover:text-blue-600 transition delay-75 hover:scale-105"
                size={35}
              />
            </a>
            <a href="#">
              <FaTwitter
                className="bg-orange-300 text-black p-1 rounded-full hover:text-blue-600 transition delay-75 hover:scale-105"
                size={35}
              />
            </a>
            <a href="#">
              <FaInstagram
                className="bg-orange-300 text-black p-1 rounded-full hover:text-red-500 transition delay-75 hover:scale-105"
                size={35}
              />
            </a>
          </div>

          <p className="font-semibold mt-8 text-xl">Download App on Mobile :</p>

          <div className="flex items-center gap-2">
            <a className="mt-5" href="#">
              <img
                className="cursor-pointer"
                src="/public/Img/customers/google-play.svg"
                alt=""
              />
            </a>
            <a className="mt-5" href="#">
              <img
                className="cursor-pointer"
                src="/public/Img/customers/app-store.svg"
                alt=""
              />
            </a>
          </div>
        </div>

        {/* Information */}
        <div className="py-8 flex flex-col space-y-2">
          <h1 className="font-bold text-xl">Information</h1>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            About us
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Contact us
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Company Information
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Ghorer Bazar Stories
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Terms & Conditions
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Privacy Policy
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Careers
          </a>
        </div>

        {/* Shop By */}
        <div className="py-8 flex flex-col space-y-2">
          <h1 className="font-bold text-xl">Shop By</h1>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Oil & Ghee
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Honey
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Dates
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Spices
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Nuts & Seeds
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Beverage
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Functional Foods
          </a>
        </div>

        {/* Support */}

        <div className="py-8 flex flex-col space-y-2">
          <h1 className="font-bold text-xl">Support</h1>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Support Center
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            How to order
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Order Tracking
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Payment
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Shipping
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            FAQ
          </a>
        </div>

        {/* Consumer Policy */}
        <div className="py-8 flex flex-col space-y-2">
          <h1 className="font-bold text-xl">Consumer Policy</h1>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Happy Return
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Refund Policy
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Exchange
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Cancellation
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Pre-Order
          </a>
          <a className="text-sm hover:text-black transition delay-75 " href="#">
            Extra Discount
          </a>
        </div>
      </div>
      <div className="border-b border-black mb-5 w-10/12 mx-auto"></div>

      <div className="w-10/12 mx-auto flex items-center justify-between">
        <p className="font-semibold text-sm text-black">
          Copyright © 2026 GhorerBazar
        </p>
        <img
          className="w-[800px]"
          src="/public/Img/customers/faysy1756641916.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
