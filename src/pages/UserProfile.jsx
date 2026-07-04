import {
  PieChart,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  Loader2,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";
import { createElement, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import { getUserAvatarImgProps } from "../utils/avatarUrl";
import {
  apiGetDivisions,
  apiGetDistricts,
  apiGetSubDistricts,
} from "../api/authApi";

const MAX_AVATAR_BYTES = 380 * 1024;

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: PieChart },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "edit", label: "Profile Settings", icon: Settings },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white";

function formatOrderDate(iso) {
  try {
    const date = new Date(iso);
    const datePart = date.toLocaleDateString("en-GB").replace(/\//g, "-");
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart} ${timePart}`;
  } catch {
    return iso;
  }
}

function getOrderStatus(order) {
  // API returns status as display_name string or via order_status object
  return order.status || order.order_status?.display_name || "Pending";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function downloadInvoice(order, user) {
  const rows = order.items
    .map(
      (line) => `
        <tr>
          <td>${escapeHtml(line.name)}</td>
          <td>${escapeHtml(line.quantity)}</td>
          <td>${escapeHtml(line.price)}</td>
        </tr>`,
    )
    .join("");
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Invoice ${order.id}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #111827; padding: 32px; }
      h1 { margin: 0 0 8px; }
      table { width: 100%; border-collapse: collapse; margin-top: 24px; }
      th, td { border-bottom: 1px solid #d1d5db; padding: 10px; text-align: left; }
      .total { margin-top: 24px; font-size: 18px; font-weight: 700; text-align: right; }
    </style>
  </head>
  <body>
    <h1>Invoice</h1>
    <p>Order: ${escapeHtml(order.id)}</p>
    <p>Customer: ${escapeHtml(user?.name || "")}</p>
    <p>Date: ${formatOrderDate(order.createdAt)}</p>
    <table>
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="total">Total: ${escapeHtml(order.totalLabel)}</div>
  </body>
</html>`;
  const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-${order.id.slice(0, 8)}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

function ProfileSettings({ user, avatarImgProps, updateProfile, changePassword }) {
  const [editName, setEditName] = useState(user.name || "");
  const [editPhone, setEditPhone] = useState(user.phone || "");
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);

  const onSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    await updateProfile({
      name: editName,
      phone: editPhone,
    });
    setSavingProfile(false);
  };

  const onAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > MAX_AVATAR_BYTES) {
      window.alert("Please choose an image under 380 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === "string") {
        await updateProfile({ avatarDataUrl: dataUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (pwdNew.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (pwdNew !== pwdConfirm) {
      toast.error("New passwords do not match.");
      return;
    }
    setSavingPwd(true);
    const result = await changePassword(pwdCurrent, pwdNew);
    setSavingPwd(false);
    if (result?.ok) {
      setPwdCurrent("");
      setPwdNew("");
      setPwdConfirm("");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <form
        onSubmit={onSaveProfile}
        className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm flex flex-col items-start"
      >
        <h2 className="font-bold text-lg text-slate-900 mb-6">Profile Information</h2>
        
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex flex-col items-center shrink-0 md:w-48">
            <div className="relative">
              {user.avatarDataUrl || user.photoURL ? (
                 <img {...avatarImgProps} alt="" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
              ) : (
                 <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold border-4 border-gray-50 shadow-sm">
                   {user.name?.charAt(0).toUpperCase()}
                 </div>
              )}
              <label className="absolute bottom-0 right-0 cursor-pointer w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 shadow-sm border-2 border-white">
                <Pencil className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" onChange={onAvatarFile} />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div>
              <label className="text-xs font-semibold text-gray-600">Full Name</label>
              <input className={`${inputClass} mt-1`} value={editName} onChange={(e) => setEditName(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 flex justify-between">Email Address {user.email && <span className="text-green-500 font-bold">Verified</span>}</label>
              <input className={`${inputClass} mt-1`} value={user.email} readOnly />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Phone Number</label>
              <input className={`${inputClass} mt-1`} value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Username</label>
              <input className={`${inputClass} mt-1 bg-gray-50`} value={user.username || ""} readOnly />
            </div>
            
            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={savingProfile} className="py-2.5 px-6 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-colors disabled:opacity-60">
                {savingProfile ? "Saving..." : "Save Profile Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <form
        onSubmit={onChangePassword}
        className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm space-y-5"
      >
        <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Change Password
        </h2>
        
        <div>
          <label className="text-xs font-semibold text-gray-600">Current Password</label>
          <input
            type="password"
            className={`${inputClass} mt-1 max-w-md bg-gray-50`}
            value={pwdCurrent}
            onChange={(e) => setPwdCurrent(e.target.value)}
            placeholder="Enter current password"
            autoComplete="current-password"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
          <div>
            <label className="text-xs font-semibold text-gray-600">New Password</label>
            <input
              type="password"
              className={`${inputClass} mt-1`}
              value={pwdNew}
              onChange={(e) => setPwdNew(e.target.value)}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Confirm New Password</label>
            <input
              type="password"
              className={`${inputClass} mt-1`}
              value={pwdConfirm}
              onChange={(e) => setPwdConfirm(e.target.value)}
              placeholder="Re-enter new password"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={savingPwd}
            className="py-2.5 px-6 rounded-lg bg-[#111827] text-white font-bold text-sm hover:bg-black transition-colors disabled:opacity-60"
          >
            {savingPwd ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

const UserProfile = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    user,
    ready,
    isAuthenticated,
    updateProfile,
    changePassword,
    logout,
  } = useAuth();
  const { orders, ordersLoading, addresses, addressesLoading, addAddress, updateAddress, removeAddress, setDefaultAddress } =
    useUserData();

  const tab = searchParams.get("tab") || "orders";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const stateTab = location.state?.tab;
    if (stateTab && tabs.some((t) => t.id === stateTab)) {
      setSearchParams({ tab: stateTab }, { replace: true });
    }
  }, [location.state, setSearchParams]);

  const setTab = (id) => setSearchParams({ tab: id });

  const [addrLabel, setAddrLabel] = useState("Home");
  const [addrName, setAddrName] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrDivision, setAddrDivision] = useState("");
  const [addrDistrict, setAddrDistrict] = useState("");
  const [addrSubDistrict, setAddrSubDistrict] = useState("");
  const [addrLine, setAddrLine] = useState("");
  const [addrDefault, setAddrDefault] = useState(true);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [apiDivisions, setApiDivisions] = useState([]);
  const [apiDistricts, setApiDistricts] = useState([]);
  const [apiSubDistricts, setApiSubDistricts] = useState([]);

  useEffect(() => {
    apiGetDivisions().then((res) => {
      if (res.ok && Array.isArray(res.data)) {
        setApiDivisions(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (!addrDivision) {
      setApiDistricts([]);
      return;
    }
    const div = apiDivisions.find((d) => d.name === addrDivision);
    if (div) {
      apiGetDistricts(div.id).then((res) => {
        if (res.ok && Array.isArray(res.data)) setApiDistricts(res.data);
      });
    }
  }, [addrDivision, apiDivisions]);

  useEffect(() => {
    if (!addrDistrict) {
      setApiSubDistricts([]);
      return;
    }
    const dist = apiDistricts.find((d) => d.name === addrDistrict);
    if (dist) {
      apiGetSubDistricts(dist.id).then((res) => {
        if (res.ok && Array.isArray(res.data)) setApiSubDistricts(res.data);
      });
    }
  }, [addrDistrict, apiDistricts]);

  const avatarImgProps = useMemo(() => getUserAvatarImgProps(user), [user]);

  if (!ready) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const onAddAddress = (e) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!/^\d+$/.test(addrPhone)) {
      toast.error("Phone number can contain numbers only.");
      return;
    }
    if (!addrDivision || !addrDistrict || !addrSubDistrict) {
      toast.error("Please select division, district, and sub district.");
      return;
    }
    const payload = {
      address_type: addrLabel,
      full_name: addrName,
      phone: addrPhone,
      address: addrLine,
      division: addrDivision,
      district: addrDistrict,
      sub_district: addrSubDistrict,
      is_default: addrDefault,
    };

    if (editingAddressId) {
      updateAddress(user.id, editingAddressId, payload);
    } else {
      addAddress(user.id, payload);
    }
    resetAddressForm();
  };

  const resetAddressForm = () => {
    setAddrName("");
    setAddrPhone("");
    setAddrLine("");
    setAddrDivision("");
    setAddrDistrict("");
    setAddrSubDistrict("");
    setAddrDefault(false);
    setEditingAddressId(null);
    setAddrLabel("Home");
  };

  const handleEditAddress = (a) => {
    setEditingAddressId(a.id);
    setAddrName(a.full_name || a.fullName || "");
    setAddrPhone(a.phone_number || a.phone || "");
    setAddrDivision(a.division || "");
    setAddrDistrict(a.district || "");
    setAddrSubDistrict(a.sub_district || a.subDistrict || "");
    setAddrLine(a.address_line || a.addressLine || a.address || "");
    setAddrDefault(a.is_default || a.isDefault || false);
    setAddrLabel(a.address_type || "Home");
    setTab("addresses");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeTabMeta = tabs.find((t) => t.id === tab) || tabs[0];
  const ActiveTabIcon = activeTabMeta.icon;

  return (
    <>
      <style>{`
        @keyframes fade-in-overlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-modal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in-overlay 0.2s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoom-in-modal 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <section className="bg-gray-50/50 min-h-screen pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-16 pt-10">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl text-gray-900 tracking-tight mb-8 ml-2">
            My Dashboard
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:w-[280px] shrink-0">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="bg-primary p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold mb-3 border-[3px] border-primary/20 shadow-sm relative">
                    {user.avatarDataUrl || user.photoURL ? (
                       <img {...avatarImgProps} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                       <span>{user.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white leading-tight">
                    Hello, {user.name}!
                  </h2>
                  <p className="text-xs text-white/90 mt-1.5 font-medium">
                    Gurudeb Enterprise Customer
                  </p>
                </div>

                <nav className="flex flex-col p-4 gap-2">
                  {tabs.map(({ id, label, icon: Icon }) => {
                    const isActive = tab === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTab(id)}
                        className={`flex items-center gap-3 w-full text-left cursor-pointer px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        {createElement(Icon, { className: "w-4 h-4 shrink-0" })}
                        {label}
                      </button>
                    );
                  })}
                  <div className="h-px bg-gray-100 my-2 mx-2" />
                  <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-3 w-full text-left cursor-pointer px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {tab === "dashboard" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-slate-700" /> Dashboard Overview
                    </h2>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex flex-col items-center justify-center text-center">
                        <p className="text-3xl font-extrabold text-primary">
                          {orders.length}
                        </p>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-1">
                          Orders
                        </p>
                      </div>
                      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex flex-col items-center justify-center text-center">
                        <p className="text-3xl font-extrabold text-primary">
                          {addresses.length}
                        </p>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-1">
                          Addresses
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Package className="w-5 h-5 text-slate-700" /> Recent Orders
                    </h2>
                  
                  {orders.length === 0 ? (
                    <p className="text-sm text-gray-500 py-8 text-center border border-dashed rounded-xl">No recent orders found.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <p className="font-bold">Order #{typeof order.id === "string" ? order.id.slice(0, 6).toUpperCase() : String(order.id).padStart(4, "0")}</p>
                              <p className="text-xs text-gray-500">{formatOrderDate(order.created_at || order.createdAt)}</p>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                {getOrderStatus(order)}
                              </span>
                              <p className="font-bold mt-1">{order.grand_total ?? order.total_amount ?? order.totalLabel ?? "—"} ৳</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 text-sm text-gray-600 mb-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${order.payment?.is_paid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                              {order.payment?.is_paid ? "Paid" : "Unpaid"}
                            </span>
                            <span>Transaction ID: {order.payment?.transaction_id || `#${order.id}`}</span>
                            <span>Payment Method: {order.payment?.payment_method || "cod"}</span>
                          </div>
                          
                          <table className="w-full text-sm border-t border-b border-gray-100 my-3">
                            <thead>
                              <tr className="text-left text-gray-600">
                                <th className="py-2 font-normal">Item</th>
                                <th className="py-2 font-normal text-center w-16">Qty</th>
                                <th className="py-2 font-normal text-right w-24">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(order.items || []).slice(0, 2).map((line) => (
                                <tr key={`${order.id}-${line.id}`}>
                                  <td className="py-2 font-medium">{line.product?.name || line.name || "—"}</td>
                                  <td className="py-2 text-center">{line.quantity}</td>
                                  <td className="py-2 text-right">{line.price} ৳</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          
                          <div className="flex justify-between items-center mt-3">
                            <div className="text-sm">
                              <p className="text-gray-500">Shipping Address</p>
                              <p>{order.shipping_address || order.address?.address || "—"}</p>
                            </div>
                            <div className="flex gap-2">
                              <Link to={`/track?order=${order.id}`} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition-colors">
                                Track Order
                              </Link>
                              <button onClick={() => downloadInvoice(order, user)} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition-colors flex items-center gap-1">
                                Download Invoice
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          {tab === "orders" && (
            <div className="rounded-3xl border border-gray-100 bg-white p-4 md:p-6 shadow-sm card-hover">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <Package
                    className="w-6 h-6 text-slate-800"
                    fill="currentColor"
                  />
                  <h2 className="text-2xl font-extrabold text-slate-950">
                    My Orders
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  Total Orders: {orders.length}
                </p>
              </div>

              {ordersLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-10 md:py-14 text-center">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium text-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground mt-1 mb-6">
                    When you check out from your cart, orders will show up here.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders.map((order) => (
                    <article
                      key={order.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 md:p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-slate-950">
                  Order #{typeof order.id === "string" ? order.id.slice(0, 6).toUpperCase() : String(order.id).padStart(4, "0")}
                          </h3>
                          <p className="mt-2 text-sm text-slate-500">
                            {formatOrderDate(order.created_at || order.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            {getOrderStatus(order)}
                          </span>
                           <p className="text-lg font-semibold text-slate-950">
                             {order.grand_total ?? order.total_amount ?? order.totalLabel ?? "—"} ৳
                           </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
                        <span className={`inline-flex w-fit rounded-md px-3 py-2 text-xs font-semibold ${
                          order.payment?.is_paid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {order.payment?.is_paid ? "Paid" : "Unpaid"}
                        </span>
                        <p>
                          Transaction ID: {order.payment?.transaction_id || (typeof order.id === "string" ? order.id.slice(0, 6).toUpperCase() : `#${order.id}`)}
                        </p>
                        <p>Payment Method: {order.payment?.payment_method || "—"}</p>
                      </div>

                      <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                          <thead>
                            <tr className="border-b border-slate-700 text-slate-700">
                              <th className="py-3 pr-4 font-bold">Item</th>
                              <th className="w-24 py-3 pr-4 font-bold">Qty</th>
                              <th className="w-40 py-3 pr-4 font-bold">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(order.items || []).map((line) => (
                              <tr
                                key={`${order.id}-${line.id}`}
                                className="border-b border-slate-300"
                              >
                                <td className="py-3 pr-4 font-semibold text-slate-950">
                                  {line.product?.name || line.name || "—"}
                                </td>
                                <td className="py-3 pr-4 text-slate-950">
                                  {line.quantity}
                                </td>
                                <td className="py-3 pr-4 text-slate-950">
                                  {line.price} ৳
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          to={`/track?order=${order.id}`}
                          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95"
                        >
                          Track Order
                        </Link>
                        <button
                          type="button"
                          onClick={() => downloadInvoice(order, user)}
                          className="inline-flex items-center cursor-pointer justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                        >
                          Download Invoice
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "addresses" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row gap-8">
              <div className="lg:flex-1 lg:pr-8 lg:border-r border-gray-100">
                <h2 className="font-bold text-lg text-slate-900 mb-6">Saved Addresses</h2>
                <div className="space-y-4">
                  {addresses.length === 0 ? (
                    <p className="text-sm text-gray-500 py-8 text-center border border-dashed rounded-xl">No saved addresses.</p>
                  ) : (
                    addresses.map((a) => (
                      <div key={a.id} className="border border-gray-100 rounded-xl p-4 flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-gray-700">{a.full_name || a.fullName}</p>
                          <p className="text-sm text-gray-600 mt-0.5">{a.phone_number || a.phone}</p>
                          <p className="text-sm text-gray-600 mt-1">{a.address_line || a.addressLine}</p>
                          <p className="text-sm text-gray-600">{a.sub_district ? `${a.sub_district}, ` : ''}{a.district}{a.division ? `, ${a.division}` : ''}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex gap-2">
                            <button type="button" onClick={() => handleEditAddress(a)} className="text-xs font-semibold px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 text-gray-600 cursor-pointer">
                              Edit
                            </button>
                            <button type="button" onClick={() => setAddressToDelete(a.id)} className="text-xs font-semibold px-3 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50 cursor-pointer transition-colors">
                              Delete
                            </button>
                          </div>
                          {(a.is_default || a.isDefault) ? (
                            <span className="text-[10px] font-bold text-primary mt-1 bg-primary/10 px-2 py-0.5 rounded">
                              DEFAULT
                            </span>
                          ) : (
                            <button type="button" onClick={() => setDefaultAddress(user.id, a.id)} className="text-[10px] font-bold px-3 py-1 rounded bg-primary text-primary-foreground hover:opacity-90 mt-1 transition-colors">
                              Set Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <form onSubmit={onAddAddress} className="lg:w-[320px] shrink-0 space-y-4">
                <h2 className="font-bold text-lg text-slate-900 mb-2">{editingAddressId ? "Edit Address" : "Add Address"}</h2>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Full Name</label>
                  <input className={`${inputClass} mt-1`} value={addrName} onChange={(e) => setAddrName(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Phone</label>
                  <input className={`${inputClass} mt-1`} value={addrPhone} onChange={(e) => setAddrPhone(e.target.value.replace(/\D/g, ""))} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Division</label>
                  <select className={`${inputClass} mt-1 cursor-pointer`} value={addrDivision} onChange={(e) => { setAddrDivision(e.target.value); setAddrDistrict(""); setAddrSubDistrict(""); }} required>
                    <option value="">Select Division</option>
                    {apiDivisions.map((d) => (
                      <option key={d.id} value={d.name}>{d.bn_name ? `${d.name} / ${d.bn_name}` : d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">District</label>
                  <select className={`${inputClass} mt-1 cursor-pointer`} value={addrDistrict} onChange={(e) => { setAddrDistrict(e.target.value); setAddrSubDistrict(""); }} disabled={!addrDivision} required>
                    <option value="">Select District</option>
                    {apiDistricts.map((d) => (
                      <option key={d.id} value={d.name}>{d.bn_name ? `${d.name} / ${d.bn_name}` : d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Sub District</label>
                  <select className={`${inputClass} mt-1 cursor-pointer`} value={addrSubDistrict} onChange={(e) => setAddrSubDistrict(e.target.value)} disabled={!addrDistrict} required>
                    <option value="">Select Sub District</option>
                    {apiSubDistricts.map((d) => (
                      <option key={d.id} value={d.name}>{d.bn_name ? `${d.name} / ${d.bn_name}` : d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Address</label>
                  <input className={`${inputClass} mt-1`} value={addrLine} onChange={(e) => setAddrLine(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Type</label>
                  <select className={`${inputClass} mt-1 cursor-pointer`} value={addrLabel} onChange={(e) => setAddrLabel(e.target.value)} required>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer text-gray-700 mt-3 group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={addrDefault} onChange={(e) => setAddrDefault(e.target.checked)} className="peer sr-only" />
                    <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center group-hover:border-primary/50 bg-white">
                      <svg className={`w-3.5 h-3.5 text-white transition-transform ${addrDefault ? "scale-100" : "scale-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  Set as default address
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="py-2.5 px-6 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-colors cursor-pointer flex-1">
                    {editingAddressId ? "Update" : "Add"}
                  </button>
                  <button type="button" onClick={resetAddressForm} className="py-2.5 px-6 rounded-lg border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors cursor-pointer flex-1">
                    {editingAddressId ? "Cancel" : "Reset"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {tab === "edit" && (
            <ProfileSettings
              user={user}
              avatarImgProps={avatarImgProps}
              updateProfile={updateProfile}
              changePassword={changePassword}
            />
          )}
            </div>
          </div>
        </div>
      </section>

      {addressToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-zoom-in">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Address?</h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setAddressToDelete(null)} className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="button" onClick={() => { removeAddress(user.id, addressToDelete); setAddressToDelete(null); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
