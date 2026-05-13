import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useUserData } from "../context/UserDataContext";

export function usePlaceOrder() {
  const { user } = useAuth();
  const { placeOrder } = useUserData();
  const { cartItems, clearCartSilent } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (items) => {
      const lineItems = items ?? cartItems;
      if (!lineItems?.length) {
        toast.error("Your cart is empty.");
        return false;
      }
      if (!user?.id) {
        toast.error("Please sign in to place an order.");
        navigate("/signin", { state: { from: location } });
        return false;
      }
      placeOrder(user.id, lineItems);
      clearCartSilent();
      toast.success("Order placed successfully!");
      navigate("/profile?tab=orders");
      return true;
    },
    [user?.id, placeOrder, clearCartSilent, navigate, location, cartItems]
  );
}
