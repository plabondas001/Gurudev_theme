import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  return (
    <div>
      <div className="mt-5 bg-black text-white">
        <ul className="flex items-center gap-8 py-3 w-10/12 mx-auto">
          <a href="#">
            <li>Oil & Ghee</li>
          </a>
          {/* Honey */}
          <div className="relative group">
            <div className="flex items-center">
              <li>
                <a href="#">Honey</a>
              </li>
              <IoMdArrowDropdown />
            </div>
            <div className="absolute left-0 w-60 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-1 text-black font-semibold">
                <a href="">
                  <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                    Sundarban Honey
                  </li>
                </a>
                <a href="">
                  <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                    Black Seed Honey
                  </li>
                </a>
                <a href="">
                  <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                    Lichu Flower Honey
                  </li>
                </a>
                <a href="">
                  <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                    Sidr Honey
                  </li>
                </a>
                <a href="">
                  <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                    Honeycomb
                  </li>
                </a>
              </ul>
            </div>
          </div>
          {/* Dates */}
          <div className="relative group">
            <div className="flex items-center">
              <a href="">
                <li>Dates</li>
              </a>
              <IoMdArrowDropdown />
            </div>
            <div className="absolute left-0 w-60 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-1 text-black font-semibold">
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Kalmi</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Medjool</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Sukkari</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Ajwa</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Mabroom</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Spices */}
          <div className="relative group">
            <div className="flex items-center">
              <a href="">
                <li>Spices</li>
              </a>
              <IoMdArrowDropdown />
            </div>
            <div className="absolute left-0 w-60 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-1 text-black font-semibold">
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Whole Spices</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Basic Spices</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Mixed Spices</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Nuts & Seeds */}
          <div className="relative group">
            <div className="flex items-center">
              <a href="">Nuts & Seeds</a>
              <IoMdArrowDropdown />
            </div>
            <div className="absolute left-0 w-60 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-1 text-black font-semibold">
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Nuts</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Seeds</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Beverage */}
          <div className="relative group">
            <div className="flex items-center">
              <a href="">Beverage</a>
              <IoMdArrowDropdown />
            </div>
            <div className="absolute left-0 w-60 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-1 text-black font-semibold">
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Tea</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Coffee</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Rice */}
          <li>
            <a href="">Rice</a>
          </li>

          {/* Flours & Lentils */}
          <div className="relative group">
            <div className="flex items-center">
              <a href="">Flours & Lentils</a>
              <IoMdArrowDropdown />
            </div>
            <div className="absolute left-0 w-60 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-1 text-black font-semibold">
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Flours</a>
                </li>
                <li className="hover:bg-orange-400 px-2 mb-1 hover:text-white rounded-md">
                  <a href="">Lentils</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Certified */}
          <li>
            <a href="">Certified</a>
          </li>
          {/* Pickle */}
          <li>
            <a href="">Pickle</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
