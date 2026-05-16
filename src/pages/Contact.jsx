import React, { useState, useRef } from "react";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

/* ─── Toast ─────────────────────────────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => {
  const colors = {
    success: "bg-emerald-50 border-emerald-400 text-emerald-800",
    error: "bg-red-50 border-red-400 text-red-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
  };
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border-l-4 px-5 py-4 shadow-xl backdrop-blur-sm transition-all duration-300 animate-slide-up ${colors[type]}`}
      role="alert"
    >
      <span className="text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
};

/* ─── Field validation ───────────────────────────────────────────────────── */
const validate = (fields) => {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Name is required.";
  else if (fields.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email address.";
  if (!fields.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[\d\s\-+()]{7,15}$/.test(fields.phone))
    errors.phone = "Enter a valid phone number.";
  if (!fields.subject.trim()) errors.subject = "Please select a subject.";
  if (!fields.message.trim()) errors.message = "Message is required.";
  else if (fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
};

/* ─── FieldWrapper ───────────────────────────────────────────────────────── */
const Field = ({ label, error, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">
      {label}
      {required && (
        <span className="ml-0.5 text-red-500" aria-hidden>
          *
        </span>
      )}
    </label>
    {children}
    {error && (
      <p
        className="flex items-center gap-1 text-xs font-medium text-red-600"
        role="alert"
      >
        <span aria-hidden>⚠</span> {error}
      </p>
    )}
  </div>
);

const inputBase =
  "w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-4";
const inputNormal = `${inputBase} border-gray-200 focus:border-primary focus:ring-primary/10`;
const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-100`;

/* ─── Contact cards data ─────────────────────────────────────────────────── */
const contactCards = [
  {
    title: "Call Us",
    value: "+880 123 456 7890",
    note: "Call Gurudeb Enterprise",
    icon: <FaPhone aria-hidden />,
    href: "tel:+8801234567890",
    ariaLabel: "Call Gurudeb Enterprise",
  },
  {
    title: "Email Us",
    value: "gurudebenterprise@gmail.com",
    note: "We reply within 24 hours",
    icon: <FaEnvelope aria-hidden />,
    href: "mailto:gurudebenterprise@gmail.com",
    ariaLabel: "Email Gurudeb Enterprise",
  },
  {
    title: "Visit Store",
    value: "Dhaka, Bangladesh",
    note: "Smartphones & gadgets showroom",
    icon: <FaLocationDot aria-hidden />,
    href: "https://www.google.com/maps/search/?api=1&query=Dhaka%2C+Bangladesh",
    ariaLabel: "Get directions to Gurudeb Enterprise store",
    external: true,
  },
];

const subjects = [
  "Product Inquiry",
  "Order Support",
  "Warranty & Repair",
  "Delivery Information",
  "Bulk / Corporate Order",
  "Other",
];

const socials = [
  {
    name: "Facebook",
    icon: <FaFacebookF aria-hidden />,
    href: "#",
    colorClass: "bg-[#E7F0FF] text-[#1877F2]",
    hoverBg: "#1877F2",
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp aria-hidden />,
    href: "#",
    colorClass: "bg-[#E6F9EE] text-[#25D366]",
    hoverBg: "#25D366",
  },
  {
    name: "Instagram",
    icon: <FaInstagram aria-hidden />,
    href: "#",
    colorClass: "bg-[#FFF0EA] text-[#E1306C]",
    isInstagram: true,
  },
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Contact = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (hasSubmitted || touched[name]) {
      const newErrors = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const allTouched = Object.keys(fields).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {},
    );
    setTouched(allTouched);
    const newErrors = validate(fields);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      showToast("Please fix the errors before submitting.", "error");
      return;
    }

    setStatus("sending");
    try {
      // Replace with your real API call
      await new Promise((res) => setTimeout(res, 1800));
      setStatus("success");
      setFields({ name: "", email: "", phone: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
      setHasSubmitted(false);
      showToast("Message sent! We'll get back to you soon.", "success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setStatus("idle");
    }
  };

  const isSending = status === "sending";
  const visibleErrors = hasSubmitted ? errors : {};

  return (
    <>
      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up .3s ease-out both; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up .55s ease-out both; }
        .delay-1    { animation-delay: .1s; }
        .delay-2    { animation-delay: .2s; }
        .delay-3    { animation-delay: .3s; }

        .card-hover {
          transition: transform .2s ease, box-shadow .1s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.08);
        }
      `}</style>

      <section className="bg-[#F7FBF8] min-h-screen">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="bg-primary text-white">
          <div className="w-11/12 md:w-10/12 mx-auto py-14 md:py-20">
            <div className="max-w-3xl fade-in-up">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
                Contact Us
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                We&apos;re ready to help you choose better gadgets.
              </h1>
              <p className="mt-5 text-base md:text-lg leading-8 text-white/80 max-w-xl">
                Need product details, order support, warranty help, or delivery
                info? Drop us a message — our team will get back to you fast.
              </p>
            </div>
          </div>
        </div>

        <div className="w-11/12 md:w-10/12 mx-auto -mt-8 pb-16 md:pb-24">
          {/* ── Contact Cards ─────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactCards.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.ariaLabel}
                className={`group rounded-2xl border border-primary/10 bg-white p-5 shadow-sm card-hover fade-in-up delay-${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white"
                  >
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                      {item.title}
                    </span>
                    <span className="mt-1 block break-words text-base font-bold text-gray-900">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      {item.note}
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* ── Main Grid ─────────────────────────────────────── */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6">
            {/* ── Contact Form ──────────────────────────────── */}
            <div className="rounded-2xl border border-primary/10 bg-white p-6 md:p-10 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Send Message
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-gray-900">
                Tell us what you need
              </h2>

              <form
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Full Name" error={visibleErrors.name} required>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-invalid={!!visibleErrors.name}
                      aria-describedby={
                        visibleErrors.name ? "name-error" : undefined
                      }
                      className={visibleErrors.name ? inputError : inputNormal}
                    />
                  </Field>

                  <Field
                    label="Email Address"
                    error={visibleErrors.email}
                    required
                  >
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!visibleErrors.email}
                      className={visibleErrors.email ? inputError : inputNormal}
                    />
                  </Field>
                </div>

                <Field label="Message" error={visibleErrors.message} required>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your inquiry in detail…"
                    aria-invalid={!!visibleErrors.message}
                    className={`${visibleErrors.message ? inputError : inputNormal} resize-none`}
                  />
                  <p className="self-end text-xs text-gray-400">
                    {fields.message.length} characters
                  </p>
                </Field>

                <button
                  type="submit"
                  disabled={isSending}
                  aria-busy={isSending}
                  className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-green-600 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-primary/30 outline-none"
                >
                  {isSending ? (
                    <>
                      <span
                        aria-hidden
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending…
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            </div>

            {/* ── Right Column ──────────────────────────────── */}
            <div className="space-y-6">
              {/* Social Links */}
              <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-extrabold text-gray-900">
                  Connect With Us
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Reach us on your favourite platform
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  {socials.map(
                    ({
                      name,
                      icon,
                      href,
                      colorClass,
                      hoverBg,
                      isInstagram,
                    }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${name}`}
                        className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-lg font-bold transition-all duration-200 ${colorClass}`}
                        style={isInstagram ? {} : {}}
                        onMouseEnter={(e) => {
                          if (isInstagram) {
                            e.currentTarget.style.background =
                              "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)";
                            e.currentTarget.style.color = "#fff";
                          } else {
                            e.currentTarget.style.background = hoverBg;
                            e.currentTarget.style.color = "#fff";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "";
                          e.currentTarget.style.color = "";
                        }}
                      >
                        <span className="text-xl">{icon}</span>
                        {name}
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
                <iframe
                  title="Gurudeb Enterprise location on Google Maps"
                  src="https://www.google.com/maps?q=Dhaka%2C+Bangladesh&output=embed"
                  className="h-56 w-full border-0 block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="text-primary text-sm">
                      <FaLocationDot />
                    </span>
                    <p className="font-bold text-gray-900 text-sm">
                      Dhaka, Bangladesh
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-6 text-gray-500">
                    Visit our store or contact us first for stock confirmation
                    before coming.
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Dhaka%2C+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline focus-visible:underline outline-none"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toast Notification ──────────────────────────────────────── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Contact;
