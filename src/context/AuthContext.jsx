import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

const USERS_KEY = "gurudev_auth_users";
const SESSION_LOCAL_KEY = "gurudev_session_local";
const SESSION_TAB_KEY = "gurudev_session_tab";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

async function hashPassword(password) {
  const enc = new TextEncoder().encode(password);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function capitalizeName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function toPublicUser(record) {
  return {
    id: record.id,
    name: capitalizeName(record.name),
    email: record.email,
    phone: record.phone ?? "",
    avatarDataUrl: record.avatarDataUrl ?? null,
  };
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const local = localStorage.getItem(SESSION_LOCAL_KEY);
    if (local) return JSON.parse(local);
    const tab = sessionStorage.getItem(SESSION_TAB_KEY);
    if (tab) return JSON.parse(tab);
  } catch {
    /* ignore */
  }
  return null;
}

function writeSession(user, persist) {
  const payload = JSON.stringify({ user });
  if (persist) {
    localStorage.setItem(SESSION_LOCAL_KEY, payload);
    sessionStorage.removeItem(SESSION_TAB_KEY);
  } else {
    sessionStorage.setItem(SESSION_TAB_KEY, payload);
    localStorage.removeItem(SESSION_LOCAL_KEY);
  }
}

function updateSessionUser(publicUser) {
  if (localStorage.getItem(SESSION_LOCAL_KEY)) {
    writeSession(publicUser, true);
  } else if (sessionStorage.getItem(SESSION_TAB_KEY)) {
    writeSession(publicUser, false);
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_LOCAL_KEY);
  sessionStorage.removeItem(SESSION_TAB_KEY);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (session?.user) {
      const users = loadUsers();
      const full = users.find((u) => u.id === session.user.id);
      if (full) setUser(toPublicUser(full));
      else {
        clearSession();
        setUser(null);
      }
    }
    setReady(true);
  }, []);

  const login = useCallback(async (email, password, rememberMe) => {
    const users = loadUsers();
    const hash = await hashPassword(password);
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.passwordHash === hash
    );
    if (!found) {
      toast.error("Invalid email or password.");
      return { ok: false };
    }
    const publicUser = toPublicUser(found);
    setUser(publicUser);
    writeSession(publicUser, rememberMe);
    toast.success(`Welcome back, ${publicUser.name.split(" ")[0]}!`);
    return { ok: true };
  }, []);

  const register = useCallback(
    async (name, email, password, rememberMe) => {
      const users = loadUsers();
      const lower = email.trim().toLowerCase();
      if (users.some((u) => u.email.toLowerCase() === lower)) {
        toast.error("An account with this email already exists.");
        return { ok: false };
      }
      const hash = await hashPassword(password);
      const newUser = {
        id: crypto.randomUUID(),
        name: capitalizeName(name),
        email: lower,
        passwordHash: hash,
        phone: "",
        avatarDataUrl: null,
      };
      saveUsers([...users, newUser]);
      const publicUser = toPublicUser(newUser);
      setUser(publicUser);
      writeSession(publicUser, rememberMe);
      toast.success("Account created. You are signed in.");
      return { ok: true };
    },
    []
  );

  const updateProfile = useCallback(
    async ({ name, phone, avatarDataUrl }) => {
      if (!user?.id) return { ok: false };
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx === -1) return { ok: false };
      if (name != null) users[idx].name = capitalizeName(name);
      if (phone != null) users[idx].phone = String(phone).trim();
      if (avatarDataUrl !== undefined) {
        users[idx].avatarDataUrl = avatarDataUrl;
      }
      saveUsers(users);
      const next = toPublicUser(users[idx]);
      setUser(next);
      updateSessionUser(next);
      toast.success("Profile updated.");
      return { ok: true };
    },
    [user?.id]
  );

  const changePassword = useCallback(
    async (currentPassword, newPassword) => {
      if (!user?.id) return { ok: false };
      const users = loadUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx === -1) return { ok: false };
      const hashCurrent = await hashPassword(currentPassword);
      if (users[idx].passwordHash !== hashCurrent) {
        toast.error("Current password is incorrect.");
        return { ok: false };
      }
      users[idx].passwordHash = await hashPassword(newPassword);
      saveUsers(users);
      toast.success("Password updated.");
      return { ok: true };
    },
    [user?.id]
  );

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
    toast.info("You have been signed out.");
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      changePassword,
    }),
    [user, ready, login, register, logout, updateProfile, changePassword]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
