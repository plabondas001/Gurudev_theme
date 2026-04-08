import {
  Heart,
  List,
  MapPinned,
  ShoppingCart,
  UserRoundKey,
} from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="w-9/12 mx-auto">
      <div className="mt-5 flex items-center justify-between">
        <div>
          <a href="#">
            <img className="w-31" src="/public/Img/logo.png" alt="" />
          </a>
        </div>
        <div>
          <input
            className="w-90 h-12 bg-gray-200 text-black px-3 font-bold rounded-xl focus:outline-none"
            type="search"
            name=""
            id=""
            placeholder="Search in..."
          />
        </div>
        <div className="flex items-center text-black gap-9 cursor-pointer">
          <div className="flex flex-col items-center">
            <MapPinned />
            <p>Track Order</p>
          </div>
          <div className="flex flex-col items-center">
            <UserRoundKey />
            <p>Sign In</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart />
            <p>Wishlist</p>
          </div>
          <div className="flex flex-col items-center">
            <ShoppingCart />
            <p>Cart</p>
          </div>
          <div className="relative group flex flex-col items-center">
            <List />
            <p>More</p>
            <div class="absolute right-0 mt-12 w-40  bg-white shadow-lg rounded hidden group-hover:block">
              <ul class="py-2">
                <li className="hover:text-orange-400">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    About Us
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    Wishlists
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    Oil & Ghee
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    Faqs
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    Call Us
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
