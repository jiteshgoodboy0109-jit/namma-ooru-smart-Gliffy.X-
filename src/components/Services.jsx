import { motion } from "framer-motion";
import {
  Sun,
  Zap,
  Battery,
  Camera,
  Droplets,
  Leaf,
  Wrench,
  ThermometerSnowflake,
  Settings,
} from "lucide-react";

// Redesigned to exactly match the airy, white, 3-column reference design.
const SERVICES = [
  {
    title: "Solar Projects & Hybrid Solar",
    icon: <Sun className="w-6 h-6 text-yellow-500" />,
    desc: "End-to-end solar infrastructure designed for ultimate grid-independence and sustainable energy.",
    color: "bg-yellow-50",
    dot: "bg-green-300",
  },
  {
    title: "Heat Pumps",
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    desc: "Efficient, climate-friendly water heating systems extracting natural heat from the air.",
    color: "bg-orange-50",
    dot: "bg-green-100",
  },
  {
    title: "Solar Water Heater",
    icon: <Sun className="w-6 h-6 text-red-500" />,
    desc: "Harness solar thermal energy to eliminate water heating costs completely.",
    color: "bg-red-50",
    dot: "bg-transparent",
  },
  {
    title: "Inverter Battery",
    icon: <Battery className="w-6 h-6 text-blue-500" />,
    desc: "Robust solid-state power backups for uninterrupted home energy supply.",
    color: "bg-blue-50",
    dot: "bg-transparent",
  },
  {
    title: "CCTV Systems",
    icon: <Camera className="w-6 h-6 text-slate-600" />,
    desc: "High-definition, encrypted surveillance for continuous premises monitoring.",
    color: "bg-slate-100",
    dot: "bg-transparent",
  },
  {
    title: "Water Purifier",
    icon: <Droplets className="w-6 h-6 text-cyan-500" />,
    desc: "Advanced multi-stage RO filtration for 100% pure drinking water.",
    color: "bg-cyan-50",
    dot: "bg-transparent",
  },
  {
    title: "Water Softener",
    icon: <Leaf className="w-6 h-6 text-emerald-500" />,
    desc: "Chemical-free treatment to transform hard water into soft, healthy supply.",
    color: "bg-emerald-50",
    dot: "bg-transparent",
  },
  {
    title: "Robotic Vacuum",
    icon: <Wrench className="w-6 h-6 text-indigo-500" />,
    desc: "Intelligent automated cleaning systems with advanced spatial mapping.",
    color: "bg-indigo-50",
    dot: "bg-transparent",
  },
  {
    title: "AC Maintenance",
    icon: <ThermometerSnowflake className="w-6 h-6 text-sky-500" />,
    desc: "Expert cooling optimizations, gas refills, and deep chemical servicing.",
    color: "bg-sky-50",
    dot: "bg-transparent",
  },
  {
    title: "General Appliances",
    icon: <Settings className="w-6 h-6 text-gray-400" />,
    desc: "Comprehensive diagnostic and repair services for all household electronics.",
    color: "bg-gray-100",
    dot: "bg-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom smooth flowing ease
    },
  },
};

export default function Services() {
  return (
    <section className="bg-transparent pb-10">
      <motion.div 
        className="max-w-[1400px] mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative p-8 sm:p-10 rounded-[2.5rem] bg-white border border-slate-50 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col items-start"
            >
              {/* Top right indicator dot based on reference image */}
              {service.dot !== "bg-transparent" && (
                 <div className={`absolute top-8 right-8 w-1.5 h-1.5 rounded-full ${service.dot}`} />
              )}

              {/* Icon Container */}
              <div className={`w-14 h-14 mb-8 rounded-[1.25rem] ${service.color} flex items-center justify-center`}>
                {service.icon}
              </div>
              
              {/* Typography matching reference perfectly */}
              <h4 className="text-xl sm:text-[1.35rem] font-black text-[#1e293b] mb-4 tracking-tight leading-snug">
                {service.title}
              </h4>
              
              <p className="text-[#64748b] leading-[1.8] text-[0.95rem] font-medium pr-4">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

