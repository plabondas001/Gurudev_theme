import React, { useState, useRef } from "react";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useConfig } from "../context/ConfigContext";

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
  "w-full rounded-xl border bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all duration-200";
const inputNormal = `${inputBase} border-gray-200 focus:border-primary`;
const inputError = `${inputBase} border-red-300 focus:border-red-500 focus:ring-red-500/10`;

const subjects = [
  "Product Inquiry",
  "Order Support",
  "Warranty & Repair",
  "Delivery Information",
  "Bulk / Corporate Order",
  "Other",
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Contact = () => {
  const { config } = useConfig();
  const websiteName = config?.website_name || "Gurudeb Enterprise";
  const supportPhone = config?.support_phone || "+880 123 456 7890";
  const contactEmail = config?.contact_email || "gurudebenterprise@gmail.com";
  const location = config?.location || "Dhaka, Bangladesh";

  const contactCards = [
    {
      title: "Call Us",
      value: supportPhone,
      note: `Call ${websiteName}`,
      icon: <FaPhone aria-hidden />,
      href: `tel:${supportPhone}`,
      ariaLabel: `Call ${websiteName}`,
    },
    {
      title: "Email Us",
      value: contactEmail,
      note: "We reply within 24 hours",
      icon: <FaEnvelope aria-hidden />,
      href: `mailto:${contactEmail}`,
      ariaLabel: `Email ${websiteName}`,
    },
    {
      title: "Visit Store",
      value: location,
      note: "Smartphones & gadgets showroom",
      icon: <FaLocationDot aria-hidden />,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
      ariaLabel: `Get directions to ${websiteName} store`,
      external: true,
    },
  ];

  const socials = [];
  if (config?.facebook_url) {
    socials.push({
      name: "Facebook",
      icon: <FaFacebookF aria-hidden />,
      href: config.facebook_url,
      colorClass: "bg-[#E7F0FF] text-[#1877F2]",
      hoverBg: "#1877F2",
    });
  }
  if (config?.whatsapp_url) {
    socials.push({
      name: "WhatsApp",
      icon: <FaWhatsapp aria-hidden />,
      href: config.whatsapp_url,
      colorClass: "bg-[#E6F9EE] text-[#25D366]",
      hoverBg: "#25D366",
    });
  }
  if (config?.instagram_url) {
    socials.push({
      name: "Instagram",
      icon: <FaInstagram aria-hidden />,
      href: config.instagram_url,
      colorClass: "bg-[#FFF0EA] text-[#E1306C]",
      isInstagram: true,
    });
  }

  if (socials.length === 0) {
    socials.push(
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
      }
    );
  }

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
      // Prototyping realistic delay for premium interactive response
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
          box-shadow: 0 12px 32px rgba(0,0,0,.06);
        }
      `}</style>

      <section className="bg-gray-50/30 min-h-screen">
        {/* ── Hero Banner ── */}
        <div className="bg-gradient-to-br from-[#183f31] to-[#25573c] text-white py-16 md:py-24 relative overflow-hidden">
          {/* Decorative subtle abstract elements or glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          
          <div className="w-full px-4 md:px-8 max-w-6xl mx-auto relative z-10">
            <div className="max-w-3xl fade-in-up">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05] mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Let's Connect & <span className="text-[#FBBC05]">Grow Together</span>
              </h1>
              <p className="mt-5 text-base md:text-lg leading-8 text-gray-200/90 max-w-2xl">
                Whether you have inquiries about high-end smartphones, stock updates, warranty claims, or custom deliveries, our dedicated team is standing by to assist you.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-4 md:px-8 -mt-8 pb-16 md:pb-24 max-w-6xl mx-auto">
          {/* ── Contact Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactCards.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.ariaLabel}
                className={`group rounded-2xl border border-gray-100 bg-white p-6 shadow-md card-hover fade-in-up delay-${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                      {item.title}
                    </span>
                    <span className="mt-1 block break-words text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      {item.note}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── Main Form & Info Grid ── */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
            {/* ── Contact Form ── */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-10 shadow-md">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Send a Message
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
                {/* Row 1: Name and Email */}
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
                      className={visibleErrors.name ? inputError : inputNormal}
                    />
                  </Field>

                  <Field label="Email Address" error={visibleErrors.email} required>
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

                {/* Row 2: Phone and Subject (FIXED BUG: Rendered requested elements!) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Phone Number" error={visibleErrors.phone} required>
                    <input
                      type="tel"
                      name="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      placeholder="e.g. +880 1712 345678"
                      autoComplete="tel"
                      aria-invalid={!!visibleErrors.phone}
                      className={visibleErrors.phone ? inputError : inputNormal}
                    />
                  </Field>

                  <Field label="Inquiry Subject" error={visibleErrors.subject} required>
                    <select
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      aria-invalid={!!visibleErrors.subject}
                      className={visibleErrors.subject ? inputError : inputNormal}
                    >
                      <option value="" disabled>Select a subject</option>
                      {subjects.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Row 3: Message */}
                <Field label="Message Details" error={visibleErrors.message} required>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your inquiry in detail…"
                    aria-invalid={!!visibleErrors.message}
                    className={`${visibleErrors.message ? inputError : inputNormal} resize-none`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-400">
                      Minimum 10 characters required.
                    </p>
                    <p className="text-xs text-gray-400 font-semibold">
                      {fields.message.length} characters
                    </p>
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={isSending}
                  aria-busy={isSending}
                  className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-[#25573c] hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-4 focus-visible:ring-primary/30 outline-none"
                >
                  {isSending ? (
                    <>
                      <span
                        aria-hidden
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      />
                      Sending Message…
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            </div>

            {/* ── Right Column: Info & Map ── */}
            <div className="space-y-6">
              {/* Social Links */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
                <h2 className="text-xl font-extrabold text-gray-900">
                  Connect With Us
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Reach out to us on social platforms
                </p>
                <div className="mt-5 flex flex-col gap-3">
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
                        className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${colorClass}`}
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
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{icon}</span>
                          <span>{name}</span>
                        </div>
                        <span className="text-xs opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          Follow →
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Map Showroom */}
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                <iframe
                  title={`${websiteName} location on Google Maps`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
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
                      {location}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Visit our brand showroom or contact us beforehand for real-time stock confirmation.
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
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

      {/* ── Toast Notification ── */}
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
