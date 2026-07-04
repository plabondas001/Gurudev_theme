import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import {
  apiAddAddress,
  apiDeleteAddress,
  apiGetAddresses,
  apiGetOrders,
  apiCreateOrder,
  apiUpdateAddress,
} from "../api/authApi";

const UserDataContext = createContext(null);

export const useUserData = () => {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within UserDataProvider");
  return ctx;
};

export const UserDataProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessToken } = useAuth();

  // -----------------------------------------------------------------------
  // Orders — fetched from API
  // -----------------------------------------------------------------------
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }
    const token = getAccessToken();
    if (!token) return;

    setOrdersLoading(true);
    apiGetOrders(token)
      .then(({ ok, data }) => {
        if (ok) {
          const list = Array.isArray(data) ? data : data?.results ?? [];
          setOrders(list);
        }
      })
      .finally(() => setOrdersLoading(false));
  }, [isAuthenticated, getAccessToken, user?.id]);

  /** Place order via POST /orders/ — cart items used automatically by backend */
  const placeOrder = useCallback(
    async (userId, cartItems, payload = {}) => {
      const token = getAccessToken();
      if (!token) return null;

      const { ok, data } = await apiCreateOrder(token, payload);
      if (!ok) {
        const msg =
          data?.detail ||
          (typeof data === "object" ? Object.values(data)[0] : null) ||
          "Failed to place order.";
        toast.error(Array.isArray(msg) ? msg[0] : msg);
        return null;
      }

      // Prepend the new order to local state
      setOrders((prev) => [data, ...prev]);
      return data;
    },
    [getAccessToken]
  );

  // -----------------------------------------------------------------------
  // Addresses — fetched from API
  // -----------------------------------------------------------------------
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setAddresses([]);
      return;
    }
    const token = getAccessToken();
    if (!token) return;

    setAddressesLoading(true);
    apiGetAddresses(token)
      .then(({ ok, data }) => {
        if (ok) {
          const list = Array.isArray(data) ? data : data?.results ?? [];
          setAddresses(list);
        }
      })
      .finally(() => setAddressesLoading(false));
  }, [isAuthenticated, getAccessToken, user?.id]);

  const addAddress = useCallback(
    async (userId, payload) => {
      const token = getAccessToken();
      if (!token) return;

      const { ok, data } = await apiAddAddress(token, payload);
      if (!ok) {
        toast.error("Failed to save address.");
        return;
      }
      setAddresses((prev) => [...prev, data]);
      toast.success("Address saved.");
    },
    [getAccessToken]
  );

  const removeAddress = useCallback(
    async (userId, addressId) => {
      const token = getAccessToken();
      if (!token) return;

      const { ok } = await apiDeleteAddress(token, addressId);
      if (!ok) {
        toast.error("Failed to remove address.");
        return;
      }
      setAddresses((prev) => prev.filter((a) => a.id !== addressId));
      toast.info("Address removed.");
    },
    [getAccessToken]
  );

  const setDefaultAddress = useCallback(
    async (userId, addressId) => {
      const token = getAccessToken();
      if (!token) return;

      const addr = addresses.find((a) => a.id === addressId);
      if (!addr) return;

      const { ok } = await apiUpdateAddress(token, addressId, {
        ...addr,
        is_default: true,
      });
      if (!ok) {
        toast.error("Failed to update default address.");
        return;
      }
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, is_default: a.id === addressId }))
      );
    },
    [getAccessToken, addresses]
  );

  // -----------------------------------------------------------------------
  // Context value
  // -----------------------------------------------------------------------
  const value = useMemo(
    () => ({
      orders,
      ordersLoading,
      addresses,
      addressesLoading,
      placeOrder,
      addAddress,
      removeAddress,
      setDefaultAddress,
    }),
    [
      orders,
      ordersLoading,
      addresses,
      addressesLoading,
      placeOrder,
      addAddress,
      removeAddress,
      setDefaultAddress,
    ]
  );

  return (
    <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
  );
};
