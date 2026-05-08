import React, { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return null;
  return `Tk ${value}`;
};

const getProductFaqs = (product) => {
  const productName = product?.name || "this product";
  const brandName = product?.brand?.name;
  const categoryName = product?.category?.name || "product";
  const price = Number(product?.price || 0);
  const discountPrice = Number(product?.discount_price || 0);
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const activePrice = hasDiscount ? discountPrice : price;
  const stockQuantity = Number(product?.stock_quantity || 0);
  const stockAnswer =
    stockQuantity > 0
      ? `${productName} is currently in stock. You can see availability up to ${stockQuantity} pcs and add it to your cart by selecting the quantity.`
      : `${productName} is currently out of stock. You can place an order once availability is updated.`;

  return [
    {
      question: `Is ${productName} an authentic product?`,
      answer: brandName
        ? `Yes, this is a ${brandName} brand ${categoryName}. You can check the product details, images, specifications, and price on the product page before ordering.`
        : `Yes, this is a listed ${categoryName} on our platform. You can check the product details, images, specifications, and price before ordering.`,
    },
    {
      question: `What is the price of ${productName}?`,
      answer: hasDiscount
        ? `The regular price of this product is ${formatPrice(price)}, and the current offer price is ${formatPrice(discountPrice)}. Please confirm the latest price in your cart before checkout.`
        : `The current price of this product is ${formatPrice(activePrice) || "shown on the product page"}. Please confirm the latest price in your cart before checkout.`,
    },
    {
      question: "How can I check if it's in stock?",
      answer: stockAnswer,
    },
    {
      question: "Where do you deliver?",
      answer:
        "Delivery is available across Bangladesh. Please provide your correct address and phone number when confirming your order to receive delivery updates.",
    },
    {
      question: "Is warranty or after-sales support available?",
      answer: brandName
        ? `For ${brandName} products, official support or warranty policy may apply depending on the product category. Please contact us before ordering to confirm warranty details.`
        : "Warranty and support may vary by product category. Please contact us before placing your order to confirm the details.",
    },
    {
      question: "Can I cancel or change my order after placing it?",
      answer:
        "You can request a change or cancellation before order processing begins. Please contact us as soon as possible and we will do our best to update your order.",
    },
  ];
};

const Faq = ({ product }) => {
  const faqs = useMemo(() => getProductFaqs(product), [product]);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-12 bg-white rounded-3xl p-8 shadow-lg border border-primary">
      <div className="mx-a">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary w-fit">
          Your questions, Our answers
        </h2>

        <div className="mt-10 divide-y divide-gray-300/80 border-b border-gray-300/80">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-bold leading-snug text-gray-950">
                    {item.question}
                  </span>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-gray-950">
                    {isOpen ? <X size={26} /> : <Plus size={28} />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pt-4 text-base leading-7 text-gray-700 sm:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-base text-gray-600 sm:text-lg">
          Still have questions?{" "}
          <a
            href="/contact"
            className="font-bold text-gray-950 underline underline-offset-4 transition-colors hover:text-primary"
          >
            Contact Us
          </a>
        </p>
      </div>
    </section>
  );
};

export default Faq;
