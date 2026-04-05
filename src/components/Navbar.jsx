import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
// 🖼️ CHANGE LOGO HERE: Update the path inside the quotes.
import logo from "../assets/images/logo.webp";
import "../styles/Navbar.css";

export default function Navbar({
  scrolled,
  cartCount,
  isMenuOpen,
  setIsMenuOpen,
  onCartOpen,
  lang,
  shopName,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Products", path: "/home#products" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    if (path.includes("#")) {
        const [basePath, hash] = path.split("#");
        if (location.pathname !== basePath) {
            navigate(basePath);
        }
        setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
                const offset = 100;
                const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
            }
        }, 300);
    } else {
        navigate(path);
    }
  };

  const isHome = location.pathname === "/home";
  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div
            className="flex items-center cursor-pointer gap-3"
            onClick={() => handleNavigate("/home")}
          >
            <motion.img
              whileHover={{ rotate: 5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              src={logo}
              alt="Logo"
              className="h-12 md:h-16 w-auto object-contain drop-shadow-md transition-all duration-300"
            />
            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`text-lg md:text-3xl font-black tracking-tight leading-none whitespace-nowrap ${
                    lang === "ta"
                      ? "shopname-tamil text-[#1e3a8a]"
                      : "shopname-english text-[#dc2626]"
                  }`}
                >
                  {shopName}
                </motion.span>
              </AnimatePresence>
              <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.25em] drop-shadow-sm ${
                isTransparent ? "text-white/80" : "text-black"
              }`}>
                Smart Solutions
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive =
                item.path === "/home"
                  ? location.pathname === "/home" || location.pathname === "/"
                  : item.path.includes("#")
                  ? location.hash === `#${item.path.split("#")[1]}`
                  : location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.path)}
                  className={`text-sm font-bold uppercase tracking-widest relative group transition-colors hover:text-green-400 ${
                    isActive
                      ? "text-green-400"
                      : isTransparent
                      ? "text-white/90"
                      : "text-slate-800"
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 h-0.5 bg-green-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </button>
              )
            })}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartOpen}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold shadow-xl hover:bg-green-600 transition-all flex items-center gap-2 relative group"
            >
              <ShoppingCart
                size={20}
                strokeWidth={2.5}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="text-sm tracking-wide">CART</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </motion.button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={onCartOpen}
              className={`relative p-2 rounded-full transition-colors hover:bg-white/10 ${
                isTransparent ? "text-white" : "text-slate-900 hover:bg-slate-50"
              }`}
            >
              <ShoppingCart size={26} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-green-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-colors z-50 relative hover:bg-white/10 ${
                isTransparent ? "text-white" : "text-slate-900 hover:bg-slate-50"
              }`}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={28} strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={28} strokeWidth={2} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col min-h-screen overflow-y-auto"
          >
            <div className="flex items-center justify-end px-6 py-6 border-b border-slate-50">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#1b5e20] text-white p-2 rounded-md hover:bg-green-800 transition-colors shadow-lg"
              >
                <X size={28} strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col px-6 pt-6 gap-2">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full text-left py-5 border-b border-slate-100 flex items-center justify-between group active:scale-[0.99] transition-transform"
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-2xl font-bold text-slate-900 group-hover:text-green-700 transition-colors tracking-tight">
                      {item.name}
                    </span>
                    {item.name === "Products" && (
                      <span className="bg-[#1b5e20] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Season Deals
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={24}
                    className="text-slate-300 group-hover:text-green-700 transition-colors -rotate-90"
                  />
                </motion.button>
              ))}
            </div>

            <div className="flex-grow bg-slate-50/30 mt-8"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
