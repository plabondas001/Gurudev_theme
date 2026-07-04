import { motion } from "framer-motion";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import logo from "/Img/logo/ge_main_logo.png";

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-3 focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const emailInvalid = email.length > 0 && !validateEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    const { ok } = await forgotPassword(email);
    setSubmitting(false);
    if (ok) {
      setSent(true);
    }
  };

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl p-8"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <img src={logo} alt="Gurudev Enterprise" className="h-10 w-auto" />
        </Link>

        {sent ? (
          /* ── Success state ── */
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Check your email</h1>
            <p className="text-sm text-muted-foreground">
              If an account with <strong>{email}</strong> exists, we've sent a
              password reset link. Please check your inbox (and spam folder).
            </p>
            <Link
              to="/signin"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <h1 className="text-2xl font-bold text-foreground mb-1">Forgot your password?</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  Email address
                </label>
                <div className={inputWrap}>
                  <Mail className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
                  <input
                    id="forgot-email"
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

              <button
                type="submit"
                id="forgot-password-submit"
                disabled={submitting}
                className="w-full py-3.5 cursor-pointer rounded-xl bg-primary text-white font-bold text-sm hover:bg-[#25573c] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Reset Link
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default ForgotPassword;
