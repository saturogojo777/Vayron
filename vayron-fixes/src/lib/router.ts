import { useEffect, useState } from "react";

export type Route = {
  path: string;
  query: URLSearchParams;
  /**
   * Path + query string (e.g. "/shop?audience=women").
   * Kept under the old name so existing `useEffect(..., [route.hash])`
   * dependencies keep re-running whenever the URL changes.
   */
  hash: string;
};

const NAV_EVENT = "vayron:navigate";

/** Old links looked like `/#/product/slug`. Rewrite them to clean URLs. */
function upgradeLegacyHashUrl() {
  if (typeof window === "undefined") return;
  const { hash } = window.location;
  if (hash.startsWith("#/")) {
    window.history.replaceState(null, "", hash.slice(1));
  }
}

/**
 * Static hosts without rewrite rules (GitHub Pages) serve public/404.html,
 * which stashes the requested URL and bounces to "/". Restore it here.
 */
function restoreRedirectedUrl() {
  if (typeof window === "undefined") return;
  try {
    const saved = window.sessionStorage.getItem("vayron:redirect");
    if (saved) {
      window.sessionStorage.removeItem("vayron:redirect");
      if (saved.startsWith("/") && !saved.startsWith("//")) {
        window.history.replaceState(null, "", saved);
      }
    }
  } catch {
    /* storage unavailable — ignore */
  }
}

function parseRoute(): Route {
  const { pathname, search } = window.location;
  let path = pathname.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  if (path === "/index.html" || path === "") path = "/";
  return {
    path,
    query: new URLSearchParams(search),
    hash: `${path}${search}`,
  };
}

export function navigate(to: string) {
  const next = to.startsWith("/") ? to : `/${to}`;
  const current = `${window.location.pathname}${window.location.search}`;
  if (next !== current) {
    window.history.pushState(null, "", next);
  }
  window.dispatchEvent(new Event(NAV_EVENT));
}

/**
 * Turns ordinary <a href="/shop"> clicks into client-side navigations, so the
 * markup keeps real, crawlable URLs while the app still behaves like an SPA.
 */
function handleLinkClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const anchor = (e.target as Element | null)?.closest?.("a");
  if (!anchor) return;
  if (anchor.target && anchor.target !== "_self") return;
  if (anchor.hasAttribute("download")) return;

  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("/") || href.startsWith("//")) return;

  e.preventDefault();
  navigate(href);
}

if (typeof window !== "undefined") {
  upgradeLegacyHashUrl();
  restoreRedirectedUrl();
  document.addEventListener("click", handleLinkClick);
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined"
      ? { path: "/", query: new URLSearchParams(), hash: "/" }
      : parseRoute()
  );

  useEffect(() => {
    const onChange = () => setRoute(parseRoute());
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAV_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAV_EVENT, onChange);
    };
  }, []);

  return route;
}
