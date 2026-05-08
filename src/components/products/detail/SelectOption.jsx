import React, { useState, useEffect } from "react";

const tabs = [
  { label: "Specification", id: "specification" },
  { label: "Description", id: "description" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

const SelectOption = () => {
  const [select, setSelect] = useState("Specification");

  useEffect(() => {
    const handleScroll = () => {
      let currentTab = tabs[0].label;
      let closestDistance = -Infinity;

      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        
        // Section টা viewport এর উপরে গেছে বা threshold এর মধ্যে আছে
        if (top <= 150) {
          // যে section এর top সবচেয়ে বেশি (মানে সবচেয়ে কাছে viewport এর)
          if (top > closestDistance) {
            closestDistance = top;
            currentTab = tab.label;
          }
        }
      }

      setSelect(currentTab);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (tab) => {
    setSelect(tab.label);
    const el = document.getElementById(tab.id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 70,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-26 z-50 bg-white/40 backdrop-blur-md rounded-2xl w-fit mt-22">
      <div className="flex items-center sm:gap-5 flex-wrap gap-3 px-4 py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollTo(tab)}
            className={`font-semibold px-3 py-1 lg:px-3 lg:py-2 border cursor-pointer rounded-md border-gray-200 transition-all
              ${
                select === tab.label
                  ? "bg-primary text-white shadow-2xl shadow-primary"
                  : "bg-white text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
