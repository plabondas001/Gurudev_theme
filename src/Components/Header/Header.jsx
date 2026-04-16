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
    <div className="w-10/12 mx-auto">
      <div className="flex items-center justify-between mt-8">
        <div>
          <a href="#">
            <img className="w-31" src="/public/Img/logo.png" alt="" />
          </a>
        </div>
        <div>
          <input
            className="w-90 h-12 bg-gray-200 text-black px-3 font-bold rounded-xl focus:outline-none"
            type="search"
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
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer"
            >
              <div className="flex items-center relative">
                <ShoppingCart />
                <p className="text-white absolute left-4 bottom-2 bg-orange-400 rounded-full min-w-5 text-center px-1">
                  {cartItems.length}
                </p>
              </div>
              <p>Cart</p>
            </button>
          </div>
          <div className="relative group flex flex-col items-center">
            <List />
            <p>More</p>
            <div className="absolute right-0 mt-12 w-40 bg-white shadow-lg rounded hidden group-hover:block">
              <ul className="py-2">
                <li className="hover:text-orange-400">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    About Us
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Wishlists
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Oil & Ghee
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Faqs
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Call Us
                  </a>
                </li>
                <li className="hover:text-orange-400">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Open */}
      <div
        className={`fixed top-0 right-0 h-full w-90 bg-white shadow-lg transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-orange-400 font-bold"
          >
            <RiCloseLargeLine className="cursor-pointer" size={25} />
          </button>
        </div>

        <div className="p-5">
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 border-b py-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-orange-500">{item.price}</p>
                    {item.old_price && (
                      <p className="line-through text-gray-500">
                        {item.old_price}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-bold cursor-pointer text-orange-400 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <CiCircleRemove className="mb-5" size={25} />
                  </button>
                  <button
                    onClick={() =>
                      buyNow
                        ? buyNow(item)
                        : window.alert(`Buy now: ${item.name}`)
                    }
                    className="text-green-600 font-bold cursor-pointer hover:text-green-800 whitespace-nowrap"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
