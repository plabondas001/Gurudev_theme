import React, { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return null;
  return `Tk ${value}`;
};

const getProductFaqs = (product) => {
  const productName = product?.name || "ei product";
  const brandName = product?.brand?.name;
  const categoryName = product?.category?.name || "product";
  const price = Number(product?.price || 0);
  const discountPrice = Number(product?.discount_price || 0);
  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const activePrice = hasDiscount ? discountPrice : price;
  const stockQuantity = Number(product?.stock_quantity || 0);
  const stockAnswer =
    stockQuantity > 0
      ? `${productName} ekhon stock e ache. Apni ${stockQuantity} pcs porjonto availability dekhte parchen, quantity select kore cart e add korte parben.`
      : `${productName} ekhon stock out. Availability update hole abar order kora jabe.`;

  return [
    {
      question: `${productName} ki authentic product?`,
      answer: brandName
        ? `Haan, eta ${brandName} brand er ${categoryName}. Product details, image, specification ebong price page e check kore order korte parben.`
        : `Haan, eta amader listed ${categoryName}. Product details, image, specification ebong price page e check kore order korte parben.`,
    },
    {
      question: `${productName} er price koto?`,
      answer: hasDiscount
        ? `Ei product er regular price ${formatPrice(price)}, ar current offer price ${formatPrice(discountPrice)}. Checkout er age latest price cart e abar confirm kore niben.`
        : `Ei product er current price ${formatPrice(activePrice) || "product page e deya ache"}. Checkout er age latest price cart e abar confirm kore niben.`,
    },
    {
      question: "Stock e ache kina kivabe bujhbo?",
      answer: stockAnswer,
    },
    {
      question: "Delivery kothay pabo?",
      answer:
        "Bangladesh er moddhe delivery available. Order confirm korar somoy apnar address ebong phone number thikmoto dile delivery update peye jaben.",
    },
    {
      question: "Warranty ba support pabo?",
      answer: brandName
        ? `${brandName} er product hole official/support policy product category onujaye apply hote pare. Warranty details confirm korte order er age amader sathe contact korte paren.`
        : "Warranty/support product category onujaye vary korte pare. Order er age details confirm korte amader sathe contact korte paren.",
    },
    {
      question: "Order korar por cancel ba change kora jabe?",
      answer:
        "Order processing start howar age change ba cancel request kora jay. Taratari contact korle amra order update korte help korbo.",
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
          Your questions,Our answers
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
          Aro kono question ache?{" "}
          <a
            href="/contact"
            className="font-bold text-gray-950 underline underline-offset-4 transition-colors hover:text-primary"
          >
            Contact korun
          </a>
        </p>
      </div>
    </section>
  );
};

export default Faq;
