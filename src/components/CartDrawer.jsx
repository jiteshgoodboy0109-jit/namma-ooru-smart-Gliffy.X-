import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, X, Trash2, ArrowRight, ShieldCheck, CheckCircle, Sparkles, MessageCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useState, useRef } from 'react'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onCheckout }) {
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
    const quantity = item.quantity || 1
    return acc + (price * quantity)
  }, 0)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (!customerInfo.name || !customerInfo.phone) return

    // Trigger success state
    setOrderPlaced(true)

    // Confetti effect
    const duration = 3000
    const end = Date.now() + duration
    const colors = ['#10B981', '#3B82F6', '#F59E0B']

      ; (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()

    // Pass data to parent after delay
    setTimeout(() => {
      if (onCheckout) {
        onCheckout(customerInfo)
      }
      setOrderPlaced(false)
      setCustomerInfo({ name: '', phone: '' })
      onClose()
    }, 2500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full sm:max-w-[450px] bg-white flex flex-col h-[100dvh] shadow-2xl"
          >
            {/* Header - Clean Minimalist Style */}
            <div className="px-6 py-5 bg-white border-b border-gray-200 flex justify-between items-center flex-shrink-0">
              <h2 className="text-2xl font-bold text-slate-900">Your Cart</h2>
              <button
                onClick={onClose}
                className="p-1 text-slate-900 hover:text-slate-600 transition-colors"
              >
                <X size={24} strokeWidth={2} />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white relative">
              {/* Success Overlay */}
              <AnimatePresence>
                {orderPlaced && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg"
                    >
                      <CheckCircle size={48} strokeWidth={3} />
                    </motion.div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed!</h3>
                    <p className="text-slate-500 font-medium">Redirecting to your invoice...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
                    <ShoppingCart size={48} className="text-gray-400" strokeWidth={1.5} />
                  </div>
                  <p className="text-lg font-medium text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item, idx) => {
                    const price = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0
                    const quantity = item.quantity || 1
                    const itemTotal = price * quantity

                    return (
                      <motion.div
                        key={`${item.id}-${idx}`}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-3"
                      >
                        {/* Product Image */}
                        <div className="h-20 w-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Product Info & Controls */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">₹{price} × {quantity}</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => onUpdateQuantity(idx, quantity - 1)}
                              className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-slate-700 hover:bg-gray-100 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm font-bold text-slate-900 min-w-[20px] text-center">{quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, quantity + 1)}
                              className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-slate-700 hover:bg-gray-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="flex flex-col justify-between items-end">
                          <span className="text-base font-bold text-slate-900">₹{itemTotal}</span>
                          <button
                            onClick={() => onRemove(idx)}
                            className="text-red-400 hover:text-red-600 transition-colors mt-auto"
                          >
                            <Trash2 size={16} strokeWidth={2} />
                          </button>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer - Total and Checkout - Matching Reference */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-gray-200 p-6 z-10 flex-shrink-0">
                {/* Total Row */}
                <div className="flex justify-between items-center mb-6 px-2">
                  <span className="text-xl font-bold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">₹{totalAmount.toLocaleString()}</span>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={() => {
                    // Show customer info form or proceed directly
                    const customerDetailsSection = document.getElementById('customer-details-section')
                    if (customerDetailsSection) {
                      customerDetailsSection.classList.remove('hidden')
                    }
                  }}
                  className="w-full py-4 bg-[#1a1d29] hover:bg-[#2a2d39] text-white rounded-xl font-bold text-base transition-all active:scale-95"
                >
                  Proceed to Checkout
                </button>

                {/* Customer Details Form - Initially hidden */}
                <form id="customer-details-section" onSubmit={handlePlaceOrder} className="space-y-4 mt-6 hidden">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Your Name *</label>
                    <input
                      required
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-slate-400 transition-all text-sm placeholder:text-slate-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-slate-400 transition-all text-sm placeholder:text-slate-300"
                      placeholder="10-digit number"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!customerInfo.name || !customerInfo.phone}
                    className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} /> Place Order
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
