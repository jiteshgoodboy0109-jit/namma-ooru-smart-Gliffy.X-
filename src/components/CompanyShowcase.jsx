import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Battery, 
  ShieldCheck, 
  Home, 
  Wind, 
  ChevronRight,
  Droplets,
  Thermometer
} from "lucide-react";

// Import AI-generated showcase images
import showcaseSolar from "../assets/images/showcase_solar.webp";
import showcaseUps from "../assets/images/showcase_ups.webp";
import showcaseWater from "../assets/images/showcase_water.webp";
import showcaseHeater from "../assets/images/showcase_heater.webp";
import showcaseCctv from "../assets/images/showcase_cctv.webp";
import showcaseVacuum from "../assets/images/showcase_vacuum.webp";

const SLIDES = [
  {
    id: "01",
    title: "SOLAR POWER SOLUTIONS",
    headline: "PREMIUM PHOTOVOLTAIC SOLAR PANELS",
    icon: <Sun className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseSolar,
    desc: "INDIA'S LEADING ROOFTOP SOLAR INFRASTRUCTURE"
  },
  {
    id: "02",
    title: "ENERGY STORAGE",
    headline: "HIGH-CAPACITY UPS & BATTERY SYSTEMS",
    icon: <Battery className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseUps,
    desc: "#1 DEPENDABLE POWER BACKUPS"
  },
  {
    id: "03",
    title: "WATER RESOURCES",
    headline: "PURE AQUA SOLUTIONS | AQUA GUARD",
    icon: <Droplets className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseWater,
    desc: "PURE & SAFE DRINKING WATER FILTRATION"
  },
  {
    id: "04",
    title: "THERMAL ENERGY",
    headline: "ADVANCED SOLAR WATER HEATERS",
    icon: <Thermometer className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseHeater,
    desc: "ZERO-COST HEATING SYSTEMS"
  },
  {
    id: "05",
    title: "SMART SECURITY",
    headline: "INTELLIGENT CCTV SURVEILLANCE",
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseCctv,
    desc: "ENVISAGING A SAFER TOMORROW"
  },
  {
    id: "06",
    title: "HOME AUTOMATION",
    headline: "INTELLIGENT ROBOTIC VACUUM CLEANERS",
    icon: <Wind className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseVacuum,
    desc: "EXPERIENCE EFFORTLESS SMART CLEANING"
  }
];

export default function CompanyShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const directionRef = useRef(1); // 1 = forward (left→right), -1 = backward

  const goTo = (idx) => {
    directionRef.current = idx > activeIdx ? 1 : -1;
    setActiveIdx(idx);
  };

  // Auto-slide every 8 seconds — always forward
  useEffect(() => {
    const timer = setInterval(() => {
      directionRef.current = 1;
      setActiveIdx((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: { x: directionRef.current * 100 + "%", opacity: 0 },
    center: { x: "0%", opacity: 1 },
    exit:  { x: directionRef.current * -100 + "%", opacity: 0 },
  };

  return (
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Images — slide left-to-right */}
      <AnimatePresence initial={false} custom={directionRef.current}>
        <motion.div
          key={activeIdx}
          className="absolute inset-0 z-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0, 0.24, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <img
            src={SLIDES[activeIdx].image}
            alt={SLIDES[activeIdx].headline}
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
          {/* Layered overlay — stronger on mobile for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:from-black/50 md:via-black/30 md:to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content (Center) — perfectly centered with bottom offset for mobile dots */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center justify-center text-center pb-16 md:pb-0">
        <motion.div
          key={`headline-${activeIdx}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3 md:gap-4"
        >
          {/* Category label */}
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase shadow-[0_2px_12px_rgba(250,204,21,0.2)]">
            {SLIDES[activeIdx].title}
          </span>

          {/* Main headline */}
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-xs sm:max-w-2xl md:max-w-5xl" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}>
            {SLIDES[activeIdx].headline}
          </h2>

          {/* Accent line */}
          <div className="h-[3px] w-14 sm:w-20 bg-yellow-400 rounded-full shadow-[0_0_12px_rgba(250,204,21,0.5)] mt-1" />

          {/* Description pill — visible on all screens */}
          <p className="text-white/90 font-semibold tracking-[0.14em] text-[10px] sm:text-xs md:text-sm uppercase bg-black/35 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>
            {SLIDES[activeIdx].desc}
          </p>
        </motion.div>
      </div>

      {/* Left Vertical Navigation Menu */}
      <div className="absolute left-0 top-0 h-full z-30 hidden lg:flex flex-col justify-center border-r border-white/10 px-8">
        <div className="space-y-8">
          {SLIDES.map((slide, idx) => (
            <motion.button
              key={slide.id}
              onClick={() => goTo(idx)}
              className="flex items-center group relative text-left"
              initial={false}
            >
              <div className="flex items-center gap-4 min-w-[160px]">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-black transition-all ${idx === activeIdx ? "text-yellow-400" : "text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>
                      {slide.id}
                    </span>
                    {idx === activeIdx && (
                      <motion.div 
                        className="h-1 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                        layoutId="activeTabLine"
                        initial={{ width: 0 }}
                        animate={{ width: 30 }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`transition-all ${idx === activeIdx ? "text-yellow-400" : "text-white/60 group-hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>
                      {slide.icon}
                    </div>
                    <span className={`text-[11px] font-black tracking-widest uppercase transition-all whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${idx === activeIdx ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                      {slide.title.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Indicators (Bottom) */}
      <div className="absolute bottom-8 inset-x-0 z-30 flex justify-center lg:hidden gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${idx === activeIdx ? "w-10 bg-yellow-400" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
