import React from "react";
import {
  FaCreditCard,
  FaFileContract,
  FaRotateLeft,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";

const summaryCards = [
  {
    title: "Orders",
    text: "Orders are confirmed after stock, payment, and customer details are verified.",
    icon: <FaFileContract aria-hidden />,
  },
  {
    title: "Payment",
    text: "Payments must be completed through approved channels before dispatch.",
    icon: <FaCreditCard aria-hidden />,
  },
  {
    title: "Delivery",
    text: "Delivery timelines may vary by location, courier schedule, and product availability.",
    icon: <FaTruckFast aria-hidden />,
  },
  {
    title: "Warranty",
    text: "Warranty support follows brand, distributor, or store policy for eligible products.",
    icon: <FaShieldHalved aria-hidden />,
  },
];

const termsSections = [
  {
    title: "1. General Use",
    points: [
      "By using this website or placing an order with Gurudeb Enterprise, you agree to follow these terms and conditions.",
      "Product information, prices, offers, and availability may be updated without prior notice.",
      "We reserve the right to refuse or cancel any order if incorrect information, unusual activity, or stock issues are identified.",
    ],
  },
  {
    title: "2. Product Information",
    points: [
      "We try to keep product details, images, specifications, and prices accurate and updated.",
      "Actual product color, packaging, or included accessories may vary slightly depending on brand or supplier updates.",
      "Customers are encouraged to confirm key specifications before completing high-value purchases.",
    ],
  },
  {
    title: "3. Order Confirmation",
    points: [
      "An order is considered confirmed only after customer details, product availability, and payment status are verified.",
      "If a product becomes unavailable after order placement, we will contact the customer with replacement, waiting, or refund options.",
      "Providing incorrect phone number, address, or delivery information may delay or cancel the order.",
    ],
  },
  {
    title: "4. Payment Policy",
    points: [
      "Customers must use the payment methods officially accepted by Gurudeb Enterprise.",
      "For advance payments, dispatch begins after payment confirmation is complete.",
      "Any payment dispute, failed transaction, or duplicate charge should be reported with proof of payment.",
    ],
  },
  {
    title: "5. Delivery Policy",
    points: [
      "Delivery time depends on location, courier capacity, weather, public holidays, and product stock status.",
      "Customers must inspect the package condition at the time of receiving delivery whenever possible.",
      "Gurudeb Enterprise is not responsible for delays caused by incorrect delivery information or third-party courier disruption.",
    ],
  },
  {
    title: "6. Return, Exchange & Refund",
    points: [
      "Return or exchange requests must be made within the eligible period and must follow our product condition requirements.",
      "Products must be unused, undamaged, and returned with original packaging, invoice, accessories, and warranty documents.",
      "Refund processing time may vary depending on payment method and internal verification.",
    ],
  },
  {
    title: "7. Warranty & Service",
    points: [
      "Warranty coverage depends on the product brand, distributor, official warranty terms, or store warranty policy.",
      "Physical damage, liquid damage, unauthorized repair, software modification, or misuse may void warranty eligibility.",
      "Warranty claims may require invoice, product box, serial number, and official warranty card where applicable.",
    ],
  },
  {
    title: "8. Customer Responsibility",
    points: [
      "Customers are responsible for checking product compatibility, model, variant, storage, color, and network support before purchase.",
      "Customers must keep invoice and warranty documents safely for future service or claim requests.",
      "Any suspicious, abusive, or fraudulent activity may result in service restriction or order cancellation.",
    ],
  },
];

const TermsConditions = () => {
  return (
    <section className="bg-[#F7FBF8] text-gray-800">
      <div className="bg-primary text-white">
        <div className="w-full px-4 md:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
              Terms & Conditions
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              Clear policies for a smooth shopping experience.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              Please read these terms carefully before purchasing from Gurudeb
              Enterprise. They explain how orders, payments, delivery, returns,
              and warranty support are handled.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 -mt-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {summaryCards.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">
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

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="h-fit rounded-2xl border border-primary/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Policy Overview
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
              Gurudeb Enterprise
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
              <div className="rounded-xl bg-[#F0F7F4] p-4">
                <p className="font-bold text-gray-900">Effective Date</p>
                <p>May 17, 2026</p>
              </div>
              <div className="rounded-xl bg-[#F8F3FB] p-4">
                <p className="font-bold text-gray-900">Applies To</p>
                <p>Website orders, direct orders, delivery, service support.</p>
              </div>
              <div className="rounded-xl border border-primary/10 p-4">
                <p className="font-bold text-gray-900">Need Assistance?</p>
                <p>
                  Contact our support team before ordering if you need help with
                  product details, warranty, or delivery.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            {termsSections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:p-8"
              >
                <h2 className="text-xl font-extrabold text-gray-900 md:text-2xl">
                  {section.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-7 text-gray-600 md:text-base">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="rounded-2xl bg-primary p-6 text-white shadow-sm md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl">
                    <FaRotateLeft aria-hidden />
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold">
                    Questions about these terms?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
                    Our team can help clarify order, delivery, return, exchange,
                    and warranty conditions before you make a purchase.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-[#F0F7F4]"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
