import type { ImgHTMLAttributes } from "react";

/**
 * Drop-in replacement for <img>. For .jpg/.jpeg/.png sources it renders
 * <picture> with AVIF and WebP <source>s (same path, different extension)
 * and the original file as the <img> fallback.
 *
 * `display: contents` makes the <picture> wrapper generate no box, so the
 * <img> lays out exactly as it did before (absolute / h-full / object-cover).
 */
export default function Picture({ src, ...imgProps }: ImgHTMLAttributes<HTMLImageElement>) {
  const match = typeof src === "string" ? src.match(/^(.*)\.(?:jpe?g|png)$/i) : null;

  if (!match) {
    return <img src={src} {...imgProps} />;
  }

  const base = match[1];
  return (
    <picture className="contents">
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img src={src} {...imgProps} />
    </picture>
  );
}
