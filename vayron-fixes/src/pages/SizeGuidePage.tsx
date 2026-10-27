import { ArrowUpRight, Ruler } from "lucide-react";
import Reveal from "../components/Reveal";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { whatsappLink } from "../lib/whatsapp";

const rows = [
  ["S", "36–38", "30–32", "94–99", "76–81"],
  ["M", "38–40", "32–34", "99–104", "81–86"],
  ["L", "40–42", "34–36", "104–110", "86–92"],
  ["XL", "42–44", "36–38", "110–116", "92–98"],
];

const fitNotes = [
  {
    title: "Hoodies",
    body: "Atlas and Harrow are cut relaxed with a dropped shoulder. Take your usual size for the intended fit; size down for a closer one.",
  },
  {
    title: "Outerwear",
    body: "Kestrel is tailored through the chest. If you plan to layer a sweater beneath, take the larger of two sizes. North and Aria fit true.",
  },
  {
    title: "Knitwear",
    body: "Orson is deliberately slim and close. Elowen and Mora are relaxed. For a roomier knitwear fit, size up one.",
  },
];

export default function SizeGuidePage() {
  const sizingLink = whatsappLink(
    "Assalam-o-Alaikum VAYRON, could you help me choose a size? My chest is ___ inches and my height is ___."
  );

  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-10 sm:px-8 sm:pt-14 sm:pb-12">
        <div className="flex items-center gap-2 text-[10.5px] tracking-wide text-smoke">
          <a href="/" className="hover:text-ink">Home</a>
          <span>/</span>
          <span className="text-ink">Size & fit guide</span>
        </div>
        <Reveal className="mt-6">
          <p className="label text-smoke">Fit notes · All pieces</p>
          <h1 className="mt-4 text-[clamp(2.3rem,5.6vw,4.2rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            Find your <span className="font-display font-normal italic">size.</span>
          </h1>
          <p className="mt-4 max-w-lg text-[13px] leading-[1.8] text-smoke">
            Our pieces are cut slightly relaxed. Measure a garment you already love,
            flat, underarm to underarm, and compare it with the chest column below.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <div className="overflow-x-auto border border-line">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead className="bg-ink text-paper">
                  <tr>
                    {["Size", "Chest (in)", "Waist (in)", "Chest (cm)", "Waist (cm)"].map((h) => (
                      <th key={h} className="label-sm px-4 py-4 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row[0]} className="border-b border-line last:border-0">
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`px-4 py-4 text-[12.5px] ${i === 0 ? "font-semibold" : "text-smoke"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 flex items-start gap-2 text-[10.5px] leading-relaxed text-smoke">
              <Ruler className="mt-0.5 h-3 w-3 shrink-0" strokeWidth={1.5} />
              Measurements refer to the body, not the garment. Allow 1–2 inches of ease
              for a relaxed fit. Unisex pieces follow the men&apos;s chart.
            </p>

            <div className="mt-10">
              <h2 className="font-display text-[26px] leading-none">How to measure</h2>
              <div className="mt-5 grid gap-px bg-line sm:grid-cols-3">
                {[
                  { n: "01", title: "Chest", body: "Measure around the fullest part, keeping the tape level under the arms." },
                  { n: "02", title: "Waist", body: "Measure around your natural waistline, without pulling the tape tight." },
                  { n: "03", title: "Layering", body: "Add one size if you plan to wear a knit beneath an outerwear piece." },
                ].map((item) => (
                  <div key={item.n} className="bg-paper p-5">
                    <p className="font-display text-xl text-ink/25 italic">{item.n}</p>
                    <p className="mt-3 text-[12.5px] font-medium">{item.title}</p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-smoke">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="border border-line p-5 sm:p-7">
              <p className="label-sm text-smoke">Piece by piece</p>
              <div className="mt-4 space-y-5">
                {fitNotes.map((note) => (
                  <div key={note.title} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <h3 className="text-[13px] font-medium">{note.title}</h3>
                    <p className="mt-1.5 text-[11.5px] leading-[1.75] text-smoke">{note.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-ink p-5 text-paper sm:p-7">
              <p className="label text-paper/50">Personal fit advice</p>
              <p className="font-display mt-3 text-[26px] leading-[1.1]">
                Still between sizes?
              </p>
              <p className="mt-2.5 text-[12px] leading-relaxed text-paper/60">
                Send us your chest, height and the piece you have in mind. We&apos;ll
                tell you exactly which size to order — usually within the hour.
              </p>
              <a
                href={sizingLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-between gap-2 bg-paper px-4 py-3.5 text-ink transition-colors hover:bg-paper/85"
              >
                <span className="flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4" />
                  <span className="label">Ask for a size recommendation</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
