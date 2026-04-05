import { motion } from "framer-motion";

export default function BrandsStrip() {
  const brands = [
    "Aquaguard",
    "LUMINOUS",
    "V-Guard",
    "Havells",
    "Exide",
    "Livguard",
  ];

  // We use 4 sets so it easily covers ultra-wide screens, ensuring no blank spaces wait to scroll in.
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="bg-slate-50 py-12 overflow-hidden relative border-t border-slate-100">
      <div className="max-w-full">
        <div className="text-center mb-8">
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                Authorized Dealers
            </span>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

        <div className="overflow-hidden w-full flex">
          <motion.div
            className="flex gap-16 sm:gap-32 w-max pr-16 sm:pr-32 will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeItems.map((brand, index) => (
              <span
                key={index}
                className="text-slate-800 font-black text-xl md:text-3xl tracking-tighter opacity-80 whitespace-nowrap hover:text-green-600 transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
