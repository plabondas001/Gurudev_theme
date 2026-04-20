import {
  Heart,
  List,
  MapPinned,
  ShoppingCart,
  UserRoundKey,
} from "lucide-react";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";

const Header = ({ cartItems = [], removeItem, buyNow }) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mt-6 md:mt-8 gap-4">
        <div>
          <a href="#">
            <img className="w-20 md:w-28 lg:w-31" src="/public/Img/brands/amar_bazar.jpg" alt="logo" />
          </a>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-11 md:h-12 bg-gray-200 text-black px-3 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fc6313]"
            type="search"
            placeholder="Search in..."
          />
        </div>
        <div className="flex items-center text-black gap-4 lg:gap-9 cursor-pointer flex-wrap justify-end">
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#fc6313] transition">
            <MapPinned size={20} />
            <p className="hidden lg:block">Track Order</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#fc6313] transition">
            <UserRoundKey size={20} />
            <p className="hidden lg:block">Sign In</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#fc6313] transition">
            <Heart size={20} />
            <p className="hidden lg:block">Wishlist</p>
          </div>
          <div className="flex flex-col items-center text-xs lg:text-sm hover:text-[#fc6313] transition">
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer flex flex-col items-center"
              aria-label="Open cart"
            >
              <div className="flex items-center relative">
                <ShoppingCart size={20} />
                <p className="text-white absolute left-3 bottom-0 bg-[#fc6313] rounded-full min-w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartItems.length}
                </p>
              </div>
              <p className="hidden lg:block">Cart</p>
            </button>
          </div>
          <div className="relative group flex flex-col items-center text-xs lg:text-sm hover:text-[#fc6313] transition">
            <List size={20} />
            <p className="hidden lg:block">More</p>
            <div className="absolute right-0 mt-10 w-40 bg-white shadow-lg rounded hidden group-hover:block z-50">
              <ul className="py-2">
                <li className="hover:text-[#fc6313]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    About Us
                  </a>
                </li>
                <li className="hover:text-[#fc6313]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    Wishlists
                  </a>
                </li>
                <li className="hover:text-[#fc6313]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    Oil & Ghee
                  </a>
                </li>
                <li className="hover:text-[#fc6313]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    Faqs
                  </a>
                </li>
                <li className="hover:text-[#fc6313]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    Call Us
                  </a>
                </li>
                <li className="hover:text-[#fc6313]">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mt-3 gap-2">
        <div>
          <a href="#">
            <img className="w-16" src="/public/Img/brands/amar_bazar.jpg" alt="logo" />
          </a>
        </div>
        <div className="flex-1">
          <input
            className="w-full h-10 bg-gray-200 text-black px-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc6313]"
            type="search"
            placeholder="Search..."
          />
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="cursor-pointer flex flex-col items-center text-black p-2 hover:text-[#fc6313] transition relative"
          aria-label="Open cart"
        >
          <div className="flex items-center relative">
            <ShoppingCart size={20} />
            <p className="text-white absolute left-2 -top-1 bg-[#fc6313] rounded-full min-w-4 h-4 flex items-center justify-center text-xs font-bold">
              {cartItems.length}
            </p>
          </div>
        </button>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } w-full sm:w-96 md:w-90`}
      >
        <div className="p-4 md:p-5 flex justify-between items-center border-b">
          <h2 className="text-lg md:text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-[#fc6313] font-bold hover:text-[#fc6313] transition"
            aria-label="Close cart"
          >
            <RiCloseLargeLine className="cursor-pointer" size={25} />
          </button>
        </div>

        <div className="p-4 md:p-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 80px)" }}>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">No items in cart</p>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-2 md:gap-3 border-b py-3"
              >
                <div className="flex items-start gap-2 md:gap-3 flex-1">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-base truncate">{item.name}</h3>
                    <p className="text-orange-500 text-sm font-semibold">{item.price}</p>
                    {item.old_price && (
                      <p className="line-through text-gray-500 text-xs md:text-sm">
                        {item.old_price}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-bold cursor-pointer text-[#fc6313] hover:text-red-700 transition"
                    aria-label="Remove item"
                  >
                    <CiCircleRemove size={24} />
                  </button>
                  <button
                    onClick={() =>
                      buyNow
                        ? buyNow(item)
                        : window.alert(`Buy now: ${item.name}`)
                    }
                    className="text-green-600 font-bold cursor-pointer hover:text-green-800 whitespace-nowrap text-xs md:text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overlay for Cart */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setCartOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
