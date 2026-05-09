import React, { useState, useEffect } from "react";

const tabs = [
  { label: "Specification", id: "specification" },
  { label: "Description", id: "description" },
  { label: "Reviews", id: "reviews" },
  { label: "FAQ", id: "faq" },
];

const TabMenu = () => {
  const [select, setSelect] = useState("Specification");

  useEffect(() => {
    const handleScroll = () => {
      let currentTab = tabs[0].label;
      let closestDistance = -Infinity;

      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;

        if (top <= 150) {
          if (top > closestDistance) {
            closestDistance = top;
            currentTab = tab.label;
          }
        }
      }

      setSelect(currentTab);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <div className="sticky top-21 lg:top-26 z-50 bg-white/40 backdrop-blur-md rounded-2xl w-fit mt-22">
      <div className="flex items-center sm:gap-5 gap-2 px-3 py-3 sm:px-4 flex-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollTo(tab)}
            className={`font-semibold px-2 py-1 sm:px-3 lg:py-2 border cursor-pointer rounded-md border-gray-200 transition-all whitespace-nowrap text-sm sm:text-base flex-shrink-0
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

export default TabMenu;
