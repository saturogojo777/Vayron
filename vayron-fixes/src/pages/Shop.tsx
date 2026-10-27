import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import {
  categories,
  products,
  type Category,
  type Size,
  type Product,
} from "../data/products";
import { useRoute } from "../lib/router";
import { cn } from "../utils/cn";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";

type Props = { onBuy: (product: Product) => void };

type AudienceFilter = "all" | "women" | "men";
type Sort = "featured" | "price-asc" | "price-desc" | "newest";

const AUDIENCES: { label: string; value: AudienceFilter }[] = [
  { label: "All", value: "all" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
];

const SORTS: { label: string; value: Sort }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Newest first", value: "newest" },
];

export default function Shop({ onBuy }: Props) {
  const route = useRoute();
  const urlAudience = route.query.get("audience");
  const urlCategory = route.query.get("category");

  const [audience, setAudience] = useState<AudienceFilter>(
    urlAudience === "women" || urlAudience === "men" ? urlAudience : "all"
  );
  const [category, setCategory] = useState<"All" | Category>(
    categories.includes(urlCategory as Category) ? (urlCategory as Category) : "All"
  );
  const [sizes, setSizes] = useState<Size[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const a = route.query.get("audience");
    const c = route.query.get("category");
    setAudience(a === "women" || a === "men" ? a : "all");
    setCategory(categories.includes(c as Category) ? (c as Category) : "All");
  }, [route.hash]);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      const matchesAudience =
        audience === "all" || p.audience === audience || p.audience === "unisex";
      const matchesCategory = category === "All" || p.category === category;
      const matchesSize = sizes.length === 0 || sizes.some((s) => p.sizes.includes(s));
      return matchesAudience && matchesCategory && matchesSize;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "newest":
        return [...list].sort((a, b) => Number(!!b.badge) - Number(!!a.badge));
      default:
        return list;
    }
  }, [audience, category, sizes, sort]);

  const activeCount =
    (audience !== "all" ? 1 : 0) +
    (category !== "All" ? 1 : 0) +
    sizes.length +
    (sort !== "featured" ? 1 : 0) +
    (urlCategory || urlAudience ? 1 : 0);

  const reset = () => {
    setAudience("all");
    setCategory("All");
    setSizes([]);
    setSort("featured");
  };

  const toggleSize = (size: Size) =>
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const filterContent = (
    <div className="space-y-7">
      <div>
        <p className="label-sm mb-3 text-smoke">Shop for</p>
        <div className="flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => setAudience(a.value)}
              aria-pressed={audience === a.value}
              className={cn(
                "border px-4 py-2 text-[11.5px] font-medium transition-all",
                audience === a.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink"
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-sm mb-3 text-smoke">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "border px-4 py-2 text-[11.5px] font-medium transition-all",
                category === c
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-sm mb-3 text-smoke">Size</p>
        <div className="flex flex-wrap gap-2">
          {(["S", "M", "L", "XL"] as Size[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              aria-pressed={sizes.includes(s)}
              className={cn(
                "border px-4 py-2 text-[11.5px] font-medium transition-all",
                sizes.includes(s)
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-sm mb-3 text-smoke">Sort by</p>
        <div className="space-y-2">
          {SORTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSort(s.value)}
              className={cn(
                "flex w-full items-center justify-between border-b border-line pb-2 text-left text-[12px] transition-colors",
                sort === s.value ? "text-ink" : "text-smoke hover:text-ink"
              )}
            >
              {s.label}
              {sort === s.value && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
            </button>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 text-[11px] font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          <X className="h-3 w-3" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-8 sm:px-8 sm:pt-14 sm:pb-10">
          <div className="flex items-center gap-2 text-[10.5px] tracking-wide text-smoke">
            <a href="/" className="transition-colors hover:text-ink">Home</a>
            <span>/</span>
            <span className="text-ink">Shop</span>
            {audience !== "all" && (
              <>
                <span>/</span>
                <span className="text-ink capitalize">{audience}</span>
              </>
            )}
          </div>
          <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <Reveal>
              <h1 className="text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.045em]">
                The winter{" "}
                <span className="font-display font-normal italic">collection.</span>
              </h1>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-smoke">
                Eight considered pieces. Heavyweight hoodies, down-filled outerwear and
                fine wool knits — photographed flat, exactly as they arrive.
              </p>
            </Reveal>
            <Reveal delay={80} className="flex gap-8 border-t border-line pt-4 sm:border-0 sm:pt-0">
              <div>
                <p className="text-[22px] leading-none font-medium">08</p>
                <p className="label-sm mt-2 text-smoke">Pieces</p>
              </div>
              <div>
                <p className="text-[22px] leading-none font-medium">02</p>
                <p className="label-sm mt-2 text-smoke">Wardrobes</p>
              </div>
              <div>
                <p className="text-[22px] leading-none font-medium">S — XL</p>
                <p className="label-sm mt-2 text-smoke">Sizes</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10 xl:grid-cols-[240px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-[100px] border-t border-ink pt-5">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[13px] font-semibold">Filters</p>
                <span className="label-sm text-smoke">
                  {String(filtered.length).padStart(2, "0")} shown
                </span>
              </div>
              {filterContent}
            </div>
          </aside>

          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
                {AUDIENCES.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setAudience(a.value)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[11px] font-medium whitespace-nowrap transition-all",
                      audience === a.value
                        ? "bg-ink text-paper"
                        : "bg-paper-deep text-smoke hover:text-ink"
                    )}
                  >
                    {a.label}
                  </button>
                ))}
                <span className="mx-1 h-4 w-px bg-line" />
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[11px] font-medium whitespace-nowrap lg:hidden"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Filters {activeCount > 0 && `(${activeCount})`}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <p className="hidden text-[11px] text-smoke sm:block">
                  {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                </p>
                <div className="relative">
                  <select
                    aria-label="Sort products"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="appearance-none border border-line bg-paper py-2 pr-8 pl-3 text-[11px] font-medium transition-colors hover:border-ink focus:border-ink focus:outline-none"
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ArrowDown
                    className="pointer-events-none absolute top-1/2 right-2.5 h-3 w-3 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="mt-7 grid grid-cols-2 gap-x-3.5 gap-y-9 sm:gap-x-5 lg:grid-cols-3">
                {filtered.map((product, i) => (
                  <div key={product.id} className="flex flex-col">
                    <ProductCard product={product} index={i} compact />
                    <button
                      type="button"
                      onClick={() => onBuy(product)}
                      className="mt-3 flex items-center justify-center gap-1.5 border border-line py-2.5 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      Buy now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-7 flex min-h-[380px] flex-col items-center justify-center border border-dashed border-line px-6 text-center">
                <p className="font-display text-[30px]">Nothing in that combination.</p>
                <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-smoke">
                  Try widening your filters — or message the order desk and we&apos;ll
                  find the piece for you.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 bg-ink px-5 py-3 text-paper"
                >
                  <span className="label">Reset filters</span>
                </button>
              </div>
            )}

            <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
              <p className="text-[11px] text-smoke">
                Showing {filtered.length} of {products.length} pieces
              </p>
              <a
                href="/size-guide"
                className="flex items-center gap-2 text-[11px] font-medium"
              >
                <span className="link-underline">Not sure of your size? Read the guide</span>
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[85] lg:hidden",
          filtersOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!filtersOpen}
        inert={!filtersOpen}
      >
        <div
          onClick={() => setFiltersOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-300",
            filtersOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter products"
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            filtersOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="sticky top-0 flex items-center justify-between border-b border-line bg-paper px-5 py-4">
            <div>
              <p className="label text-smoke">Refine</p>
              <p className="mt-1 text-[15px] font-medium">Filter the collection</p>
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-5 py-6">{filterContent}</div>
          <div className="sticky bottom-0 border-t border-line bg-paper px-5 py-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="w-full bg-ink px-5 py-3.5 text-paper"
            >
              <span className="label">
                Show {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
