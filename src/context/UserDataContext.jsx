import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import {
  computeCartTotals,
  snapshotOrderItems,
} from "../utils/orderUtils";

const ORDERS_KEY = "gurudev_orders";
const ADDRESSES_KEY = "gurudev_addresses";

const UserDataContext = createContext(null);

export const useUserData = () => {
  const ctx = useContext(UserDataContext);
  if (!ctx) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return ctx;
};

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function loadAddressMap() {
  try {
    const raw = localStorage.getItem(ADDRESSES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAddressMap(map) {
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(map));
}

export const UserDataProvider = ({ children }) => {
  const { user } = useAuth();
  const [ordersTick, setOrdersTick] = useState(0);
  const [addressesTick, setAddressesTick] = useState(0);

  const orders = useMemo(() => {
    if (!user?.id) return [];
    return loadOrders().filter((o) => o.userId === user.id);
  }, [user?.id, ordersTick]);

  const addresses = useMemo(() => {
    if (!user?.id) return [];
    const map = loadAddressMap();
    return map[user.id] || [];
  }, [user?.id, addressesTick]);

  const placeOrder = useCallback((userId, cartItems) => {
    if (!userId || !cartItems?.length) return null;
    const { subtotal, totalLabel } = computeCartTotals(cartItems);
    const order = {
      id: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
      status: "Pending",
      items: snapshotOrderItems(cartItems),
      total: subtotal,
      totalLabel,
    };
    const all = loadOrders();
    all.unshift(order);
    saveOrders(all);
    setOrdersTick((t) => t + 1);
    return order;
  }, []);

  const addAddress = useCallback(
    (userId, payload) => {
      const map = loadAddressMap();
      const list = map[userId] || [];
      const next = {
        id: crypto.randomUUID(),
        label: payload.label?.trim() || "Address",
        fullName: payload.fullName?.trim() || "",
        phone: payload.phone?.trim() || "",
        addressLine: payload.addressLine?.trim() || "",
        city: payload.city?.trim() || "",
        isDefault: Boolean(payload.isDefault),
      };
      let updated = [...list, next];
      if (next.isDefault) {
        updated = updated.map((a) => ({
          ...a,
          isDefault: a.id === next.id,
        }));
      }
      map[userId] = updated;
      saveAddressMap(map);
      setAddressesTick((t) => t + 1);
      toast.success("Address saved");
    },
    []
  );

  const removeAddress = useCallback((userId, addressId) => {
    const map = loadAddressMap();
    const list = map[userId] || [];
    map[userId] = list.filter((a) => a.id !== addressId);
    saveAddressMap(map);
    setAddressesTick((t) => t + 1);
    toast.info("Address removed");
  }, []);

  const setDefaultAddress = useCallback((userId, addressId) => {
    const map = loadAddressMap();
    const list = map[userId] || [];
    map[userId] = list.map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    saveAddressMap(map);
    setAddressesTick((t) => t + 1);
  }, []);

  const value = useMemo(
    () => ({
      orders,
      addresses,
      placeOrder,
      addAddress,
      removeAddress,
      setDefaultAddress,
    }),
    [
      orders,
      addresses,
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
