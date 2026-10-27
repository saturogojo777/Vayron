import { ArrowUpRight } from "lucide-react";
import type { Product } from "../data/products";
import { formatPKR } from "../data/products";
import { cn } from "../utils/cn";
import Reveal from "./Reveal";
import Picture from "./Picture";

type Props = {
  product: Product;
  index?: number;
  compact?: boolean;
};
export default function ProductCard({ product, index = 0, compact = false }: Props) {
  return (
    <Reveal
      as="article"
      delay={(index % 4) * 70}
      className="group relative flex flex-col"
    >
      <a
        href={`/product/${product.slug}`}
        className="block focus-visible:outline-offset-4"
        aria-label={`${product.name} — ${formatPKR(product.price)}`}
      >
        <div
          className={cn(
            "relative overflow-hidden bg-paper-deep",
            compact ? "aspect-[4/5]" : "aspect-[4/5]"
          )}
        >
          <Picture
            src={product.images[0]}
            alt={`${product.name} — ${product.tagline}, flat lay product image`}
            loading={index < 2 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full scale-[1.005] object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <Picture
            src={product.images[1] ?? product.images[0]}
            alt={`${product.name} — fabric detail`}
            loading="lazy"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
          />

          {product.badge && (
            <span className="label-sm absolute top-3 left-3 z-10 bg-paper/95 px-2.5 py-2 tracking-[0.14em] backdrop-blur-sm">
              {product.badge}
            </span>
          )}

          <span className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 backdrop-blur-sm sm:hidden">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>

          <span className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-3 items-center justify-between bg-paper/95 px-4 py-3 opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <span className="label">View the piece</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </span>
        </div>

        <div className="flex items-start justify-between gap-3 pt-4 pb-1">
          <div className="min-w-0">
            <h3 className="text-[13.5px] leading-snug font-medium tracking-[0.01em] sm:truncate">
              {product.name}
            </h3>
            <p className="mt-1 text-[11px] tracking-wide text-smoke">{product.tagline}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[13px] font-medium">{formatPKR(product.price)}</p>
            {product.compareAt && (
              <p className="mt-0.5 text-[10px] text-smoke line-through">
                {formatPKR(product.compareAt)}
              </p>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-2.5 w-2.5 rounded-full border border-ink/15"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="ml-1 text-[10px] tracking-wide text-smoke">
            {product.sizes.join(" · ")}
          </span>
        </div>
      </a>
    </Reveal>
  );
}
