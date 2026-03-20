import { motion } from 'framer-motion'

export default function BrandsStrip() {
  const brands = ['Aquaguard', 'LUMINOUS', 'V-Guard', 'Havells', 'Exide', 'Livguard']
  
  return (
    <div className="bg-slate-900 py-10 overflow-hidden">
      <div className="max-w-full">
        <div className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Authorized Dealers</div>
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-12"
            animate={{ x: ['0%', '-100%'] }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'linear',
              repeatType: 'loop'
            }}
            style={{ width: '200%' }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <span 
                key={index} 
                className="min-w-max text-white font-bold text-lg md:text-2xl opacity-60 whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
