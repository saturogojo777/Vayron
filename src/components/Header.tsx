import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { products, formatPKR, BRAND } from "../data/products";
import { useRoute } from "../lib/router";
import { cn } from "../utils/cn";
import { useFocusTrap } from "../hooks/useFocusTrap";
import WhatsAppIcon from "./WhatsAppIcon";
import { generalChatLink } from "../lib/whatsapp";
import Picture from "./Picture";

const NAV = [
  { label: "Shop all", to: "/shop" },
  { label: "Women", to: "/shop?audience=women" },
  { label: "Men", to: "/shop?audience=men" },
  { label: "Our story", to: "/story" },
];

export default function Header() {
  const route = useRoute();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef = useFocusTrap<HTMLDivElement>(menuOpen);

  useEffect(() => {
    if (!searchOpen) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 260);
    return () => window.clearTimeout(t);
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [route.hash]);

  useEffect(() => {
    const locked = menuOpen || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 3);
    return products
      .filter((p) =>
        [p.name, p.category, p.tagline, p.audience, ...p.colors.map((c) => c.name)]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 5);
  }, [query]);

  const active = (to: string) => {
    const [path, search] = to.split("?");
    if (path !== route.path) return false;
    if (!search) return !route.query.get("audience");
    return route.query.get("audience") === new URLSearchParams(search).get("audience");
  };

  return (
    <>
      <div className="relative z-50 bg-ink text-paper">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
          <p className="label-sm truncate opacity-80">
            <span className="sm:hidden">Free delivery, nationwide</span>
            <span className="hidden sm:inline">Complimentary delivery across Pakistan</span>
          </p>
          <p className="label-sm hidden items-center gap-2 opacity-80 sm:flex">
            Winter 2025 — 26
            <span className="inline-block h-1 w-1 rounded-full bg-paper/50" />
            Order directly on WhatsApp
          </p>
          <a
            href={generalChatLink}
            target="_blank"
            rel="noreferrer"
            className="label-sm shrink-0 opacity-80 transition-opacity hover:opacity-100"
          >
            +92 309 570 5014
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-500",
          scrolled
            ? "border-line bg-paper/92 backdrop-blur-xl"
            : "border-line/70 bg-paper"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:h-[74px] sm:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-deep lg:hidden"
          >
            <span className="space-y-[5px]">
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-5 bg-ink" />
              <span className="block h-px w-3.5 bg-ink" />
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.to}
                href={item.to}
                data-active={active(item.to)}
                className={cn(
                  "link-underline text-[11.5px] font-medium tracking-[0.14em] uppercase transition-opacity",
                  active(item.to) ? "opacity-100" : "opacity-65 hover:opacity-100"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="/"
            aria-label="VAYRON — home"
            className="absolute left-1/2 -translate-x-1/2 select-none"
          >
            <span className="block text-[19px] leading-none font-semibold tracking-[0.3em] sm:text-[24px] sm:tracking-[0.34em]">
              VAYRON
            </span>
            <span className="mt-1 block text-center text-[7px] font-medium tracking-[0.4em] uppercase opacity-50">
              Winter wear
            </span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-deep"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <a
              href={generalChatLink}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 transition-colors hover:border-ink hover:bg-ink hover:text-paper sm:flex"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              <span className="label-sm">Order on WhatsApp</span>
            </a>
            <a
              href={generalChatLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-deep sm:hidden"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={cn(
            "absolute top-0 left-0 flex h-full w-[86%] max-w-sm flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-[74px] items-center justify-between border-b border-line px-6">
            <span className="text-lg font-semibold tracking-[0.3em]">VAYRON</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
            {[
              ...NAV,
              { label: "Size & fit guide", to: "/size-guide" },
              { label: "Shipping & returns", to: "/policies" },
              { label: "Contact", to: "/contact" },
            ].map((item, i) => (
              <a
                key={item.to}
                href={item.to}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-line/80 py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-xs text-smoke italic">
                    0{i + 1}
                  </span>
                  <span className="text-xl tracking-[-0.01em]">{item.label}</span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            ))}
          </nav>
          <div className="mt-auto space-y-4 border-t border-line px-6 py-6">
            <p className="label text-smoke">Personal order desk</p>
            <a
              href={generalChatLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 bg-ink px-5 py-4 text-paper"
            >
              <span className="flex items-center gap-3">
                <WhatsAppIcon className="h-4 w-4" />
                <span className="text-sm">{BRAND.whatsappDisplay}</span>
              </span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <p className="text-xs leading-relaxed text-smoke">{BRAND.hours}</p>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[80]",
          searchOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!searchOpen}
        inert={!searchOpen}
      >
        <div
          onClick={() => setSearchOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/45 backdrop-blur-[3px] transition-opacity duration-300",
            searchOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className={cn(
            "relative mx-auto mt-0 w-full max-w-3xl bg-paper shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-24",
            searchOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          )}
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-5 sm:px-7">
            <Search className="h-5 w-5 shrink-0 text-smoke" strokeWidth={1.5} />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the winter collection…"
              aria-label="Search products"
              className="w-full bg-transparent text-base placeholder:text-smoke/70 focus:outline-none sm:text-lg"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4">
            <p className="label px-3 py-3 text-smoke">
              {query ? `${results.length} results` : "Most considered"}
            </p>
            {results.length === 0 && (
              <p className="px-3 py-8 text-sm text-smoke">
                No pieces match that search. Try “hoodie”, “wool” or “puffer”.
              </p>
            )}
            {results.map((p) => (
              <a
                key={p.id}
                href={`/product/${p.slug}`}
                onClick={() => setSearchOpen(false)}
                className="group flex items-center gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-paper-deep"
              >
                <Picture
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="h-16 w-14 shrink-0 bg-paper-deep object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{p.name}</span>
                  <span className="label-sm mt-1 block text-smoke">
                    {p.category} · {p.audience === "unisex" ? "Unisex" : p.audience}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-medium">
                  {formatPKR(p.price)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
