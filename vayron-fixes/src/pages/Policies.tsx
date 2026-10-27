import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useRoute } from "../lib/router";
import { BRAND } from "../data/products";
import { generalChatLink } from "../lib/whatsapp";
import WhatsAppIcon from "../components/WhatsAppIcon";
import Reveal from "../components/Reveal";
import { cn } from "../utils/cn";

type Section = "shipping" | "returns" | "care" | "privacy" | "terms";

const SECTIONS: { id: Section; label: string; icon: typeof Truck }[] = [
  { id: "shipping", label: "Shipping & delivery", icon: Truck },
  { id: "returns", label: "Exchanges & returns", icon: RefreshCcw },
  { id: "care", label: "Care guide", icon: ShieldCheck },
  { id: "privacy", label: "Privacy", icon: ShieldCheck },
  { id: "terms", label: "Terms of service", icon: ShieldCheck },
];

const CONTENT: Record<Section, { title: string; intro: string; blocks: { heading: string; body: string[] }[] }> = {
  shipping: {
    title: "Shipping & delivery",
    intro:
      "Every order is packed by hand in Lahore and dispatched within 24 hours of confirmation on WhatsApp.",
    blocks: [
      {
        heading: "Nationwide delivery",
        body: [
          "Complimentary delivery on every order, to every city in Pakistan.",
          "Karachi, Lahore and Islamabad typically receive orders within 1–3 working days. Other cities arrive within 2–4 working days.",
          "You will receive a tracking reference on WhatsApp as soon as your parcel leaves our studio.",
        ],
      },
      {
        heading: "Cash on delivery",
        body: [
          "Cash on delivery is available across Pakistan. You may also pay via bank transfer — details are shared by the order desk when your order is confirmed.",
          "For high-value outerwear, we may confirm the delivery address by phone before dispatch.",
        ],
      },
      {
        heading: "Order confirmation",
        body: [
          "Placing the WhatsApp order form prepares your message but does not charge you. Our team confirms stock and delivery timing in the chat before anything is dispatched.",
          "If a piece is unavailable, we will offer an alternative size, a made-to-order timeline, or a full refund.",
        ],
      },
    ],
  },
  returns: {
    title: "Exchanges & returns",
    intro:
      "We want the piece to be right. If the fit is not what you expected, we will help you fix it.",
    blocks: [
      {
        heading: "One free size exchange",
        body: [
          "Request a size exchange within 7 days of delivery. The piece must be unworn, unwashed, and have all original tags attached.",
          "We arrange a courier pickup where available, or reimburse a standard return shipment. The replacement is dispatched as soon as the return is inspected.",
        ],
      },
      {
        heading: "Returns",
        body: [
          "Unworn pieces with tags may be returned within 7 days for a store credit or refund to the original payment method.",
          "For hygiene reasons, and to protect the integrity of the collection, sale pieces marked ‘Final few’ are eligible for exchange only.",
        ],
      },
      {
        heading: "Faults",
        body: [
          "Every piece is checked before dispatch. If you believe there is a manufacturing fault, message us within 14 days with photographs and your order reference — we will resolve it directly.",
          "Normal wear, incorrect washing, and alterations are not covered.",
        ],
      },
    ],
  },
  care: {
    title: "Care guide",
    intro:
      "Considered clothing needs considered washing. Treat these pieces as you would a good coat — infrequently and gently.",
    blocks: [
      {
        heading: "Knitwear",
        body: [
          "Hand wash cold with a gentle, pH-neutral detergent. Never wring — press the water out between towels.",
          "Reshape while damp and dry flat in the shade. Fold to store rather than hanging, which stretches the shoulders.",
        ],
      },
      {
        heading: "Outerwear",
        body: [
          "Wool coats should be dry cleaned only, two or three times a season at most. Brush after wear and air overnight on a wide hanger.",
          "Down pieces can be dry cleaned or washed on a down cycle with tennis balls to restore loft. Never use fabric softener.",
        ],
      },
      {
        heading: "Fleece & hoodies",
        body: [
          "Wash cold, inside out, with zips closed. Tumble dry low or line dry — high heat shortens the life of the loopback cotton.",
          "Avoid ironing prints or drawcord hardware directly.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy",
    intro:
      "We collect the minimum needed to deliver your order, and we do not sell or trade customer information.",
    blocks: [
      {
        heading: "What we collect",
        body: [
          "Name, phone number, city and delivery address when you submit the order form. This information is sent to our WhatsApp order desk so we can confirm and deliver your order.",
          "We do not process card details on this website. Payment is arranged directly with our team.",
        ],
      },
      {
        heading: "Messaging",
        body: [
          "Order conversations take place on WhatsApp and are subject to WhatsApp’s own privacy terms.",
          "If you join our private list, we use your email only to send collection announcements. You can unsubscribe at any time.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `Write to ${BRAND.email} to ask for a copy of the information we hold about you, or to have it deleted once your order is complete.`,
        ],
      },
    ],
  },
  terms: {
    title: "Terms of service",
    intro:
      "By placing an order with VAYRON you agree to the terms below. They are written to be read.",
    blocks: [
      {
        heading: "Orders & pricing",
        body: [
          "All prices are listed in Pakistani Rupees and include applicable taxes. Delivery is complimentary.",
          "An order is confirmed only once our team acknowledges it on WhatsApp. Prices and availability may change without notice, but never after we have confirmed your order.",
        ],
      },
      {
        heading: "Product information",
        body: [
          "We photograph each piece as a flat lay or on a ghost form to represent colour and texture accurately. Screens vary slightly, and natural materials vary piece to piece.",
          "Measurements are provided as a guide. When between sizes, contact the order desk before ordering.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The VAYRON name, product photography, written copy and designs are the property of VAYRON and may not be reproduced without written permission.",
        ],
      },
    ],
  },
};

export default function Policies() {
  const route = useRoute();
  const initial = route.query.get("section") as Section | null;
  const [active, setActive] = useState<Section>(
    initial && SECTIONS.some((s) => s.id === initial) ? initial : "shipping"
  );

  useEffect(() => {
    const section = route.query.get("section") as Section | null;
    if (section && SECTIONS.some((s) => s.id === section)) {
      setActive(section);
    }
  }, [route.hash]);

  const content = CONTENT[active];

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-8 sm:px-8 sm:pt-14 sm:pb-10">
          <div className="flex items-center gap-2 text-[10.5px] tracking-wide text-smoke">
            <a href="/" className="hover:text-ink">Home</a>
            <span>/</span>
            <span className="text-ink">Client care</span>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <h1 className="text-[clamp(2.2rem,5.4vw,4rem)] leading-[0.96] font-medium tracking-[-0.045em]">
                The fine print,{" "}
                <span className="font-display font-normal italic">plainly.</span>
              </h1>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-smoke">
                Delivery, exchanges, fabric care and the things we promise. If anything
                is unclear, ask us directly — we prefer conversation to fine print.
              </p>
            </Reveal>
            <Reveal delay={80} className="flex items-center gap-2 border border-line px-4 py-3">
              <WhatsAppIcon className="h-4 w-4" />
              <span className="text-[11px]">{BRAND.whatsappDisplay}</span>
              <span className="mx-1 h-3 w-px bg-line" />
              <span className="text-[10px] text-smoke">Replies in minutes</span>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-16">
          <aside>
            <div className="lg:sticky lg:top-[104px]">
              <p className="label-sm mb-4 text-smoke">Client care</p>
              <nav className="flex flex-col" aria-label="Policy sections">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(s.id)}
                    aria-current={active === s.id ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-3 border-b border-line py-3.5 text-left text-[12px] transition-colors",
                      active === s.id ? "font-medium text-ink" : "text-smoke hover:text-ink"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <s.icon className="h-3.5 w-3.5" strokeWidth={1.4} />
                      {s.label}
                    </span>
                    {active === s.id && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                  </button>
                ))}
              </nav>

              <div className="mt-6 bg-paper-deep p-4">
                <p className="text-[12px] leading-relaxed text-ink-soft">
                  Need a person, not a page?
                </p>
                <a
                  href={generalChatLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                >
                  <WhatsAppIcon className="h-3 w-3" /> Message the order desk
                </a>
                <p className="mt-3 flex items-center gap-1.5 text-[10.5px] text-smoke">
                  <Mail className="h-3 w-3" /> {BRAND.email}
                </p>
              </div>
            </div>
          </aside>

          <section className="max-w-2xl" aria-live="polite">
            <p className="label text-smoke">{active === "care" ? "Garment care" : "VAYRON policies"}</p>
            <h2 className="font-display mt-3 text-[clamp(1.9rem,4vw,2.8rem)] leading-none">
              {content.title}
            </h2>
            <p className="mt-4 text-[13.5px] leading-[1.8] text-ink-soft">{content.intro}</p>

            <div className="mt-8 space-y-7">
              {content.blocks.map((block) => (
                <div key={block.heading} className="border-t border-line pt-5">
                  <h3 className="text-[13px] font-semibold tracking-[0.01em]">
                    {block.heading}
                  </h3>
                  <div className="mt-2.5 space-y-2.5">
                    {block.body.map((p) => (
                      <p key={p} className="text-[12.5px] leading-[1.85] text-smoke">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-smoke">Last updated · January 2026</p>
              <div className="flex flex-wrap gap-4">
                <a href="/size-guide" className="flex items-center gap-1 text-[11px] font-medium">
                  Size guide <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                </a>
                <a href="/contact" className="flex items-center gap-1 text-[11px] font-medium">
                  Contact us <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                </a>
                <a href="/shop" className="flex items-center gap-1 text-[11px] font-medium">
                  Shop <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
