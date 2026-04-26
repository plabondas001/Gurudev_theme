import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMobileSubmenu = (idx) => {
    setExpandedMenu(expandedMenu === idx ? null : idx);
  };

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Product",
      href: "product",
    },
    {
      label: "About",
      href: "about",
    },
    {
      label: "Contact",
      href: "contact",
    },
  ];

  return (
    <div>
      <div className="mt-3 md:mt-5 bg-[#31714f] text-white">
        <div className="flex items-center justify-between w-11/12 md:w-10/12 mx-auto py-2 md:py-3">
          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden text-white text-2xl cursor-pointer"
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
                  <div className="flex items-center gap-1 px-2 py-1 cursor-pointer hover:text-black transition">
                    <NavLink to={item.href}>
                      <span className="text-sm lg:text-base">{item.label}</span>
                    </NavLink>
                    <IoMdArrowDropdown size={14} />
                  </div>
                  <div className="absolute left-0 w-48 bg-white shadow-lg rounded hidden group-hover:block z-50">
                    <ul className="py-1 text-black font-semibold">
                      {item.submenu.map((subitem, subidx) => (
                        <li
                          key={subidx}
                          className="hover:bg-[#31714f] px-3 py-2 hover:text-white transition text-sm"
                        >
                          <NavLink to={subitem.href}>{subitem.label}</NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <li
                  key={idx}
                  className="px-2 py-1 transition text-sm lg:text-xl hover:underline underline-offset-4"
                >
                  <NavLink to={item.href}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#31714f] py-4">
            <ul className="w-11/12 mx-auto flex flex-col gap-3">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b border-gray-700 pb-3">
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu(idx)}
                        className="flex items-center justify-between w-full text-white transition text-sm"
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
                              <NavLink
                                to={subitem.href}
                                className="text-gray-300 transition text-xs"
                              >
                                {subitem.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      className="text-white hover:underline underline-offset-4 transition text-sm"
                    >
                      {item.label}
                    </NavLink>
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
