import React, { useState,useRef } from "react";

const SelectOption = () => {
  const [select, setSelect] = useState("Specification");

    const specificationRef = useRef(null);
  const descriptionRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  const handleScroll = (section, ref) => {
    setSelect(section);

    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <div className="mt-22 flex items-center sm:gap-5 flex-wrap gap-3">
        <button
          onClick={() => setSelect("Specification")}
          className={`font-semibold px-2 py-1 lg:px-3 lg:py-2 border cursor-pointer rounded-md border-primary transition-all
    ${
      select === "Specification"
        ? "bg-primary text-white"
        : "bg-white text-black"
    }`}
        >
          Specification
        </button>

        <button
          onClick={() => setSelect("Description")}
          className={`font-semibold px-3 py-1 border cursor-pointer rounded-md border-primary transition-all
    ${
      select === "Description" ? "bg-primary text-white" : "bg-white text-black"
    }`}
        >
          Description
        </button>

        <button
          onClick={() => setSelect("Reviews")}
          className={`font-semibold px-3 py-1 border cursor-pointer rounded-md border-primary transition-all
    ${select === "Reviews" ? "bg-primary text-white" : "bg-white text-black"}`}
        >
          Reviews
        </button>

        <button
          onClick={() => setSelect("FAQ")}
          className={`font-semibold px-3 py-1 border cursor-pointer rounded-md border-primary transition-all
    ${select === "FAQ" ? "bg-primary text-white" : "bg-white text-black"}`}
        >
          FAQ
        </button>
      </div>
    </div>
  );
};

export default SelectOption;
