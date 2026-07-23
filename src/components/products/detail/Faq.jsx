import React, { useMemo, useState } from "react";
import { Plus, X, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { apiCreateQuestion } from "../../../api/authApi";

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
  const { isAuthenticated, getAccessToken } = useAuth();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dbQuestions, setDbQuestions] = useState(product?.questions || []);

  const hasDbQuestions = dbQuestions.length > 0;

  const faqs = useMemo(() => {
    if (hasDbQuestions) {
      return dbQuestions.map((q) => ({
        question: q.question,
        answer: q.answer || "Our support team will answer this question soon.",
        isDb: true,
      }));
    }
    return getProductFaqs(product);
  }, [dbQuestions, hasDbQuestions, product]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return toast.error("Please enter a question.");

    if (!isAuthenticated) {
      toast.info("Please sign in to ask a question.");
      navigate("/signin");
      return;
    }

    const token = getAccessToken();
    if (!token) return;

    setSubmitting(true);
    try {
      const { ok, data } = await apiCreateQuestion(token, {
        product: product.id,
        question: newQuestion.trim(),
      });

      if (ok && data) {
        toast.success("Question submitted successfully!");
        setDbQuestions((prev) => [data, ...prev]);
        setNewQuestion("");
      } else {
        const msg =
          data?.detail ||
          data?.question?.[0] ||
          "Failed to submit question. Please try again.";
        toast.error(msg);
      }
    } catch {
      toast.error("An error occurred while submitting your question.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-primary">
      <div className="mx-auto">
        <div className="flex items-center justify-between border-b-2 border-primary pb-2 w-fit">
          <h2 className="text-2xl font-bold text-gray-900">
            {hasDbQuestions ? "Customer Questions & Answers" : "Your questions, Our answers"}
          </h2>
        </div>

        <div className="mt-8 divide-y divide-gray-200 border-b border-gray-200">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg md:text-xl font-bold leading-snug text-gray-950 flex items-center gap-2">
                    {item.isDb && <MessageSquare className="h-5 w-5 text-primary shrink-0" />}
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
                    <p className="max-w-3xl pt-3 text-base leading-7 text-gray-700">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Q&A Submit Form */}
        <form onSubmit={handleQuestionSubmit} className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="font-bold text-xl text-gray-900 mb-3">
            Have a question about this product?
          </h3>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={3}
            className="border border-gray-300 w-full p-4 text-sm font-medium rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition placeholder:text-gray-400"
            placeholder="Type your question here..."
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-3 px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl text-white font-bold cursor-pointer transition flex items-center gap-2 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Question"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Faq;
