import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import logo from "../assets/images/logo.webp";
import iconIg from "../assets/images/icon_instagram.webp";
import iconFb from "../assets/images/icon_facebook.webp";
import iconWa from "../assets/images/icon_whatsapp.webp";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── CRAFTED BY STRIP ── */}
      <div className="bg-gradient-to-r from-[#060d1a] via-[#0a1628] to-[#060d1a] border-t border-slate-800/50 py-5 px-6">
        <a
          href="https://gliffy-x-studio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group cursor-pointer"
          title="Visit Gliffy.X Studio"
        >
          {/* Label */}
          <span className="text-slate-600 text-[10px] font-semibold tracking-[0.2em] uppercase group-hover:text-slate-400 transition-colors duration-300">
            Website Crafted &amp; Designed by
          </span>

          {/* Divider + Logo + Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-slate-600" />
            <img
              src="/logo 2.png"
              alt="Gliffy.X Studio"
              className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 group-hover:brightness-110 transition-all duration-300 drop-shadow-md"
            />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-700 to-slate-600" />
          </div>
        </a>
      </div>

      <footer className="bg-[#0f172a] text-white py-10 relative overflow-hidden font-sans border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-10">

            {/* Column 1: Logo & Tagline */}
            <div className="flex flex-col items-start lg:pr-4">
              <button onClick={() => handleNavigate("/home")} className="mb-4 flex items-center gap-3 hover:opacity-80 transition-opacity text-left">
                <img src={logo} alt="Namma Ooru Smart Solutions" className="w-[45px] sm:w-[55px] h-auto object-contain" />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-white whitespace-nowrap shopname-tamil">
                    நம்ம ஊரு
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-cyan-400">
                    Smart Solutions
                  </span>
                </div>
              </button>
              <p className="text-slate-400 text-[14px] font-medium max-w-[250px] leading-relaxed">
                Quality products. Reliable service. Every time.
              </p>
            </div>

            {/* Column 2: Explore More */}
            <div className="flex flex-col items-start lg:ml-12">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-100 border-b-2 border-slate-700 pb-1">
                Explore More
              </h3>
              <div className="flex flex-col gap-3 text-[14px] font-medium text-slate-400">
                <button onClick={() => handleNavigate("/home")} className="hover:text-cyan-400 transition-colors text-left">Home</button>
                <button onClick={() => handleNavigate("/home#products")} className="hover:text-cyan-400 transition-colors text-left">Products</button>
                <button onClick={() => handleNavigate("/services")} className="hover:text-cyan-400 transition-colors text-left">Services</button>
                <button onClick={() => handleNavigate("/contact")} className="hover:text-cyan-400 transition-colors text-left">Contact</button>
              </div>
            </div>

            {/* Column 3: Connect With Us */}
            <div className="flex flex-col items-start lg:ml-8">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-100 border-b-2 border-slate-700 pb-1">
                Connect With Us
              </h3>
              <div className="flex items-center gap-4">
                {/* Instagram — update href to real profile once confirmed */}
                <a
                  href="https://www.instagram.com/nammaooru.smart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white p-[1px] overflow-hidden hover:scale-110 transition-transform"
                  title="Follow us on Instagram"
                >
                  <img src={iconIg} alt="Instagram" className="w-full h-full object-cover rounded-full" />
                </a>
                {/* Facebook — update href to real page once confirmed */}
                <a
                  href="https://www.facebook.com/search/top?q=namma+ooru+smart+solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white p-[1px] overflow-hidden hover:scale-110 transition-transform"
                  title="Find us on Facebook"
                >
                  <img src={iconFb} alt="Facebook" className="w-full h-full object-cover rounded-full" />
                </a>
                {/* WhatsApp — verified real number */}
                <a
                  href="https://wa.me/918883785516?text=Hi%2C%20I%20found%20you%20on%20your%20website.%20I%20need%20more%20information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white p-[1px] overflow-hidden hover:scale-110 transition-transform"
                  title="Chat with us on WhatsApp"
                >
                  <img src={iconWa} alt="WhatsApp" className="w-full h-full object-cover rounded-full" />
                </a>
              </div>
            </div>

            {/* Column 4: Contact Us */}
            <div className="flex flex-col items-start">
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-slate-100 border-b-2 border-slate-700 pb-1">
                Contact Us
              </h3>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-slate-400">
                <div className="flex items-start gap-3 group">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  <p className="leading-relaxed">
                    No.6/1, Komarlingam Road, Amutharani<br />
                    Bus Stop, Udumalpet-642126.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 group">
                    <Phone size={16} className="shrink-0 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    <a href="tel:+918883785516" className="hover:text-cyan-400 transition-colors">+91 88837 85516</a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <Phone size={16} className="shrink-0 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    <a href="tel:+919791238009" className="hover:text-cyan-400 transition-colors">+91 97912 38009</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left — Copyright */}
            <p className="text-slate-500 text-[12px] font-medium tracking-wide text-center">
              &copy; {new Date().getFullYear()} Gliffy.X Studio. All rights reserved.
            </p>

          </div>

        </div>
      </footer>
    </>
  );
}
