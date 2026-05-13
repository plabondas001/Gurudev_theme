import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import logo from "/Img/logo/ge_main_logo.png";

const tabClass = (active) =>
  `relative flex-1 py-3 text-sm font-semibold transition-colors rounded-lg ${
    active
      ? "text-primary"
      : "text-muted-foreground hover:text-foreground"
  }`;

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary";

const SignIn = () => {
  const { login, register, isAuthenticated, ready } = useAuth();
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

  useEffect(() => {
    if (ready && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [ready, isAuthenticated, navigate, from]);

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

  const emailInvalid = email.length > 0 && !validateEmail(email);
  const passTooShort = password.length > 0 && password.length < 6;
  const confirmMismatch =
    mode === "register" && confirm.length > 0 && password !== confirm;

  return (
    <section className="w-11/12 md:w-10/12 mx-auto py-8 md:py-14 pb-24 md:pb-14">
      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-[#286045] to-[#1e4a36] text-primary-foreground p-8 md:p-10 flex flex-col justify-between min-h-[280px] lg:min-h-0 shadow-xl"
        >
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%),radial-gradient(circle_at_80%_80%,white,transparent_45%)]" />
          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-block bg-white/10 rounded-xl p-3 backdrop-blur-sm">
              <img src={logo} alt="Gurudev Enterprise" className="w-24 brightness-0 invert" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                Your account, your orders — one secure place.
              </h1>
              <p className="mt-3 text-white/85 text-sm md:text-base max-w-md">
                Sign in to track purchases, manage wishlists, and checkout faster on your next visit.
              </p>
            </div>
            <ul className="space-y-3 text-sm md:text-base text-white/90">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden />
                </span>
                <span>Passwords are hashed on this device before storage.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 shrink-0">
                  <Sparkles className="w-5 h-5" aria-hidden />
                </span>
                <span>New customer? Create an account in seconds.</span>
              </li>
            </ul>
          </div>
          <p className="relative z-10 text-xs text-white/70 mt-8">
            For production, connect this form to your store API — the UI and session flow are ready to extend.
          </p>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-border bg-card text-card-foreground shadow-xl p-6 md:p-10"
        >
          <div className="flex p-1 rounded-xl bg-muted/60 mb-8">
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

          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label htmlFor="signin-email" className="text-sm font-medium text-foreground block mb-2">
                  Email
                </label>
                <div className={inputWrap}>
                  <Mail className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
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
                  <p className="text-destructive text-xs mt-1.5">Enter a valid email address.</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label htmlFor="signin-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() =>
                      toast.info("Password reset will be available when your store API is connected. For now, register a new account or contact support.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>
                <div className={inputWrap}>
                  <Lock className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
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
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passTooShort && (
                  <p className="text-destructive text-xs mt-1.5">Use at least 6 characters.</p>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Keep me signed in on this device
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition disabled:opacity-60 disabled:pointer-events-none shadow-md"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="reg-name" className="text-sm font-medium text-foreground block mb-2">
                  Full name
                </label>
                <div className={inputWrap}>
                  <User className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
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
              <div>
                <label htmlFor="reg-email" className="text-sm font-medium text-foreground block mb-2">
                  Email
                </label>
                <div className={inputWrap}>
                  <Mail className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
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
                  <p className="text-destructive text-xs mt-1.5">Enter a valid email address.</p>
                )}
              </div>
              <div>
                <label htmlFor="reg-password" className="text-sm font-medium text-foreground block mb-2">
                  Password
                </label>
                <div className={inputWrap}>
                  <Lock className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
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
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passTooShort && (
                  <p className="text-destructive text-xs mt-1.5">Use at least 6 characters.</p>
                )}
              </div>
              <div>
                <label htmlFor="reg-confirm" className="text-sm font-medium text-foreground block mb-2">
                  Confirm password
                </label>
                <div className={inputWrap}>
                  <Lock className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
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
                  <p className="text-destructive text-xs mt-1.5">Passwords do not match.</p>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                Keep me signed in on this device
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition disabled:opacity-60 disabled:pointer-events-none shadow-md"
              >
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-8">
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
