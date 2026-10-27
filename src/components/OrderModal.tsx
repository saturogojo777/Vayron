import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Lock, Minus, Plus, Truck, X } from "lucide-react";
import type { Product, Size } from "../data/products";
import { BRAND, formatPKR } from "../data/products";
import { buildOrderMessage, whatsappLink } from "../lib/whatsapp";
import { cn } from "../utils/cn";
import WhatsAppIcon from "./WhatsAppIcon";
import { useFocusTrap } from "../hooks/useFocusTrap";
import Picture from "./Picture";

type Props = {
  product: Product | null;
  initialSize?: Size;
  open: boolean;
  onClose: () => void;
};

type FormState = {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  size: Size;
  quantity: number;
};

const emptyForm = (size: Size): FormState => ({
  name: "",
  phone: "",
  city: "",
  address: "",
  notes: "",
  size,
  quantity: 1,
});

// ---- Phone input mask -------------------------------------------------------
// Display only: "0300 1234567", "300 1234567", "+92 300 1234567",
// "92 300 1234567" or "0092 300 1234567". Separators are spaces, which the
// submit-time validation already strips before testing the Pakistani regex.
const sigOf = (s: string) => s.replace(/[^\d+]/g, "");

function formatPkPhone(raw: string): string {
  const plus = raw.trimStart().startsWith("+");
  let digits = raw.replace(/\D/g, "");
  const split = (body: string, first: number) =>
    body.length > first ? `${body.slice(0, first)} ${body.slice(first)}` : body;

  if (plus) {
    if (digits.length < 2 || !digits.startsWith("92")) return `+${digits.slice(0, 15)}`;
    const body = digits.slice(2, 12);
    return body ? `+92 ${split(body, 3)}` : "+92";
  }
  if (digits.startsWith("0092") && digits.length > 4) {
    return `0092 ${split(digits.slice(4, 14), 3)}`;
  }
  if (digits.startsWith("92") && digits.length > 2) {
    return `92 ${split(digits.slice(2, 12), 3)}`;
  }
  if (digits.startsWith("0")) {
    digits = digits.slice(0, 11);
    return split(digits, 4);
  }
  digits = digits.slice(0, 10);
  return split(digits, 3);
}

/** Caret index just after the n-th meaningful (digit or +) character. */
function caretAfter(formatted: string, n: number) {
  if (n <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/[\d+]/.test(formatted[i]) && ++seen === n) return i + 1;
  }
  return formatted.length;
}

const inputBase =
  "w-full border border-line bg-paper px-3.5 py-3 text-[13px] text-ink placeholder:text-smoke/60 transition-colors focus:border-ink focus:outline-none";

