import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  apiChangePassword,
  apiForgotPassword,
  apiGetCustomer,
  apiGoogleLogin,
  apiLogin,
  apiLogout,
  apiRefreshToken,
  apiRegister,
  apiResendVerification,
  apiUpdateCustomer,
} from "../api/authApi";

// ---------------------------------------------------------------------------
// Storage keys — only tokens are persisted, never passwords
// ---------------------------------------------------------------------------
const ACCESS_KEY = "gurudev_access_token";
const REFRESH_KEY = "gurudev_refresh_token";
const USER_KEY = "gurudev_user_profile";
const ACCESS_EXPIRY_KEY = "gurudev_access_exp";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function saveSession(access, refresh, user, persist = true) {
  const storage = persist ? localStorage : sessionStorage;
  const otherStorage = persist ? sessionStorage : localStorage;

  if (access) storage.setItem(ACCESS_KEY, access);
  if (refresh) storage.setItem(REFRESH_KEY, refresh);
  if (user) storage.setItem(USER_KEY, JSON.stringify(user));

  otherStorage.removeItem(ACCESS_KEY);
  otherStorage.removeItem(REFRESH_KEY);
  otherStorage.removeItem(USER_KEY);
}

function loadSession() {
  const access = localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY) || null;
  const refresh = localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY) || null;
  let user = null;
  try {
    const rawUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (rawUser) user = JSON.parse(rawUser);
  } catch (e) {}
  return { access, refresh, user };
}

function clearSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_EXPIRY_KEY);
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(USER_KEY);
}

/** Extract a friendly error message from an API response data object. */
function extractError(data) {
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const val = data[firstKey];
    return Array.isArray(val) ? val[0] : String(val);
  }
  return "Something went wrong. Please try again.";
}

