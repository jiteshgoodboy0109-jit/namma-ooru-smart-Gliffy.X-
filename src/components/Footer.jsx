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
              <a href="#" className="w-10 h-10 rounded-full border border-white p-[1px] overflow-hidden hover:scale-110 transition-transform">
                <img src={iconIg} alt="Instagram" className="w-full h-full object-cover rounded-full" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white p-[1px] overflow-hidden hover:scale-110 transition-transform">
                <img src={iconFb} alt="Facebook" className="w-full h-full object-cover rounded-full" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white p-[1px] overflow-hidden hover:scale-110 transition-transform">
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

        {/* Bottom Banner */}
        <div className="border-t border-slate-800 pt-6 mt-8 flex flex-col justify-center items-center gap-2 text-center">
          <p className="text-slate-500 text-xs font-semibold tracking-wide">
            &copy; {new Date().getFullYear()} Copyright Reserved by Gliffy.X Studio.
          </p>
        </div>

      </div>
    </footer>
  );
}
