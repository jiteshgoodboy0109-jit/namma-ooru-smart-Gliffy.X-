import { useEffect, useState, createContext, useContext, lazy, Suspense, useCallback, useMemo, memo } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import SectionTitle from './components/SectionTitle.jsx'

const Services = lazy(() => import('./components/Services.jsx'))
const Mission = lazy(() => import('./components/Mission.jsx'))
const TrustStats = lazy(() => import('./components/TrustStats.jsx'))
const BrandsStrip = lazy(() => import('./components/BrandsStrip.jsx'))
const ContactSection = lazy(() => import('./components/ContactSection.jsx'))
const Footer = lazy(() => import('./components/Footer.jsx'))

const Bill = lazy(() => import('./components/Bill.jsx'))

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import ImageWithFallback from './components/ImageWithFallback.jsx'
import { PRODUCTS, CATEGORIES } from './data/products'

// const PRODUCTS = window.PRODUCTS || []

const ToastContext = createContext()
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3000)
  }, [])
  const removeToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[70] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border pointer-events-auto ${toast.type === 'success' ? 'bg-slate-900/90 text-white border-green-500/50' : 'bg-red-900/90 text-white border-red-500/50'
                }`}
            >
              <span className="font-bold text-sm">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
export const useToast = () => useContext(ToastContext)

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filterCategory, setFilterCategory] = useState('All')
  const [showBillPage, setShowBillPage] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)
  const [lang, setLang] = useState('en')
  const [shopName, setShopName] = useState('NAMMA OORU')
  const { addToast } = useToast()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setLang((p) => (p === 'en' ? 'ta' : 'en')), 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setShopName(lang === 'en' ? 'NAMMA OORU' : 'நம்ம ஊரு')
  }, [lang])

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], quantity: (updated[existingIndex].quantity || 1) + 1 }
        return updated
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    addToast(`${product.name} added to cart!`)
  }, [addToast])

  const removeFromCart = useCallback((index) => {
    setCart((prev) => {
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
  }, [])

  const updateQuantity = useCallback((index, newQuantity) => {
    if (newQuantity < 1) {
      // Remove item if quantity is 0
      removeFromCart(index)
      return
    }
    setCart((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity: newQuantity }
      return updated
    })
  }, [removeFromCart])

  const handleCheckout = useCallback((customerInfo) => {
    setCustomerInfo(customerInfo)
    setShowBillPage(true)
    addToast('Proceeding to invoice...', 'success')
  }, [addToast])

  const handleBackHome = useCallback(() => {
    setShowBillPage(false)
    setCart([])
    setCustomerInfo(null)
    scrollToSection('home')
  }, [])

  const openProduct = useCallback((product) => setSelectedProduct(product), [])

  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
    }
  }, [])

  const scrollToProduct = useCallback((productId) => {
    scrollToSection('products')
    setTimeout(() => {
      const card = document.getElementById(`product-card-${productId}`)
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
        card.classList.add('ring-4', 'ring-green-500')
        setTimeout(() => card.classList.remove('ring-4', 'ring-green-500'), 2000)
      }
    }, 300) // Reduced delay
  }, [scrollToSection])

  const onNavigate = useCallback((id) => scrollToSection(id), [scrollToSection])

  const filteredProducts = useMemo(() =>
    filterCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filterCategory)
    , [filterCategory])

  if (showBillPage && cart.length > 0) {
    return (
      <ToastProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Bill cartItems={cart} customerInfo={customerInfo} onCheckoutComplete={handleCheckout} onBackHome={handleBackHome} />
        </Suspense>
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white font-sans overflow-x-hidden text-slate-900">
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout} />
        <Navbar scrolled={scrolled} cartCount={cart.length} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onCartOpen={() => setIsCartOpen(true)} onNavigate={onNavigate} lang={lang} shopName={shopName} />
        <ProductDetailModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />

        <Hero onExplore={() => onNavigate('products')} onContact={() => onNavigate('contact')} />

        <Suspense fallback={null}>
          <TrustStats />
          <section id="products" className="max-w-7xl mx-auto px-6 py-12">
            <SectionTitle title="Product Catalogue" subtitle="Our premium selection of smart home essentials." />
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {['All', ...Object.values(window.CATEGORIES || {})].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-150 border ${filterCategory === cat ? 'bg-slate-900 text-white shadow-lg scale-105 border-slate-900' : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {filteredProducts.map((product, index) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  id={`product-card-${product.id}`}
                  onClick={() => openProduct(product)}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer will-change-transform"
                >
                  <div className="aspect-square relative bg-gray-50 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      loading={index < 6 ? "eager" : "lazy"}
                      className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 z-20 bg-white/90 backdrop-blur-sm text-slate-900 text-[8px] md:text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-3 md:p-5 flex flex-col flex-1">
                    <h3 className="text-sm md:text-base font-medium mb-2 text-slate-800 leading-snug flex-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                      <span className="text-sm md:text-lg font-semibold text-slate-900">{product.price}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="bg-slate-900 text-white p-1.5 md:p-2.5 rounded-lg md:rounded-xl shadow-lg hover:bg-green-600 transition-colors"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
          <Services onScrollToProduct={scrollToProduct} />
          <Mission />
          <BrandsStrip />
          <ContactSection />
          <Footer />
        </Suspense>

        <WhatsAppFloat count={cart.length} onClick={() => setIsCartOpen(true)} />
      </div>
    </ToastProvider>
  )
}
