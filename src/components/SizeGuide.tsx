import { X } from "lucide-react";
import { useEffect } from "react";
import { generalChatLink } from "../lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";
import { useFocusTrap } from "../hooks/useFocusTrap";

const rows = [
  ["S", "36–38", "30–32", "94–99", "76–81"],
  ["M", "38–40", "32–34", "99–104", "81–86"],
  ["L", "40–42", "34–36", "104–110", "86–92"],
  ["XL", "42–44", "36–38", "110–116", "92–98"],
];

type Props = { open: boolean; onClose: () => void };

export default function SizeGuide({ open, onClose }: Props) {
  const dialogRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 animate-fade bg-ink/50 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Size and fit guide"
        className="animate-rise relative max-h-[92vh] w-full max-w-lg overflow-y-auto bg-paper p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label text-smoke">Fit notes</p>
            <h2 className="font-display mt-2 text-[32px] leading-none">
              Size & fit guide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:bg-paper-deep"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-smoke">
          Measurements are in inches unless noted. Our pieces are cut slightly relaxed
          — if you sit between sizes and prefer a closer fit, take the smaller size.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-y border-line">
                {["Size", "Chest (in)", "Waist (in)", "Chest (cm)", "Waist (cm)"].map((h) => (
                  <th key={h} className="label-sm py-3 pr-3 font-semibold text-smoke">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-line/70">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`py-3 pr-3 text-[12.5px] ${i === 0 ? "font-semibold" : "text-smoke"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-paper-deep p-4">
          <p className="text-[12.5px] leading-relaxed text-ink-soft">
            Between sizes, or unsure? Send us your chest and height on WhatsApp and
            we&apos;ll tell you exactly which size to take — usually within the hour.
          </p>
          <a
            href={generalChatLink}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Ask the VAYRON team
          </a>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-ink px-6 py-3.5 text-paper transition-colors hover:bg-ink-soft"
        >
          <span className="label">Back to the piece</span>
        </button>
      </div>
    </div>
  );
}