function toPublicUser(data) {
  const u = (data?.user && typeof data.user === 'object') ? data.user : data;
  const fullName =
    u?.full_name ||
    u?.name ||
    [u?.first_name, u?.last_name].filter(Boolean).join(" ") ||
    u?.username ||
    "";
  return {
    id: u?.id ?? u?.pk ?? null,
    name: fullName,
    username: u?.username ?? "",
    email: u?.email ?? "",
    phone: u?.phone_number ?? u?.phone ?? "",
    photoURL: u?.avatar ?? u?.social_avatar_url ?? u?.profile_image ?? null,
    emailVerified: u?.is_email_verified ?? u?.email_verified ?? false,
    customerId: u?.id ?? u?.customer_id ?? null,
  };
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const initialSession = loadSession();
  const [user, setUser] = useState(initialSession.user);
  const [ready, setReady] = useState(false);
  const [emailVerified, setEmailVerified] = useState(initialSession.user?.emailVerified ?? true);

  const accessTokenRef = useRef(initialSession.access);

  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  const silentRefresh = useCallback(async () => {
    const { refresh, access, user: storedUser } = loadSession();

    if (access) {
      accessTokenRef.current = access;
      if (storedUser && !user) setUser(storedUser);
    }

    if (!refresh) {
      if (!access) {
        clearSession();
        setUser(null);
      }
      return Boolean(access);
    }

    const { ok, data } = await apiRefreshToken(refresh);
    if (ok && data?.access) {
      accessTokenRef.current = data.access;
      const currentRefresh = data.refresh || refresh;

      const profileRes = await apiGetCustomer(data.access);
      if (profileRes.ok && profileRes.data) {
        const publicUser = toPublicUser(profileRes.data);
        setUser(publicUser);
        setEmailVerified(publicUser.emailVerified);
        saveSession(data.access, currentRefresh, publicUser, true);
      } else {
        saveSession(data.access, currentRefresh, storedUser, true);
      }
      return true;
    }

    if (!access) {
      clearSession();
      setUser(null);
      return false;
    }

    return true;
  }, [user]);

  useEffect(() => {
    silentRefresh().finally(() => setReady(true));
  }, []);

  const login = useCallback(async (email, password, rememberMe = true) => {
    const { ok, data } = await apiLogin(email, password);

    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }

    accessTokenRef.current = data.access;

    const profileRes = await apiGetCustomer(data.access);
    const profileData = profileRes.ok && profileRes.data ? profileRes.data : data;

    const publicUser = toPublicUser(profileData);
    setUser(publicUser);
    setEmailVerified(publicUser.emailVerified);

    saveSession(data.access, data.refresh, publicUser, rememberMe);

    if (!publicUser.emailVerified) {
      toast.warning("Please verify your email address.");
    } else {
      toast.success(`Welcome back, ${publicUser.username || publicUser.name.split(" ")[0] || "there"}!`);
    }

    return { ok: true };
  }, []);

  // ------------------------------------------------------------------
  // register
  // ------------------------------------------------------------------
  const register = useCallback(async (name, email, password, rememberMe = true) => {
    // Use email prefix as username fallback
    const username = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");

    const { ok, data } = await apiRegister({
      username,
      email,
      password,
      full_name: name,
      phone_number: "",
    });

    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }

    accessTokenRef.current = data.access;

    const profileRes = await apiGetCustomer(data.access);
    const profileData = profileRes.ok && profileRes.data ? profileRes.data : data;

    const publicUser = toPublicUser(profileData);
    setUser(publicUser);
    setEmailVerified(false);

    saveSession(data.access, data.refresh, publicUser, rememberMe);

    toast.success("Account created! Please check your email to verify your account.");
    return { ok: true };
  }, []);

  const loginWithGoogle = useCallback(async (access_token, rememberMe = true) => {
    const { ok, data } = await apiGoogleLogin(access_token);

    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }

    accessTokenRef.current = data.access;

    const profileRes = await apiGetCustomer(data.access);
    const profileData = profileRes.ok && profileRes.data ? profileRes.data : data;

    const publicUser = toPublicUser(profileData);
    setUser(publicUser);
    setEmailVerified(publicUser.emailVerified ?? true);

    saveSession(data.access, data.refresh, publicUser, rememberMe);

    toast.success(`Welcome, ${publicUser.username || publicUser.name.split(" ")[0] || "there"}!`);
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    const { access: accessToken, refresh: refreshToken } = loadSession();

    if (accessToken && refreshToken) {
      apiLogout(accessToken, refreshToken).catch(() => {});
    }

    accessTokenRef.current = null;
    clearSession();
    setUser(null);
    setEmailVerified(true);
    toast.info("You have been signed out.");
  }, []);

  // ------------------------------------------------------------------
  // updateProfile
  // ------------------------------------------------------------------
  const updateProfile = useCallback(
    async ({ name, phone, avatarDataUrl }) => {
      if (!user?.id) return { ok: false };
      const token = accessTokenRef.current;
      if (!token) return { ok: false };

      const payload = {};
      if (name != null) payload.full_name = name;
      if (phone != null) payload.phone_number = phone;
      // avatarDataUrl upload is a separate concern (not in scope for text API)

      const customerId = user.customerId ?? user.id;
      const { ok, data } = await apiUpdateCustomer(token, customerId, payload);

      if (!ok) {
        toast.error(extractError(data));
        return { ok: false };
      }

      const updated = {
        ...user,
        name: data?.full_name ?? name ?? user.name,
        phone: data?.phone_number ?? phone ?? user.phone,
      };
      setUser(updated);
      toast.success("Profile updated.");
      return { ok: true };
    },
    [user]
  );

  // ------------------------------------------------------------------
  // changePassword
  // ------------------------------------------------------------------
  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      const token = accessTokenRef.current;
      if (!token) return { ok: false };

      const { ok, data } = await apiChangePassword(token, currentPassword, newPassword);
      if (!ok) {
        toast.error(extractError(data));
        return { ok: false };
      }
      toast.success("Password updated.");
      return { ok: true };
    },
    []
  );

  // ------------------------------------------------------------------
  // forgotPassword
  // ------------------------------------------------------------------
  const forgotPassword = useCallback(async (email) => {
    const { ok, data } = await apiForgotPassword(email);
    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }
    return { ok: true };
  }, []);

  // ------------------------------------------------------------------
  // resendVerification
  // ------------------------------------------------------------------
  const resendVerification = useCallback(async () => {
    const token = accessTokenRef.current;
    const { ok, data } = await apiResendVerification(token);
    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }
    toast.success("Verification email sent. Please check your inbox.");
    return { ok: true };
  }, []);

  // ------------------------------------------------------------------
  // Context value
  // ------------------------------------------------------------------
  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: !!user,
      emailVerified,
      getAccessToken,
      login,
      loginWithGoogle,
      register,
      logout,
      updateProfile,
      changePassword,
      forgotPassword,
      resendVerification,
    }),
    [
      user,
      ready,
      emailVerified,
      getAccessToken,
      login,
      loginWithGoogle,
      register,
      logout,
      updateProfile,
      changePassword,
      forgotPassword,
      resendVerification,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
