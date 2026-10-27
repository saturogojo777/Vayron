import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

// Only the top-most open trap reacts, so stacked dialogs never fight.
const stack: HTMLElement[] = [];

type Options = {
  /** Move focus into the container when it opens. Default: true. */
  autoFocus?: boolean;
  /** Return focus to the previously focused element on close. Default: true. */
  restoreFocus?: boolean;
};

/**
 * Keeps keyboard focus inside the referenced container while `active` is true.
 * Attach the returned ref to the dialog element.
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(
  active: boolean,
  { autoFocus = true, restoreFocus = true }: Options = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    stack.push(container);
    const isTop = () => stack[stack.length - 1] === container;

    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) =>
          el.getAttribute("aria-hidden") !== "true" &&
          el.getClientRects().length > 0
      );

    if (autoFocus && !container.contains(document.activeElement)) {
      (getFocusable()[0] ?? container).focus({ preventScroll: true });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !isTop()) return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (!current || !container.contains(current)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus({ preventScroll: true });
      } else if (e.shiftKey && (current === first || current === container)) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    // Safety net: pointer/AT/browser-chrome focus that escapes is pulled back.
    const onFocusIn = (e: FocusEvent) => {
      if (!isTop()) return;
      if (e.target instanceof Node && !container.contains(e.target)) {
        (getFocusable()[0] ?? container).focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocusIn);
      const i = stack.lastIndexOf(container);
      if (i !== -1) stack.splice(i, 1);
      if (
        restoreFocus &&
        previouslyFocused &&
        document.contains(previouslyFocused)
      ) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, autoFocus, restoreFocus]);

  return ref;
}
