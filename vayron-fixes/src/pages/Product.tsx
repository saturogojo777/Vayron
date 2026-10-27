import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  Plus,
  RefreshCcw,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import type { Product as ProductType, Size } from "../data/products";
import { formatPKR, products } from "../data/products";
import { whatsappLink } from "../lib/whatsapp";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import SizeGuide from "../components/SizeGuide";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { cn } from "../utils/cn";
import Picture from "../components/Picture";

type Props = {
  product: ProductType;
  onBuy: (product: ProductType, size?: Size) => void;
};

const SIZES: Size[] = ["S", "M", "L", "XL"];

function DetailRow({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[12.5px] font-medium">
        {title}
        <Plus
          className="h-3.5 w-3.5 shrink-0 text-smoke transition-transform duration-300 group-open:rotate-45"
          strokeWidth={1.5}
        />
      </summary>
      <div className="pb-5 text-[12.5px] leading-[1.8] text-smoke">{children}</div>
    </details>
  );
}

export default function Product({ product, onBuy }: Props) {
  const [size, setSize] = useState<Size>("M");
  const [activeImage, setActiveImage] = useState(0);
  const [guideOpen, setGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    setSize("M");
    setActiveImage(0);
    setSizeError(false);
  }, [product.slug]);

  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  const enquiryLink = whatsappLink(
    `Assalam-o-Alaikum VAYRON, I'm interested in the ${product.name} (${formatPKR(
      product.price
    )}). Could you help me with sizing and availability?`
  );

  return (
    <main className="pb-20 sm:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 py-5 text-[10.5px] tracking-wide text-smoke"
        >
          <a href="/" className="transition-colors hover:text-ink">Home</a>
          <ChevronRight className="h-3 w-3 opacity-50" strokeWidth={1.5} />
          <a href="/shop" className="transition-colors hover:text-ink">Shop</a>
          <ChevronRight className="h-3 w-3 opacity-50" strokeWidth={1.5} />
          <a
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-ink"
          >
            {product.category}
          </a>
          <ChevronRight className="h-3 w-3 opacity-50" strokeWidth={1.5} />
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          {/* Gallery */}
          <div>
            <div className="flex gap-3">
              <div className="hidden w-[74px] shrink-0 flex-col gap-3 sm:flex">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={activeImage === i}
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden border transition-colors",
                      activeImage === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <Picture
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="relative flex-1 overflow-hidden bg-paper-deep">
                <div className="aspect-[4/5]">
                  <Picture
                    key={product.images[activeImage]}
                    src={product.images[activeImage]}
                    alt={`${product.name} — ${product.tagline}. Flat lay product photograph on an ivory background.`}
                    className="animate-fade h-full w-full object-cover"
                  />
                </div>
                {product.badge && (
                  <span className="label-sm absolute top-4 left-4 bg-paper px-3 py-2">
                    {product.badge}
                  </span>
                )}
                <span className="label-sm absolute right-4 bottom-4 hidden bg-paper/90 px-3 py-2 backdrop-blur-sm sm:block">
                  Product only · No models
                </span>
              </div>
            </div>

            <div className="mt-3 flex gap-3 sm:hidden">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                  className={cn(
                    "relative h-20 w-16 overflow-hidden border transition-colors",
                    activeImage === i ? "border-ink" : "border-transparent opacity-70"
                  )}
                >
                  <Picture src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-4 hidden items-center gap-6 border-t border-line pt-4 sm:flex">
              {[
                { icon: Truck, text: "Free delivery, nationwide" },
                { icon: RefreshCcw, text: "7-day size exchange" },
                { icon: ShieldCheck, text: "Quality checked" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-[10.5px] text-smoke">
                  <item.icon className="h-3.5 w-3.5" strokeWidth={1.4} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:self-start">
            <Reveal>
              <div className="flex items-center justify-between gap-4">
                <p className="label text-smoke">
                  {product.category} · {product.audience === "unisex" ? "Unisex" : product.audience}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 fill-ink" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-[10.5px] text-smoke">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>

              <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.02] font-medium tracking-[-0.04em]">
                {product.name}
              </h1>
              <p className="mt-2 text-[12px] tracking-wide text-smoke">{product.tagline}</p>

              <div className="mt-5 flex items-baseline gap-3">
                <p className="text-[20px] font-medium">{formatPKR(product.price)}</p>
                {product.compareAt && (
                  <>
                    <p className="text-[13px] text-smoke line-through">
                      {formatPKR(product.compareAt)}
                    </p>
                    <span className="label-sm bg-ink px-2 py-1.5 text-paper">
                      Save {formatPKR(product.compareAt - product.price)}
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-[10.5px] text-smoke">
                Inclusive of all taxes · Free nationwide shipping
              </p>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 max-w-md text-[13px] leading-[1.8] text-ink-soft">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span
                  className="h-5 w-5 rounded-full border border-ink/15"
                  style={{ backgroundColor: product.colors[0]?.hex }}
                />
                <p className="text-[11.5px] text-smoke">
                  Colour — <span className="text-ink">{product.colors[0]?.name}</span>
                </p>
                {product.colors.length > 1 && (
                  <span className="label-sm ml-1 border border-line px-2 py-1 text-smoke">
                    +{product.colors.length - 1} more
                  </span>
                )}
              </div>

              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <span className="label-sm">
                    Select size <span className="text-smoke">*</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuideOpen(true)}
                    className="flex items-center gap-1.5 text-[10.5px] underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    <Ruler className="h-3 w-3" strokeWidth={1.5} />
                    Size guide
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2" role="group" aria-label="Select size">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={!product.sizes.includes(s)}
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      aria-pressed={size === s}
                      className={cn(
                        "border py-3 text-[12px] font-medium transition-all",
                        size === s
                          ? "border-ink bg-ink text-paper"
                          : "border-line hover:border-ink",
                        !product.sizes.includes(s) && "cursor-not-allowed border-line/50 text-smoke/40"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-2 text-[11px] text-ink">Please select a size to continue.</p>
                )}
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (!size) {
                      setSizeError(true);
                      return;
                    }
                    onBuy(product, size);
                  }}
                  className="group flex w-full items-center justify-center gap-3 bg-ink px-6 py-4 text-paper transition-colors hover:bg-ink-soft"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  <span className="label">Buy now — order via WhatsApp</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>
                <a
                  href={enquiryLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 border border-line px-6 py-3.5 transition-colors hover:border-ink"
                >
                  <span className="label">Ask about this piece</span>
                </a>
              </div>
              <p className="mt-3 text-center text-[10.5px] leading-relaxed text-smoke">
                Cash on delivery · We confirm stock on WhatsApp before dispatch
              </p>

              <div className="mt-7 grid grid-cols-3 gap-px bg-line">
                {[
                  { icon: Truck, top: "2–4 days", bottom: "Nationwide" },
                  { icon: RefreshCcw, top: "Size exchange", bottom: "On us, once" },
                  { icon: ShieldCheck, top: "Order help", bottom: "Real people" },
                ].map((item) => (
                  <div key={item.top} className="flex flex-col items-center bg-paper px-2 py-4 text-center">
                    <item.icon className="h-4 w-4" strokeWidth={1.4} />
                    <p className="mt-2 text-[10.5px] font-medium">{item.top}</p>
                    <p className="mt-0.5 text-[9.5px] text-smoke">{item.bottom}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <DetailRow title="Details & fabric">
                  <p>{product.fabric}</p>
                  <ul className="mt-3 space-y-1.5">
                    {product.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </DetailRow>
                <DetailRow title="Fit & sizing">
                  <p>{product.fit}. Available in S, M, L and XL.</p>
                  <p className="mt-2">
                    Model-free product photography — for precise measurements, see our{" "}
                    <button
                      type="button"
                      onClick={() => setGuideOpen(true)}
                      className="underline underline-offset-2 hover:text-ink"
                    >
                      size guide
                    </button>{" "}
                    or message the order desk.
                  </p>
                </DetailRow>
                <DetailRow title="Care">
                  <ul className="space-y-1.5">
                    {product.care.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink/50" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </DetailRow>
                <DetailRow title="Delivery & exchanges">
                  <p>
                    Dispatched within 24 hours from Lahore. Delivery in 2–4 working days
                    is complimentary across Pakistan. Cash on delivery available.
                  </p>
                  <p className="mt-2">
                    Not the right fit? One free size exchange within 7 days, tags
                    attached. Message us with your order reference.
                  </p>
                </DetailRow>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Related */}
        <section className="mt-16 border-t border-line pt-12 sm:mt-24 sm:pt-16">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="label text-smoke">Continue the wardrobe</p>
              <h2 className="mt-2.5 text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                Wears well{" "}
                <span className="font-display font-normal italic">together.</span>
              </h2>
            </div>
            <a
              href="/shop"
              className="group flex items-center gap-2 text-[12px] font-medium"
            >
              <span className="link-underline">Shop all</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} compact />
            ))}
          </div>
          <a
            href="/shop"
            className="mt-10 flex items-center justify-center gap-2 border border-line py-3.5 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="label">Back to the collection</span>
          </a>
        </section>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] text-smoke">{product.name}</p>
            <p className="text-[13px] font-semibold">{formatPKR(product.price)}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {SIZES.filter((s) => product.sizes.includes(s)).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center border text-[10px] font-medium",
                  size === s ? "border-ink bg-ink text-paper" : "border-line"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onBuy(product, size)}
            className="flex shrink-0 items-center gap-1.5 bg-ink px-4 py-3 text-paper"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="label-sm">Buy now</span>
          </button>
        </div>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </main>
  );
}
