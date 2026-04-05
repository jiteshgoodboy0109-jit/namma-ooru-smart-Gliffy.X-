import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, Zap, IndianRupee, MapPin } from "lucide-react";

const CompanyShowcase = lazy(() => import("../components/CompanyShowcase.jsx"));

// ─── Animated Number Counter ──────────────────────────────────────────────────
const Counter = ({ value, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Feature Card with Mobile Link Chain ─────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, description, delay, counterValue, counterSuffix, isLast }) => (
  <div className="relative flex flex-col items-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }}
      className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center group transition-all duration-500 hover:border-orange-200 cursor-default relative overflow-hidden w-full"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 group-hover:from-orange-50/50 to-transparent transition-all duration-500 -z-10" />

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-orange-500 mb-4 sm:mb-6 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-sm"
      >
        <Icon size={24} />
      </motion.div>

      {/* Title / Counter */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
        {counterValue ? (
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-slate-950">
              <Counter value={counterValue} suffix={counterSuffix} />
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 tracking-tight uppercase">
              {title.replace(/[0-9+]/g, "")}
            </span>
          </div>
        ) : (
          <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">{title}</span>
        )}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed font-medium">{description}</p>

      {/* Animated underline bar */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "40px" }}
        className="h-1.5 bg-orange-500 mt-6 sm:mt-8 rounded-full transition-all duration-500"
      />
    </motion.div>

    {/* Mobile animated link chain */}
    {!isLast && (
      <div className="md:hidden h-8 flex flex-col items-center relative">
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="w-0.5 bg-gradient-to-b from-orange-400 to-slate-200"
        />
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: delay + 0.7 }}
          className="w-1.5 h-1.5 rounded-full bg-orange-500 absolute bottom-0 shadow-[0_0_8px_rgba(249,115,22,0.6)]"
        />
      </div>
    )}
  </div>
);

// ─── Features Data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Shield,
    title: "Years Experience",
    counterValue: "10",
    counterSuffix: "+",
    description: "A decade of mastering home technology and electrical solutions with unmatched precision.",
    delay: 0.1,
  },
  {
    icon: Users,
    title: "Happy Customers",
    counterValue: "1000",
    counterSuffix: "+",
    description: "Join our growing community of satisfied homeowners who trust our smart expertise.",
    delay: 0.2,
  },
  {
    icon: Zap,
    title: "Same-Day Service",
    description: "Quick turnaround for all repairs and installations. Your time is our top priority.",
    delay: 0.3,
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "No hidden costs or surprise fees. Get clear, upfront estimates for every single job.",
    delay: 0.4,
  },
  {
    icon: MapPin,
    title: "Local Experts",
    description: "Based in Udumalpet, we understand local needs and provide personalized on-site support.",
    delay: 0.5,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Showcase */}
      <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-yellow-400">Loading…</div>}>
        <CompanyShowcase />
      </Suspense>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
        {/* Soft background blobs */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-100 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-4 border border-orange-100"
            >
              Our Edge
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight"
            >
              Why Choose <span className="text-orange-500">Us</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
            >
              Experience the perfect blend of tradition, technology, and trust with Udumalpet's premier smart solutions partner.
            </motion.p>
          </div>

          {/* Desktop: 3 + 2 grid  |  Mobile: single column with chain connectors */}
          <div className="flex flex-col md:flex-wrap md:flex-row justify-center gap-0 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8 w-full">
              {FEATURES.slice(0, 3).map((f, i) => (
                <FeatureCard key={f.title} {...f} isLast={false} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 w-full lg:w-[calc(66.66%+2rem)]">
              {FEATURES.slice(3).map((f, i) => (
                <FeatureCard key={f.title} {...f} isLast={i === FEATURES.slice(3).length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
