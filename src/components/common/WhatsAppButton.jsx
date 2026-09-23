import React, { useState } from "react";
import { useConfig } from "../../context/ConfigContext";

/**
 * Floating WhatsApp support chat button.
 * Reads support_phone from the global StoreConfiguration API and
 * opens the WhatsApp deep-link when clicked.
 * Renders nothing if support_phone is not configured in the backend.
 */
const WhatsAppButton = () => {
  const { config } = useConfig();
  const [isHovered, setIsHovered] = useState(false);

  // Normalise the phone number: strip spaces, dashes, parentheses and
  // leading "+" so wa.me receives a pure E.164 number string.
  const rawPhone = config?.support_phone || "";
  const phone = rawPhone.replace(/[\s\-()]/g, "").replace(/^\+/, "");

  // Don't render if no phone number is configured yet.
  if (!phone) return null;

  const whatsappUrl = `https://wa.me/${phone}`;

  return (
    <div
      className="whatsapp-fab-wrapper"
      aria-label="Chat with us on WhatsApp"
      role="complementary"
    >
      {/* Pulsing background ring */}
      <span className="whatsapp-pulse" aria-hidden="true" />

      {/* Tooltip */}
      <div
        className={`whatsapp-tooltip ${isHovered ? "whatsapp-tooltip--visible" : ""}`}
        aria-hidden="true"
      >
        Chat with us
      </div>

      {/* Main button */}
      <a
        id="whatsapp-support-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open WhatsApp chat"
        title="Chat support on WhatsApp"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="30"
          height="30"
          fill="white"
          aria-hidden="true"
        >
          <path d="M4.868 43.303l2.694-9.835a18.949 18.949 0 01-2.54-9.528C5.026 13.455 13.948 4.5 24.914 4.5c5.32.002 10.318 2.082 14.08 5.866A19.833 19.833 0 0143.8 24.389c-.004 10.983-8.928 19.938-19.887 19.938a19.866 19.866 0 01-9.504-2.417L4.868 43.303zm10.717-6.194l.604.358a16.5 16.5 0 008.41 2.297c9.125 0 16.551-7.45 16.554-16.604.002-4.436-1.72-8.604-4.847-11.743A16.463 16.463 0 0024.917 7.9C15.785 7.9 8.36 15.35 8.356 24.502a16.54 16.54 0 002.55 8.87l.396.632-1.682 6.14 6.065-1.835zM35.457 29.013c-.124-.207-.453-.331-.948-.579-1.24-.621-7.328-3.618-8.461-4.032-.451-.16-.782-.24-1.118.24-.33.483-1.297 1.63-1.587 1.963-.29.33-.582.373-1.077.124-.495-.25-2.09-.773-3.981-2.465-1.473-1.315-2.467-2.938-2.757-3.432-.29-.495-.03-.762.218-1.009.223-.222.495-.579.743-.868.247-.29.33-.497.495-.828.166-.331.083-.62-.041-.868-.124-.247-1.118-2.7-1.53-3.697-.404-.975-.815-.843-1.118-.859l-.95-.016c-.33 0-.868.124-1.322.62-.454.495-1.73 1.694-1.73 4.127 0 2.434 1.772 4.784 2.02 5.115.248.331 3.488 5.33 8.451 7.476 1.18.51 2.1.813 2.817 1.042 1.183.377 2.261.325 3.114.197 1.05-.155 3.23-1.32 3.684-2.596.454-1.279.454-2.375.33-2.604z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
