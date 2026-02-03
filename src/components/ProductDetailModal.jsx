import { AnimatePresence, motion } from 'framer-motion'
import { X, Sun, ShoppingCart, Minus, Plus, Award, ShieldCheck, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"%3E%3Crect fill="%23f1f5f9" width="800" height="800"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%2394a3b8"%3EImage Not Available%3C/text%3E%3C/svg%3E';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [imgErrors, setImgErrors] = useState({})

  // Reset loading when image changes
  useEffect(() => {
    setIsImageLoading(true)
  }, [activeImageIndex, product])


  if (!isOpen || !product) return null

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image]
  const hasPricing = product.mrp && product.price && !String(product.price).includes('Contact')
  const savings =
    product.savings ||
    (hasPricing
      ? `₹${parseInt(String(product.mrp).replace(/[^0-9]/g, '')) - parseInt(String(product.price).replace(/[^0-9]/g, ''))}`
      : null)

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-2 sm:inset-3 md:inset-8 m-auto z-[100] max-w-7xl max-h-[95vh] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-slate-900">
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-6 md:p-10">
                <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 md:gap-4 h-full">
                  <div className="flex sm:flex-col gap-2 md:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[400px] md:max-h-[560px] pb-2 sm:pb-0 scrollbar-hide">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl border-2 overflow-hidden shrink-0 transition-all ${activeImageIndex === idx ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200 hover:border-slate-300'
                          }`}
                      >
                        <img
                          src={imgErrors[idx] ? PLACEHOLDER_IMAGE : img}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                          onError={() => setImgErrors(prev => ({ ...prev, [idx]: true }))}
                        />
                      </button>
                    ))}
                  </div>
                  <div
                    className="flex-1 bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 relative group cursor-zoom-in flex items-center justify-center p-4 sm:sticky sm:top-4 self-start sm:h-[calc(90vh-100px)] min-h-[300px]"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    {/* Loader */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 ${isImageLoading ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
                    </div>

                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: isImageLoading ? 0 : 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={imgErrors[activeImageIndex] ? PLACEHOLDER_IMAGE : galleryImages[activeImageIndex]}
                      alt={product.name}
                      onLoad={() => setIsImageLoading(false)}
                      onError={() => {
                        setImgErrors(prev => ({ ...prev, [activeImageIndex]: true }));
                        setIsImageLoading(false);
                      }}
                      className="max-w-full max-h-full object-contain shadow-sm group-hover:scale-105 transition-transform duration-500 rounded-lg"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center z-20 pointer-events-none">
                      <span className={`opacity-0 ${!isImageLoading ? 'group-hover:opacity-100' : ''} bg-white/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg transition-opacity transform translate-y-2 group-hover:translate-y-0`}>
                        Tap to Zoom
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mb-4 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-2 sm:mb-3 leading-snug">{product.name}</h1>
                    {product.rating && (
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Sun key={i} size={14} className={`sm:w-5 sm:h-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 font-medium">({product.reviewCount || 0})</span>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-200">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">{product.price}</span>
                      {product.mrp && hasPricing && <span className="text-base sm:text-xl text-slate-400 line-through font-semibold">{product.mrp}</span>}
                    </div>
                    {savings && hasPricing && (
                      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
                        <span className="font-semibold">Save {savings}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 mt-2">Inclusive of all taxes</p>
                  </div>
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wider">Quantity:</label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center border-2 border-slate-300 rounded-lg sm:rounded-xl overflow-hidden">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 sm:px-5 py-2 sm:py-3 hover:bg-slate-100 text-slate-700 transition-colors font-semibold">
                          <Minus size={16} className="sm:w-5 sm:h-5" />
                        </button>
                        <span className="font-bold text-base sm:text-lg w-10 sm:w-12 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-3 sm:px-5 py-2 sm:py-3 hover:bg-slate-100 text-slate-700 transition-colors font-semibold">
                          <Plus size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                      {hasPricing && (
                        <div className="text-right">
                          <span className="block text-xs text-slate-500 font-medium">Total</span>
                          <span className="text-lg sm:text-2xl font-black text-slate-900">₹{(parseInt(String(product.price).replace(/[^0-9]/g, '')) * quantity).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mb-4 sm:mb-6">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddToCart} className="bg-green-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
                      <ShoppingCart size={18} className="sm:w-6 sm:h-6" /> Add to Cart
                    </motion.button>
                  </div>
                  {product.badges && product.badges.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8 pb-4 sm:pb-8 border-b border-slate-200">
                      {product.badges.map((badge, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                            {i === 0 && <Award className="text-green-600 w-4 h-4 sm:w-6 sm:h-6" />}
                            {i === 1 && <ShieldCheck className="text-green-600 w-4 h-4 sm:w-6 sm:h-6" />}
                            {i === 2 && <Zap className="text-green-600 w-4 h-4 sm:w-6 sm:h-6" />}
                          </div>
                          <span className="text-xs font-semibold text-slate-700">{badge}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2 sm:mb-3">Description</h3>
                    <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal whitespace-pre-line">{product.description}</p>
                  </div>
                  {product.features && product.features.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2 sm:mb-3">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.features.map((feat, i) => (
                          <span key={i} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2 sm:mb-3">Specs</h3>
                      <div className="bg-slate-50 rounded-lg sm:rounded-xl overflow-hidden border border-slate-200">
                        <table className="w-full text-xs sm:text-sm">
                          <tbody>
                            {Object.entries(product.specifications).map(([key, value], i) => (
                              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-slate-700 border-b border-slate-200">{key}</td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-slate-700 font-normal border-b border-slate-200">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* LIGHTBOX OVERLAY */}
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] bg-black bg-opacity-95 flex items-center justify-center p-4 backdrop-blur-md"
                onClick={() => setIsLightboxOpen(false)}
              >
                <button
                  className="absolute top-4 right-4 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  <X size={32} />
                </button>

                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={imgErrors[activeImageIndex] ? PLACEHOLDER_IMAGE : galleryImages[activeImageIndex]}
                  alt="Full Screen View"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                  onError={() => setImgErrors(prev => ({ ...prev, [activeImageIndex]: true }))}
                />

                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(idx);
                      }}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-white scale-110 shadow-lg' : 'border-white/30 hover:border-white/70 opacity-70'
                        }`}
                    >
                      <img
                        src={imgErrors[idx] ? PLACEHOLDER_IMAGE : img}
                        className="w-full h-full object-cover"
                        onError={() => setImgErrors(prev => ({ ...prev, [idx]: true }))}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
