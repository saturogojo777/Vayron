import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import ProductCard from "../components/ProductCard";
import { products, BRAND } from "../data/products";
import { generalChatLink } from "../lib/whatsapp";
import WhatsAppIcon from "../components/WhatsAppIcon";
import Picture from "../components/Picture";

const VALUES = [
  {
    number: "01",
    title: "Material before marketing",
    body: "We start with the yarn, the fill and the hand-feel. If a fabric doesn't earn its place after washing, wearing and a full season, it doesn't make the collection.",
  },
  {
    number: "02",
    title: "Photographed honestly",
    body: "Every piece is shot as a flat lay or on a ghost form. No bodies, no borrowed styling, no retouching that flatters the garment more than reality does.",
  },
  {
    number: "03",
    title: "Made for this winter",
    body: "Weights and finishes are chosen for Pakistan: cold enough for a real coat, warm enough for a room with the heater on. Useful, not theatrical.",
  },
];

export default function Story() {
  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-5 pt-12 pb-10 sm:px-8 sm:pt-16 sm:pb-14">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-8 bg-ink" />
          <p className="label">Our story · Est. 2019</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6.2vw,4.8rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            A quieter way to dress for{" "}
            <span className="font-display font-normal italic">winter.</span>
          </h1>
        </Reveal>
        <div className="mt-8 grid gap-8 border-t border-line pt-7 sm:grid-cols-[1fr_1fr] sm:gap-16">
          <Reveal delay={140}>
            <p className="max-w-lg text-[13.5px] leading-[1.85] text-smoke">
              VAYRON began with a simple frustration: winter clothing in Pakistan was
              either too thin to be useful or too loud to keep. We set out to make the
              unremarkable things remarkably well — a hoodie that holds its shape, a
              coat that lasts a decade, a knit that feels like an heirloom.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-lg text-[13.5px] leading-[1.85] text-smoke">
              Everything is designed in Lahore and produced in small, considered runs.
              We sell directly, through conversation rather than carts, so you can ask
              about the wool before you commit to it. The result is a wardrobe with less
              in it, worn far more often.
            </p>
          </Reveal>
        </div>
      </section>

      <Reveal className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="relative overflow-hidden bg-paper-deep">
          <div className="aspect-[16/10] sm:aspect-[21/8]">
            <Picture
              src="/images/folds.jpg"
              alt="Considered stack of winter fabrics in black, charcoal and ivory"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-6 text-paper sm:p-10">
            <p className="label-sm opacity-70">The house</p>
            <p className="font-display mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1]">
              “If it isn&apos;t warm enough to live in, it isn&apos;t in the
              collection.”
            </p>
          </div>
        </div>
      </Reveal>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-px bg-line lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <Reveal key={value.number} delay={i * 90} className="flex flex-col bg-paper p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="font-display text-[28px] text-ink/25 italic">{value.number}</p>
                <span className="h-px w-10 bg-line" />
              </div>
              <h2 className="mt-8 text-[17px] font-medium tracking-[-0.01em]">{value.title}</h2>
              <p className="mt-3 text-[12.5px] leading-[1.8] text-smoke">{value.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-y border-line py-8 sm:grid-cols-3 sm:gap-10">
          {[
            { figure: "2019", label: "Founded in Lahore" },
            { figure: "100%", label: "Product-only photography" },
            { figure: "08", label: "Pieces, chosen carefully" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <p className="text-[clamp(1.8rem,4vw,2.6rem)] leading-none font-medium tracking-[-0.04em]">
                {stat.figure}
              </p>
              <p className="mt-2 text-[10.5px] tracking-wide text-smoke">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="label text-paper/45">Our promise</p>
            <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] font-medium tracking-[-0.035em]">
              If you&apos;re not sure,
              <br />
              <span className="font-display font-normal italic text-paper/75">
                ask us first.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[13px] leading-[1.85] text-paper/60">
              Sizing, warmth, fabric behaviour in humidity — our order desk is made of
              actual people who wear the collection. A conversation is always better
              than a guess.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={generalChatLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 bg-paper px-5 py-3.5 text-ink transition-colors hover:bg-paper/85"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span className="label">Talk to the order desk</span>
              </a>
              <a
                href="/shop"
                className="group flex items-center gap-2 border border-paper/25 px-5 py-3.5 transition-colors hover:bg-paper/10"
              >
                <span className="label">Shop the collection</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
              </a>
            </div>
            <p className="mt-4 text-[10.5px] text-paper/40">
              {BRAND.whatsappDisplay} · {BRAND.hours}
            </p>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((p, i) => (
              <a
                key={p.id}
                href={`/product/${p.slug}`}
                className={`group relative block overflow-hidden bg-paper/5 ${i % 2 === 1 ? "translate-y-5" : ""}`}
              >
                <div className="aspect-[4/5]">
                  <Picture
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 bg-ink/80 px-3 py-2.5 backdrop-blur-sm">
                  <p className="truncate text-[10.5px]">{p.name}</p>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-paper/60" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex items-end justify-between">
          <Reveal>
            <p className="label text-smoke">Start here</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.7rem)] leading-[1.03] font-medium tracking-[-0.035em]">
              The pieces that{" "}
              <span className="font-display font-normal italic">define us.</span>
            </h2>
          </Reveal>
          <a href="/shop" className="link-underline hidden text-[12px] font-medium sm:block">
            Shop all
          </a>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {products.filter((p) => p.featured).slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