export default function OrderModal({ product, initialSize = "M", open, onClose }: Props) {
  const [form, setForm] = useState<FormState>(() => emptyForm(initialSize));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sentLink, setSentLink] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const phoneCaret = useRef<number | null>(null);
  // The modal focuses the name field itself, so the trap only needs to contain Tab.
  const dialogRef = useFocusTrap<HTMLDivElement>(open && !!product, { autoFocus: false });

  useEffect(() => {
    if (open && product) {
      setForm(emptyForm(initialSize));
      setErrors({});
      setSentLink(null);
      const t = window.setTimeout(() => nameRef.current?.focus(), 280);
      return () => window.clearTimeout(t);
    }
  }, [open, product, initialSize]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useLayoutEffect(() => {
    if (phoneCaret.current !== null && phoneRef.current) {
      phoneRef.current.setSelectionRange(phoneCaret.current, phoneCaret.current);
      phoneCaret.current = null;
    }
  }, [form.phone]);

  if (!open || !product) return null;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;
    let sigBefore = sigOf(raw.slice(0, caret)).length;

    // Backspace/delete that only removed a space: remove the digit beside it
    // instead, so the cursor never feels "stuck" on an auto-inserted separator.
    if (raw.length < form.phone.length && sigOf(raw) === sigOf(form.phone) && sigBefore > 0) {
      const sig = sigOf(raw);
      raw = sig.slice(0, sigBefore - 1) + sig.slice(sigBefore);
      sigBefore -= 1;
    }

    const formatted = formatPkPhone(raw);
    phoneCaret.current = caretAfter(formatted, sigBefore);
    update("phone", formatted);
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^(?:\+92|0092|92|0)?3\d{9}$/.test(form.phone.replace(/[\s()-]/g, "")))
      next.phone = "Enter a valid Pakistani mobile number, e.g. 0300 1234567.";
    if (form.city.trim().length < 2) next.city = "Please enter your city.";
    if (form.address.trim().length < 12)
      next.address = "Please include a complete delivery address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const link = whatsappLink(
      buildOrderMessage(product, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        notes: form.notes,
        size: form.size,
        quantity: form.quantity,
      })
    );

    setSentLink(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const total = product.price * form.quantity;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 animate-fade bg-ink/60 backdrop-blur-[4px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Order ${product.name} via WhatsApp`}
        className="animate-rise relative max-h-[94dvh] w-full overflow-y-auto bg-paper shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:max-h-[92vh] sm:max-w-4xl"
      >
        <div className="grid lg:grid-cols-[0.82fr_1fr]">
          {/* Order summary */}
          <aside className="relative hidden flex-col bg-ink p-7 text-paper lg:flex">
            <div className="flex items-center justify-between">
              <p className="label text-paper/50">Your reservation</p>
              <Lock className="h-3.5 w-3.5 text-paper/40" strokeWidth={1.5} />
            </div>

            <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-paper/10">
              <Picture
                src={product.images[0]}
                alt={`${product.name} flat lay`}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span className="label-sm absolute top-2.5 left-2.5 bg-paper px-2 py-1.5 text-ink">
                  {product.badge}
                </span>
              )}
            </div>

            <h3 className="mt-5 text-[17px] font-medium">{product.name}</h3>
            <p className="mt-1 text-[11.5px] text-paper/50">{product.tagline}</p>

            <dl className="mt-5 space-y-2.5 border-t border-paper/15 pt-4 text-[12px]">
              <div className="flex justify-between">
                <dt className="text-paper/50">Selected size</dt>
                <dd>{form.size}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-paper/50">Colour</dt>
                <dd>{product.colors[0]?.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-paper/50">Quantity</dt>
                <dd>{form.quantity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-paper/50">Delivery</dt>
                <dd>Complimentary</dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-paper/15 pt-3 text-[14px]">
                <dt>Order total</dt>
                <dd className="font-semibold">{formatPKR(total)}</dd>
              </div>
            </dl>

            <div className="mt-auto space-y-2 pt-7 text-[11px] leading-relaxed text-paper/45">
              <p className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" strokeWidth={1.5} /> Dispatched within 24
                hours, nationwide.
              </p>
              <p>Cash on delivery or bank transfer, confirmed over WhatsApp.</p>
            </div>
          </aside>

          {/* Form */}
          <section className="relative p-5 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close order form"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:bg-paper-deep"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            {sentLink ? (
              <div className="flex min-h-[420px] flex-col justify-center py-8 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
                  <Check className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h2 className="font-display mt-6 text-[34px] leading-[1.05]">
                  Your order is drafted.
                </h2>
                <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-smoke">
                  WhatsApp should have opened with your complete order for{" "}
                  <span className="text-ink">{product.name}</span>. Press{" "}
                  <span className="text-ink">send</span> in the chat to confirm — our
                  team will reply with availability and delivery timing.
                </p>
                <a
                  href={sentLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 flex w-full items-center justify-center gap-2.5 bg-ink px-5 py-4 text-paper transition-colors hover:bg-ink-soft"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span className="label">Open WhatsApp again</span>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full border border-line px-5 py-3.5 transition-colors hover:border-ink"
                >
                  <span className="label">Continue browsing</span>
                </button>
                <p className="mt-5 text-[11px] text-smoke">
                  If the window did not open, check your pop-up settings or message us
                  directly at {BRAND.whatsappDisplay}.
                </p>
              </div>
            ) : (
              <>
                <p className="label text-smoke">Order via WhatsApp</p>
                <h2 className="font-display mt-2 text-[32px] leading-[1.05] pr-10 sm:text-[38px]">
                  Reserve your piece.
                </h2>
                <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-smoke">
                  No account, no cart. Share your details and we&apos;ll open WhatsApp
                  with the full order written for you.
                </p>

                {/* Mobile product strip */}
                <div className="mt-4 flex items-center gap-3 border-y border-line py-3 lg:hidden">
                  <Picture
                    src={product.images[0]}
                    alt={`${product.name} flat lay`}
                    className="h-16 w-14 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{product.name}</p>
                    <p className="mt-0.5 text-[11px] text-smoke">
                      {formatPKR(product.price)} · {product.tagline}
                    </p>
                  </div>
                  <span className="label-sm shrink-0 bg-ink px-2.5 py-2 text-paper">
                    {form.size}
                  </span>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-name" className="label-sm mb-2 block text-smoke">
                        Full name *
                      </label>
                      <input
                        ref={nameRef}
                        id="order-name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        placeholder="Zara Ahmed"
                        className={cn(inputBase, errors.name && "border-ink ring-1 ring-ink")}
                      />
                      {errors.name && (
                        <p id="err-name" className="mt-1.5 text-[11px] text-ink">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="order-phone" className="label-sm mb-2 block text-smoke">
                        Phone number *
                      </label>
                      <input
                        ref={phoneRef}
                        id="order-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "err-phone" : undefined}
                        placeholder="0300 1234567"
                        className={cn(inputBase, errors.phone && "border-ink ring-1 ring-ink")}
                      />
                      {errors.phone && (
                        <p id="err-phone" className="mt-1.5 text-[11px] text-ink">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="order-city" className="label-sm mb-2 block text-smoke">
                      City *
                    </label>
                    <input
                      id="order-city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "err-city" : undefined}
                      placeholder="Lahore"
                      className={cn(inputBase, errors.city && "border-ink ring-1 ring-ink")}
                    />
                    {errors.city && (
                      <p id="err-city" className="mt-1.5 text-[11px] text-ink">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-address" className="label-sm mb-2 block text-smoke">
                      Complete delivery address *
                    </label>
                    <textarea
                      id="order-address"
                      rows={2}
                      autoComplete="street-address"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? "err-address" : undefined}
                      placeholder="House / flat, street, area, landmark, postal code"
                      className={cn(
                        inputBase,
                        "resize-none",
                        errors.address && "border-ink ring-1 ring-ink"
                      )}
                    />
                    {errors.address && (
                      <p id="err-address" className="mt-1.5 text-[11px] text-ink">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="label-sm mb-2 block text-smoke">Select size *</span>
                    <div className="grid grid-cols-4 gap-2" role="group" aria-label="Size">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => update("size", size)}
                          aria-pressed={form.size === size}
                          className={cn(
                            "border py-2.5 text-[12px] font-medium transition-all",
                            form.size === size
                              ? "border-ink bg-ink text-paper"
                              : "border-line hover:border-ink"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end gap-3">
                    <div>
                      <span className="label-sm mb-2 block text-smoke">Quantity</span>
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => update("quantity", Math.max(1, form.quantity - 1))}
                          aria-label="Decrease quantity"
                          className="flex h-10 w-9 items-center justify-center transition-colors hover:bg-paper-deep"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-[13px]">{form.quantity}</span>
                        <button
                          type="button"
                          onClick={() => update("quantity", Math.min(5, form.quantity + 1))}
                          aria-label="Increase quantity"
                          className="flex h-10 w-9 items-center justify-center transition-colors hover:bg-paper-deep"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label htmlFor="order-notes" className="label-sm mb-2 block text-smoke">
                        Notes <span className="normal-case tracking-normal text-smoke/60">(optional)</span>
                      </label>
                      <input
                        id="order-notes"
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Colour, delivery preference…"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="border-t border-line pt-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="label-sm text-smoke">Total payable</p>
                        <p className="mt-1 text-[11px] text-smoke">Delivery included</p>
                      </div>
                      <p className="text-lg font-semibold">{formatPKR(total)}</p>
                    </div>

                    <button
                      type="submit"
                      className="group mt-4 flex w-full items-center justify-center gap-2.5 bg-ink px-5 py-4 text-paper transition-colors hover:bg-ink-soft"
                    >
                      <WhatsAppIcon className="h-[18px] w-[18px]" />
                      <span className="label">Send order on WhatsApp</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </button>
                    <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center text-[10.5px] text-smoke">
                      <Lock className="h-3 w-3" strokeWidth={1.5} />
                      Your details are only shared with the VAYRON order desk.
                    </p>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
