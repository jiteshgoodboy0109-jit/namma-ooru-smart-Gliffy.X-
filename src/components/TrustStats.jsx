import { useState, useEffect, useRef } from 'react'
import { Award, Users, ShieldCheck, Headphones, Phone } from 'lucide-react'

function CountUpNumber({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span ref={elementRef}>
      {prefix}{count}{suffix}
    </span>
  )
}

export default function TrustStats() {
  const items = [
    { icon: Award, value: '10+', numericValue: 10, suffix: '+', label: 'Years Experience', color: 'bg-blue-50 text-blue-600' },
    { icon: Users, value: '1000+', numericValue: 1000, suffix: '+', label: 'Happy Clients', color: 'bg-green-50 text-green-600' },
    { icon: ShieldCheck, value: '100%', numericValue: 100, suffix: '%', label: 'Secure Warranty', color: 'bg-yellow-50 text-yellow-600' },
    { icon: Phone, value: '24/7', label: 'Support Team', color: 'bg-purple-50 text-purple-600', isStatic: true }
  ]
  return (
    <section className="relative z-20 mt-0 md:-mt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {items.map(({ icon: Icon, value, numericValue, suffix, label, color, isStatic }, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group cursor-default">
              <div className={`w-12 h-12 md:w-16 md:h-16 ${color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-3xl font-black text-slate-900">
                {isStatic ? value : <CountUpNumber target={numericValue} suffix={suffix || ''} />}
              </h3>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
