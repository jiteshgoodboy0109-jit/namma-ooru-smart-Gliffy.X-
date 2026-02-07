import { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import ProductDetailModal from './components/ProductDetailModal.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import HomePage from './pages/HomePage.jsx'

const Bill = lazy(() => import('./pages/Bill.jsx'))

import { useToast } from './context/ToastContext'
import { useCart } from './context/CartContext'

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showBillPage, setShowBillPage] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)
  const [lang, setLang] = useState('en')
  const [shopName, setShopName] = useState('NAMMA OORU')

  const { addToast } = useToast()
  const { cart, removeFromCart, updateQuantity, clearCart, addToCart } = useCart()

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

  const handleCheckout = useCallback((customerInfo) => {
    setCustomerInfo(customerInfo)
    setShowBillPage(true)
    addToast('Proceeding to invoice...', 'success')
  }, [addToast])

  const handleBackHome = useCallback(() => {
    setShowBillPage(false)
    clearCart()
    setCustomerInfo(null)
    scrollToSection('home')
  }, [clearCart])

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
    }, 300)
  }, [scrollToSection])

  const onNavigate = useCallback((id) => scrollToSection(id), [scrollToSection])

  if (showBillPage && cart.length > 0) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Bill
          cartItems={cart}
          customerInfo={customerInfo}
          onCheckoutComplete={handleCheckout}
          onBackHome={handleBackHome}
        />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-slate-900">
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <Navbar
        scrolled={scrolled}
        cartCount={cart.length}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onCartOpen={() => setIsCartOpen(true)}
        onNavigate={onNavigate}
        lang={lang}
        shopName={shopName}
      />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <HomePage
        onNavigate={onNavigate}
        scrollToProduct={scrollToProduct}
      />

      <WhatsAppFloat
        count={cart.length}
        onClick={() => setIsCartOpen(true)}
      />
    </div>
  )
}
