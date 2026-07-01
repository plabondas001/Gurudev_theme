import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import footer from "/Img/logo/ge_main_logo.png";
import { Link, NavLink } from "react-router";
import { useConfig } from "../../context/ConfigContext";

const Footer = () => {
  const { config } = useConfig();
  const websiteName = config?.website_name || "Gurudeb Enterprise";
  const logoUrl = config?.logo_light || config?.dashboard_logo || footer;
  const location = config?.location || "Dhaka, Bangladesh";
  const supportPhone = config?.support_phone || "1234654554545";
  const contactEmail = config?.contact_email || "gurudebenterprise@gmail.com";

  const hasSocials = !!(
    config?.facebook_url ||
    config?.twitter_url ||
    config?.instagram_url ||
    config?.youtube_url ||
    config?.linkedin_url
  );

  return (
    <div className="mt-6 md:mt-20 text-white bg-primary pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 py-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="py-4 md:py-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  className="h-12 w-auto object-contain"
                  src={logoUrl}
                  alt={`${websiteName} Logo`}
                />
                <span className="text-left">
                  <span className="block text-sm font-bold text-white leading-tight">
                    {websiteName}
                  </span>
                </span>
              </Link>
            </div>
            <p className="text-xs md:text-sm leading-5">
              {websiteName} is an e-commerce platform dedicated to
              delivering safe and reliable smart gadgets to every home.
            </p>
            <div className="flex items-center gap-2 mt-3 md:mt-4 text-xs md:text-sm">
              <FaLocationDot size={16} className="flex-shrink-0" />
              <span>{location}</span>
            </div>
            <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105 text-xs md:text-sm">
              <IoMdCall size={16} className="flex-shrink-0" />
              <span>{supportPhone}</span>
            </button>
            <button className="flex items-center gap-2 cursor-pointer mt-2 hover:text-black transition duration-700 hover:scale-105 text-xs md:text-sm">
              <MdEmail size={16} className="flex-shrink-0" />
              <span>{contactEmail}</span>
            </button>

            {/* Social Icons */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              {!hasSocials ? (
                <>
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
                </>
              ) : (
                <>
                  {config?.facebook_url && (
                    <a href={config.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebook
                        className=" p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                        size={38}
                      />
                    </a>
                  )}
                  {config?.twitter_url && (
                    <a href={config.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <FaTwitter
                        className="p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                        size={38}
                      />
                    </a>
                  )}
                  {config?.instagram_url && (
                    <a href={config.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram
                        className="p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                        size={38}
                      />
                    </a>
                  )}
                  {config?.youtube_url && (
                    <a href={config.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                      <FaYoutube
                        className="p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                        size={38}
                      />
                    </a>
                  )}
                  {config?.linkedin_url && (
                    <a href={config.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="Linkedin">
                      <FaLinkedin
                        className="p-2 rounded-full hover:text-black transition delay-75 hover:scale-105"
                        size={38}
                      />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Information */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Information
            </h1>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/about"
            >
              About us
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/contact"
            >
              Contact us
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              Company Info
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/terms_conditions"
            >
              Terms & Conditions
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/privacy_policy"
            >
              Privacy Policy
            </NavLink>
          </div>

          {/* Shop By */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Shop By
            </h1>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Smart Phone
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Charger
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Smart Watch
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Power Bank
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Tab
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Earbuds
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/products"
            >
              Accessories
            </NavLink>
          </div>

          {/* Support */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Support
            </h1>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              Support Center
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              How to order
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/track"
            >
              Order Tracking
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              Payment
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="/"
            >
              Shipping
            </NavLink>
          </div>

          {/* Consumer Policy */}
          <div className="py-4 md:py-8 flex flex-col space-y-2">
            <h1 className="font-bold text-sm md:text-base lg:text-lg">
              Consumer Policy
            </h1>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              Return Policy
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              Cancellation
            </NavLink>
            <NavLink
              className="text-xs md:text-sm hover:text-black transition delay-75"
              to="#"
            >
              Pre-Order
            </NavLink>
          </div>
        </div>
      </div>

      {/* Divider — explicit 1px bar so it isn’t clipped next to the mobile bottom nav */}
      <div
        className="h-px bg-black/20 w-full mb-1 md:mb-5 shrink-0"
        aria-hidden
      />

      {/* Copyright & Payment Methods */}
      <div className="w-full px-4 md:px-8 py-3 md:py-6">
        <p className="font-semibold opacity-60 text-xs md:text-sm text-black order-2 md:order-1 text-center">
          © {new Date().getFullYear()} {websiteName}. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
