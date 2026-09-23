import { useState, useEffect, useRef, useCallback, useId } from "react";
import { useNavigate } from "react-router";
import { Search, X, Loader2 } from "lucide-react";
import apiClient from "../../api/apiClient";
import useDebounce from "../../hooks/useDebounce";

/**
 * SearchBox — real-time autocomplete search component.
 *
 * Features:
 *  - 300ms debounce before hitting the API (min 2 chars)
 *  - Keyboard navigation: ↑ ↓ Enter Escape
 *  - Click suggestion → navigate to product detail page
 *  - Press Enter / "See all" → navigate to /products?search=<query>
 *  - Loading spinner while fetching, × clear button
 *  - Fully accessible: combobox/listbox ARIA roles
 *  - Closes on outside click
 *
 * @param {boolean}  autoFocus - Auto-focus the input on mount (mobile).
 * @param {Function} onSearch  - Optional callback after navigation (e.g. close mobile bar).
 */
const SearchBox = ({
  autoFocus = false,
  onSearch,
  id,
  inputClassName = "",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Stable unique ID for ARIA relationship between input and listbox
  const listboxId = useId();
  const inputId = id || `${listboxId}-input`;

  const debouncedQuery = useDebounce(query, 300);

  // ─── Fetch suggestions ───────────────────────────────────────────────────
  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    apiClient
      .suggestProducts(trimmed)
      .then((data) => {
        if (cancelled) return;
        setSuggestions(Array.isArray(data) ? data : []);
        setIsOpen(true);
        setActiveIndex(-1);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    // Cancel stale responses when query changes before 300ms
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // ─── Close on outside click ──────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ─── Navigation helpers ───────────────────────────────────────────────────
  const navigateToProduct = useCallback(
    (slug) => {
      setQuery("");
      setSuggestions([]);
      setIsOpen(false);
      navigate(`/product/${slug}`);
      onSearch?.();
    },
    [navigate, onSearch],
  );

  const navigateToSearch = useCallback(
    (q = query) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      onSearch?.();
    },
    [query, navigate, onSearch],
  );

  // ─── Keyboard navigation ─────────────────────────────────────────────────
  // Total options = suggestions + 1 "See all results" row
  const totalOptions = suggestions.length + (query.trim().length >= 2 ? 1 : 0);
  const seeAllIndex = suggestions.length;

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen && totalOptions > 0) { setIsOpen(true); return; }
        setActiveIndex((prev) => (prev + 1) % totalOptions);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? totalOptions - 1 : prev - 1));
        break;

      case "Enter":
        e.preventDefault();
        if (isOpen && activeIndex >= 0 && activeIndex < suggestions.length) {
          navigateToProduct(suggestions[activeIndex].slug);
        } else {
          navigateToSearch();
        }
        break;

      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;

      default:
        break;
    }
  };

  // ─── Clear button ────────────────────────────────────────────────────────
  // Use onMouseDown so the input doesn't lose focus before the click fires
  const handleClear = (e) => {
    e.preventDefault();
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  const hasDropdown = isOpen && query.trim().length >= 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      role="combobox"
      aria-expanded={hasDropdown}
      aria-haspopup="listbox"
      aria-owns={listboxId}
    >
      {/* ── Input ── */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          placeholder="Search products..."
          className={`w-full h-10 rounded-full border border-gray-200 bg-gray-50 px-4 pr-16 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all duration-200 ${inputClassName}`}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            hasDropdown && activeIndex >= 0
              ? `${listboxId}-opt-${activeIndex}`
              : undefined
          }
        />

        {/* Right-side icons */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {/* Clear button — only when input has content */}
          {query && (
            <button
              onMouseDown={handleClear}
              tabIndex={-1}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-full"
            >
              <X size={13} />
            </button>
          )}

          {/* Spinner while loading, search icon otherwise */}
          {isLoading ? (
            <Loader2
              size={16}
              className="text-primary animate-spin shrink-0"
              aria-label="Loading suggestions"
            />
          ) : (
            <button
              onMouseDown={(e) => { e.preventDefault(); navigateToSearch(); }}
              tabIndex={-1}
              aria-label="Submit search"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Search size={16} />
            </button>
          )}
        </div>
      </div>

      {/* ── Suggestions dropdown ── */}
      {hasDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9998] overflow-hidden"
        >
          {/* No results */}
          {!isLoading && suggestions.length === 0 && (
            <li
              role="presentation"
              className="px-4 py-4 text-sm text-gray-400 text-center select-none"
            >
              No results found for &ldquo;{query.trim()}&rdquo;
            </li>
          )}

          {/* Suggestion rows */}
          {suggestions.map((product, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                key={product.id}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={isActive}
                onMouseDown={() => navigateToProduct(product.slug)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors select-none ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Search
                  size={12}
                  className="shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span className="flex-1 truncate font-medium">
                  {product.name}
                </span>
                <span
                  className={`text-xs shrink-0 transition-colors ${isActive ? "text-primary" : "text-gray-300"}`}
                  aria-hidden="true"
                >
                  →
                </span>
              </li>
            );
          })}

          {/* "See all results" row — always at the bottom */}
          <li
            id={`${listboxId}-opt-${seeAllIndex}`}
            role="option"
            aria-selected={activeIndex === seeAllIndex}
            onMouseDown={() => navigateToSearch()}
            onMouseEnter={() => setActiveIndex(seeAllIndex)}
            className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer text-sm font-semibold border-t border-gray-100 transition-colors select-none ${
              activeIndex === seeAllIndex
                ? "bg-primary/10 text-primary"
                : "text-primary hover:bg-primary/5"
            }`}
          >
            <Search size={12} className="shrink-0" aria-hidden="true" />
            <span>
              See all results for{" "}
              <span className="font-bold">&ldquo;{query.trim()}&rdquo;</span>
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
