import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { products, testimonials, BRAND } from "../data/products";
import { generalChatLink } from "../lib/whatsapp";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import WhatsAppIcon from "../components/WhatsAppIcon";
import type { Product } from "../data/products";
import Picture from "../components/Picture";

type Props = { onBuy: (product: Product) => void };

const TICKER = [
  "Winter 2025 — 26",
  "Complimentary delivery across Pakistan",
  "Cash on delivery",
  "Size exchanges on us",
  "Order directly on WhatsApp",
];

export default function Home({ onBuy }: Props) {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newIn = products.filter((p) =>
    ["aria-cropped-puffer", "mora-ribbed-cardigan", "orson-merino-turtleneck"].includes(p.slug)
  );

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-stretch lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 pt-12 pb-10 sm:px-8 sm:pt-16 lg:py-20 lg:pr-14 lg:pl-8">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-8 bg-ink" />
              <p className="label">Winter collection · 2025 — 26</p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 text-[clamp(2.9rem,7.4vw,5.4rem)] leading-[0.94] font-medium tracking-[-0.045em]">
                The winter
                <br />
                wardrobe,
                <br />
                <span className="font-display font-normal italic tracking-[-0.02em]">
                  considered.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-7 max-w-sm text-[13.5px] leading-[1.75] text-smoke">
                Heavyweight knits, honest outerwear and quietly luxurious layers for
                men and women. Made for Pakistani winters — and made to last beyond
                them.
              </p>
            </Reveal>

            <Reveal delay={250} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/shop"
                className="group flex items-center gap-5 bg-ink px-6 py-4 text-paper transition-colors hover:bg-ink-soft"
              >
                <span className="label">Shop the collection</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
              <div className="flex divide-x divide-line border border-ink/20">
                <a
                  href="/shop?audience=women"
                  className="px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
                >
                  <span className="label">For her</span>
                </a>
                <a
                  href="/shop?audience=men"
                  className="px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
                >
                  <span className="label">For him</span>
                </a>
              </div>
            </Reveal>

            <Reveal
              delay={330}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 lg:mt-14"
            >
              {["Free nationwide delivery", "Cash on delivery", "7-day size exchange"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2 text-[10.5px] text-smoke">
                    <span className="h-1 w-1 rounded-full bg-ink/40" />
                    {item}
                  </span>
                )
              )}
            </Reveal>
          </div>

          <Reveal delay={120} className="relative min-h-[420px] lg:min-h-[640px]">
            <div className="grain relative h-full min-h-[420px] overflow-hidden bg-paper-deep lg:min-h-[640px]">
              <Picture
                src="/images/hero.jpg"
                alt="Flat lay of a black quilted puffer, ivory cable knit sweater, charcoal scarf and black leather gloves on an off-white backdrop"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 sm:p-7">
                <span className="label-sm bg-paper/90 px-3 py-2 backdrop-blur-sm">
                  The winter edit — 01
                </span>
                <span className="hidden bg-ink px-3 py-2 text-paper sm:block">
                  <span className="label-sm">Product only · Always</span>
                </span>
              </div>

              <a
                href="/product/north-down-puffer"
                className="group absolute inset-x-4 bottom-4 z-10 flex items-center gap-4 bg-paper/95 p-3 backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 sm:inset-x-7 sm:bottom-7 sm:max-w-[330px]"
              >
                <Picture
                  src="/images/puffer-black.jpg"
                  alt="North Down Puffer flat lay thumbnail"
                  className="h-16 w-14 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="label-sm text-smoke">As seen above</p>
                  <p className="mt-1.5 truncate text-[13px] font-medium">
                    North Down Puffer
                  </p>
                  <p className="mt-0.5 text-[11px] text-smoke">PKR 14,900</p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-ink bg-ink py-3.5 text-paper">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {TICKER.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center">
                  <span className="label-sm px-7 whitespace-nowrap opacity-80">{item}</span>
                  <span className="h-1 w-1 rounded-full bg-paper/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SHOP BY AUDIENCE */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <Reveal>
            <p className="label text-smoke">Winter collection</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.02] font-medium tracking-[-0.035em]">
              Two wardrobes,{" "}
              <span className="font-display font-normal italic">one standard.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <a
              href="/shop"
              className="link-underline inline-flex items-center gap-2 text-[12px] font-medium"
            >
              Browse all 08 pieces
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {[
            {
              label: "For her",
              title: "Softness, engineered",
              image: "/images/puffer-ivory.jpg",
              to: "/shop?audience=women",
              count: "04 pieces",
              alt: "Ivory cropped puffer jacket flat lay for women",
            },
            {
              label: "For him",
              title: "Layers with intent",
              image: "/images/overcoat-charcoal.jpg",
              to: "/shop?audience=men",
              count: "04 pieces",
              alt: "Charcoal wool overcoat flat lay for men",
            },
          ].map((tile, i) => (
            <Reveal key={tile.label} delay={i * 90}>
              <a
                href={tile.to}
                className="group relative block overflow-hidden bg-paper-deep"
              >
                <div className="aspect-[4/5] sm:aspect-[6/5] lg:aspect-[5/4] overflow-hidden">
                  <Picture
                    src={tile.image}
                    alt={tile.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper sm:p-6">
                  <div>
                    <p className="label-sm opacity-65">{tile.label} · {tile.count}</p>
                    <p className="font-display mt-2 text-[26px] leading-none sm:text-[30px]">
                      {tile.title}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-paper/40 transition-all duration-500 group-hover:bg-paper group-hover:text-ink">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Reveal>
              <p className="label text-smoke">Featured this season</p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.02] font-medium tracking-[-0.035em]">
                The pieces we{" "}
                <span className="font-display font-normal italic">reach for.</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <a
                href="/shop"
                className="group flex items-center gap-2 text-[12px] font-medium"
              >
                <span className="link-underline">View all pieces</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </Reveal>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-3.5 gap-y-8 sm:mt-12 sm:gap-x-5 lg:grid-cols-4">
            {featured.map((product, i) => (
              <div key={product.id} className="flex flex-col">
                <ProductCard product={product} index={i} />
                <button
                  type="button"
                  onClick={() => onBuy(product)}
                  className="mt-3 border border-line py-2.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  Buy now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-[1440px] gap-0 lg:grid-cols-2">
          <Reveal className="relative min-h-[340px] lg:min-h-[620px]">
            <Picture
              src="/images/folds.jpg"
              alt="Folded stack of black, charcoal and ivory winter knitwear and outerwear fabrics, photographed as a still life"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="label-sm absolute top-5 left-5 bg-paper/90 px-3 py-2 sm:top-7 sm:left-7">
              On materials
            </span>
          </Reveal>

          <div className="flex flex-col justify-center px-5 py-14 sm:px-10 sm:py-20 lg:px-16">
            <Reveal>
              <p className="label text-smoke">The VAYRON standard</p>
              <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                Built for the weather you{" "}
                <span className="font-display font-normal italic">actually have.</span>
              </h2>
              <p className="mt-5 max-w-md text-[13.5px] leading-[1.8] text-smoke">
                Not borrowed from a catalogue in another hemisphere. Every weight,
                finish and seam is chosen for the sharp, dry cold of a Pakistani winter
                — and for rooms that are warm by evening.
              </p>
            </Reveal>

            <div className="mt-9 grid grid-cols-3 gap-4 border-y border-line py-6 sm:mt-12 sm:gap-6 sm:py-8">
              {[
                { figure: "480", unit: "GSM", label: "Brushed fleece" },
                { figure: "700", unit: "fill", label: "Recycled down" },
                { figure: "18.5", unit: "μ", label: "Merino wool" },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <p className="text-[clamp(1.5rem,3vw,2.1rem)] leading-none font-medium tracking-[-0.04em]">
                    {stat.figure}
                    <span className="ml-1 text-[11px] font-normal tracking-normal text-smoke">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="mt-2 text-[10.5px] tracking-wide text-smoke">{stat.label}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120} className="mt-8">
              <a
                href="/story"
                className="group inline-flex items-center gap-4 border border-ink px-5 py-3.5 transition-colors hover:bg-ink hover:text-paper"
              >
                <span className="label">Read our story</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEW IN */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <p className="label text-smoke">The fuller wardrobe</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.02] font-medium tracking-[-0.035em]">
              More to{" "}
              <span className="font-display font-normal italic">consider.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <a href="/shop" className="link-underline text-[12px] font-medium">
              Shop the full edit
            </a>
          </Reveal>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-x-3.5 gap-y-8 sm:mt-12 sm:gap-x-5 lg:grid-cols-3">
          {newIn.slice(0, 3).map((product, i) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} index={i} />
              <button
                type="button"
                onClick={() => onBuy(product)}
                className="mt-3 border border-line py-2.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                Buy now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-line">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="label text-smoke">In their words</p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.02] font-medium tracking-[-0.035em]">
                Quietly{" "}
                <span className="font-display font-normal italic">well received.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-ink" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[11px] text-smoke">4.9 average · 681 reviews</p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-px bg-line sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} className="flex flex-col bg-paper p-6 sm:p-7">
                <span className="font-display text-4xl leading-none text-ink/25">“</span>
                <p className="mt-3 text-[13.5px] leading-[1.75] text-ink-soft">{t.quote}</p>
                <div className="mt-auto pt-6">
                  <p className="text-[12px] font-medium">{t.name}</p>
                  <p className="mt-1 text-[10.5px] tracking-wide text-smoke">
                    {t.city} · {t.piece}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <p className="label text-paper/45">Personal order desk</p>
            <h2 className="mt-4 max-w-xl text-[clamp(2rem,4vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.04em]">
              No carts. No accounts.
              <br />
              <span className="font-display font-normal italic text-paper/75">
                Just a conversation.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:justify-self-end">
            <p className="max-w-sm text-[13px] leading-[1.8] text-paper/60">
              Choose a piece, tell us your size and address, and press send. Your full
              order arrives with our team on WhatsApp — we confirm stock and delivery
              personally.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={generalChatLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 bg-paper px-5 py-4 text-ink transition-colors hover:bg-paper/85"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span className="label">Message the order desk</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href={`tel:+${BRAND.whatsappNumber}`}
                className="flex items-center justify-center border border-paper/25 px-5 py-4 text-[11px] tracking-[0.1em] transition-colors hover:bg-paper/10"
              >
                {BRAND.whatsappDisplay}
              </a>
            </div>
            <p className="mt-3 text-[10.5px] tracking-wide text-paper/40">{BRAND.hours}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
