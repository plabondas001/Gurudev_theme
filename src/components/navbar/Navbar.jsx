import React from "react";
import {
  IoBagHandleOutline,
  IoCallOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { LuMapPinned } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { NavLink } from "react-router";

const Navbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const mobileBottomItems = [
    { label: "Home", href: "/", icon: <IoHomeOutline size={25} /> },
    {
      label: "Products",
      href: "/products",
      icon: <IoBagHandleOutline size={25} />,
    },
    {
      label: "Track Order",
      href: "/track",
      icon: <LuMapPinned size={25} />,
    },
    { label: "Contact", href: "/contact", icon: <IoCallOutline size={25} /> },
    {
      label: "Sign In",
      href: "/signin",
      icon: <RiAccountCircleLine size={25}/>
,
    },
  ];

  return (
    <div>
      <div className="hidden md:block bg-primary text-white">
        <div className="w-11/12 md:w-10/12 mx-auto py-2 md:py-3">
          <ul className="flex items-center gap-2 lg:gap-6 flex-wrap">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="px-2 py-1 transition text-sm lg:text-xl hover:underline underline-offset-4"
              >
                <NavLink to={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <ul className="grid grid-cols-5">
          {mobileBottomItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) => `flex flex-col items-center justify-center gap-0.5 py-2 px-0.5 text-[11px] ${isActive ? "text-primary" : "text-gray-600"}`}
              >
                {item.icon}
                <span className="text-center leading-tight">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;




