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
const REFRESH_KEY = "gurudev_refresh_token";   // persisted refresh token
const ACCESS_EXPIRY_KEY = "gurudev_access_exp"; // rough expiry hint

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function saveRefreshToken(token, persist) {
  if (persist) {
    localStorage.setItem(REFRESH_KEY, token);
    sessionStorage.removeItem(REFRESH_KEY);
  } else {
    sessionStorage.setItem(REFRESH_KEY, token);
    localStorage.removeItem(REFRESH_KEY);
  }
}

function loadRefreshToken() {
  return localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY) || null;
}

function clearRefreshToken() {
  localStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(ACCESS_EXPIRY_KEY);
}

/** Extract a friendly error message from an API response data object. */
function extractError(data) {
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data === "string") return data;
  // DRF typically returns { detail: "..." } or { field: ["msg"] }
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  if (firstKey) {
    const val = data[firstKey];
    return Array.isArray(val) ? val[0] : String(val);
  }
  return "Something went wrong. Please try again.";
}

/** Build a normalised public user object from the /customers/me/ response shape:
 *  { id, user, username, name, first_name, last_name, email, phone_number,
 *    avatar, social_avatar_url, is_email_verified, ... }
 *  Also handles login/register response that may nest user under `.user` key. */
function toPublicUser(data) {
  // login/register wraps in { access, refresh, user: {...} }
  // but /customers/me/ returns user as an integer ID, so we must verify it is an object
  const u = (data?.user && typeof data.user === 'object') ? data.user : data;
  // Display name: prefer full_name, then name, then first+last, then username
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
    // avatar from customer profile, fallback to social avatar (Google etc.)
    photoURL: u?.avatar ?? u?.social_avatar_url ?? u?.profile_image ?? null,
    emailVerified: u?.is_email_verified ?? u?.email_verified ?? false,
    // customerId is the same as id when coming from /customers/me/
    customerId: u?.id ?? u?.customer_id ?? null,
  };
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);

  // Access token lives only in memory — never in storage
  const accessTokenRef = useRef(null);

  // ------------------------------------------------------------------
  // Expose a getter so other hooks/contexts can read the token without
  // triggering re-renders
  // ------------------------------------------------------------------
  const getAccessToken = useCallback(() => accessTokenRef.current, []);

  // ------------------------------------------------------------------
  // Silent refresh — called on boot and before any authenticated request
  // ------------------------------------------------------------------
  const silentRefresh = useCallback(async () => {
    const storedRefresh = loadRefreshToken();
    if (!storedRefresh) return false;

    const { ok, data } = await apiRefreshToken(storedRefresh);
    if (!ok || !data?.access) {
      clearRefreshToken();
      return false;
    }

    accessTokenRef.current = data.access;

    // Fetch the full user profile with the new access token
    const profileRes = await apiGetCustomer(data.access);
    if (profileRes.ok && profileRes.data) {
      const publicUser = toPublicUser(profileRes.data);
      setUser(publicUser);
      setEmailVerified(publicUser.emailVerified);
    }
    return true;
  }, []);

  // ------------------------------------------------------------------
  // Boot: restore session from stored refresh token
  // ------------------------------------------------------------------
  useEffect(() => {
    silentRefresh().finally(() => setReady(true));
  }, [silentRefresh]);

  // ------------------------------------------------------------------
  // login
  // ------------------------------------------------------------------
  const login = useCallback(async (email, password, rememberMe = true) => {
    const { ok, data } = await apiLogin(email, password);

    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }

    accessTokenRef.current = data.access;
    if (data.refresh) saveRefreshToken(data.refresh, rememberMe);

    // Fetch actual user profile
    const profileRes = await apiGetCustomer(data.access);
    const profileData = profileRes.ok && profileRes.data ? profileRes.data : data;

    const publicUser = toPublicUser(profileData);
    setUser(publicUser);
    setEmailVerified(publicUser.emailVerified);

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
    if (data.refresh) saveRefreshToken(data.refresh, rememberMe);

    // Fetch actual user profile
    const profileRes = await apiGetCustomer(data.access);
    const profileData = profileRes.ok && profileRes.data ? profileRes.data : data;

    const publicUser = toPublicUser(profileData);
    setUser(publicUser);
    setEmailVerified(false); // new accounts always need verification

    toast.success("Account created! Please check your email to verify your account.");
    return { ok: true };
  }, []);

  // ------------------------------------------------------------------
  // loginWithGoogle
  // Receives the Google access_token (from OAuth2 flow)
  // ------------------------------------------------------------------
  const loginWithGoogle = useCallback(async (access_token, rememberMe = true) => {
    const { ok, data } = await apiGoogleLogin(access_token);

    if (!ok) {
      toast.error(extractError(data));
      return { ok: false };
    }

    accessTokenRef.current = data.access;
    if (data.refresh) saveRefreshToken(data.refresh, rememberMe);

    // Fetch actual user profile
    const profileRes = await apiGetCustomer(data.access);
    const profileData = profileRes.ok && profileRes.data ? profileRes.data : data;

    const publicUser = toPublicUser(profileData);
    setUser(publicUser);
    setEmailVerified(publicUser.emailVerified ?? true);

    toast.success(`Welcome, ${publicUser.username || publicUser.name.split(" ")[0] || "there"}!`);
    return { ok: true };
  }, []);

  // ------------------------------------------------------------------
  // logout
  // ------------------------------------------------------------------
  const logout = useCallback(async () => {
    const refreshToken = loadRefreshToken();
    const accessToken = accessTokenRef.current;

    // Fire-and-forget — don't block UI on server response
    if (accessToken && refreshToken) {
      apiLogout(accessToken, refreshToken).catch(() => {});
    }

    accessTokenRef.current = null;
    clearRefreshToken();
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
