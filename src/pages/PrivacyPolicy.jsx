import React from "react";
import {
  FaCookieBite,
  FaDatabase,
  FaLock,
  FaShieldHalved,
  FaUserCheck,
  FaUserGear,
} from "react-icons/fa6";

const summaryCards = [
  {
    title: "Data We Collect",
    text: "We collect only the information needed to process orders, support customers, and improve service.",
    icon: <FaDatabase aria-hidden />,
  },
  {
    title: "Secure Handling",
    text: "Customer information is handled carefully and shared only with trusted service partners when required.",
    icon: <FaLock aria-hidden />,
  },
  {
    title: "Cookies",
    text: "Cookies help us keep the website stable, remember preferences, and understand shopping activity.",
    icon: <FaCookieBite aria-hidden />,
  },
  {
    title: "Your Control",
    text: "You may request updates, corrections, or clarification about your personal information.",
    icon: <FaUserGear aria-hidden />,
  },
];

const policySections = [
  {
    title: "1. Information We Collect",
    points: [
      "When you place an order, create an account, contact support, or use our website, we may collect your name, phone number, email address, delivery address, and order details.",
      "We may collect payment confirmation details, transaction references, delivery notes, and warranty-related information when needed to complete a purchase or service request.",
      "Basic technical information such as browser type, device information, visited pages, and website activity may be collected to improve site performance and user experience.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    points: [
      "We use customer information to confirm orders, process payments, arrange delivery, provide invoices, and support warranty or after-sales service.",
      "Your contact details may be used to send order updates, delivery communication, service responses, and important account or policy notices.",
      "Website usage information helps us improve product listings, navigation, security, customer support, and promotional relevance.",
    ],
  },
  {
    title: "3. Sharing With Trusted Partners",
    points: [
      "We may share necessary order and delivery information with courier companies, payment providers, service centers, and authorized support partners.",
      "We do not sell customer personal information to outside companies for unrelated marketing purposes.",
      "Information may be disclosed if required by law, fraud prevention needs, payment disputes, or protection of Gurudeb Enterprise, customers, and service partners.",
    ],
  },
  {
    title: "4. Payment & Transaction Security",
    points: [
      "Payments must be completed through the official methods accepted by Gurudeb Enterprise.",
      "We may store payment references, confirmation status, and invoice details, but sensitive payment credentials are handled by the relevant payment provider.",
      "Customers should avoid sharing PIN, OTP, password, or private banking information with anyone claiming to represent our store.",
    ],
  },
  {
    title: "5. Cookies & Website Tracking",
    points: [
      "Cookies and similar tools may be used to keep carts, preferences, sessions, and website features working properly.",
      "Analytics information may help us understand product interest, page performance, errors, and shopping behavior in an aggregated way.",
      "You can manage cookies through your browser settings, but disabling them may affect some website features.",
    ],
  },
  {
    title: "6. Data Protection",
    points: [
      "We use reasonable administrative and technical measures to protect customer information from unauthorized access, misuse, alteration, or loss.",
      "Access to personal information is limited to team members or service partners who need it for order, delivery, support, or compliance purposes.",
      "No online system is completely risk-free, so customers should use strong passwords and keep account and payment information private.",
    ],
  },
  {
    title: "7. Data Retention",
    points: [
      "We keep order, invoice, payment, delivery, and support records for as long as needed for business, warranty, accounting, legal, and dispute-resolution purposes.",
      "When information is no longer needed, we may delete, anonymize, or securely archive it according to operational requirements.",
      "Some records may remain in backups or logs for a limited period before routine deletion.",
    ],
  },
  {
    title: "8. Customer Rights",
    points: [
      "Customers may contact us to request correction of inaccurate account, order, or contact information.",
      "You may ask how your information is used, request support with account-related privacy concerns, or opt out of non-essential promotional communication.",
      "For privacy requests, we may verify your identity before making changes to protect your account and order history.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up .55s ease-out both; }
        .delay-1    { animation-delay: .1s; }
        .delay-2    { animation-delay: .2s; }
        .delay-3    { animation-delay: .3s; }
        .delay-4    { animation-delay: .4s; }

        .card-hover {
          transition: transform .2s ease, box-shadow .1s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.06);
        }
      `}</style>

      <section className="min-h-screen bg-gray-50/30 text-gray-800">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#183f31] to-[#25573c] py-16 text-white md:py-24">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center md:px-8">
            <div className="mx-auto max-w-4xl fade-in-up">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05]">
                Privacy Policy
              </span>
              <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Protecting your{" "}
                <span className="text-[#FBBC05]">personal information</span>
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-8 text-gray-200/90 md:text-lg">
                At Gurudeb Enterprise, we value your trust. This policy explains
                what information we collect, why we use it, and how we keep your
                shopping experience secure and transparent.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto -mt-8 w-full max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((item, i) => (
              <div
                key={item.title}
                className={`group rounded-2xl border border-gray-100 bg-white p-6 shadow-md card-hover fade-in-up delay-${i + 1}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {item.icon}
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[0.36fr_0.64fr]">
            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-md lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Privacy Overview
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                Gurudeb Enterprise
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
                <div className="rounded-xl bg-[#F0F7F4] p-4">
                  <p className="font-bold text-gray-900">Effective Date</p>
                  <p>May 19, 2026</p>
                </div>
                <div className="rounded-xl bg-[#F8F3FB] p-4">
                  <p className="font-bold text-gray-900">Applies To</p>
                  <p>
                    Website visitors, customer accounts, orders, support, and
                    delivery communication.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                  <p className="font-bold text-gray-900">Our Promise</p>
                  <p>
                    We collect practical information for service, security, and
                    order handling, while keeping customer trust at the center.
                  </p>
                </div>
              </div>
            </aside>

            <div className="space-y-5">
              {policySections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg md:p-8"
                >
                  <h2 className="text-xl font-extrabold text-gray-900 md:text-2xl">
                    {section.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-7 text-gray-600 md:text-base"
                      >
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                <div className="bg-gradient-to-br from-[#183f31] to-[#25573c] p-6 text-white md:p-8">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                        <FaUserCheck aria-hidden />
                      </div>
                      <h2 className="mt-4 text-2xl font-extrabold">
                        Need help with privacy?
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-200/90 md:text-base">
                        Our support team can help with account information,
                        order records, promotional preferences, and privacy
                        related questions.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-md transition hover:bg-[#F0F7F4]"
                    >
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-[#F0F7F4] p-5 text-sm leading-7 text-gray-600">
                <div className="flex gap-3">
                  <FaShieldHalved
                    className="mt-1 shrink-0 text-lg text-primary"
                    aria-hidden
                  />
                  <p>
                    This privacy policy may be updated when our services,
                    technology, legal requirements, or business operations
                    change. The latest version will be available on this page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
