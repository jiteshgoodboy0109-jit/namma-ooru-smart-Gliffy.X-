import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Home as HomeIcon,
  Package,
  Wrench,
  PhoneCall,
  Megaphone
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", path: "/home", icon: <HomeIcon size={22} className="text-slate-500 group-hover:text-[#1b5e20] transition-colors" /> },
    { name: "Products", path: "/home#products", icon: <Package size={22} className="text-slate-500 group-hover:text-[#1b5e20] transition-colors" /> },
    { name: "Services", path: "/services", icon: <Wrench size={22} className="text-slate-500 group-hover:text-[#1b5e20] transition-colors" /> },
    { name: "Contact", path: "/contact", icon: <PhoneCall size={22} className="text-slate-500 group-hover:text-[#1b5e20] transition-colors" /> },
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
  const isServices = location.pathname === "/services";
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isTransparent
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
                    className={`text-lg md:text-3xl font-black tracking-tight leading-none whitespace-nowrap ${lang === "ta"
                        ? "shopname-tamil text-[#1e3a8a]"
                        : "shopname-english text-[#dc2626]"
                      }`}
                  >
                    {shopName}
                  </motion.span>
                </AnimatePresence>
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.25em] drop-shadow-sm ${isTransparent ? "text-white/80" : "text-black"
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
                    className={`text-sm font-bold uppercase tracking-widest relative group transition-colors hover:text-green-400 ${isActive
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
            <div className="flex items-center gap-4">
              <button
                onClick={onCartOpen}
                className={`relative p-2 rounded-full transition-colors hover:bg-white/10 ${isTransparent ? "text-white" : "text-slate-900 hover:bg-slate-50"
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
                className={`p-2 rounded-full transition-colors z-50 relative hover:bg-white/10 ${isTransparent ? "text-white" : "text-slate-900 hover:bg-slate-50"
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
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[90]"
            />

            {/* Side Drawer from Left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[85vw] max-w-[340px] bg-white z-[100] flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Top Header */}
              <div className="px-6 py-6 flex flex-col items-start text-white border-b border-[#172554] bg-[#1e3a8a] shrink-0 shadow-sm">
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-[20px] tracking-tight truncate pr-4">Shop By Category</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-1.5 hover:bg-[#172554] rounded-full transition-colors flex-shrink-0">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* List Items */}
              <div className="flex flex-col flex-grow py-2 pb-10">
                {navItems.map((item, idx) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors group text-left active:bg-slate-100"
                  >
                    <div className="mr-5 shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <span className="text-[15px] font-bold text-slate-800 group-hover:text-[#1e3a8a] transition-colors truncate">
                        {item.name}
                      </span>
                      {item.name === "Products" && (
                        <span className="text-[10px] text-red-600 font-extrabold mt-0.5 tracking-widest">
                          Special Deals
                        </span>
                      )}
                    </div>
                    <ChevronRight size={20} strokeWidth={2.5} className="text-slate-300 group-hover:text-[#1e3a8a] transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
