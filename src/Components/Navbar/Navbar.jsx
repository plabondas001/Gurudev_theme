import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMobileSubmenu = (idx) => {
    setExpandedMenu(expandedMenu === idx ? null : idx);
  };

  const navItems = [
    {
      label: "Oil & Ghee",
      href: "/oil",
      submenu: null,
    },
    {
      label: "Honey",
      href: "#",
      submenu: [
        { label: "Sundarban Honey", href: "" },
        { label: "Black Seed Honey", href: "" },
        { label: "Lichu Flower Honey", href: "" },
        { label: "Sidr Honey", href: "" },
        { label: "Honeycomb", href: "" },
      ],
    },
    {
      label: "Dates",
      href: "#",
      submenu: [
        { label: "Kalmi", href: "" },
        { label: "Medjool", href: "" },
        { label: "Sukkari", href: "" },
        { label: "Ajwa", href: "" },
        { label: "Mabroom", href: "" },
      ],
    },
    {
      label: "Spices",
      href: "#",
      submenu: [
        { label: "Whole Spices", href: "" },
        { label: "Basic Spices", href: "" },
        { label: "Mixed Spices", href: "" },
      ],
    },
    {
      label: "Nuts & Seeds",
      href: "#",
      submenu: [
        { label: "Nuts", href: "" },
        { label: "Seeds", href: "" },
      ],
    },
    {
      label: "Beverage",
      href: "#",
      submenu: [
        { label: "Tea", href: "" },
        { label: "Coffee", href: "" },
      ],
    },
    {
      label: "Rice",
      href: "#",
      submenu: null,
    },
    {
      label: "Flours & Lentils",
      href: "#",
      submenu: [
        { label: "Flours", href: "" },
        { label: "Lentils", href: "" },
      ],
    },
    {
      label: "Certified",
      href: "#",
      submenu: null,
    },
    {
      label: "Pickle",
      href: "#",
      submenu: null,
    },
  ];

  return (
    <div>
      <div className="mt-3 md:mt-5 bg-black text-white">
        <div className="flex items-center justify-between w-11/12 md:w-10/12 mx-auto py-2 md:py-3">
          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <RiCloseLargeLine /> : <RxHamburgerMenu />}
          </button>

          {/* Navbar for Desktop */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-6 flex-wrap">
            {navItems.map((item, idx) =>
              item.submenu ? (
                <div key={idx} className="relative group">
                  <div className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:text-[#fc6313] transition">
                    <a href={item.href}>
                      <span className="text-sm lg:text-base">{item.label}</span>
                    </a>
                    <IoMdArrowDropdown size={14} />
                  </div>
                  <div className="absolute left-0 w-48 bg-white shadow-lg rounded hidden group-hover:block z-50">
                    <ul className="py-1 text-black font-semibold">
                      {item.submenu.map((subitem, subidx) => (
                        <li
                          key={subidx}
                          className="hover:bg-[#fc6313] px-3 py-2 hover:text-white transition text-sm"
                        >
                          <a href={subitem.href}>{subitem.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <li key={idx} className="px-2 py-1 hover:text-[#fc6313] transition text-sm lg:text-base">
                  <a href={item.href}>{item.label}</a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black py-4">
            <ul className="w-11/12 mx-auto flex flex-col gap-3">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b border-gray-700 pb-3">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu(idx)}
                        className="flex items-center justify-between w-full text-white hover:text-[#fc6313] transition text-sm"
                      >
                        <span>{item.label}</span>
                        <IoMdArrowDropdown
                          size={16}
                          className={`transition-transform ${
                            expandedMenu === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {expandedMenu === idx && (
                        <ul className="ml-4 mt-2 flex flex-col gap-2">
                          {item.submenu.map((subitem, subidx) => (
                            <li key={subidx}>
                              <a
                                href={subitem.href}
                                className="text-gray-300 hover:text-[#fc6313] transition text-xs"
                              >
                                {subitem.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="text-white hover:text-[#fc6313] transition text-sm"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
