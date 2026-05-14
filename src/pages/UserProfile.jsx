import {
  ChevronRight,
  Home,
  Loader2,
  MapPin,
  Package,
  Pencil,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserDataContext";
import { getUserAvatarImgProps } from "../utils/avatarUrl";

const MAX_AVATAR_BYTES = 380 * 1024;

const tabs = [
  { id: "orders", label: "My orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "edit", label: "Edit profile", icon: Pencil },
];

const inputClass =
  "w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

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
  return order.status === "Processing" ? "Pending" : order.status || "Pending";
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
  const { orders, addresses, addAddress, removeAddress, setDefaultAddress } =
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

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);

  const [addrLabel, setAddrLabel] = useState("Home");
  const [addrName, setAddrName] = useState("");
  const [addrPhone, setAddrPhone] = useState("");
  const [addrLine, setAddrLine] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrDefault, setAddrDefault] = useState(true);

  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
    }
  }, [user?.id, user?.name, user?.phone]);

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

  const onRemoveAvatar = async () => {
    await updateProfile({ avatarDataUrl: null });
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

  const onAddAddress = (e) => {
    e.preventDefault();
    if (!user?.id) return;
    if (!/^\d+$/.test(addrPhone)) {
      toast.error("Phone number can contain numbers only.");
      return;
    }
    addAddress(user.id, {
      label: addrLabel,
      fullName: addrName,
      phone: addrPhone,
      addressLine: addrLine,
      city: addrCity,
      isDefault: addrDefault,
    });
    setAddrName("");
    setAddrPhone("");
    setAddrLine("");
    setAddrCity("");
    setAddrDefault(false);
  };

  const activeTabMeta = tabs.find((t) => t.id === tab) || tabs[0];

  return (
    <section className="w-11/12 md:w-10/12 mx-auto py-6 md:py-12 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-12">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 hover:text-primary"
        >
          <Home className="w-4 h-4" />
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Account</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-10">
        <aside className="lg:w-64 shrink-0">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <img
                {...avatarImgProps}
                alt=""
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 bg-muted"
              />
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <nav className="flex-col overflow-visible pb-1 lg:pb-0 no-scrollbar">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 w-full text-left cursor-pointer px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                    tab === id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-green-50"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={logout}
              className="mt-4 w-full py-2.5 text-sm font-medium text-destructive hover:bg-green-50 cursor-pointer rounded-xl transition"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {activeTabMeta.label}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {tab === "orders" &&
                "Orders you placed from this device while signed in."}
              {tab === "addresses" &&
                "Save delivery addresses for faster checkout later."}
              {tab === "edit" &&
                "Update your details. Email is fixed to your account."}
            </p>
          </header>

          {tab === "orders" && (
            <div className="rounded-2xl border border-slate-300 bg-white p-4 md:p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <Package
                    className="w-6 h-6 text-slate-800"
                    fill="currentColor"
                  />
                  <h2 className="text-2xl font-bold text-slate-950">
                    My Orders
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  Total Orders: {orders.length}
                </p>
              </div>

              {orders.length === 0 ? (
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
                            Order #{order.id.slice(0, 6).toUpperCase()}
                          </h3>
                          <p className="mt-2 text-sm text-slate-500">
                            {formatOrderDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            {getOrderStatus(order)}
                          </span>
                          <p className="text-lg font-semibold text-slate-950">
                            {order.totalLabel}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
                        <span className="inline-flex w-fit rounded-md bg-red-100 px-3 py-2 text-xs font-semibold text-red-700">
                          Unpaid
                        </span>
                        <p>
                          Transaction ID: {order.id.slice(0, 6).toUpperCase()}
                        </p>
                        <p>Payment Method: cod</p>
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
                            {order.items.map((line) => (
                              <tr
                                key={`${order.id}-${line.id}`}
                                className="border-b border-slate-300"
                              >
                                <td className="py-3 pr-4 font-semibold text-slate-950">
                                  {line.name}
                                </td>
                                <td className="py-3 pr-4 text-slate-950">
                                  {line.quantity}
                                </td>
                                <td className="py-3 pr-4 text-slate-950">
                                  {line.price}
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
            <div className="grid gap-8 lg:grid-cols-5">
              <form
                onSubmit={onAddAddress}
                className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4 h-fit"
              >
                <h2 className="font-semibold text-lg">Add address</h2>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Label
                  </label>
                  <input
                    className={`${inputClass} mt-1`}
                    value={addrLabel}
                    onChange={(e) => setAddrLabel(e.target.value)}
                    placeholder="Home, Office…"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Full name
                  </label>
                  <input
                    className={`${inputClass} mt-1`}
                    value={addrName}
                    onChange={(e) => setAddrName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Phone
                  </label>
                  <input
                    className={`${inputClass} mt-1`}
                    value={addrPhone}
                    onChange={(e) =>
                      setAddrPhone(e.target.value.replace(/\D/g, ""))
                    }
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Address
                  </label>
                  <textarea
                    className={`${inputClass} mt-1 min-h-[88px] resize-y`}
                    value={addrLine}
                    onChange={(e) => setAddrLine(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    City / area
                  </label>
                  <input
                    className={`${inputClass} mt-1`}
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    required
                  />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addrDefault}
                    onChange={(e) => setAddrDefault(e.target.checked)}
                    className="rounded border-border text-primary"
                  />
                  Set as default
                </label>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95"
                >
                  Save address
                </button>
              </form>
              <div className="lg:col-span-3 space-y-3">
                {addresses.length === 0 ? (
                  <p className="text-sm text-muted-foreground rounded-2xl border border-dashed border-border px-6 py-10 text-center">
                    No saved addresses. Add one on the left.
                  </p>
                ) : (
                  addresses.map((a) => (
                    <div
                      key={a.id}
                      className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{a.label}</span>
                          {a.isDefault && (
                            <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium">{a.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {a.phone}
                        </p>
                        <p className="text-sm mt-2 text-foreground">
                          {a.addressLine}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {a.city}
                        </p>
                      </div>
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        {!a.isDefault && (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(user.id, a.id)}
                            className="text-xs font-semibold text-primary hover:underline px-2 py-1"
                          >
                            Set default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAddress(user.id, a.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:bg-destructive/10 rounded-lg px-2 py-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {tab === "edit" && (
            <div className="space-y-8 max-w-xl">
              <form
                onSubmit={onSaveProfile}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
              >
                <h2 className="font-semibold text-lg">Profile details</h2>
                <div className="flex items-center gap-4">
                  <img
                    {...avatarImgProps}
                    alt=""
                    className="w-20 h-20 rounded-2xl object-cover border border-border"
                  />
                  <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95">
                      Change photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onAvatarFile}
                      />
                    </label>
                    {user.avatarDataUrl && user.photoURL && (
                      <button
                        type="button"
                        onClick={onRemoveAvatar}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/60"
                      >
                        Use Google photo
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    className={`${inputClass} mt-1`}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Phone
                  </label>
                  <input
                    className={`${inputClass} mt-1`}
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    className={`${inputClass} mt-1 opacity-70 cursor-not-allowed`}
                    value={user.email}
                    readOnly
                    title="Email cannot be changed"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email is your login and cannot be changed here.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 disabled:opacity-60"
                >
                  {savingProfile ? "Saving…" : "Save changes"}
                </button>
              </form>

              <form
                onSubmit={onChangePassword}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
              >
                <h2 className="font-semibold text-lg">Change password</h2>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Current password
                  </label>
                  <input
                    type="password"
                    className={`${inputClass} mt-1`}
                    value={pwdCurrent}
                    onChange={(e) => setPwdCurrent(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    New password
                  </label>
                  <input
                    type="password"
                    className={`${inputClass} mt-1`}
                    value={pwdNew}
                    onChange={(e) => setPwdNew(e.target.value)}
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className={`${inputClass} mt-1`}
                    value={pwdConfirm}
                    onChange={(e) => setPwdConfirm(e.target.value)}
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingPwd}
                  className="py-3 px-6 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 disabled:opacity-60"
                >
                  {savingPwd ? "Updating…" : "Update password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
