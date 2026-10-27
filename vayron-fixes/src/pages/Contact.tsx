import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, faqs } from "../data/products";
import { generalChatLink, whatsappLink } from "../lib/whatsapp";
import WhatsAppIcon from "../components/WhatsAppIcon";
import Reveal from "../components/Reveal";

const inputBase =
  "w-full border border-line bg-paper px-3.5 py-3 text-[13px] placeholder:text-smoke/60 transition-colors focus:border-ink focus:outline-none";

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) {
      setError("Please complete all three fields so we can help properly.");
      return;
    }
    setError("");
    const link = whatsappLink(
      `*VAYRON — enquiry*\nName: ${form.name.trim()}\nContact: ${form.contact.trim()}\n\n${form.message.trim()}`
    );
    setSent(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-10 sm:px-8 sm:pt-14 sm:pb-14">
        <div className="flex items-center gap-2 text-[10.5px] tracking-wide text-smoke">
          <a href="/" className="hover:text-ink">Home</a>
          <span>/</span>
          <span className="text-ink">Contact</span>
        </div>
        <Reveal className="mt-6">
          <p className="label text-smoke">The order desk</p>
          <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.045em]">
            We&apos;re a <span className="font-display font-normal italic">message away.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[13.5px] leading-[1.8] text-smoke">
            Sizing questions, order updates, fabric advice or a note about the
            collection — write to us and a member of the VAYRON team will reply,
            usually within the hour.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <p className="label text-smoke">Reach us directly</p>
            <div className="mt-5 space-y-1.5">
              <a
                href={generalChatLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-line py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-line">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="label-sm text-smoke">WhatsApp — fastest</p>
                    <p className="mt-1.5 text-[14px] font-medium">{BRAND.whatsappDisplay}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="group flex items-center justify-between gap-4 border-b border-line py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-line">
                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="label-sm text-smoke">Email</p>
                    <p className="mt-1.5 text-[14px] font-medium">{BRAND.email}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>

              <a
                href={`tel:+${BRAND.whatsappNumber}`}
                className="group flex items-center justify-between gap-4 border-b border-line py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center border border-line">
                    <Phone className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="label-sm text-smoke">Call</p>
                    <p className="mt-1.5 text-[14px] font-medium">{BRAND.whatsappDisplay}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>

              <div className="flex items-center gap-4 py-5">
                <span className="flex h-10 w-10 items-center justify-center border border-line">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="label-sm text-smoke">Studio</p>
                  <p className="mt-1.5 text-[14px] font-medium">{BRAND.city}</p>
                  <p className="mt-1 text-[11px] text-smoke">By appointment only</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-paper-deep p-5">
              <p className="label text-smoke">Order desk hours</p>
              <p className="mt-3 text-[13px]">{BRAND.hours}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-smoke">
                Messages received outside these hours are answered the next morning.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-line bg-paper p-5 sm:p-7">
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4" />
                <p className="label">Send a message</p>
              </div>
              <h2 className="font-display mt-3 text-[30px] leading-none">
                How can we help?
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-smoke">
                This form opens WhatsApp with your note prepared. Nothing is stored on
                this website.
              </p>

              <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="label-sm mb-2 block text-smoke">
                      Your name *
                    </label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-detail" className="label-sm mb-2 block text-smoke">
                      Phone or email *
                    </label>
                    <input
                      id="contact-detail"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="0300 1234567"
                      className={inputBase}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="label-sm mb-2 block text-smoke">
                    Your message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="I'd like help choosing between a medium and a large Atlas hoodie…"
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {error && <p className="text-[11px] text-ink">{error}</p>}

                {sent ? (
                  <div className="border border-ink p-4">
                    <p className="text-[12.5px] font-medium">WhatsApp should have opened.</p>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-smoke">
                      Press send in the chat to deliver your message. If the tab did not
                      open, use the link below.
                    </p>
                    <a
                      href={sent}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold underline underline-offset-4"
                    >
                      Open the conversation <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                    </a>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2.5 bg-ink px-5 py-4 text-paper transition-colors hover:bg-ink-soft"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span className="label">Send on WhatsApp</span>
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                )}
              </form>
            </div>
          </Reveal>
        </div>

        <section className="mt-16 border-t border-line pt-10 sm:mt-24 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="label text-smoke">Often asked</p>
              <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.05] font-medium tracking-[-0.03em]">
                Questions,{" "}
                <span className="font-display font-normal italic">answered.</span>
              </h2>
            </div>
            <div>
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-line first:border-t">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[12.5px] font-medium">
                    {faq.q}
                    <span className="relative mt-0.5 block h-3 w-3 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-3 bg-ink" />
                      <span className="absolute top-0 left-1/2 h-3 w-px bg-ink transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="pb-5 text-[12.5px] leading-[1.8] text-smoke">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
