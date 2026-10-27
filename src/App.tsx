import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import OrderModal from "./components/OrderModal";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Story from "./pages/Story";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import SizeGuidePage from "./pages/SizeGuidePage";
import { getProduct, type Product as ProductType, type Size } from "./data/products";
import { useRoute } from "./lib/router";

type OrderState = {
  open: boolean;
  product: ProductType | null;
  size?: Size;
};

const TITLES: Record<string, string> = {
  "/": "VAYRON — Considered Winter Wear",
  "/shop": "The Winter Collection — VAYRON",
  "/story": "Our Story — VAYRON",
  "/policies": "Client Care — VAYRON",
  "/contact": "Contact the Order Desk — VAYRON",
  "/size-guide": "Size & Fit Guide — VAYRON",
};

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[62vh] max-w-[1440px] flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
      <p className="label text-smoke">404 — Off the rail</p>
      <p className="font-display mt-6 text-[clamp(5rem,14vw,10rem)] leading-[0.8] text-ink/15">
        V.
      </p>
      <h1 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.2rem)] leading-none">
        This piece has moved on.
      </h1>
      <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-smoke">
        The page you were looking for isn&apos;t here. The winter collection,
        however, very much is.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href="/shop"
          className="group flex items-center gap-4 bg-ink px-6 py-4 text-paper transition-colors hover:bg-ink-soft"
        >
          <span className="label">Shop the collection</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </a>
        <a
          href="/"
          className="flex items-center gap-2 border border-line px-5 py-4 transition-colors hover:border-ink"
        >
          <ArrowUpLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="label">Back home</span>
        </a>
      </div>
    </main>
  );
}

export default function App() {
  const route = useRoute();
  const [order, setOrder] = useState<OrderState>({ open: false, product: null });

  const openOrder = useCallback((product: ProductType, size?: Size) => {
    setOrder({ open: true, product, size });
  }, []);

  const closeOrder = useCallback(() => {
    setOrder((o) => ({ ...o, open: false }));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [route.path]);

  useEffect(() => {
    const productMatch = route.path.match(/^\/product\/(.+)$/);
    if (productMatch) {
      const product = getProduct(productMatch[1]);
      document.title = product ? `${product.name} — VAYRON` : "Piece not found — VAYRON";
      return;
    }
    document.title = TITLES[route.path] ?? "VAYRON — Considered Winter Wear";
  }, [route.path]);

  const renderPage = () => {
    if (route.path === "/") return <Home onBuy={openOrder} />;
    if (route.path === "/shop") return <Shop onBuy={openOrder} />;
    if (route.path === "/story") return <Story />;
    if (route.path === "/policies") return <Policies />;
    if (route.path === "/contact") return <Contact />;
    if (route.path === "/size-guide") return <SizeGuidePage />;

    const productMatch = route.path.match(/^\/product\/(.+)$/);
    if (productMatch) {
      const product = getProduct(productMatch[1]);
      if (product) return <Product product={product} onBuy={openOrder} />;
    }

    return <NotFound />;
  };

  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main-content"
        className="sr-only z-[120] focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <div id="main-content" key={route.path} className="animate-fade">
        {renderPage()}
      </div>
      <Footer />
      <WhatsAppFab />
      <OrderModal
        open={order.open}
        product={order.product}
        initialSize={order.size}
        onClose={closeOrder}
      />
    </div>
  );
}
