import { motion } from "framer-motion";
import {
  BadgeCheck,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import logo from "/Img/logo/ge_main_logo.png";

const tabClass = (active) =>
  `relative flex-1 py-2 md:py-3 text-sm font-semibold transition-colors rounded-lg ${
    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
  }`;

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-3 py-2.5 md:px-4 md:py-3 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary";

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

const RAW_GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || "";
const GOOGLE_WEB_CLIENT_ID_RE =
  /^\d+[a-zA-Z0-9_-]*\.apps\.googleusercontent\.com$/;
const GOOGLE_CLIENT_ID = GOOGLE_WEB_CLIENT_ID_RE.test(RAW_GOOGLE_CLIENT_ID)
  ? RAW_GOOGLE_CLIENT_ID
  : "";
const googleClientIdEnvInvalid =
  RAW_GOOGLE_CLIENT_ID.length > 0 && !GOOGLE_CLIENT_ID;

function decodeJwtPayload(token) {
  const payload = token.split(".")[1];
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const decoded = atob(padded);
  const bytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

const GoogleButtonBlock = ({
  googleUi,
  googleButtonRef,
  handleGoogleSignIn,
  variant = "signin",
}) => (
  <div className="space-y-2 md:space-y-3">
    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      {variant === "register" ? "or sign up with" : "or continue with"}
      <span className="h-px flex-1 bg-border" />
    </div>

    <div className="relative w-full min-h-[48px] md:min-h-[52px]">
      {GOOGLE_CLIENT_ID && googleUi === "loading" && (
        <div
          className="absolute inset-0 z-10 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3.5 text-sm font-medium text-muted-foreground"
          aria-live="polite"
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          {variant === "register"
            ? "Loading Google sign-up…"
            : "Loading Google sign-in…"}
        </div>
      )}
      {GOOGLE_CLIENT_ID && googleUi === "error" && (
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-muted/50"
        >
          <GoogleIcon />
          {variant === "register"
            ? "Sign up with Google"
            : "Sign in with Google"}
        </button>
      )}
      {/* Center the GIS widget; logo_alignment centers icon+label inside the button */}
      <div
        ref={googleButtonRef}
        className={`w-full min-h-[48px] md:min-h-[52px] flex flex-col items-center justify-center ${
          GOOGLE_CLIENT_ID && googleUi === "loading" ? "opacity-0" : ""
        } ${GOOGLE_CLIENT_ID && googleUi === "error" ? "hidden" : ""}`}
      />
    </div>

    {!GOOGLE_CLIENT_ID && (
      <>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-muted/50"
        >
          <GoogleIcon />
          {variant === "register"
            ? "Sign up with Google"
            : "Sign in with Google"}
        </button>
        <div
          className={`rounded-lg border px-3 py-2.5 text-xs leading-relaxed ${
            googleClientIdEnvInvalid
              ? "border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100"
              : "border-border bg-muted/40 text-muted-foreground"
          }`}
          role="status"
        >
          {googleClientIdEnvInvalid ? (
            <>
              <span className="font-semibold text-foreground">
                এখনও উদাহরণ বা ভুল Client ID আছে।
              </span>{" "}
              <code className="rounded bg-background/80 px-1 py-0.5">
                your-google-oauth…
              </code>{" "}
              বাস্তব ID নয়। Google Cloud থেকে Web application এর Client ID
              বসান,{" "}
              <code className="rounded bg-background/80 px-1">npm run dev</code>{" "}
              আবার চালান।
            </>
          ) : (
            <>
              Google লগইন চালু করতে প্রজেক্ট রুটে{" "}
              <code className="rounded bg-muted px-1">.env</code> এ{" "}
              <code className="rounded bg-muted px-1">
                VITE_GOOGLE_CLIENT_ID
              </code>{" "}
              যোগ করুন, তারপর ডেভ সার্ভার রিস্টার্ট করুন।
            </>
          )}{" "}
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Google Cloud → Credentials
          </a>
        </div>
      </>
    )}
  </div>
);

const SignIn = () => {
  const { login, loginWithGoogle, register, isAuthenticated, ready } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleUi, setGoogleUi] = useState(() =>
    GOOGLE_CLIENT_ID ? "loading" : "no_client",
  );
  const googleButtonRef = useRef(null);

  useEffect(() => {
    if (ready && isAuthenticated) navigate(from, { replace: true });
  }, [ready, isAuthenticated, navigate, from]);

  useEffect(() => {
    if (!ready || isAuthenticated) return;
    const stored = sessionStorage.getItem("gurudev_google_credential");
    if (!stored) return;
    sessionStorage.removeItem("gurudev_google_credential");
    let cancelled = false;
    (async () => {
      try {
        const profile = decodeJwtPayload(stored);
        const result = await loginWithGoogle(profile, remember);
        if (result?.ok) navigate(from, { replace: true });
      } catch {
        if (!cancelled) {
          toast.error("Google sign-in failed. Please try again.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, isAuthenticated, loginWithGoogle, remember, navigate, from]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      setGoogleUi("no_client");
      return;
    }

    setGoogleUi("loading");
    let cancelled = false;
    let rafId = 0;
    let widthAttempts = 0;
    let refWaitFrames = 0;

    const renderGoogleButton = () => {
      if (cancelled) return false;
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        if (refWaitFrames < 90) {
          refWaitFrames += 1;
          rafId = requestAnimationFrame(renderGoogleButton);
          return false;
        }
        setGoogleUi("error");
        toast.error("Google sign-in UI is not ready. Try refreshing the page.");
        return false;
      }
      const el = googleButtonRef.current;
      const rectW = el.getBoundingClientRect().width;
      const parentW = el.parentElement?.getBoundingClientRect().width ?? 0;
      const width = Math.max(el.offsetWidth, rectW, parentW, 280);
      if (width < 48 && widthAttempts < 64) {
        widthAttempts += 1;
        rafId = requestAnimationFrame(renderGoogleButton);
        return false;
      }
      if (width < 48) {
        setGoogleUi("error");
        toast.error(
          "Google sign-in could not layout. Try refreshing the page.",
        );
        return false;
      }
      el.innerHTML = "";
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          ux_mode: "popup",
          use_fedcm_for_button: false,
          callback: async (response) => {
            if (!response?.credential) {
              toast.error("Google sign-in did not return a credential.");
              return;
            }
            try {
              const profile = decodeJwtPayload(response.credential);
              const result = await loginWithGoogle(profile, remember);
              if (result?.ok) navigate(from, { replace: true });
            } catch {
              toast.error("Google sign-in failed. Please try again.");
            }
          },
        });
        window.google.accounts.id.renderButton(el, {
          theme: "outline",
          size: "large",
          text: mode === "register" ? "signup_with" : "continue_with",
          shape: "rectangular",
          logo_alignment: "center",
          width: Math.max(240, Math.floor(width)),
        });
        setGoogleUi("ready");
        return true;
      } catch {
        setGoogleUi("error");
        toast.error("Google sign-in could not start. Check your client ID.");
        return false;
      }
    };

    const onGsiReady = () => {
      if (cancelled) return;
      widthAttempts = 0;
      refWaitFrames = 0;
      renderGoogleButton();
    };

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    );
    if (existingScript) {
      if (window.google?.accounts?.id) queueMicrotask(onGsiReady);
      else existingScript.addEventListener("load", onGsiReady, { once: true });
      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
      };
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = onGsiReady;
    script.onerror = () => {
      if (!cancelled) {
        setGoogleUi("error");
        toast.error("Google sign-in could not load. Check your connection.");
      }
    };
    document.head.appendChild(script);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [from, loginWithGoogle, navigate, remember, mode]);

  const resetSensitive = () => {
    setPassword("");
    setConfirm("");
  };
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    const result = await login(email, password, remember);
    setSubmitting(false);
    if (result?.ok) navigate(from, { replace: true });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    const result = await register(name, email, password, remember);
    setSubmitting(false);
    resetSensitive();
    if (result?.ok) navigate(from, { replace: true });
  };

  const handleGoogleSignIn = () => {
    if (!RAW_GOOGLE_CLIENT_ID) {
      toast.info(
        "Create a project in Google Cloud Console → APIs & Services → Credentials → OAuth client ID (Web application). Copy the Client ID, add a line VITE_GOOGLE_CLIENT_ID=… to the .env file in the project root, then restart npm run dev.",
      );
      return;
    }
    if (googleClientIdEnvInvalid) {
      toast.warning(
        "Your VITE_GOOGLE_CLIENT_ID is not a valid Web client ID. It must look like 123456789012-abc.apps.googleusercontent.com. Replace the example text in .env with the real value from Google Cloud, save, and restart the dev server.",
      );
      return;
    }
    window.google?.accounts?.id?.prompt();
  };

  const emailInvalid = email.length > 0 && !validateEmail(email);
  const passTooShort = password.length > 0 && password.length < 6;
  const confirmMismatch =
    mode === "register" && confirm.length > 0 && password !== confirm;

  return (
    <section className="w-11/12 md:w-10/12 mx-auto pt-2 pb-24 sm:pb-28 pt-8 md:pt-14 md:pb-14">
      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-4 md:gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
        {/* ── Left panel ── */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="hidden lg:flex relative overflow-hidden rounded-2xl bg-[#183f31] text-primary-foreground p-7 md:p-10 flex-col justify-between min-h-[360px] lg:min-h-0 shadow-xl ring-1 ring-white/10"
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_42%),radial-gradient(circle_at_18%_18%,rgba(230,193,96,0.28),transparent_32%),radial-gradient(circle_at_84%_72%,rgba(255,255,255,0.12),transparent_35%)]" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10 space-y-7">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-black/10"
            >
              <img
                src={logo}
                alt="Gurudev Enterprise"
                className="h-12 w-auto"
              />
              <span className="hidden sm:block text-left">
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                  Gurudev
                </span>
                <span className="block text-sm font-bold text-[#183f31]">
                  Enterprise
                </span>
              </span>
            </Link>

            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/15">
                <BadgeCheck className="h-4 w-4" aria-hidden />
                Secure customer portal
              </p>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Shop faster with your saved account.
              </h1>
              <p className="mt-3 text-white/85 text-sm md:text-base max-w-md">
                Track orders, manage your wishlist, and continue checkout
                without entering the same details again.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10 backdrop-blur-sm">
                <ShoppingBag
                  className="mx-auto mb-2 h-5 w-5 text-[#f4d27a]"
                  aria-hidden
                />
                <p className="text-[11px] font-semibold uppercase text-white/60">
                  Orders
                </p>
                <p className="text-sm font-bold">Easy track</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10 backdrop-blur-sm">
                <Heart
                  className="mx-auto mb-2 h-5 w-5 text-[#f4d27a]"
                  aria-hidden
                />
                <p className="text-[11px] font-semibold uppercase text-white/60">
                  Wishlist
                </p>
                <p className="text-sm font-bold">Saved picks</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10 backdrop-blur-sm">
                <ShieldCheck
                  className="mx-auto mb-2 h-5 w-5 text-[#f4d27a]"
                  aria-hidden
                />
                <p className="text-[11px] font-semibold uppercase text-white/60">
                  Login
                </p>
                <p className="text-sm font-bold">Protected</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm md:text-base text-white/90">
              <li className="flex items-center gap-3 rounded-xl bg-black/10 p-3 ring-1 ring-white/10">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden />
                </span>
                <span>
                  Passwords stay protected with local session storage.
                </span>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-black/10 p-3 ring-1 ring-white/10">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 shrink-0">
                  <Sparkles className="w-5 h-5" aria-hidden />
                </span>
                <span>
                  New customer? Create an account in just a few seconds.
                </span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-8 flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-xs text-white/75 ring-1 ring-white/10">
            <span>Ready for store API connection.</span>
            <span className="font-semibold text-white">Fast checkout</span>
          </div>
        </motion.aside>

        {/* ── Right panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-border bg-card text-card-foreground shadow-xl p-4 sm:p-6 md:p-10"
        >
          {/* Tab switcher */}
          <div className="flex p-1 rounded-xl bg-muted/60 mb-4 md:mb-8">
            <button
              type="button"
              className={tabClass(mode === "signin")}
              onClick={() => {
                setMode("signin");
                resetSensitive();
              }}
            >
              Sign in
              {mode === "signin" && (
                <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary" />
              )}
            </button>
            <button
              type="button"
              className={tabClass(mode === "register")}
              onClick={() => {
                setMode("register");
                resetSensitive();
              }}
            >
              Register
              {mode === "register" && (
                <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          </div>

          {/* ── Sign-in form ── */}
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-3 md:space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="signin-email"
                  className="text-sm font-medium text-foreground block mb-1.5 md:mb-2"
                >
                  Email
                </label>
                <div className={inputWrap}>
                  <Mail
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                  <input
                    id="signin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {emailInvalid && (
                  <p className="text-destructive text-xs mt-1.5">
                    Enter a valid email address.
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5 md:mb-2">
                  <label
                    htmlFor="signin-password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() =>
                      toast.info(
                        "Password reset will be available when your store API is connected.",
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>
                <div className={inputWrap}>
                  <Lock
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                  <input
                    id="signin-password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passTooShort && (
                  <p className="text-destructive text-xs mt-1.5">
                    Use at least 6 characters.
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Keep me signed in on this device
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition disabled:opacity-60 disabled:pointer-events-none shadow-md"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

              {/* Google — below primary submit */}
              <GoogleButtonBlock
                googleUi={googleUi}
                googleButtonRef={googleButtonRef}
                handleGoogleSignIn={handleGoogleSignIn}
                variant="signin"
              />
            </form>
          ) : (
            /* ── Register form ── */
            <form onSubmit={handleRegister} className="space-y-3 md:space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="reg-name"
                  className="text-sm font-medium text-foreground block mb-1.5 md:mb-2"
                >
                  Full name
                </label>
                <div className={inputWrap}>
                  <User
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="reg-email"
                  className="text-sm font-medium text-foreground block mb-1.5 md:mb-2"
                >
                  Email
                </label>
                <div className={inputWrap}>
                  <Mail
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {emailInvalid && (
                  <p className="text-destructive text-xs mt-1.5">
                    Enter a valid email address.
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="reg-password"
                  className="text-sm font-medium text-foreground block mb-1.5 md:mb-2"
                >
                  Password
                </label>
                <div className={inputWrap}>
                  <Lock
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                  <input
                    id="reg-password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passTooShort && (
                  <p className="text-destructive text-xs mt-1.5">
                    Use at least 6 characters.
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="reg-confirm"
                  className="text-sm font-medium text-foreground block mb-1.5 md:mb-2"
                >
                  Confirm password
                </label>
                <div className={inputWrap}>
                  <Lock
                    className="w-5 h-5 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                  <input
                    id="reg-confirm"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="Repeat password"
                    required
                    minLength={6}
                  />
                </div>
                {confirmMismatch && (
                  <p className="text-destructive text-xs mt-1.5">
                    Passwords do not match.
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Keep me signed in on this device
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition disabled:opacity-60 disabled:pointer-events-none shadow-md"
              >
                {submitting ? "Creating account…" : "Create account"}
              </button>

              {/* Google — below primary submit */}
              <GoogleButtonBlock
                googleUi={googleUi}
                googleButtonRef={googleButtonRef}
                handleGoogleSignIn={handleGoogleSignIn}
                variant="register"
              />
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-5 md:mt-8">
            <Link to="/" className="text-primary font-medium hover:underline">
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SignIn;
