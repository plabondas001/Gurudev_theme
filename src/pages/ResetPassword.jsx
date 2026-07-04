import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { apiResetPassword } from "../api/authApi";

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-3 focus-within:bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid") || "";
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const passTooShort = password.length > 0 && password.length < 8;
  const confirmMismatch = confirm.length > 0 && password !== confirm;

  if (!uid || !token) {
    return (
      <section className="w-full min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold text-foreground">Invalid reset link</p>
          <p className="text-sm text-muted-foreground">
            This password reset link is missing required parameters.
          </p>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Request a new reset link
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { ok, data } = await apiResetPassword({ uid, token, new_password: password });
    setSubmitting(false);

    if (!ok) {
      const errData = data;
      let msg = "Failed to reset password. The link may have expired.";
      if (errData?.detail) msg = errData.detail;
      else if (errData?.token) msg = "Reset link is invalid or has expired.";
      toast.error(msg);
      return;
    }

    setDone(true);
  };

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl p-8"
      >
        {done ? (
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Password reset!</h1>
            <p className="text-sm text-muted-foreground">
              Your password has been updated. You can now sign in with your new password.
            </p>
            <Link
              to="/signin"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-[#25573c] transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground mb-1">Reset your password</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Choose a strong new password for your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New password */}
              <div>
                <label
                  htmlFor="reset-password"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  New password
                </label>
                <div className={inputWrap}>
                  <Lock className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
                  <input
                    id="reset-password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passTooShort && (
                  <p className="text-destructive text-xs mt-1.5">Use at least 8 characters.</p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="reset-confirm"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  Confirm password
                </label>
                <div className={inputWrap}>
                  <Lock className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden />
                  <input
                    id="reset-confirm"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                    placeholder="Repeat password"
                    required
                  />
                </div>
                {confirmMismatch && (
                  <p className="text-destructive text-xs mt-1.5">Passwords do not match.</p>
                )}
              </div>

              <button
                type="submit"
                id="reset-password-submit"
                disabled={submitting}
                className="w-full py-3.5 cursor-pointer rounded-xl bg-primary text-white font-bold text-sm hover:bg-[#25573c] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Resetting…
                  </>
                ) : (
                  "Reset Password"
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

export default ResetPassword;
