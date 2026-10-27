import { useState } from "react";
import { ArrowRight, AtSign, Mail, MapPin, Phone } from "lucide-react";
import { BRAND } from "../data/products";
import { generalChatLink } from "../lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

const columns = [
  {
    title: "The collection",
    links: [
      { label: "Shop all", to: "/shop" },
      { label: "Women", to: "/shop?audience=women" },
      { label: "Men", to: "/shop?audience=men" },
      { label: "Outerwear", to: "/shop?category=Outerwear" },
      { label: "Knitwear", to: "/shop?category=Knitwear" },
    ],
  },
  {
    title: "Client care",
    links: [
      { label: "Size & fit guide", to: "/size-guide" },
      { label: "Shipping & delivery", to: "/policies?section=shipping" },
      { label: "Exchanges & returns", to: "/policies?section=returns" },
      { label: "Care guide", to: "/policies?section=care" },
      { label: "Contact us", to: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 border-b border-paper/15 pb-14 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr]">
          <div>
            <p className="text-2xl font-semibold tracking-[0.34em]">VAYRON</p>
            <p className="font-display mt-5 max-w-xs text-[26px] leading-[1.15] text-paper/90 sm:text-[30px]">
              Winter, made <em className="italic text-paper/70">quietly.</em>
            </p>
            <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-paper/55">
              Considered winter wear for men and women. Heavyweight knits, honest
              outerwear, delivered across Pakistan.
            </p>
            <a
              href={generalChatLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-paper/25 px-4 py-3 transition-colors hover:bg-paper hover:text-ink"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="label">Order on WhatsApp</span>
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-sm text-paper/45">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.to}
                      className="text-[13px] text-paper/75 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="label-sm text-paper/45">Get in touch</p>
            <ul className="mt-5 space-y-4 text-[13px] text-paper/75">
              <li>
                <a
                  href={generalChatLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-paper"
                >
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
                  {BRAND.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-start gap-3 transition-colors hover:text-paper"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
                {BRAND.city}
              </li>
              <li className="flex items-start gap-3">
                <AtSign className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.5} />
                {BRAND.instagram}
              </li>
            </ul>

            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) return;
                setSent(true);
                setEmail("");
              }}
            >
              <label htmlFor="newsletter" className="label-sm text-paper/45">
                Private list — early access
              </label>
              <div className="mt-3 flex items-center border-b border-paper/30 pb-2 focus-within:border-paper">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSent(false);
                  }}
                  placeholder="Email address"
                  className="w-full bg-transparent text-[13px] text-paper placeholder:text-paper/35 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Join the VAYRON list"
                  className="p-1 text-paper/70 transition-colors hover:text-paper"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p aria-live="polite" className="mt-2 min-h-4 text-[11px] text-paper/50">
                {sent ? "You're on the list. Welcome to VAYRON." : "No noise. Four notes a year."}
              </p>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[11px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VAYRON. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/policies?section=privacy" className="transition-colors hover:text-paper">
              Privacy
            </a>
            <a href="/policies?section=terms" className="transition-colors hover:text-paper">
              Terms
            </a>
            <a href="/policies?section=returns" className="transition-colors hover:text-paper">
              Returns
            </a>
            <span className="hidden h-3 w-px bg-paper/20 sm:block" />
            <p>Designed & shipped from Pakistan</p>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none -mb-3 w-full overflow-hidden text-center leading-[0.72] font-semibold tracking-[0.02em] text-paper/[0.06] select-none sm:-mb-6"
          style={{ fontSize: "clamp(4.5rem, 17vw, 15rem)" }}
        >
          VAYRON
        </p>
      </div>
    </footer>
  );
}
