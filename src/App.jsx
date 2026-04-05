import { useEffect, useState, lazy, Suspense, useCallback, useRef } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { useLoading } from "./context/LoadingContext.jsx";
import { useToast } from "./context/ToastContext";
import { useCart } from "./context/CartContext";

const Bill = lazy(() => import("./pages/Bill.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

// Scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Triggers loading screen on every route change
function RouteChangeLoader() {
  const { pathname } = useLocation();
  const { triggerLoader } = useLoading();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip on very first mount — initial load handled separately
    if (isFirst.current) { isFirst.current = false; return; }
    triggerLoader(800); // fast for route changes
  }, [pathname, triggerLoader]);

  return null;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [isCartOpen, setIsCartOpen]   = useState(false);
  const [showBillPage, setShowBillPage] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [lang, setLang]               = useState("en");
  const [shopName, setShopName]       = useState("NAMMA OORU");

  const navigate = useNavigate();
  const { addToast } = useToast();
  const { cart, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();
  const { loading, triggerLoader } = useLoading();

  // ── Scroll shadow for Navbar ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Bilingual shop name toggle ──
  useEffect(() => {
    const interval = setInterval(
      () => setLang((p) => (p === "en" ? "ta" : "en")),
      2000,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setShopName(lang === "en" ? "NAMMA OORU" : "நம்ம ஊரு");
  }, [lang]);

  // ── Initial page load — show loader once per session ──
  useEffect(() => {
    if (!sessionStorage.getItem("loaderSeen")) {
    triggerLoader(2000); // 2s for first load
      sessionStorage.setItem("loaderSeen", "1");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheckout = useCallback(
    (info) => {
      setCustomerInfo(info);
      setShowBillPage(true);
      addToast("Proceeding to invoice...", "success");
    },
    [addToast],
  );

  const handleBackHome = useCallback(() => {
    setShowBillPage(false);
    clearCart();
    setCustomerInfo(null);
    navigate("/");
  }, [clearCart, navigate]);

  if (showBillPage && cart.length > 0) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Bill
          cartItems={cart}
          customerInfo={customerInfo}
          onCheckoutComplete={handleCheckout}
          onBackHome={handleBackHome}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-slate-900 flex flex-col">
      {/* Global loading overlay */}
      <LoadingScreen visible={loading} />

      <ScrollToTop />
      <RouteChangeLoader />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <Navbar
        scrolled={scrolled}
        cartCount={cart.length}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onCartOpen={() => setIsCartOpen(true)}
        lang={lang}
        shopName={shopName}
      />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<Suspense fallback={<div className="h-screen" />}><ServicesPage /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<div className="h-screen" />}><ContactPage /></Suspense>} />
        </Routes>
      </div>

      <WhatsAppFloat count={cart.length} onClick={() => setIsCartOpen(true)} />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
